---
title: Docusaurus 联动 Obsidian
created_at: 2024-11-03
is_public: true
tags:
  - docusaurus
  - obsidian
  - frontend
---

关于 Obsidian 如何与 Docusaurus 联动的思考。

## 现有方案

> [!quote]
>
> - [Hello from Obsidiosaurus | Obsidiosaurus](https://cimsta.github.io/obsidiosaurus-docs/)
> - [Setup · chanjunren/vaultusaurus Wiki · GitHub](https://github.com/chanjunren/vaultusaurus/wiki/Setup)

总体上有两种思路：

### Obsidiosaurus

把 Obsidian 的 Markdown 语法翻译成 Docusaurus 的 MDX 语法，并进一步支持 Excaildraw 等特殊组件。但对 Obsidian Vault 有一系列要求：

- 链接使用绝对路径
- 所有 Assets 必须位于根目录
- ...

### Vaultusaurus

为 Docusaurus 添加插件，以适配 Obsidian 风格。

- 非常具有个人色彩
- 上手文档目前不是很清晰，但直接抄作者的项目又良心有愧
- Docusaurus 已经有根据标签进行索引的功能，但作者又重新开发了基于标签的关系图谱插件，虽然效果非常炫酷，但并不是那么必须的

## 可行性分析

> [!abstract]
> 如果要自己重新开发的话，必要性在哪，如何实现

### 为什么还要自己造轮子？

1. 现在有 AI 了，开发程序应该会比之前更加简单
1. 我基本不用 Excaildraw 等等，需要双向链接、标签、SEO 优化这些功能，同时我可以通过 Templater 确保自己的文档界面格式相对统一，因此自己开发应该是可行的

### 如何在 Obsidian 中操作主机的其他文件？

> [!quote] [How can I execute an external command and return results to Obsidian? - Help - Obsidian Forum](https://forum.obsidian.md/t/how-can-i-execute-an-external-command-and-return-results-to-obsidian/48249)

感觉上是非常危险的行为，但似乎真的可行。

### 如何解析 Markdown 格式语法

> [!quote]
>
> - [pulldown-cmark](https://github.com/pulldown-cmark/pulldown-cmark)
> - [GitHub - kivikakk/comrak: CommonMark + GFM compatible Markdown parser and renderer](https://github.com/kivikakk/comrak)
> - [GitHub - wooorm/markdown-rs: CommonMark compliant markdown parser in Rust with ASTs and extensions](https://github.com/wooorm/markdown-rs)

也许可以考虑使用 Rust 的这些库，但对于 Wiki 语法似乎都不支持，后续可能需要：

1. 切分元数据和正文 Markdown 部分
1. 对元数据，采用 Yaml 解析，特殊处理 title 等字段，对空数组则附上默认值
1. 对正文，则把 Callout 等内容转换为 MDX 中的格式，并考虑对 Wiki、附件的处理
