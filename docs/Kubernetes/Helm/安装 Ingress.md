---
title: 安装 Ingress
created_at: 2024-10-01
is_public: true
tags:
  - helm
  - ingress
---

## 安装

```shell
helm repo add ingress-nginx https://kubernetes.github.io/ingress-nginx
```

> [!todo]
>
> 1. 应该指定版本
> 1. 需要修改节点名称、IP 等

### 没有 LoadBalancer

只能使用 hostNetwork.

```shell
helm upgrade --install ingress-nginx ingress-nginx \
--repo https://kubernetes.github.io/ingress-nginx \
--namespace ingress-nginx \
--create-namespace \
--set controller.image.registry="crater-harbor.act.buaa.edu.cn/registry.k8s.io" \
--set controller.admissionWebhooks.patch.image.registry="crater-harbor.act.buaa.edu.cn/registry.k8s.io" \
--set 'controller.nodeSelector.kubernetes\.io\/hostname=cnode1' \
--set "controller.tolerations=" \
--set controller.dnsPolicy=ClusterFirstWithHostNet \
--set controller.hostNetwork=true \
--set controller.healthCheckHost="10.109.80.4"
# --set "controller.tolerations[0].key=node-role.kubernetes.io/control-plane"
# --set "controller.tolerations[0].effect=NoSchedule" \
# --set "controller.tolerations[0].operator=Exists"
```

### 有 LoadBalancer

ACT-GPU 集群配置了 MetalLB。

```yaml
helm upgrade --install ingress-nginx ingress-nginx/ingress-nginx \
--namespace ingress-nginx \
--create-namespace \
--set controller.image.registry="crater-harbor.act.buaa.edu.cn/registry.k8s.io" \
--set controller.admissionWebhooks.patch.image.registry="crater-harbor.act.buaa.edu.cn/registry.k8s.io" \
--set controller.allowSnippetAnnotations=true
```

安装效果：

```shell
$ helm list
NAME            NAMESPACE       REVISION        UPDATED                                 STATUS          CHART                   APP VERSION
ingress-nginx   ingress-nginx   1               2024-11-22 00:14:58.367491 +0800 CST    deployed        ingress-nginx-4.11.3    1.11.3
```

## 卸载

```shell
helm uninstall ingress-nginx -n ingress-nginx
```
