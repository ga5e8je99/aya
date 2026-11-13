/** @type {import('next').NextConfig} */
const isGithubActions = process.env.GITHUB_ACTIONS === 'true';

const nextConfig = {
  // Only apply static export & /aya basePath when running in GitHub Actions for GitHub Pages
  ...(isGithubActions && {
    output: 'export',
    basePath: '/aya',
    trailingSlash: true,
  }),
  images: {
    unoptimized: true,
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
  },
  compress: true,
};

export default nextConfig;
