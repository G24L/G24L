/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  reactStrictMode: true,
  compress: true,
  swcMinify: true,
  transpilePackages: ['react-markdown', 'remark-gfm', 'remark-parse', 'unified', 'bail', 'is-plain-obj', 'trough', 'vfile', 'unist-util-stringify-position', 'micromark', 'decode-named-character-reference', 'character-entities', 'remark-rehype', 'rehype-stringify', 'hast-util-to-html', 'unist-util-visit', 'unist-util-is'],
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.sanity.io',
      },
    ],
  },
};

module.exports = nextConfig;
