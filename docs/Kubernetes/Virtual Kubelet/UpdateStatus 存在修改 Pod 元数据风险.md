---
title: UpdateStatus 存在修改 Pod 元数据风险
created_at: 2024-11-07
is_public: true
tags:
  - virtual-kubelet
  - kubernetes
---

## 问题描述

> [!quote] [UpdateStatus func would also update label and annotations · Issue #92022 · kubernetes/kubernetes · GitHub](https://github.com/kubernetes/kubernetes/issues/92022)
> The original approach to subresources was only concerned with preventing changes to spec and status via the respective endpoints. Changes to metadata were allowed via either endpoint. That is the case for most of the types defined early on in Kubernetes.
>
> Changes to metadata via status subresources were restricted in some later types, notably custom resource types.

在 Virtual Kubelet 或者 Kubernetes Federation 的场景中，存在跨集群同步 Pod 信息的情况。一般我们期望的数据流是，Spec 自上而下，Status 自下而上。

然而，UpdateStatus 对于 K8s 早期定义的内置资源（如 Pod 等），允许通过任一端点修改 Metadata，这一点后来在 CRD 中进行了限制。

这样的不一致行为使得 `UpdateStatus` 方法并没有遵循其字面意思，例如，在这样的代码中：

```go
pod.ResourceVersion = "0"
client.Pods(pod.Namespace).UpdateStatus(ctx, pod, metav1.UpdateOptions{})
```

这里首先将 Pod 的 ResourceVersion 设置为 0，这会绕过 Api Server 对于 Pod 修改连续性的校验，进行强制更新。而如果原集群修改了 MetaData，则取决于同步情况，有可能被 `UpdateStatus` 方法覆盖。

不过在看 Github 上相关 Issue 的讨论时也发现，似乎也有利用这个特性直接通过 `UpdateStatus` 去修改 Annotations 或 Labels 的。

## 解决方式

通过 Two Way Merge 的方式，彻底保证只修改 Status 字段的内容。

```go
// 生成 Patch 内容
patchMap, err := strategicpatch.CreateTwoWayMergeMapPatch(sourceMap, targetMap, corev1.PodStatus{})
patchBytes, _ := json.Marshal(map[string]interface{}{"status": patchMap})

// 进行 StrategicMergePatch
if _, err = client.Pods(pod.Namespace).Patch(
	ctx, pod.Name, types.StrategicMergePatchType, patchBytes, metav1.PatchOptions{}, "status"); err != nil && !errors.IsNotFound(err) {
	return err
}
```
