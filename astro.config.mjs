// @ts-check
import { defineConfig } from 'astro/config';

// GitHub Pages: https://qq245562635.github.io/personal-web/
// 以后换到 Cloudflare / 自己的域名时，设置环境变量 SITE_URL 和 BASE_PATH=/ 即可。
const site = process.env.SITE_URL ?? 'https://qq245562635.github.io';
const base = process.env.BASE_PATH ?? '/personal-web';

export default defineConfig({
  site,
  base,
  trailingSlash: 'ignore',
  markdown: {
    shikiConfig: {
      theme: 'github-light',
      wrap: false,
    },
  },
});
