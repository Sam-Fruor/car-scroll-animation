/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true, // GitHub Pages doesn't support Next.js server-side image optimization
  },
  // IMPORTANT: If your GitHub repo is named "car-scroll-animation", uncomment the line below:
  basePath: '/car-scroll-animation', 
};

export default nextConfig;