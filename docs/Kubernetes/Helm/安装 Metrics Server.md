---
title: 安装 Metrics Server
created_at: 2024-10-01
is_public: true
tags:
  - helm
  - metrics-server
---

安装 Metrics Server：

```shell
helm repo add metrics-server https://kubernetes-sigs.github.io/metrics-server/
```

允许不安全的 TLS，启用 hostNetwork 模式：

```shell
helm upgrade --install metrics-server metrics-server/metrics-server \
--namespace metrics-server \
--create-namespace \
--set image.repository=crater-harbor.act.buaa.edu.cn/registry.k8s.io/metrics-server/metrics-server \
--set image.tag=v0.7.2 \
--set args={"--kubelet-insecure-tls"} \
--set containerPort=23645 \
--set hostNetwork.enabled=true
```

如需卸载：

```shell
helm uninstall metrics-server -n metrics-server
```
