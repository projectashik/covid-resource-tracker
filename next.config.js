const withPWA = require('next-pwa');

module.exports = withPWA({
  reactStrictMode: true,
  images: {
    domains: ['disease.sh'],
  },
  pwa: {
    dest: 'public',
    register: true,
    skipWaiting: true,
  },
});
