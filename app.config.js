export default {
  expo: {
    name: 'GaitInsight',
    slug: 'gaitinsight',
    scheme: 'gaitinsight',
    version: '1.0.0',
    orientation: 'portrait',
    web: {
      bundler: 'metro',
      output: 'static',
      headers: {
        'Cross-Origin-Opener-Policy': 'same-origin-allow-popups'
      }
    }
  }
};
