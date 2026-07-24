/**
 * Scans the "Wellness Final Product" folder structure:
 *   Category / Series / ProductFolder / files (.txt specs + images)
 *
 * Outputs:
 *   1. assets/data/cloudinary-products.json  — products WITH images only
 *   2. assets/data/product-audit.json        — full audit report
 */

import fs from "fs"
import path from "path"

const SOURCE = "/Users/nischalpuri/Desktop/Wellness Final Product"
const OUT_DIR = path.resolve("assets/data")

const IMAGE_EXTS = new Set([".png", ".jpg", ".jpeg", ".webp", ".tif"])
const IMAGE_PRIORITY = { ".png": 1, ".jpg": 2, ".jpeg": 3, ".webp": 4, ".tif": 5 }
const SPEC_EXT = ".txt"

const CATEGORY_MAP = {
  "01-Cardio": "Cardio",
  "02-Strength": "Strength",
  "03-Free-Weight": "Free Weight",
  "04-Benches": "Benches",
}

const SKIP_DIRS = new Set(["00-Missing-Photos", ".DS_Store"])

function slugify(str) {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
}

function parseSpecFile(filePath) {
  const raw = fs.readFileSync(filePath, "utf-8").trim()
  const lines = raw.split("\n").map((l) => l.trim()).filter(Boolean)

  if (lines.length === 0) return { name: path.basename(filePath, ".txt"), description: "", specs: {}, features: [] }

  const name = lines[0]
  const descLines = []
  const specs = {}
  const features = []
  let section = "desc"

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i]

    if (/^specifications?:\s*$/i.test(line)) { section = "specs"; continue }
    if (/^features?:\s*$/i.test(line)) { section = "features"; continue }

    if (section === "specs" || section === "features") {
      const cleaned = line.replace(/^[-•*]\s*/, "")
      const kvMatch = cleaned.match(/^([^:]{2,40}):\s*(.+)$/)
      if (kvMatch) {
        specs[kvMatch[1].trim()] = kvMatch[2].trim()
      } else if (cleaned) {
        features.push(cleaned)
      }
    } else {
      if (line && !/^[-•*]\s/.test(line)) {
        descLines.push(line)
      }
    }
  }

  return { name, description: descLines.join(" ").trim(), specs, features }
}

function getSeriesName(seriesDirName) {
  return seriesDirName.replace(/^\d+-/, "").replace(/-/g, " ").trim()
}

/**
 * Get the base product name from a filename, stripping View suffixes.
 * "M-8809U_Upright-Bike-View3B" → "M-8809U_Upright-Bike"
 * "WN-N8012_Lat-Pulldown" → "WN-N8012_Lat-Pulldown" (no view suffix)
 */
function getBaseProductName(filename) {
  const noExt = path.basename(filename, path.extname(filename))
  // Only strip -View or _View followed by digits and optional letter at the END
  return noExt.replace(/[-_][Vv]iew\d*[A-Za-z]?$/, "")
}

/**
 * Deduplicate images: if same base name exists in multiple formats,
 * keep only the highest priority format. But keep different View images.
 */
function deduplicateImages(images) {
  // Group by full name without extension
  const byName = new Map()
  for (const img of images) {
    const nameNoExt = path.basename(img, path.extname(img))
    const ext = path.extname(img).toLowerCase()
    if (!byName.has(nameNoExt)) byName.set(nameNoExt, [])
    byName.get(nameNoExt).push({ file: img, ext, priority: IMAGE_PRIORITY[ext] || 99 })
  }

  const result = []
  for (const [, variants] of byName) {
    // Keep the best format for each unique name
    variants.sort((a, b) => a.priority - b.priority)
    result.push(variants[0].file)
  }

  return result
}

function scanProductFolder(productDir) {
  const files = fs.readdirSync(productDir).filter((f) => f !== ".DS_Store")
  const products = new Map()

  for (const file of files) {
    const ext = path.extname(file).toLowerCase()
    const nameNoExt = path.basename(file, path.extname(file))
    const baseProduct = getBaseProductName(file)

    if (!products.has(baseProduct)) {
      products.set(baseProduct, { images: [], specFile: null })
    }

    const entry = products.get(baseProduct)

    if (ext === SPEC_EXT) {
      // Prefer the base spec (no View suffix)
      const isView = nameNoExt !== baseProduct
      if (!isView) {
        entry.specFile = path.join(productDir, file)
      } else if (!entry.specFile) {
        entry.specFile = path.join(productDir, file)
      }
    } else if (IMAGE_EXTS.has(ext)) {
      entry.images.push(file)
    }
  }

  // Deduplicate format variants per product
  for (const [key, data] of products) {
    data.images = deduplicateImages(data.images)
  }

  return products
}

function scanMissingPhotos(missingDir) {
  const missing = []
  if (!fs.existsSync(missingDir)) return missing
  function walk(dir) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      if (entry.name === ".DS_Store") continue
      const full = path.join(dir, entry.name)
      if (entry.isDirectory()) walk(full)
      else if (entry.name.endsWith(".txt")) missing.push(path.relative(missingDir, full))
    }
  }
  walk(missingDir)
  return missing
}

// ──────────── MAIN ────────────

const allProducts = []
const audit = {
  summary: { total: 0, withBoth: 0, specsOnly: 0, imageOnly: 0 },
  categories: {},
  missingPhotos: [],
  productsWithoutImages: [],
  seriesWithZeroImages: [],
}

for (const categoryDir of fs.readdirSync(SOURCE).sort()) {
  if (SKIP_DIRS.has(categoryDir)) continue
  if (!CATEGORY_MAP[categoryDir]) continue

  const categoryName = CATEGORY_MAP[categoryDir]
  const categoryPath = path.join(SOURCE, categoryDir)
  if (!fs.statSync(categoryPath).isDirectory()) continue

  audit.categories[categoryName] = { series: {} }

  for (const seriesDir of fs.readdirSync(categoryPath).sort()) {
    if (seriesDir === ".DS_Store") continue
    const seriesPath = path.join(categoryPath, seriesDir)
    if (!fs.statSync(seriesPath).isDirectory()) continue

    const seriesName = getSeriesName(seriesDir)
    const seriesAudit = { total: 0, withImage: 0, specsOnly: 0, products: [] }

    let productDir = seriesPath
    const subDirs = fs.readdirSync(seriesPath).filter(
      (f) => f !== ".DS_Store" && fs.statSync(path.join(seriesPath, f)).isDirectory()
    )
    if (subDirs.length === 1) {
      productDir = path.join(seriesPath, subDirs[0])
    }

    const products = scanProductFolder(productDir)

    for (const [baseName, data] of products) {
      let parsed = { name: baseName.replace(/[-_]/g, " "), description: "", specs: {}, features: [] }
      if (data.specFile) parsed = parseSpecFile(data.specFile)

      const hasImage = data.images.length > 0
      const hasSpecs = data.specFile !== null

      audit.summary.total++
      seriesAudit.total++

      // Determine main image (non-view first) and gallery images
      const mainImage = data.images.find(img => !img.match(/[-_][Vv]iew\d/i)) || data.images[0]
      const galleryImages = data.images.length > 1
        ? [mainImage, ...data.images.filter(img => img !== mainImage)]
        : [mainImage]

      const product = {
        id: slugify(baseName),
        name: parsed.name,
        category: categoryName,
        series: seriesName,
        description: parsed.description,
        specs: parsed.specs,
        features: parsed.features.length > 0 ? parsed.features : undefined,
        image: mainImage,             // hero image filename
        images: galleryImages,        // all images for carousel
        cloudinaryFolder: `wellness-nepal/${slugify(categoryName)}/${slugify(seriesName)}`,
      }

      if (hasImage) {
        audit.summary[hasSpecs ? "withBoth" : "imageOnly"]++
        seriesAudit.withImage++
        allProducts.push(product)
      } else {
        audit.summary.specsOnly++
        seriesAudit.specsOnly++
        audit.productsWithoutImages.push({
          id: product.id,
          name: product.name,
          category: categoryName,
          series: seriesName,
        })
      }

      seriesAudit.products.push({
        id: product.id,
        name: product.name,
        hasImage,
        hasSpecs,
        imageCount: data.images.length,
      })
    }

    if (seriesAudit.withImage === 0) {
      audit.seriesWithZeroImages.push({
        category: categoryName,
        series: seriesName,
        productsNeedingPhotos: seriesAudit.specsOnly,
      })
    }

    audit.categories[categoryName].series[seriesName] = seriesAudit
  }
}

audit.missingPhotos = scanMissingPhotos(path.join(SOURCE, "00-Missing-Photos"))

// ──────────── OUTPUT ────────────

fs.mkdirSync(OUT_DIR, { recursive: true })
fs.writeFileSync(path.join(OUT_DIR, "cloudinary-products.json"), JSON.stringify(allProducts, null, 2))
fs.writeFileSync(path.join(OUT_DIR, "product-audit.json"), JSON.stringify(audit, null, 2))

// ──────────── CONSOLE REPORT ────────────

console.log("\n=== PRODUCT CATALOG SCAN ===\n")
console.log(`Total scanned:             ${audit.summary.total}`)
console.log(`IN CATALOG (have images):  ${allProducts.length}`)
console.log(`  - Image + Specs:         ${audit.summary.withBoth}`)
console.log(`  - Image only:            ${audit.summary.imageOnly}`)
console.log(`EXCLUDED (no images):      ${audit.summary.specsOnly}`)
console.log(`Missing photos flagged:    ${audit.missingPhotos.length}`)

const multiView = allProducts.filter(p => p.images.length > 1)
console.log(`\nProducts with carousel (multi-view): ${multiView.length}`)
multiView.forEach(p => {
  console.log(`  ${p.name}: ${p.images.length} images`)
})

console.log("\n=== PER CATEGORY ===\n")
for (const [cat, data] of Object.entries(audit.categories)) {
  const catTotal = Object.values(data.series).reduce((sum, s) => sum + s.withImage, 0)
  console.log(`${cat}: ${catTotal} products with images`)
  for (const [series, sData] of Object.entries(data.series)) {
    if (sData.withImage > 0)
      console.log(`  ${series}: ${sData.withImage} products`)
    else
      console.log(`  ${series}: --- ALL MISSING IMAGES (${sData.specsOnly} need photos) ---`)
  }
  console.log()
}

console.log("=== ASK CLIENT: Series needing ALL photos ===\n")
audit.seriesWithZeroImages.forEach(s => {
  console.log(`  ${s.category} > ${s.series}: ${s.productsNeedingPhotos} products`)
})

console.log(`\n✓ assets/data/cloudinary-products.json (${allProducts.length} products)`)
console.log(`✓ assets/data/product-audit.json (full audit)`)
