---
title: 安装 OpenEBS
created_at: 2024-12-02
is_public: true
---

> [!quote] [postgres-cluster-with-replica-on-k8s](https://medium.com/@rammurthys_32117/postgres-cluster-with-replica-on-k8s-7a676abb3828)

## 安装 OpenEBS

设置 helm 仓库。

```shell
helm repo add openebs https://openebs.github.io/openebs
helm repo update
```

替换镜像链接。

```yaml
openebs-crds:
  csi:
    volumeSnapshots:
      enabled: true
      keep: true

# Refer to https://github.com/openebs/dynamic-localpv-provisioner/blob/HEAD/deploy/helm/charts/values.yaml for complete set of values.
localpv-provisioner:
  rbac:
    create: true
  localpv:
    image:
      # Make sure that registry name end with a '/'.
      # For example : quay.io/ is a correct value here and quay.io is incorrect
      registry: crater-harbor.act.buaa.edu.cn/docker.io/
    nodeSelector:
      node-role.kubernetes.io/control-plane: ""
    tolerations:
      - key: node-role.kubernetes.io/control-plane
        operator: Exists
        effect: NoSchedule
  helperPod:
    image:
      registry: crater-harbor.act.buaa.edu.cn/docker.io/

# Refer to https://github.com/openebs/zfs-localpv/blob/v2.6.2/deploy/helm/charts/values.yaml for complete set of values.
zfs-localpv:
  crds:
    zfsLocalPv:
      enabled: false
    csi:
      volumeSnapshots:
        enabled: false

# Refer to https://github.com/openebs/lvm-localpv/blob/lvm-localpv-1.6.2/deploy/helm/charts/values.yaml for complete set of values.
lvm-localpv:
  crds:
    lvmLocalPv:
      enabled: false
    csi:
      volumeSnapshots:
        enabled: false

# Refer to https://github.com/openebs/mayastor-extensions/blob/v2.7.1/chart/values.yaml for complete set of values.
mayastor:
  csi:
    node:
      initContainers:
        enabled: true
        containers:
        - name: nvme-tcp-probe
          image: crater-harbor.act.buaa.edu.cn/docker.io/busybox:latest
          command: ['sh', '-c', 'trap "exit 1" TERM; until $(lsmod | grep nvme_tcp &>/dev/null); do [ -z "$WARNED" ] && echo "nvme_tcp module not loaded..."; WARNED=1; sleep 60; done;']
  etcd:
    # -- Kubernetes Cluster Domain
    clusterDomain: cluster.local
  localpv-provisioner:
    enabled: false
  crds:
    enabled: false

# -- Configuration options for pre-upgrade helm hook job.
preUpgradeHook:
  image:
    # -- The container image registry URL for the hook job
    registry: crater-harbor.act.buaa.edu.cn/docker.io
    # -- The container repository for the hook job
    repo: bitnami/kubectl
    # -- The container image tag for the hook job
    tag: "1.25.15"
    # -- The imagePullPolicy for the container
    pullPolicy: IfNotPresent

engines:
  local:
    lvm:
      enabled: false
    zfs:
      enabled: false
  replicated:
    mayastor:
      enabled: false
```

安装 OpenEBS：

```shell
helm upgrade --install openebs --namespace openebs openebs/openebs --create-namespace -f values.yaml
```

## 测试 LocalPV

测试 PVC 的使用。

> [!quote] [OpenEBS Local PV Hostpath User Guide | OpenEBS Docs](https://openebs.io/docs/2.12.x/user-guides/localpv-hostpath)

```yaml
kind: PersistentVolumeClaim
apiVersion: v1
metadata:
  name: local-hostpath-pvc
spec:
  storageClassName: openebs-hostpath
  accessModes:
    - ReadWriteOnce
  resources:
    requests:
      storage: 5G
---
apiVersion: v1
kind: Pod
metadata:
  name: hello-local-hostpath-pod
spec:
  nodeSelector:
    node-role.kubernetes.io/control-plane: ""
  tolerations:
    - key: node-role.kubernetes.io/control-plane
      operator: Exists
      effect: NoSchedule
  volumes:
  - name: local-storage
    persistentVolumeClaim:
      claimName: local-hostpath-pvc
  containers:
  - name: hello-container
    image: crater-harbor.act.buaa.edu.cn/docker.io/library/busybox:1.37.0-glibc
    command:
       - sh
       - -c
       - 'while true; do echo "`date` [`hostname`] Hello from OpenEBS Local PV." >> /mnt/store/greet.txt; sleep $(($RANDOM % 5 + 300)); done'
    volumeMounts:
    - mountPath: /mnt/store
      name: local-storage
```

OpenEBS 会启动一个 Pod 初始化 PVC，然后 Pod 就可以运行了。
