---
title: 通过 Rook 接入外部 Ceph 存储
created_at: 2024-11-22
is_public: true
tags:
  - ceph
---

> [!quote] [Import Ceph configuration to the Rook consumer cluster - Rook Ceph Documentation](https://rook.io/docs/rook/latest-release/CRDs/Cluster/external-cluster/consumer-import/#installation-types)

## 从 Ceph 导出配置

一开始遇到了 ACT 实验室集群没有 RBD 的问题，向社区提了 Issue [Suggestion: Make the \`rbd-data-pool-name\` flag optional in \`create-external-cluster-resources.py\` script · Issue #15039 · rook/rook · GitHub](https://github.com/rook/rook/issues/15039)，但短期内是难以解决的。

和沃老师确认后，可以在实验室 Ceph 创建新的 RBD 池。

### Ceph 创建 RBD

> [!quote] 管理节点
>
> ```
> ssh liyilong@192.168.5.241
> ```

查看目前已创建的存储池：

```shell
rados lspools
```

发现没有 RBD，手动创建一个：

```shell
ceph osd pool create crater_rbd # 使用默认的简单配置
rbd pool init crater_rbd
```

### 导出 Ceph 配置

运行脚本导出命令：

```shell
python3 create-external-cluster-resources.py \
--namespace rook-ceph \
--format bash \
--cephfs-metadata-pool-name cephfs_metadata \
--cephfs-filesystem-name act-cephfs \
--rbd-data-pool-name crater_rbd \
--alias-rbd-data-pool-name crater
```

得到了需要的环境变量。

## 在集群安装 Rook

参考 [安装 Rook Ceph](../Helm/%E5%AE%89%E8%A3%85%20Rook%20Ceph.md) 部分，通过 Helm 安装，做好留档。

## 导入外部 Ceph 存储

```shell
$ bash import-external-cluster.sh
cluster namespace rook-ceph already exists
secret/rook-ceph-mon created
configmap/rook-ceph-mon-endpoints created
configmap/external-cluster-user-command created
secret/rook-csi-rbd-node created
secret/rook-csi-rbd-provisioner created
secret/rook-csi-cephfs-node created
secret/rook-csi-cephfs-provisioner created
storageclass.storage.k8s.io/ceph-rbd created
storageclass.storage.k8s.io/cephfs created
```
