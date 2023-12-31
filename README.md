<p align='center'>
ESM build of [workbox-window](https://www.npmjs.com/package/workbox-window).
</p>
<p align='center'>
<a href='https://www.npmjs.com/package/@vite-pwa/workbox-window' target="__blank">
<img src='https://img.shields.io/npm/v/@vite-pwa/workbox-window?color=33A6B8&label=' alt="NPM version">
</a>
<a href="https://www.npmjs.com/package/@vite-pwa/workbox-window" target="__blank">
    <img alt="NPM Downloads" src="https://img.shields.io/npm/dm/@vite-pwa/workbox-window?color=476582&label=">
</a>
<a href="https://developers.google.com/web/tools/workbox/modules/workbox-window" target="__blank">
    <img src="https://img.shields.io/static/v1?label=&message=docs%20%26%20guides&color=2e859c" alt="Docs & Guides">
</a>
<br>
<a href="https://github.com/vite-pwa/workbox-window" target="__blank">
<img alt="GitHub stars" src="https://img.shields.io/github/stars/vite-pwa/workbox-window?style=social">
</a>
</p>

<br>

<p align="center">
  <a href="https://cdn.jsdelivr.net/gh/antfu/static/sponsors.svg">
    <img src='https://cdn.jsdelivr.net/gh/antfu/static/sponsors.svg'/>
  </a>
</p>


## 🚀 Features

- 📖 [**Documentation & guides**](https://vite-pwa-org.netlify.app/)
- 👌 **Zero-Config**: sensible built-in default configs for common use cases
- 🔩 **Extensible**: expose the full ability to customize the behavior of the plugin
- 🦾 **Type Strong**: written in [TypeScript](https://www.typescriptlang.org/)
- 🔌 **Offline Support**: generate service worker with offline support (via Workbox)
- ⚡ **Fully tree shakable**: auto-inject Web App Manifest
- 💬 **Prompt for new content**: built-in support for Vanilla JavaScript, Vue 3, React, Svelte, SolidJS and Preact
- ⚙️ **Stale-while-revalidate**: automatic reload when new content is available
- ✨ **Static assets handling**: configure static assets for offline support
- 🐞 **Development Support**: debug your custom service worker logic as you develop your application
- 🛠️ **Versatile**: integration with meta-frameworks: [îles](https://github.com/ElMassimo/iles), [SvelteKit](https://github.com/sveltejs/kit), [VitePress](https://github.com/vuejs/vitepress), [Astro](https://github.com/withastro/astro), and [Nuxt 3](https://github.com/nuxt/nuxt)
- 💥 **PWA Assets Generator**: generate all the PWA assets from a single command and a single source image

## Original works

ESM build of [workbox-window](https://www.npmjs.com/package/workbox-window).

This module's documentation can be found at https://developers.google.com/web/tools/workbox/modules/workbox-window.

`@vite-pwa/workbox-window` includes missing `installing` event in `Workbox` class.

## 📦 Install

```sh
# pnpm
pnpm add @vite-pwa/workbox-window

# npm
npm i @vite-pwa/workbox-window

# yarn
yarn add @vite-pwa/workbox-window
```

## 🦄 Usage

```js
// ESM
import { Workbox } from '@vite-pwa/workbox-window'
```

```js
// CommonJS
const { Workbox } = require('@vite-pwa/workbox-window')
```

## License

[MIT](./LICENSE)

