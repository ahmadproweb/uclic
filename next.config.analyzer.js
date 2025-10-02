
const { BundleAnalyzerPlugin } = require('@next/bundle-analyzer');

const withBundleAnalyzer = BundleAnalyzerPlugin({
  enabled: process.env.ANALYZE === 'true',
  openAnalyzer: false,
  analyzerMode: 'static',
  reportFilename: './bundle-analysis.html'
});

module.exports = withBundleAnalyzer;
