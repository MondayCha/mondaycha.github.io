---
title: Docusaurus 配置
created_at: 2024-11-03
is_public: true
tags:
  - docusaurus
  - frontend
---

## Docusaurus 配置

> [!NOTE] [安装流程 | Docusaurus](https://docusaurus.io/zh-CN/docs/installation)

### 1. 初始化

```shell
npm install -g pnpm

pnpm dlx create-docusaurus@latest liyilog classic
```

### 2. 快速启动

Docusaurus 已经提供了模板，只需要几行命令就能快速启动网站：

```shell
[SUCCESS] Created liyilog.
[INFO] Inside that directory, you can run several commands:

  `pnpm start`
    Starts the development server.

  `pnpm build`
    Bundles your website into static files for production.

  `pnpm serve`
    Serves the built website locally.

  `pnpm deploy`
    Publishes the website to GitHub pages.

We recommend that you begin by typing:

  `cd liyilog`
  `pnpm start`

Happy building awesome websites!
```

部署完成后，如果 3000 端口没有被占用，那么访问 [localhost:3000](localhost:3000) 就能看到提供的模板页面了。

## 结合 TailwindCSS

> [!NOTE]
>
> - [Open-sourcing our progress on Tailwind CSS v4.0 - Tailwind CSS](https://tailwindcss.com/blog/tailwindcss-v4-alpha)
> - [New Tailwind theme · Issue #2961 · facebook/docusaurus · GitHub](https://github.com/facebook/docusaurus/issues/2961)
> - [Site Unreachable](https://medium.com/@bargadyahmed/docusaurus-a-guide-to-seamless-integration-with-tailwind-css-dd202211caac)

安装 TailwindCSS：

```shell
pnpm add -D tailwindcss postcss autoprefixer
pnpm dlx tailwindcss init
```

## Obsidian to Docusaurus
