/**
 * Compresses product images (webp, max 1200px) and uploads to Cloudinary.
 *
 * Folder structure on Cloudinary:
 *   wellness-nepal/{category}/{series}/{filename}.webp
 *
 * Usage:
 *   node scripts/upload-to-cloudinary.mjs            # real upload
 *   node scripts/upload-to-cloudinary.mjs --dry-run   # preview only
 */

import fs from "fs"
import path from "path"
import os from "os"
import { v2 as cloudinary } from "cloudinary"
import sharp from "sharp"

// Load .env
const envPath = path.resolve(".env")
if (fs.existsSync(envPath)) {
  for (const line of fs.readFileSync(envPath, "utf-8").split("\n")) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith("#")) continue
    const eqIdx = trimmed.indexOf("=")
    if (eqIdx > 0) {
      const key = trimmed.slice(0, eqIdx).trim()
      const val = trimmed.slice(eqIdx + 1).trim()
      if (!process.env[key]) process.env[key] = val
    }
  }
}

const SOURCE = "/Users/nischalpuri/Desktop/Wellness Final Product"
const PRODUCTS_FILE = path.resolve("assets/data/cloudinary-products.json")
const DRY_RUN = process.argv.includes("--dry-run")

const MAX_WIDTH = 1200
const WEBP_QUALITY = 80

const CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME
const API_KEY = process.env.CLOUDINARY_API_KEY
const API_SECRET = process.env.CLOUDINARY_SECRET

if (!CLOUD_NAME || !API_KEY || !API_SECRET) {
  console.error("Missing Cloudinary env vars")
  process.exit(1)
}

cloudinary.config({ cloud_name: CLOUD_NAME, api_key: API_KEY, api_secret: API_SECRET, secure: true })

const CATEGORY_FOLDERS = {
  Cardio: "01-Cardio",
  Strength: "02-Strength",
  "Free Weight": "03-Free-Weight",
  Benches: "04-Benches",
}

function buildSeriesFolderMap() {
  const map = {}
  for (const [category, catFolder] of Object.entries(CATEGORY_FOLDERS)) {
    const catPath = path.join(SOURCE, catFolder)
    if (!fs.existsSync(catPath)) continue
    map[category] = {}
    for (const seriesDir of fs.readdirSync(catPath)) {
      if (seriesDir === ".DS_Store") continue
      const seriesPath = path.join(catPath, seriesDir)
      if (!fs.statSync(seriesPath).isDirectory()) continue
      const seriesName = seriesDir.replace(/^\d+-/, "").replace(/-/g, " ").trim()
      const subDirs = fs.readdirSync(seriesPath).filter(
        (f) => f !== ".DS_Store" && fs.statSync(path.join(seriesPath, f)).isDirectory()
      )
      map[category][seriesName] = subDirs.length === 1 ? path.join(seriesPath, subDirs[0]) : seriesPath
    }
  }
  return map
}

/**
 * Compress image to webp, max 1200px width, return temp file path + size info
 */
async function compressImage(localPath) {
  const originalSize = fs.statSync(localPath).size
  const tmpFile = path.join(os.tmpdir(), `wn-${Date.now()}-${Math.random().toString(36).slice(2)}.webp`)

  await sharp(localPath)
    .resize({ width: MAX_WIDTH, withoutEnlargement: true })
    .webp({ quality: WEBP_QUALITY })
    .toFile(tmpFile)

  const newSize = fs.statSync(tmpFile).size
  return { tmpFile, originalSize, newSize }
}

async function uploadImage(localPath, cloudinaryFolder, filename) {
  const baseName = path.basename(filename, path.extname(filename))
  const publicId = `${cloudinaryFolder}/${baseName}`

  if (DRY_RUN) {
    const { originalSize, newSize, tmpFile } = await compressImage(localPath)
    fs.unlinkSync(tmpFile)
    const savings = ((1 - newSize / originalSize) * 100).toFixed(0)
    console.log(`  [DRY] ${baseName}: ${(originalSize / 1024 / 1024).toFixed(1)}MB → ${(newSize / 1024).toFixed(0)}KB (${savings}% smaller)`)
    return { url: `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/${publicId}`, originalSize, newSize }
  }

  const { tmpFile, originalSize, newSize } = await compressImage(localPath)

  try {
    const result = await cloudinary.uploader.upload(tmpFile, {
      public_id: publicId,
      overwrite: false,
      resource_type: "image",
    })
    return { url: result.secure_url, originalSize, newSize }
  } finally {
    fs.unlinkSync(tmpFile)
  }
}

async function main() {
  const products = JSON.parse(fs.readFileSync(PRODUCTS_FILE, "utf-8"))
  const seriesFolderMap = buildSeriesFolderMap()

  console.log(`\n${DRY_RUN ? "=== DRY RUN ===" : "=== UPLOADING TO CLOUDINARY ==="}\n`)
  console.log(`Products: ${products.length} | Cloud: ${CLOUD_NAME}`)
  console.log(`Compression: max ${MAX_WIDTH}px width, webp q${WEBP_QUALITY}\n`)

  let uploaded = 0, failed = 0, skipped = 0
  let totalOriginal = 0, totalCompressed = 0
  const failures = []
  const updatedProducts = []

  for (let i = 0; i < products.length; i++) {
    const product = { ...products[i] }
    const localDir = seriesFolderMap[product.category]?.[product.series]

    if (!localDir) {
      console.log(`⚠ Skip ${product.id}: folder not found for ${product.category}/${product.series}`)
      skipped++
      updatedProducts.push(product)
      continue
    }

    const newImages = []
    let newMainImage = null

    for (const imgFile of product.images) {
      const localPath = path.join(localDir, imgFile)

      if (!fs.existsSync(localPath)) {
        console.log(`  ⚠ Not found: ${localPath}`)
        skipped++
        continue
      }

      try {
        const { url, originalSize, newSize } = await uploadImage(localPath, product.cloudinaryFolder, imgFile)
        totalOriginal += originalSize
        totalCompressed += newSize
        newImages.push(url)
        if (imgFile === product.image) newMainImage = url
        uploaded++
      } catch (err) {
        console.error(`  ✗ ${imgFile}: ${err.message}`)
        failures.push({ product: product.id, file: imgFile, error: err.message })
        failed++
      }
    }

    if (!DRY_RUN && newImages.length > 0) {
      product.image = newMainImage || newImages[0]
      product.images = newImages
      delete product.cloudinaryFolder
    }

    updatedProducts.push(product)

    if ((i + 1) % 25 === 0 || i === products.length - 1) {
      console.log(`Progress: ${i + 1}/${products.length} (${uploaded} images, ${(totalOriginal / 1024 / 1024).toFixed(0)}MB → ${(totalCompressed / 1024 / 1024).toFixed(0)}MB)`)
    }
  }

  if (!DRY_RUN) {
    fs.writeFileSync(PRODUCTS_FILE, JSON.stringify(updatedProducts, null, 2))
  }

  const report = { uploaded, failed, skipped, failures, totalOriginalMB: +(totalOriginal / 1024 / 1024).toFixed(1), totalCompressedMB: +(totalCompressed / 1024 / 1024).toFixed(1), timestamp: new Date().toISOString() }
  fs.writeFileSync(path.resolve("assets/data/upload-report.json"), JSON.stringify(report, null, 2))

  console.log(`\n=== DONE ===`)
  console.log(`Uploaded:    ${uploaded}`)
  console.log(`Failed:      ${failed}`)
  console.log(`Skipped:     ${skipped}`)
  console.log(`Size:        ${report.totalOriginalMB}MB → ${report.totalCompressedMB}MB (${((1 - report.totalCompressedMB / report.totalOriginalMB) * 100).toFixed(0)}% saved)`)
  if (failures.length > 0) {
    console.log(`\nFailures:`)
    failures.forEach((f) => console.log(`  ${f.product}: ${f.file} — ${f.error}`))
  }
  console.log(`\n✓ assets/data/cloudinary-products.json ${DRY_RUN ? "(not modified)" : "updated with URLs"}`)
  console.log(`✓ assets/data/upload-report.json`)
}

main().catch((err) => { console.error("Fatal:", err); process.exit(1) })
