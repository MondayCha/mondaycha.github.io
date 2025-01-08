---
title: Volcano 异常导致集群所有 Pod 无法创建
created_at: 2024-08-11
is_public: true
tags:
  - volcano
  - webhook
---

## 问题描述

2024.8.9 学校机房部分停电，之后 Crater 等使用 Ingress 进行转发的网站无法访问。

## 问题排查

发现集群大量 Deployment 对应的 Pod 创建失败，包含 Ingress Controller，因此之前转发的域名都失效了。报错原因里有这样一句：

```yaml
status:
  conditions:
  - lastTransitionTime: "2024-08-08T16:49:08Z"
    lastUpdateTime: "2024-08-08T16:49:08Z"
    message: 'Internal error occurred: failed calling webhook "mutatepod.volcano.sh":
      failed to call webhook: Post "https://volcano-admission-service.volcano-system.svc:443/pods/mutate?timeout=10s":
      dial tcp 10.1.138.143:443: connect: connection refused'
    reason: FailedCreate
    status: "True"
    type: ReplicaFailure
```

发现和 Volcano 调度器的 WebHook 有一定关系。查询 Volcano System 命名空间下的状态：

```bash
$ kubectl get all -n volcano-system
NAME                                       READY   STATUS             RESTARTS   AGE
pod/volcano-admission-c7d5d7b8b-pk49p      0/1     ImagePullBackOff   0          2d10h
pod/volcano-controllers-5b99b9c887-p6mg8   0/1     ImagePullBackOff   0          2d10h
pod/volcano-scheduler-7498778d9-2b6gz      0/1     ImagePullBackOff   0          2d10h
```

初步推测是因为节点重启，Dockerhub 无法连接，镜像拉取不下来，导致 Volcano 相关的 Pod 全部创建失败。而关于 Volcano 的这个 Webhook，有一个相关的 Issue：

> [Add doc to note how to cleanup `Volcano` completely](https://github.com/volcano-sh/volcano/issues/2079)

可见这个 WebHook 拦截的范围非常广，一旦 Volcano 出问题，会导致集群大部分命名空间无法创建 Pod。

## 解决方案

社区也意识到了这个问题，有一个相关的 Issue 即将限制 Webhook 作用的默认范围：

[When volcano-admission pod not running, create other pod can faild · Issue #3734 · volcano-sh/volcano · GitHub](https://github.com/volcano-sh/volcano/issues/3734)

PR 合并后，Webhook 只会对指定了 Volcano Scheduler 调度器的 Pod 生效。

也可以参考 PR 内容进行配置，不过还是等社区把。
