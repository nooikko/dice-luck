module.exports = {
  reactStrictMode: true,
  webpack: (config) => {

    config.module.rules.push({
      test: /\.gql$/,
      use: 'graphql-tag/loader',
      exclude: /node_modules/
    });

    return config;
  },
}
