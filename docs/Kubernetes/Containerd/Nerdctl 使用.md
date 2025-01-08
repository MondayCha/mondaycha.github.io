---
title: Nerdctl 使用
created_at: 2024-12-10
is_public: true
tags:
  - nerdctl
---

安装脚本：

```shell
export https_proxy=192.168.5.58:1080

wget https://github.com/containerd/nerdctl/releases/download/v2.0.1/nerdctl-2.0.1-linux-amd64.tar.gz

tar -zxf nerdctl-2.0.1-linux-amd64.tar.gz nerdctl

sudo mv nerdctl /usr/bin/nerdctl

rm nerdctl-2.0.1-linux-amd64.tar.gz
```

查看所有的 Container：

```shell
nerdctl -n k8s.io ps
```

测试 `commit` 一个镜像：

```shell
# 根据 Name 获取 Container ID
$ nerdctl --namespace=k8s.io ps -f name=k8s://crater/crater-web-backend-666698848f-lnd75/crater-web-backend-container
CONTAINER ID    IMAGE                                                        COMMAND                   CREATED        STATUS    PORTS    NAMES
9d836deb9b76    crater-harbor.act.buaa.edu.cn/crater/web-backend:c918c9a5    "/controller --confi…"    6 hours ago    Up                 k8s://crater/crater-web-backend-666698848f-lnd75/crater-web-backend-container

# 基于 Container ID 提交镜像
$ nerdctl --namespace=k8s.io commit 9d836deb9b76 crater-harbor.act.buaa.edu.cn/user-liyilong/test-nerdctl-commit:v0.1
WARN[0000] Image lacks label "nerdctl/platform", assuming the platform to be "linux/amd64"
sha256:33da869f4b2e15df541e7c5f764dee8883b49cb488f5a81dff12a5ca2ee6d771

# 登录到 Harbor
$nerdctl login crater-harbor.act.buaa.edu.cn

# 推送镜像
$nerdctl -n k8s.io push crater-harbor.act.buaa.edu.cn/user-liyilong/test-nerdctl-commit:v0.1

# 删除镜像
$ nerdctl -n k8s.io rmi crater-harbor.act.buaa.edu.cn/user-liyilong/test-nerdctl-commit:v0.1
Untagged: crater-harbor.act.buaa.edu.cn/user-liyilong/test-nerdctl-commit:v0.1@sha256:6a415ee6e8b475feb2009eee009e1a2a6abab8ba5c89289185e3928b108cd961
Deleted: sha256:d4fc045c9e3a848011de66f34b81f052d4f2c15a17bb196d637e526349601820
Deleted: sha256:a6208286c67eadf000a30f4ae76cb6d2ecc776299c69dd26841c95d8d48fc321
Deleted: sha256:8697e3eee0592402d8cf4cab3c16ebad8b3349e5cb8411c12b589b12f74461e1
```

测试在 Pod 中进行：

```shell
# 根据 Name 获取 Container ID
$ nerdctl -n k8s.io ps -f name=k8s://crater-workspace/jupyter-liyilong-f2e0e-default0-0/jupyter-notebook --size
CONTAINER ID    IMAGE                                                                         COMMAND                   CREATED         STATUS    PORTS    NAMES                                                                        SIZE
1ea76219e161    crater-harbor.act.buaa.edu.cn/docker.io/jupyter/base-notebook:ubuntu-22.04    "bash -c start.sh ju…"    13 hours ago    Up                 k8s://crater-workspace/jupyter-liyilong-f2e0e-default0-0/jupyter-notebook    10.0 GiB (virtual 11.1 GiB)

# 基于 Container ID 提交镜像
$ nerdctl --namespace=k8s.io commit 1ea76219e161 crater-harbor.act.buaa.edu.cn/user-liyilong/vllm:v0.1
WARN[0000] Image lacks label "nerdctl/platform", assuming the platform to be "linux/amd64" 
sha256:432db5cde80a76904e937524aee4787c4aed9bb992d1a2f8ef99afbbd2b601a8

# 登录到 Harbor
$nerdctl login crater-harbor.act.buaa.edu.cn

# 推送镜像
$nerdctl -n k8s.io push crater-harbor.act.buaa.edu.cn/user-liyilong/vllm:v0.1

# 删除镜像
$ nerdctl -n k8s.io rmi crater-harbor.act.buaa.edu.cn/user-liyilong/test-nerdctl-commit:v0.1
Untagged: crater-harbor.act.buaa.edu.cn/user-liyilong/test-nerdctl-commit:v0.1@sha256:6a415ee6e8b475feb2009eee009e1a2a6abab8ba5c89289185e3928b108cd961
Deleted: sha256:d4fc045c9e3a848011de66f34b81f052d4f2c15a17bb196d637e526349601820
Deleted: sha256:a6208286c67eadf000a30f4ae76cb6d2ecc776299c69dd26841c95d8d48fc321
Deleted: sha256:8697e3eee0592402d8cf4cab3c16ebad8b3349e5cb8411c12b589b12f74461e1
```
