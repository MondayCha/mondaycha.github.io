---
title: 安装 MetalLB
created_at: 2024-11-21
is_public: true
tags:
  - helm
  - ingress
---

## 安装 MetalLB

### 通过 Helm 安装

> [!quote] MetalLB
>
> - [Installation :: MetalLB, bare metal load-balancer for Kubernetes](https://metallb.universe.tf/installation/#installation-with-helm)

```shell
helm repo add metallb https://metallb.github.io/metallb

helm upgrade --install metallb metallb/metallb \
-f values.yaml \
--namespace metallb-system \
--create-namespace \
--version v0.14.8
```

### 配置 IP 地址池并广播通告集群

> [!quote]
>
> - [15 分钟部署 kubernetes+Metallb+Ingress-nginx+Rancher15 分钟部署 Kuberne - 掘金](https://juejin.cn/post/7236668895866929189)

```yaml
apiVersion: metallb.io/v1beta1
kind: IPAddressPool
metadata:
  name: ip-pool
  namespace: metallb-system
spec:
  addresses:
  - 192.168.5.35-192.168.5.50
---
apiVersion: metallb.io/v1beta1
kind: L2Advertisement
metadata:
  name: l2adver
  namespace: metallb-system
```

## MetalLB 工作原理

> [!quote] [Site Unreachable](https://www.lixueduan.com/posts/cloudnative/01-metallb/)
