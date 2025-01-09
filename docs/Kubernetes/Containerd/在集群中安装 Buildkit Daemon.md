---
title: 在集群中安装 Buildkit Daemon
created_at: 2024-12-12
is_public: true
tags:
  - buildkit
---

> [!NOTE] [Speeding up CI in Kubernetes with Docker and Buildkit](https://medium.com/vouchercodes-tech/speeding-up-ci-in-kubernetes-with-docker-and-buildkit-7890bc47c21a)

## 安装 DaemonSet

### 生成自签名证书

> [!NOTE] [buildkit/examples/kubernetes/create-certs.sh at master · moby/buildkit · GitHub](https://github.com/moby/buildkit/blob/master/examples/kubernetes/create-certs.sh)

首先需要生成自签名证书，避免未授权的服务使用我们的镜像打包服务。我们预期将 DaemonSet 部署为 `crater-images` 命名空间下的 `buildkitd` 服务，故脚本命令如下：

```shell
bash create-certs.sh \
buildkitd.crater-images \
buildkitd.crater-images.svc \
buildkitd.crater-images.svc.cluster.local \
127.0.0.1
```

### 配置 Buildkit DaemonSet

> [!NOTE] [buildkitd.toml](https://docs.docker.com/build/buildkit/toml-configuration/)

编辑 ComfigMap。

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: buildkitd-config
  namespace: crater-images
data:
  buildkitd.toml: |
    debug = true

    [grpc]
      address = [
        "tcp://0.0.0.0:1234", # tcp is for buildctl connections
        "unix:///run/user/1000/buildkit/buildkitd.sock", # non-root socket when running as non-root
      ]

    # config for build history API that stores information about completed build commands
    [history]
      # maxAge is the maximum age of history entries to keep, in seconds.
      maxAge = 345600
      # maxEntries is the maximum number of history entries to keep.
      maxEntries = 100

    [worker.oci]
      rootless = true
      noProcessSandbox = true

      gc = true
      reservedSpace = "50GB"
      maxUsedSpace = "400GB"
      minFreeSpace = "50GB"
      cniPoolSize = 16

      [[worker.oci.gcpolicy]]
        reservedSpace = "50GB"
        maxUsedSpace = "400GB"
        minFreeSpace = "50GB"
        keepDuration = "720h"
        filters = [ "type==source.local", "type==exec.cachemount", "type==source.git.checkout"]
      [[worker.oci.gcpolicy]]
        all = true
        reservedSpace = "400GB"

    [worker.containerd]
      gc = true
      # gckeepstorage sets storage limit for default gc profile, in MB.
      reservedSpace = "50GB"
      maxUsedSpace = "400GB"
      minFreeSpace = "50GB"
      # maintain a pool of reusable CNI network namespaces to amortize the overhead
      # of allocating and releasing the namespaces
      cniPoolSize = 16

      [[worker.containerd.gcpolicy]]
        reservedSpace = "50GB"
        maxUsedSpace = "400GB"
        minFreeSpace = "50GB"
        keepDuration = "720h"
        filters = [ "type==source.local", "type==exec.cachemount", "type==source.git.checkout"]
      [[worker.containerd.gcpolicy]]
        all = true
        reservedSpace = "400GB"
```

从 Docker 官网查到的设置和一开头的文章有些不同，此外，目前关于缓存轮转还没有测试其有效性，参考 [Disk usage not correct reported preventing GC trigger · Issue #5459 · moby/buildkit](https://github.com/moby/buildkit/issues/5459) 这篇 Issue 中讨论的，似乎 Rootless 模式下 GC 机制会有问题，后续继续关注。

### 创建 Rootless 的 StatefulSet

相比官方提供的示例，主要难点在于：

1. 官方没有使用证书，参考 Deployment 的
1. 官方没有挂载 PVC，但这里我需要做持久化，似乎 NFS 不能用于持久化：[Permission denied when local cache is amounted volume · Issue #2898 · moby/buildkit](https://github.com/moby/buildkit/issues/2898)

```yaml
apiVersion: apps/v1
kind: StatefulSet
metadata:
  labels:
    app: buildkitd
  name: buildkitd
  namespace: crater-images
spec:
  serviceName: buildkitd
  podManagementPolicy: Parallel
  replicas: 3
  selector:
    matchLabels:
      app: buildkitd
  template:
    metadata:
      labels:
        app: buildkitd
      annotations:
        container.apparmor.security.beta.kubernetes.io/buildkitd: unconfined
    spec:
      nodeSelector:
        node-role.kubernetes.io/control-plane: ""
      tolerations:
        - key: node-role.kubernetes.io/control-plane
          operator: Exists
          effect: NoSchedule
      securityContext:
        # Needs Kubernetes >= 1.19
        seccompProfile:
          type: Unconfined
        # To change UID/GID, you need to rebuild the image
        runAsUser: 1000
        runAsGroup: 1000
        fsGroup: 1000
      containers:
        - name: buildkitd
          image: crater-harbor.act.buaa.edu.cn/docker.io/moby/buildkit:master-rootless
          args:
            - --addr
            - unix:///run/user/1000/buildkit/buildkitd.sock
            - --addr
            - tcp://0.0.0.0:1234
            - --tlscacert
            - /certs/ca.pem
            - --tlscert
            - /certs/cert.pem
            - --tlskey
            - /certs/key.pem
            - --oci-worker-no-process-sandbox
            - --config
            - /home/user/.config/buildkit/buildkitd.toml
          readinessProbe:
            exec:
              command:
                - buildctl
                - debug
                - workers
            initialDelaySeconds: 5
            periodSeconds: 30
          livenessProbe:
            exec:
              command:
                - buildctl
                - debug
                - workers
            initialDelaySeconds: 5
            periodSeconds: 30
          ports:
            - containerPort: 1234
              protocol: TCP
          securityContext:
            allowPrivilegeEscalation: true
            capabilities:
              add:
                - CHOWN
                - DAC_OVERRIDE
                - FOWNER
                - FSETID
                - SETGID
                - SETUID
                - SETFCAP
              drop:
                - ALL
            privileged: false
            runAsGroup: 1000
            runAsNonRoot: true
            runAsUser: 1000
            seccompProfile:
              type: Unconfined
          volumeMounts:
            - name: certs
              readOnly: true
              mountPath: /certs
            # Dockerfile has `VOLUME /home/user/.local/share/buildkit` by default too,
            # but the default VOLUME does not work with rootless on Google's Container-Optimized OS
            # as it is mounted with `nosuid,nodev`.
            # https://github.com/moby/buildkit/issues/879#issuecomment-1240347038
            - mountPath: /home/user/.local/share/buildkit
              name: buildkit
            - name: config
              readOnly: true
              mountPath: /home/user/.config/buildkit/buildkitd.toml
              subPath: buildkitd.toml
          resources:
            requests:
              cpu: 6
              memory: 48Gi
            limits:
              cpu: 12
              memory: 96Gi
      volumes:
        - name: config
          configMap:
            name: buildkitd-config
            items:
              - key: buildkitd.toml
                path: buildkitd.toml
        - name: certs
          secret:
            secretName: buildkit-daemon-certs
  volumeClaimTemplates:
    - apiVersion: v1
      kind: PersistentVolumeClaim
      metadata:
        name: buildkit
      spec:
        accessModes:
          - ReadWriteOnce
        storageClassName: "openebs-hostpath"
        resources:
          requests:
            storage: 500Gi
---
apiVersion: v1
kind: Service
metadata:
  labels:
    app: buildkitd
  name: buildkitd
  namespace: crater-images
spec:
  ports:
    - port: 1234
      protocol: TCP
  selector:
    app: buildkitd
```

这里的重点在于设置 `fsGroup`，否则 PVC 的权限可能不正确。将打包过程的镜像通过 `openebs-hostpath` 进行持久化。

## 验证 DaemonSet 的安装

首先，通过 kube-proxy 将服务转发到本地：

```shell
$ kubectl port-forward service/buildkitd 1234
Forwarding from 127.0.0.1:1234 -> 1234
Forwarding from [::1]:1234 -> 1234
```

为本地 Docker 添加一个远程的 Buildkit 后端：

```shell
docker buildx create --name remote --driver remote --driver-opt cacert=${PWD}/.certs/client/ca.pem,cert=${PWD}/.certs/client/cert.pem,key=${PWD}/.certs/client/key.pem tcp://127.0.0.1:1234 --use
```

查看当前支持的后端：

```shell
$ docker buildx ls
NAME/NODE     DRIVER/ENDPOINT            STATUS    BUILDKIT   PLATFORMS
remote*       remote
 \_ remote0    \_ tcp://127.0.0.1:1234   running   f9b8951    linux/amd64 (+3), linux/386
default       docker
 \_ default    \_ default                running   v0.17.3    linux/amd64 (+3), linux/arm64, linux/arm (+2), linux/ppc64le, (4 more)
```

随便写一个 Dockerfile 并尝试打包：

```Dockerfile
FROM crater-harbor.act.buaa.edu.cn/docker.io/jupyter/base-notebook:ubuntu-22.04

# Copy the nginx configuration file
COPY create-certs.sh /usr/local/bin/create-certs.sh
CMD ["/usr/local/bin/create-certs.sh"]
```

```shell
$ buildkit git:(main) ✗ docker buildx build -t aa .
[+] Building 9.9s (6/6) FINISHED                         remote:remote
 => [internal] load build definition from Dockerfile     0.0s
 => => transferring dockerfile: 246B                     0.0s
 => [internal] load metadata for crater-harbor.act.buaa.edu.cn/docker.io/jupyter/base-notebook:ubuntu-22.04   9.9s
 => [internal] load .dockerignore                        0.0s
 => => transferring context: 2B                          0.0s
 => [internal] load build context                        0.0s
 => => transferring context: 1.41kB                      0.0s
 => [1/2] FROM crater-harbor.act.buaa.edu.cn/docker.io/jupyter/base-notebook:ubuntu-22.04@sha256:8c903974902b0e9d45d9823c2234411de0614c5  0.0s
 => => resolve crater-harbor.act.buaa.edu.cn/docker.io/jupyter/base-notebook:ubuntu-22.04@sha256:8c903974902b0e9d45d9823c2234411de0614c5  0.0s
 => CACHED [2/2] COPY create-certs.sh /usr/local/bin/create-certs.sh  0.0s
WARNING: No output specified with remote driver. Build result will only remain in the build cache. To push result image into registry use --push or to load image into docker use --load
```

前往对应节点，查看是否持久化：

```shell
$ ssh ssh root@192.168.5.73
Welcome to Ubuntu 22.04.5 LTS (GNU/Linux 5.15.0-126-generic x86_64)

$ ls /var/openebs/local/pvc-3894c093-2fbb-4b32-91d7-3c97dda10223/runc-overlayfs
cachemounts  containerdmeta.db  content  executor  metadata_v2.db  snapshots  workerid
```

完成验证，从本地解除到远程的 Buildkit 的链接：

```shell
$ docker buildx rm remote
remote removed
```

## 后续工作

- [ ] 使用 Pod 提交一个打包任务，指定使用 StatefulSet 作为后端
- [ ] 验证缓存 GC 机制是否生效
