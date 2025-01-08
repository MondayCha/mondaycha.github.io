---
title: 安装 Rook Ceph
created_at: 2024-11-28
is_public: true
tags:
  - helm
  - ceph
---

## 安装 Rook Ceph

```shell
clusterNamespace=rook-ceph
operatorNamespace=rook-ceph

helm install --create-namespace --namespace $clusterNamespace rook-ceph rook-release/rook-ceph -f rook-ceph.values.yaml
```

## 安装 Rook Ceph Cluster

> [!quote] 外部 Ceph 集群对应的 Values
>
> - [values-external.yaml](https://github.com/rook/rook/blob/v1.15.6/deploy/charts/rook-ceph-cluster/values-external.yaml)

```shell
helm install --create-namespace \
--namespace $clusterNamespace rook-ceph-cluster \
--set operatorNamespace=$operatorNamespace \
rook-release/rook-ceph-cluster \
-f rook-ceph-cluster.values-external.yaml
```
