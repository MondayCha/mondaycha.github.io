---
title: 通过 Kind 和 Kwok 模拟大规模生产集群环境
created_at: 2024-11-03
is_public: true
tags:
  - kwok
  - kind
  - metrics-server
---

## Kind

创建 v1.31 的 Kubernetes 测试集群，通过代理访问镜像：

```yaml
kind: Cluster
apiVersion: kind.x-k8s.io/v1alpha4
nodes:
- role: control-plane
  image: crater-harbor.act.buaa.edu.cn/docker.io/kindest/node:v1.31.1
- role: worker
  image: crater-harbor.act.buaa.edu.cn/docker.io/kindest/node:v1.31.1
```

启动 1 Control Plane, 1 Worker 的 Kind 集群：

```shell
kind create cluster --config kwok-test.yaml --name kwok
# Set kubectl context to "kind-kwok"
# You can now use your cluster with:

# kubectl cluster-info --context kind-kwok

# Have a question, bug, or feature request? Let us know! https://kind.sigs.k8s.io/#community 🙂
# ➜  workspace kubectl cluster-info --context kind-kwok
# Kubernetes control plane is running at https://127.0.0.1:38729
# CoreDNS is running at https://127.0.0.1:38729/api/v1/namespaces/kube-system/services/kube-dns:dns/proxy

# To further debug and diagnose cluster problems, use 'kubectl cluster-info dump'.
```

卸载：

```shell
kind delete cluster --name kwok
```

## Kwok

在 Kind 集群中安装最新版的 Kwok：

> [!quote]
>
> - Helm Chart: [kwok 0.1.1 · kwok/kwok](https://artifacthub.io/packages/helm/kwok/kwok)
> - 在集群中安装：[\`kwok\` in Cluster | KWOK](https://kwok.sigs.k8s.io/docs/user/kwok-in-cluster/)

```shell
helm upgrade --namespace kube-system --install kwok kwok/kwok \
--set image.repository=crater-harbor.act.buaa.edu.cn/registry.k8s.io/kwok/kwok

helm upgrade --install kwok-stage kwok/stage-fast

helm upgrade --install kwok-metrics kwok/metrics-usage
```

## Metrics Server

> [!quote] [安装 Metrics Server](../Helm/%E5%AE%89%E8%A3%85%20Metrics%20Server.md)

为了支持查看 Pod 的使用率信息，还需要安装 Metrics Server：

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

## 模拟

### Node With Metrics

`metrics.k8s.io/resource-metrics-path` 中需要体现节点名称。

```yaml
apiVersion: v1
kind: Node
metadata:
  annotations:
    node.alpha.kubernetes.io/ttl: "0"
    kwok.x-k8s.io/node: fake
    metrics.k8s.io/resource-metrics-path: "/metrics/nodes/kwok-node-0/metrics/resource"
  labels:
    beta.kubernetes.io/arch: amd64
    beta.kubernetes.io/os: linux
    kubernetes.io/arch: amd64
    kubernetes.io/hostname: kwok-node-0
    kubernetes.io/os: linux
    kubernetes.io/role: agent
    node-role.kubernetes.io/agent: ""
    type: kwok
  name: kwok-node-0
spec:
  taints: # Avoid scheduling actual running pods to fake Node
  - effect: NoSchedule
    key: kwok.x-k8s.io/node
    value: fake
status:
  allocatable:
    cpu: 32
    memory: 256Gi
    pods: 110
  capacity:
    cpu: 32
    memory: 256Gi
    pods: 110
  nodeInfo:
    architecture: amd64
    bootID: ""
    containerRuntimeVersion: ""
    kernelVersion: ""
    kubeProxyVersion: fake
    kubeletVersion: fake
    machineID: ""
    operatingSystem: linux
    osImage: ""
    systemUUID: ""
  phase: Running
```

### Pod With Metrics

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: fake-pod
  namespace: default
spec:
  replicas: 10
  selector:
    matchLabels:
      app: fake-pod
  template:
    metadata:
      labels:
        app: fake-pod
      annotations:
        kwok.x-k8s.io/usage-cpu: "1"
        kwok.x-k8s.io/usage-memory: "2Gi"
    spec:
      affinity:
        nodeAffinity:
          requiredDuringSchedulingIgnoredDuringExecution:
            nodeSelectorTerms:
            - matchExpressions:
              - key: type
                operator: In
                values:
                - kwok
      # A taints was added to an automatically created Node.
      # You can remove taints of Node or add this tolerations.
      tolerations:
      - key: "kwok.x-k8s.io/node"
        operator: "Exists"
        effect: "NoSchedule"
      containers:
      - name: fake-container
        image: fake-image
        resources:
          limits:
            cpu: "1"
            memory: 2Gi
          requests:
            cpu: "1"
            memory: 2Gi
```

### 效果

```shell
$ kubectl top pod
NAME                        CPU(cores)   MEMORY(bytes)
fake-pod-5c449fc8f7-2rt7z   10001m       -8796Mi
```
