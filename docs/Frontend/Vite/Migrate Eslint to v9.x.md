---
title: Migrate Eslint to v9.x
created_at: 2024-11-08
is_public: true
tags:
  - frontend
---

## Migrate Your Config File

首先，在你现有的配置文件（`.eslintrc`、`.eslintrc.json`、`.eslintrc.yml`）上使用[配置迁移器](https://npmjs.com/package/@eslint/migrate-config)，如下所示：

```shell
pnpm dlx @eslint/migrate-config .eslintrc.json
```

This will create a starting point for your `eslint.config.js` file but is not guaranteed to work immediately without further modification. It will, however, do most of the conversion work mentioned in this guide automatically.\
这将为您的  `eslint.config.js`  文件创建一个起点，但不能保证无需进一步修改即可立即工作。但是，它将自动完成本指南中提到的大部分转换工作。

## Vite Eslint

> [!NOTE] [Vite React TS](https://github.com/vitejs/vite/pull/12860/files#diff-950973748bff2ec59e433693cdbc86cede712da122a2b35b43fab32db098afa8)

参考文件修改，终于不报错了。
