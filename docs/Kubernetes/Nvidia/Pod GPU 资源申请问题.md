---
title: Pod GPU 资源申请问题
created_at: 2024-12-07
is_public: true
---

在 Nvidia Device Plugin 的文档中，有这样一段话：

> [!warning]
> If you do not request GPUs when you use the device plugin, the plugin exposes all the GPUs on the machine inside your container.

很久以前，沃老师让我确认过这个问题，当时我发现，在 Jupyter Base Notebook 的容器中，当 Pod 不申请 GPU 资源时，在容器内看不到 GPU。

然而，这个问题我想得太简单了。

## 问题描述

> [!quote]
>
> > [Read list of GPU devices from volume mounts instead of NVIDIA_VISIBLE_DEVICES](https://docs.google.com/document/d/1uXVF-NWZQXgP1MLb87_kMkQvidpnkNWicdpO2l9g-fw/edit?tab=t.0#)
>
> **NVIDIA 容器工具包在传统上把环境变量 `NVIDIA_VISIBLE_DEVICES` 当作一种接口**，以此告知工具包应当将哪些 GPU 注入到容器之中。
>
> 乍一看，这似乎是个合理的选择，因为每个容器运行时都支持向容器内注入环境变量的概念。这样一来，工具包运行时就能够保持对运行时的无感知性，并且无需让这些运行时针对新的 GPU 特定 API 达成一致（也就是说，它可以在 docker、CRI-O、podman、containerd 等环境下运行，而无需定义新的 API）。
>
> 然而，一旦将其接入到 Kubernetes 中，并且希望确保 k8s-device-plugin 是 Pod 能够访问 GPU 的唯一机制时，问题就出现了。
>
> 就目前的情况而言，Pod 可以绕过 k8s-device-plugin 所完成的资源分配，只需将 `NVIDIA_VISIBLE_DEVICES` 环境变量设置为它们想要访问的任意 GPU，就能访问系统上的所有 GPU。**实际上，所有 NVIDIA 打包的容器（例如 `cuda:9.0-base`、`cuda:10.0-base` 等）都已将此环境变量设置为 “all”**，这就使得这些容器无需通过 k8s-device-plugin 就能访问系统上的所有 GPU。

随着 Crater 项目在 ACT 实验室内部上线，这个问题再次暴露了出来：当用户使用了 NVIDIA 提供的镜像（如 `nvidia-pytorch:24.08-py3`）时，如果申请一张 GPU 卡资源：

```yaml
resources:
  limits:
	cpu: "10"
	memory: 20Gi
	nvidia.com/v100: "1"
  requests:
    cpu: "10"
    memory: 20Gi
	nvidia.com/v100: "1"
```

```shell
$ echo $NVIDIA_VISIBLE_DEVICES
GPU-881e49b1-ab00-6d7a-aa02-57c6a6f86d34
```

符合预期，此时即使修改 `NVIDIA_VISIBLE_DEVICES` 变量，也不会影响可见的 GPU 资源。

但如果不指定申请 GPU 资源：

```yaml
resources:
  limits:
	cpu: "10"
	memory: 20Gi
  requests:
    cpu: "10"
    memory: 20Gi
```

```shell
$ echo $NVIDIA_VISIBLE_DEVICES
all
```

此时会使用镜像内默认的 `NVIDIA_VISIBLE_DEVICES` 变量，并且可以看到所有 GPU 卡资源。

## 解决方案

当然，这个情况并非只有负面作用，例如用户希望让不同的 Pod 共享 GPU 硬件资源；或者是对于 device plugin pod 这样的胶水组件。但对于普通的使用 GPU 资源的用户，我们需要限制这一情况。

> [!quote] [Requesting zero GPUs allocates all GPUs · Issue #61 · NVIDIA/k8s-device-plugin](https://github.com/NVIDIA/k8s-device-plugin/issues/61)

为此，我们可以将 Pod 读取 GPU 信息的方式从环境变量修改为从 VolumeMount。参考 Issue 近期的讨论，修改 GPU-Operator `values.yaml` 文件：

```yaml
toolkit:
  enabled: true
  env:
    - name: ACCEPT_NVIDIA_VISIBLE_DEVICES_ENVVAR_WHEN_UNPRIVILEGED
      value: "false"
    - name: ACCEPT_NVIDIA_VISIBLE_DEVICES_AS_VOLUME_MOUNTS
      value: "true"

devicePlugin:
  env:
    - name: DEVICE_LIST_STRATEGY
      value: volume-mounts
```

更新部署后，对于没有申请 GPU 资源的 Pod，无法看到 GPU 卡信息。

```shell
$ nvidia-smi
bash: nvidia-smi: command not found
```

对于申请了 GPU 资源的 Pod，此时容器内 `NVIDIA_VISIBLE_DEVICES` 不再直接记录 GPU 信息，而是指向了一个目录，目录内包含表示 GPU UUID 信息的空文件。

```shell
$ echo $NVIDIA_VISIBLE_DEVICES
/var/run/nvidia-container-devices

$ ls /var/run/nvidia-container-devices
GPU-58d70bdc-e170-c396-4bde-658f66e049fd
```
