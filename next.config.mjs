/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ucarecdn.com"
      },
      {
        protocol: "https",
        hostname: "picsum.photos"
      },
      {
        protocol: "https",
        hostname: "encrypted-tbn0.gstatic.com"
      },
      {
        protocol: "https",
        hostname: "images.ui8.net"
      },
    ]
  }
};

export default nextConfig;
