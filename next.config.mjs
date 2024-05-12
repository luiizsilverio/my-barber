/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { hostname: 'github.com' },
      { hostname: 'utfs.io' },
      { hostname: 'img.freepik.com' }
    ]
  }
};

export default nextConfig;
