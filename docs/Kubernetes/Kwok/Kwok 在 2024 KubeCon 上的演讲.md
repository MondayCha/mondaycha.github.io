---
title: Kwok 在 2024 KubeCon 上的演讲
created_at: 2024-11-09
is_public: true
tags:
  - kwok
---

> [!NOTE]
>
> - PPT：[KubeCon + CloudNativeCon + Open Source Summit + AI_dev China 2024: Keynote: Supporting Large-Scale and Reli...](https://kccncossaidevchn2024.sched.com/event/1eYYX/keynote-supporting-large-scale-and-reliability-testing-in-kubernetes-using-kwok-mo-3hxi-nanokuberneteszhi-kwokmao-chan-mao-reliao-mao-yuan-chen-nvidia-shiming-zhang-daocloud)
> - Video：[Keynote: Supporting Large-Scale and Reliability Testing in Kubernetes using Kwok | Yuan Chen & Shiming Zhang](https://youtu.be/zBKBhFxgWSo)

## 关于 Kwok

Kubernetes 是运行大规模工作负载的事实标准平台。本次演讲将介绍 KWOK（[https://kwok.sigs.k8s.io/](https://kwok.sigs.k8s.io/)），这是一个开源工具包，可以利用极少的资源（甚至在笔记本电脑上）创建和测试大规模 Kubernetes 集群。

KWOK 的创始人和维护者张世明，以及 NVIDIA GPU Cloud 的工程师陈源，将详细阐述 KWOK 的功能，包括生成和管理大量模拟 Kubelet API 和真实节点的虚拟节点，从而支持工作负载的部署和测试。他们将讨论 KWOK 的实际使用案例。

演讲还将介绍 KWOK 最近针对可靠性和容错性测试的增强功能，展示其通过向节点和 Pod 注入有针对性的故障来模拟故障的能力。通过示例和演示，演讲将展示如何利用 KWOK 进行可靠性测试和评估容错机制，从而最终提升 Kubernetes 中工作负载的弹性能力。
