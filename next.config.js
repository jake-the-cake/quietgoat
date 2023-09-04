/** @type {import('next').NextConfig} */
const nextConfig = {
	experimental: {
    serverActions: true,
    // esmExternals: "loose", // <-- add this
    // serverComponentsExternalPackages: ["mongoose"] // <-- and this
  },
  // webpack: (config) => {
  //   config.experiments = {
  //     topLevelAwait: true
  //   };
  //   return config;
  // },
}

module.exports = nextConfig
