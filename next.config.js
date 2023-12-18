/** @type {import('next').NextConfig} */
const nextConfig = {
  //prevent image tab run time error
  images: {
    remotePatterns: [
        {
          protocol: 'https',
          hostname: 'images.pexels.com',
        },
      ],
  },
};

module.exports = nextConfig;
