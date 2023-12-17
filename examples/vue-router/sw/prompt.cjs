/** @type {import('workbox-build').InjectManifestOptions} */
module.exports = {
  swSrc: 'sw/prompt-sw.js',
  globDirectory: 'dist/',
  globPatterns: [
    '**/*.{css,html,png,svg,ico,js}',
  ],
  swDest: 'dist/sw.js',
}
