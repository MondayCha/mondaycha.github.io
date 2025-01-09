---
title: Go 环境配置
created_at: 2025-01-09
is_public: true
---

## Go 环境配置

```shell
uname -a
# install
# Go: https://go.dev/doc/install
rm -rf /usr/local/go
wget -qO- https://go.dev/dl/go1.20.11.linux-amd64.tar.gz | sudo tar xz -C /usr/local
sudo apt-get install build-essential
# ~/.bashrc
export PATH=$PATH:/usr/local/go/bin
# test
go version
# source
# Goproxy.cn: https://goproxy.cn/
go env -w GO111MODULE=on
go env -w GOPROXY=https://goproxy.cn,direct
```

## VSCode 语法高亮

> [2023 MIT 6.5840 分布式系统 | 环境搭建与 Lab 1 MapReduce - 知乎](https://zhuanlan.zhihu.com/p/625866338)

在 VSCode 中，默认的 Go 语法高亮不能很好地显示自定义类型，可以参考  [[vscode-go] docs: mention advanced semantic token options](https://link.zhihu.com/?target=https%3A//groups.google.com/g/golang-checkins/c/TwJ1wuX_8-o%3Fpli%3D1)，启用由 gopls 包提供的更准确的高亮。

```json
// settings.json
{
    // ...
    "gopls": {
        "ui.semanticTokens": true,
        "ui.noSemanticString": true, // delegates string syntax highlighting to vscode
        "ui.noSemanticNumber": true, // delegates number syntax highlighting to vscode
    },
}
```
