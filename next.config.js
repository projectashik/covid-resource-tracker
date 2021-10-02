const withPWA = require('next-pwa');

module.exports = withPWA({
  reactStrictMode: true,
  images: {
    domains: ['disease.sh', 'countryflags.io'],
  },
  pwa: {
    dest: 'public',
    register: true,
    skipWaiting: true,
  },
});
