import type { NextConfig } from "next"
import path from "path"

const nextConfig: NextConfig = {
  turbopack: {
    // Keep Turbopack scoped to this app directory; avoids parent lockfile/root confusion.
    root: path.resolve(__dirname),
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
      {
        protocol: "https",
        hostname: "randomuser.me",
      },
      {
        protocol: "https",
        hostname: "i.pravatar.cc",
      },
      // TODO(catalog-migration): when catalog is moved to Cloudinary/AWS/S3-compatible
      // storage, add the production image domains here.
      // Example:
      // { protocol: "https", hostname: "res.cloudinary.com", pathname: "/<cloud-name>/**" },
      // { protocol: "https", hostname: "<bucket>.s3.<region>.amazonaws.com" },
    ],
  },
}

export default nextConfig
