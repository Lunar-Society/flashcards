/** @type {import('next').NextConfig} */
const nextConfig = {
  // The review editor's preview (SHOW_DRAFTS=1) renders on demand, so new
  // reviews show up without restarting it.
  output: process.env.SHOW_DRAFTS === '1' ? undefined : 'export',
  images: { unoptimized: true },
  trailingSlash: true,
};

module.exports = nextConfig;
