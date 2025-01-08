---
title: 无法通过 Provisioner 动态创建 Ceph PVC
created_at: 2025-01-04
is_public: true
tags:
  - bug
  - ceph
---

## 问题描述

之前按照 [通过 Rook 接入外部 Ceph 存储](%E9%80%9A%E8%BF%87%20Rook%20%E6%8E%A5%E5%85%A5%E5%A4%96%E9%83%A8%20Ceph%20%E5%AD%98%E5%82%A8.md) 一文，将外部的 Ceph 集群接入到了 Kubernetes 中。接入后，会在集群内创建文件存储和块存储的 StorageClass：

```shell
$ kubectl get storageclass
NAME               PROVISIONER                     RECLAIMPOLICY   VOLUMEBINDINGMODE      ALLOWVOLUMEEXPANSION   AGE
openebs-hostpath   openebs.io/local                Delete          WaitForFirstConsumer   false                  32d
rook-ceph-rbd      rook-ceph.rbd.csi.ceph.com      Delete          Immediate              true                   120m
rook-cephfs        rook-ceph.cephfs.csi.ceph.com   Delete          Immediate              true                   120m
```

当通过 `rook-ceph-rbd` 存储类创建 PVC 时，没有问题。

```shell
$ k apply -f cephrbd-test.yaml
persistentvolumeclaim/test created
pod/incoming-rw-pvc-test created
$ kg pvc
NAME   STATUS   VOLUME                                     CAPACITY   ACCESS MODES   STORAGECLASS    VOLUMEATTRIBUTESCLASS   AGE
test   Bound    pvc-93b7ff35-a122-471e-8787-f1cd09829494   10Gi       RWO            rook-ceph-rbd   <unset>                 2s
```

然而，通过 `rook-cephfs` 存储类创建 PVC 时，PVC 将一直等待：

```shell
$ k apply -f cephfs-test.yaml
persistentvolumeclaim/test created
pod/incoming-rw-pvc-test created
$ kg pvc
NAME   STATUS    VOLUME   CAPACITY   ACCESS MODES   STORAGECLASS   VOLUMEATTRIBUTESCLASS   AGE
test   Pending                                      rook-cephfs    <unset>                 2s
```

Kubernetes 的 Rook 组件中，Provisioner 负责基于 PVC，动态向 Ceph 请求 SubVolume 并创建 PV 并绑定，查看 Provisioner 的日志：

```shell
$ k logs -l app=csi-cephfsplugin-provisioner -c csi-provisioner
I1228 15:47:54.326526       1 csi-provisioner.go:154] Version: v5.0.1
I1228 15:47:54.326681       1 csi-provisioner.go:177] Building kube configs for running in cluster...
I1228 15:47:55.330379       1 common.go:143] "Probing CSI driver for readiness"
I1228 15:47:55.339990       1 csi-provisioner.go:302] CSI driver does not support PUBLISH_UNPUBLISH_VOLUME, not watching VolumeAttachments
I1228 15:47:55.342207       1 leaderelection.go:250] attempting to acquire leader lease rook-ceph/rook-ceph-cephfs-csi-ceph-com...
E0104 14:21:37.300890       1 controller.go:974] error syncing claim "9afaaf3e-7465-4b98-ae40-5546660af5fc": failed to provision volume with StorageClass "rook-cephfs": rpc error: code = Internal desc = rados: ret=-1, Operation not permitted
I0104 14:21:37.300947       1 event.go:389] "Event occurred" object="rook-ceph/test" fieldPath="" kind="PersistentVolumeClaim" apiVersion="v1" type="Warning" reason="ProvisioningFailed" message="failed to provision volume with StorageClass \"rook-cephfs\": rpc error: code = Internal desc = rados: ret=-1, Operation not permitted"
```

看起来问题和权限有关。

## 相关资料

在搜索的过程中，我主要分成了两部分来源：来自 Ceph-CSI 项目，以及 Rook 项目。

> [!quote] 相关资料
>
> ### Ceph-CSI
>
> - [Can't dynamic create PersistentVolume after PVC created. Operation not permitted](https://github.com/ceph/ceph-csi/issues/904)
> - [Operation not permitted 的搜索结果](https://github.com/ceph/ceph-csi/issues?q=Operation%20not%20permitted)
>
> ### Rook
>
> - [Users created by create-external-cluster-resources.py --restricted-auth-permissions won't work for CephFS](https://github.com/rook/rook/issues/9227)

主要提到和 Ceph Auth 用户有关。其中 Ceph-CSI 的讨论要多很多，因为 Ceph-CSI 的文档太烂了，Rook 提供了一个自动化脚本，Ceph 则在一个很不起眼的文档里说了需要手动创建哪些用户。

看来是 Rook 的脚本在我们的 Ceph 集群环境下不能正常工作，那么我们的集群有什么特殊之处呢？

## 尝试解决

### 1. 增加 Provisioner 用户权限

Rook 的迁移脚本会自动创建多个 CSI 相关的 Ceph 用户，其中负责创建 PVC 的 Provisioner 的权限如下：

```shell
$ ceph auth get client.csi-cephfs-provisioner
[client.csi-cephfs-provisioner]
        key = XXXX==
        caps mds = "allow *"
        caps mgr = "allow rw"
        caps mon = "allow r, allow command 'osd blocklist'"
        caps osd = "allow rw tag cephfs metadata=*"
```

将权限扩大到 Admin 似乎并不影响，现有的权限已经挺大的了。

### 2. 应用程序标记没有在文件系统的数据和元数据池上正确设置

> [!quote] https://github.com/ceph/ceph-csi/issues/4962

首先，参考 [My guess is that the application tags weren't properly set on the file system's data and metadata pools](https://github.com/rook/rook/issues/9227#issuecomment-979515205) 这条评论，我查看了 Ceph 上的文件系统：

```shell
$ ceph fs dump
e5326333
btime 2025-01-04T15:34:10:925530+0000
enable_multiple, ever_enabled_multiple: 1,1
default compat: compat={},rocompat={},incompat={1=base v0.20,2=client writeable ranges,3=default file layouts on dirs,4=dir inode in separate object,5=mds uses versioned encoding,6=dirfrag is stored in omap,8=no anchor table,9=file layout v2,10=snaprealm v2}
legacy client fscid: 1

Filesystem 'act-cephfs' (1)
fs_name act-cephfs
epoch   5326333
flags   3c joinable allow_multimds_snaps allow_standby_replay
created 2018-06-08T09:50:20.170392+0000
modified        2025-01-04T15:34:10.414281+0000
tableserver     0
root    0
session_timeout 60
session_autoclose       300
max_file_size   1099511627776
max_xattr_size  65536
required_client_features        {}
last_failure    0
last_failure_osd_epoch  0
compat  compat={},rocompat={},incompat={1=base v0.20,2=client writeable ranges,3=default file layouts on dirs,4=dir inode in separate object,5=mds uses versioned encoding,6=dirfrag is stored in omap,7=mds uses inline data,8=no anchor table,9=file layout v2,10=snaprealm v2,11=minor log segments,12=quiesce subvolumes}
max_mds 4
in      0,1,2,3
up      {0=380369360,1=380399768,2=380546230,3=380483577}
failed
damaged
stopped 4,5,6,7,8
data_pools      [2]
metadata_pool   1
inline_data     disabled
balancer
bal_rank_mask   -1
standby_count_wanted    0
qdb_cluster     leader: 380369360 members: 380369360,380399768,380483577,380546230
[mds.act-cephfs.inspur-storage-4.ltuffo{0:380369360} state up:active seq 324309 join_fscid=1 addr [v2:192.168.5.234:6800/3427161810,v1:192.168.5.234:6801/3427161810] compat {c=[1],r=[1],i=[1fff]}]
[mds.act-cephfs.sugon-storage-5.xkxdla{0:380490165} state up:standby-replay seq 1 join_fscid=1 addr [v2:192.168.5.245:6800/1223650857,v1:192.168.5.245:6801/1223650857] compat {c=[1],r=[1],i=[1fff]}]
[mds.act-cephfs.sugon-storage-7.sxblnp{1:380399768} state up:active seq 328467 join_fscid=1 addr [v2:192.168.5.247:6800/2072251774,v1:192.168.5.247:6801/2072251774] compat {c=[1],r=[1],i=[1fff]}]
[mds.act-cephfs.inspur-storage-1.dsacjm{1:380535706} state up:standby-replay seq 1 join_fscid=1 addr [v2:192.168.5.248:6800/4213384659,v1:192.168.5.248:6801/4213384659] compat {c=[1],r=[1],i=[1fff]}]
[mds.act-cephfs.inspur-storage-3.ynstot{2:380546230} state up:active seq 325661 join_fscid=1 addr [v2:192.168.5.233:7000/1261021933,v1:192.168.5.233:7001/1261021933] compat {c=[1],r=[1],i=[1fff]}]
[mds.act-cephfs.sugon-storage-6.jukehq{2:381675654} state up:standby-replay seq 1 join_fscid=1 addr [v2:192.168.5.246:6800/2516418562,v1:192.168.5.246:6801/2516418562] compat {c=[1],r=[1],i=[1fff]}]
[mds.act-cephfs.sugon-storage-4.etafmy{3:380483577} state up:active seq 324156 join_fscid=1 addr [v2:192.168.5.244:6800/2508631891,v1:192.168.5.244:6801/2508631891] compat {c=[1],r=[1],i=[1fff]}]
[mds.act-cephfs.inspur-storage-2.jcxvjo{3:386139895} state up:standby-replay seq 1 join_fscid=1 addr [v2:192.168.5.249:6800/1891932991,v1:192.168.5.249:6801/1891932991] compat {c=[1],r=[1],i=[1fff]}]


Filesystem 'archive' (2)
fs_name archive
epoch   5312304
flags   32 joinable allow_snaps allow_multimds_snaps allow_standby_replay
created 2022-10-08T06:24:51.587651+0000
modified        2024-12-21T05:09:23.050758+0000
tableserver     0
root    0
session_timeout 60
session_autoclose       300
max_file_size   1099511627776
max_xattr_size  65536
required_client_features        {}
last_failure    0
last_failure_osd_epoch  0
compat  compat={},rocompat={},incompat={1=base v0.20,2=client writeable ranges,3=default file layouts on dirs,4=dir inode in separate object,5=mds uses versioned encoding,6=dirfrag is stored in omap,7=mds uses inline data,8=no anchor table,9=file layout v2,10=snaprealm v2,11=minor log segments,12=quiesce subvolumes}
max_mds 1
in      0
up      {0=380594458}
failed
damaged
stopped
data_pools      [12]
metadata_pool   11
inline_data     disabled
balancer
bal_rank_mask   -1
standby_count_wanted    1
qdb_cluster     leader: 380594458 members: 380594458
[mds.archive.sugon-storage-9.oxskad{0:380594458} state up:active seq 16474 join_fscid=2 addr [v2:192.168.5.251:6800/2538359,v1:192.168.5.251:6801/2538359] compat {c=[1],r=[1],i=[1fff]}]
[mds.archive.sugon-storage-8.ntaifv{0:381776599} state up:standby-replay seq 1 join_fscid=2 addr [v2:192.168.5.250:6800/431026153,v1:192.168.5.250:6801/431026153] compat {c=[1],r=[1],i=[1fff]}]


Standby daemons:

[mds.act-cephfs.inspur-storage-5.czcovn{-1:390667582} state up:standby seq 1 join_fscid=1 addr [v2:192.168.5.235:6944/39425222,v1:192.168.5.235:6945/39425222] compat {c=[1],r=[1],i=[1fff]}]
dumped fsmap epoch 5326333
```

一共有 `act-cephfs` 和 `archive` 两个文件系统，在 Dump 信息中，显示的是元数据池的序号，查看对应的具体名称：

```shell
$ ceph osd pool ls
cephfs_metadata
cephfs_data
.mgr
.rgw.root
default.rgw.log
default.rgw.control
default.rgw.meta
cephfs_data_cache
cephfs_archive_metadata
cephfs_archive_data
mgr-backup-2022-12-31
crater_rbd
```

可以看到对应的元数据池分别是第一个 `cephfs_metadata` 和第 11 个 `cephfs_archive_metadata`，查看 metadata_pool 对应的元数据：

```shell
$ ceph osd pool ls detail --format=json | jq '.[] | select(.pool_name| startswith("cephfs")) | .pool_name, .application_metadata'
"cephfs_metadata"
{
  "cephfs": {}
}
"cephfs_data"
{
  "cephfs": {}
}
"cephfs_data_cache"
{
  "cephfs": {}
}
"cephfs_archive_metadata"
{
  "cephfs": {
    "metadata": "archive"
  }
}
"cephfs_archive_data"
{
  "cephfs": {
    "data": "archive"
  }
}
```

注意到 act-cephfs 文件系统很可能有一些不规范的重命名操作，导致应用程序标记异常，手动 Patch 上应用程序标记：

```shell
$ ceph osd pool application set cephfs_metadata cephfs metadata act-cephfs
{
    "metadata": "act-cephfs"
}
$ ceph osd pool application set cephfs_data cephfs metadata act-cephfs
{
    "metadata": "act-cephfs"
}
```

修改后，PVC 成功创建。

## 总结

是之前 Ceph 集群的遗留问题。
