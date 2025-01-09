---
title: Go 多版本管理
created_at: 2024-11-22
is_public: true
---

> [!quote] [Managing Go installations - The Go Programming Language](https://go.dev/doc/manage-install#installing-multiple)

您可以在同一台计算机上安装多个 Go 版本。例如，您可能希望在多个 Go 版本上测试您的代码。有关您可以通过这种方式安装的版本列表，请参阅下载页面。

```shell
go install golang.org/dl/go1.10.7@latest
go1.10.7 download
```

要使用新下载的版本运行  `go`  命令，请将版本号附加到  `go`  命令，如下所示：

```shell
$ go1.10.7 version
go version go1.10.7 linux/amd64
```

当您安装了多个版本时，您可以发现每个版本的安装位置，查看版本的`GOROOT`值。例如，运行如下命令：

```shell
go1.10.7 env GOROOT
```

要卸载下载的版本，只需删除其  `GOROOT`  环境变量和 goX.Y.Z 二进制文件指定的目录。
