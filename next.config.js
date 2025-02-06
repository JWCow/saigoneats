/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Specify directories to lint during production builds
    dirs: ['src/app', 'src/components', 'src/lib'],
  },
  reactStrictMode: true,
};

module.exports = nextConfig;
