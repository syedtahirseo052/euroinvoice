/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "**.unsplash.com",
      },
      // Allow any https image URL (for admin-entered images)
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
}

export default nextConfig
