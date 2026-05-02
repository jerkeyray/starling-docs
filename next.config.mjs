import { createMDX } from 'fumadocs-mdx/next';

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/docs/mcp',
        destination: '/docs/mcp-tools',
        permanent: true,
      },
    ];
  },
};

export default withMDX(config);
