---
title: 安装 CloudNative PG
created_at: 2024-11-28
is_public: true
---

## 安装

### Operator

```shell
helm repo add cnpg https://cloudnative-pg.github.io/charts

helm upgrade --install cnpg \
  --namespace crater \
  --set config.clusterWide=false \
  cnpg/cloudnative-pg \
  -f values.yaml
```

### DB Cluster

```shell
helm show values cnpg/cluster

helm upgrade --install database \
  --namespace crater \
  cnpg/cluster \
  -f cluster.values.yaml --dry-run
```

## 使用

### 连接到数据库

> [!NOTE] [Connecting from an application - CloudNativePG v1.24](https://cloudnative-pg.io/documentation/current/applications/)

首先查看 Secret 中的账户密码：

```shell
kg secret database-cluster-app -ojson | jq '.data."jdbc-uri"' -r | base64 -D
```
