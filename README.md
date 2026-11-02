# personal-web

图形 / WebGL 方向的个人图文笔记站。Astro 6 静态站，现在部署在 GitHub Pages，以后迁到 Cloudflare。

## 写文章

每篇文章一个文件夹，图片放在同一个文件夹里：

```
src/content/posts/
└─ my-first-post/
   ├─ index.md
   ├─ cover.jpg
   └─ figure-1.png
```

`index.md` 开头：

```md
---
title: 文章标题
slug: my-first-post        # 网址里用的名字，只用英文、数字、横线
date: 2026-11-02
summary: 一两句话的摘要（首页精选会显示）
tags: [WebGL, Shader]
cover: ./cover.jpg         # 可选
featured: false            # true = 放到首页精选
draft: false               # true = 草稿，不会发布
---

正文用 Markdown。

![图片说明](./figure-1.png)

*图 1　图注写在图片下一行，用星号包起来*
```

**在手机上写**：用 GitHub App 或浏览器打开仓库，进 `src/content/posts/`，新建文件 `文章名/index.md`，图片用 “Add file → Upload files” 传到同一个文件夹。提交后一两分钟网站自动更新。

## 改站名

改 `src/config.ts` 里的 `name`。`noindex: true` 表示不让搜索引擎收录。

## 本地运行

需要 Node 22.12+。

```sh
npm install
npm run dev
```

## 部署

push 到 `main` 后，GitHub Actions 自动构建并发布到 GitHub Pages。

迁到 Cloudflare 或自己的域名时，构建时设置环境变量 `SITE_URL=https://你的域名` 和 `BASE_PATH=/`。
