---
title: Helm 的使用
created_at: 2024-11-03
is_public: true
tags:
  - helm
  - ai-assisted
---

## 安装 Helm

### Mac

通过 `brew install helm` 安装即可。

### Linux

Binary downloads of the Helm client can be found on [the Releases page](https://github.com/helm/helm/releases/latest) .

```bash
curl -LO https://get.helm.sh/helm-v3.14.4-linux-amd64.tar.gz
```

之后解压文件：

```bash
tar -zxvf helm-v3.14.4-linux-amd64.tar.gz
```

将 Helm 可执行文件移动到一个你希望存放可执行文件的目录，比如 `/usr/local/bin`：

```bash
sudo mv linux-amd64/helm /usr/local/bin/helm
```

确保 `/usr/local/bin` 在你的 PATH 中（一般都在）。你可以在 `.bashrc` 或 `.zshrc` 文件中添加如下行：

```bash
export PATH=$PATH:/usr/local/bin
```

## Helm 运行时警告

看起来您遇到了两个警告：Kubernetes 配置文件具有不安全的权限设置。为了解决这个问题，您可以执行以下步骤：

1. **更改文件权限**：您需要将 Kubernetes 配置文件的权限设置为仅对您自己可读写。您可以使用 `chmod` 命令来更改文件权限。在这种情况下，您可以运行以下命令：

```bash
chmod 600 /home/crater/.kube/config
```

这会将文件权限设置为仅对所有者可读可写，而不允许组或其他用户读取或写入该文件。

2. **确认权限**：在更改权限后，您可以再次运行 `helm version` 命令，以确保不再显示警告。

1. **检查文件权限**：您可以再次运行 `ls -l /home/crater/.kube/config` 来验证权限是否正确更改。

这些步骤将帮助您解决警告并提高您的 Kubernetes 配置文件的安全性。

## Helm 常见命令

### 环境准备

#### 1. Helm 使用代理

需要把 Kubernetes Api Server 的域名加入到 `no_proxy` 中。

```shell
export https_proxy=
export no_proxy=
```

### 安装应用

#### 2. 添加 Chart 仓库

```bash
helm repo add <repo-name> <repo-url>
```

例如，添加官方的 Helm 仓库：

```bash
helm repo add stable https://charts.helm.sh/stable
```

#### 3. 搜索 Chart 版本信息

```bash
helm search repo <keyword>
```

例如，搜索包含 `metallb` 的 Chart：

```bash
$ helm search repo metallb
NAME            CHART VERSION   APP VERSION     DESCRIPTION
metallb/metallb 0.14.8          v0.14.8         A network load-balancer implementation for Kube...
```

结果会包含 Chart Version 信息，在安装的时候最好指定 Version，便于后续复现。

#### 4. 获取 Chart 的详细信息

```bash
helm show <chart-type> <chart>
```

常用的 `<chart-type>` 包括：

- `chart`: 显示 Chart 的基本信息
- `values`: 显示 Chart 的默认值

例如，获取指定版本的 `metallb` 的基本信息：

```shell
helm show chart metallb/metallb --version 0.14.8
helm show values metallb/metallb --version 0.14.8
```

为了自定义安装内容，我们可以对 `values` 输出进行重定向，保存为文件：

```shell
helm show values metallb/metallb --version 0.14.8 > values.yaml
```

之后结合自己的需求，修改 `values.yaml` 中的内容。

#### 5. 渲染 Helm Chart 的模板

```bash
helm template <release-name> <chart>
```

用于渲染 Helm Chart 的模板，而不实际部署。

例如：

```shell
helm template metallb metallb/metallb -f values.yaml
```

#### 6. 安装常用参数

默认情况下，安装的命令如下：

```bash
helm install <release-name> <chart> [flags]
```

例如，安装一个名为 `my-release` 的 Chart：

```bash
helm install my-release stable/mysql
```

然而，这种方式并不适合需要更新的情况。先卸载再更新对于某些场景则影响非常大（如 Volcano 卸载会删除所有 Queue 以及 VcJob），更推荐先进行 Dry Run，并通过升级的形式安装：

```shell
helm upgrade --install metallb metallb/metallb --dry-run
```

这样能看到安装的输出文件，并对比看看自己对 Values 的改动是否体现。

在此基础上，可以指定命名空间，否则会用 Default 或者当前 Context 的命名空间。

```shell
helm upgrade --install metallb metallb/metallb \
-f values.yaml \
--namespace metallb-system \
--create-namespace \
--version v0.14.8 \
--dry-run
```

指定版本、`values.yaml` 文件的位置。

#### 7. 安装 Chart

完成上述准备工作后，我们可以正式安装 Chart 了：

```shell
$ helm upgrade --install metallb metallb/metallb \
-f values.yaml \
--namespace metallb-system \
--create-namespace \
--version v0.14.8

Release "metallb" does not exist. Installing it now.
NAME: metallb
LAST DEPLOYED: Thu Nov 21 22:56:21 2024
NAMESPACE: metallb-system
STATUS: deployed
REVISION: 1
TEST SUITE: None
NOTES:
MetalLB is now running in the cluster.

Now you can configure it via its CRs. Please refer to the metallb official docs
on how to use the CRs.
```

### 检查与维护

#### 8. 列出已安装的 Releases

```bash
helm list [flags]
```

需要注意的是，区分命名空间。例如：

```shell
$ helm list -n metallb-system
NAME    NAMESPACE       REVISION        UPDATED                                 STATUS          CHART           APP VERSION
metallb metallb-system  1               2024-11-21 22:56:21.27273 +0800 CST     deployed        metallb-0.14.8  v0.14.8
```

可以看到刚才成功安装了 MetalLB。

#### 9. 查看 Release 的详细信息

```bash
helm status <release-name>
```

#### 10. 升级 Release

```bash
helm upgrade <release-name> <chart> [flags]
```

例如，升级 `my-release`：

```bash
helm upgrade my-release stable/mysql
```

#### 11. 卸载 Release

```bash
helm uninstall <release-name> [flags]
```

例如，卸载 `my-release`：

```bash
helm uninstall my-release
```

#### 12. 更新 Chart 仓库

```bash
helm repo update
```

### 制作应用

#### 13. 生成 Chart

```bash
helm create <chart-name>
```

用于创建一个新的 Helm Chart 模板。
