---
title: 将多个 PVC 指向同一处 Ceph 存储
created_at: 2024-12-16
is_public: true
tags:
  - ceph
  - ai-assisted
---

> [!quote] [Filesystem Storage Overview - Rook Ceph Documentation](https://rook.io/docs/rook/latest-release/Storage-Configuration/Shared-Filesystem-CephFS/filesystem-storage/#consume-the-shared-filesystem-across-namespaces)

## 跨命名空间共享文件系统

使用 `rook-cephfs` 存储类创建的 PVC 可以在不同的 Pod 之间同时共享，无论是读写模式还是只读模式，但仅限于单个命名空间（PVC 是命名空间范围的资源，因此不能在另一个命名空间中使用）。

然而，在某些用例中，您可能希望在不同命名空间中的不同 Pod 之间共享基于 CephFS 的 PVC 内容，例如共享库，或者在不同命名空间中运行的应用程序之间的协作工作区。

您可以使用以下方法实现这一目标。

### 共享卷的创建

- 在 `rook` 命名空间中，创建 `rook-csi-cephfs-node` 密钥的副本，并将其命名为 `rook-csi-cephfs-node-user`。

- 编辑新创建的密钥，更改密钥的名称（保持值不变）：

  - `adminID` -> `userID`
  - `adminKey` -> `userKey`

- 创建您想要共享的 PVC，例如：

```yaml
kind: PersistentVolumeClaim
apiVersion: v1
metadata:
  name: base-pvc
  namespace: first-namespace
spec:
  accessModes:
    - ReadWriteMany
  resources:
    requests:
      storage: 100Gi
  storageClassName: rook-cephfs
  volumeMode: Filesystem
```

- 创建的相应 PV 将包含连接到 CephFS 卷所需的所有信息（此处删除了所有非必要信息）：

```yaml
kind: PersistentVolume
apiVersion: v1
metadata:
  name: pvc-a02dd277-cb26-4c1e-9434-478ebc321e22
  annotations:
    pv.kubernetes.io/provisioned-by: rook.cephfs.csi.ceph.com
  finalizers:
    - kubernetes.io/pv-protection
spec:
  capacity:
    storage: 100Gi
  csi:
    driver: rook.cephfs.csi.ceph.com
    volumeHandle: >-
      0001-0011-rook-0000000000000001-8a528de0-e274-11ec-b069-0a580a800213
    volumeAttributes:
      clusterID: rook
      fsName: rook-cephfilesystem
      storage.kubernetes.io/csiProvisionerIdentity: 1654174264855-8081-rook.cephfs.csi.ceph.com
      subvolumeName: csi-vol-8a528de0-e274-11ec-b069-0a580a800213
      subvolumePath: >-
        /volumes/csi/csi-vol-8a528de0-e274-11ec-b069-0a580a800213/da98fb83-fff3-485a-a0a9-57c227cb67ec
    nodeStageSecretRef:
      name: rook-csi-cephfs-node
      namespace: rook
    controllerExpandSecretRef:
      name: rook-csi-cephfs-provisioner
      namespace: rook
  accessModes:
    - ReadWriteMany
  claimRef:
    kind: PersistentVolumeClaim
    namespace: first-namespace
    name: base-pvc
    apiVersion: v1
    resourceVersion: '49728'
  persistentVolumeReclaimPolicy: Retain
  storageClassName: rook-cephfs
  volumeMode: Filesystem
```

- 在此 PV 上，将 `persistentVolumeReclaimPolicy` 参数更改为 `Retain`，以避免在删除 PVC 时将其删除。当您想要删除共享卷时，不要忘记将其改回 `Delete`（参见下一节中的完整过程）。

- 复制 PV 的 YAML 内容，并创建一个新的静态 PV，使用相同的信息并进行一些修改。从原始 YAML 中，您必须：

  - 修改原始名称。为了便于跟踪，最好的解决方案是在原始名称后附加目标命名空间的名称。在本例中为 `newnamespace`。
  - 修改 `volumeHandle`。同样，附加目标命名空间的名称。
  - 在 `volumeAttributes` 中添加 `staticVolume: "true"` 条目。
  - 在 `volumeAttributes` 中添加 `rootPath` 条目，内容与 `subvolumePath` 相同。
  - 在 `nodeStageSecretRef` 部分，将名称更改为指向您之前创建的密钥 `rook-csi-cephfs-node-user`。
  - 删除应用 YAML 之前不必要的部分（`claimRef`、`managedFields` 等）：

您的 YAML 应如下所示：

```yaml
kind: PersistentVolume
apiVersion: v1
metadata:
  name: pvc-a02dd277-cb26-4c1e-9434-478ebc321e22-newnamespace
spec:
  capacity:
    storage: 100Gi
  csi:
    driver: rook.cephfs.csi.ceph.com
    volumeHandle: >-
      0001-0011-rook-0000000000000001-8a528de0-e274-11ec-b069-0a580a800213-newnamespace
    volumeAttributes:
      clusterID: rook
      fsName: rook-cephfilesystem
      storage.kubernetes.io/csiProvisionerIdentity: 1654174264855-8081-rook.cephfs.csi.ceph.com
      subvolumeName: csi-vol-8a528de0-e274-11ec-b069-0a580a800213
      subvolumePath: >-
        /volumes/csi/csi-vol-8a528de0-e274-11ec-b069-0a580a800213/da98fb83-fff3-485a-a0a9-57c227cb67ec
      rootPath: >-
        /volumes/csi/csi-vol-8a528de0-e274-11ec-b069-0a580a800213/da98fb83-fff3-485a-a0a9-57c227cb67ec
      staticVolume: "true"
    nodeStageSecretRef:
      name: rook-csi-cephfs-node
      namespace: rook
  accessModes:
    - ReadWriteMany
  persistentVolumeReclaimPolicy: Retain
  storageClassName: rook-cephfs
  volumeMode: Filesystem
```

- 在新的或另一个命名空间中，创建一个新的 PVC，该 PVC 将使用您创建的新 PV。您只需在 `volumeName` 参数中指向它。确保您输入的存储大小与原始 PVC 相同！：

```yaml
kind: PersistentVolumeClaim
apiVersion: v1
metadata:
  name: second-pvc
  namespace: newnamespace
  finalizers:
    - kubernetes.io/pvc-protection
spec:
  accessModes:
    - ReadWriteMany
  resources:
    requests:
      storage: 100Gi
  volumeName: pvc-a02dd277-cb26-4c1e-9434-478ebc321e22-newnamespace
  storageClassName: rook-cephfs
  volumeMode: Filesystem
```

现在，您可以从不同命名空间中的不同 PVC 访问相同的 CephFS 子卷。在您想要使用此子卷的每个命名空间中重复前面的步骤（复制 PV 并赋予新名称，创建指向它的 PVC）。

**注意**：我们创建的新 PVC/PV 是静态的。因此，CephCSI 不支持对它们进行快照、克隆、调整大小或删除操作。如果需要这些操作，必须在原始 PVC 上进行。
