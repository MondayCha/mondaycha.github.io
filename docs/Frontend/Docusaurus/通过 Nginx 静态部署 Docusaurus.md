---
title: 通过 Nginx 静态部署 Docusaurus
created_at: 2025-04-24
is_public: true
---

> [!NOTE] [Serving Docusaurus from Nginx with baseUrl · facebook/docusaurus · Discussion #10827 · GitHub](https://github.com/facebook/docusaurus/discussions/10827)

## 背景

Serving Docusaurus from Nginx with baseUrl.

## 解决方案

```nginx
  server {
    listen 80;

    location /website/ {
        alias /usr/share/nginx/html/;
        index index.html;
        try_files $uri $uri/ /index.html;
    }
    location /website {
        return 301 /website/;
    }
  }
```
