const nextConfig = {
  images: {
    domains: [
      "127.0.0.1",
      "localhost",
      "scontent.cdninstagram.com",
      "scontent-iad3-1.cdninstagram.com",
      "scontent-iad3-2.cdninstagram.com",
      "graph.instagram.com",
      "instagram.com",
      "instagram.fbom1-2.fna.fbcdn.net",
      "instagram.fbom1-1.fna.fbcdn.net",
      "scontent.cdninstagram.com",
      "cdninstagram.com",
      "scontent-ams2-1.cdninstagram.com",
      "scontent-ams4-1.cdninstagram.com",
      "scontent-lhr8-1.cdninstagram.com",
      "scontent-lhr8-2.cdninstagram.com",
      "scontent-fra3-1.cdninstagram.com",
      "scontent-fra3-2.cdninstagram.com",
      "scontent-fra5-1.cdninstagram.com",
      "scontent-fra5-2.cdninstagram.com",
      "scontent-lax3-1.cdninstagram.com",
      "scontent-lax3-2.cdninstagram.com",
      "video.cdninstagram.com",
      "instagram.fhkg4-1.fna.fbcdn.net",
      "instagram.fhkg4-2.fna.fbcdn.net",
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.cdninstagram.com",
      },
      {
        protocol: "https",
        hostname: "**.fbcdn.net",
      },
      {
        protocol: "https",
        hostname: "instagram.com",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Referrer-Policy",
            value: "no-referrer-when-downgrade",
          },
        ],
      },
    ];
  },
  webpack(config, { isServer }) {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        dns: false,
        net: false,
        hexoid: false,
      };
    }

    // Grab the existing rule that handles SVG imports
    const fileLoaderRule = config.module.rules.find((rule) =>
      rule.test?.test?.(".svg")
    );

    config.module.rules.push(
      // Reapply the existing rule, but only for svg imports ending in ?url
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/, // *.svg?url
      },
      // Convert all other *.svg imports to React components
      {
        test: /\.svg$/i,
        issuer: fileLoaderRule.issuer,
        resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] }, // exclude if *.svg?url
        use: ["@svgr/webpack"],
      }
    );

    // Modify the file loader rule to ignore *.svg, since we have it handled now.
    fileLoaderRule.exclude = /\.svg$/i;

    return config;
  },
};

module.exports = nextConfig;
