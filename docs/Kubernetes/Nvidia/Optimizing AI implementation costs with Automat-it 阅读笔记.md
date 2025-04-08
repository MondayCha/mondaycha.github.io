---
title: Optimizing AI implementation costs with Automat-it 阅读笔记
created_at: 2025-03-03
is_public: true
tags:
  - nvidia
  - kubernetes
---

> [!NOTE] [Optimizing AI implementation costs with Automat-it | AWS Machine Learning Blog](https://aws.amazon.com/cn/blogs/machine-learning/optimizing-ai-implementation-costs-with-automat-it/)

## 文章概况

这篇文章由 AWS 合作伙伴 Automat-it 的 Claudiu Bota、Oleg Yurchenko 和 Vladyslav Melnyk 撰写，介绍了如何通过优化架构和资源管理，帮助客户在 AWS 上大幅降低 AI 模型部署成本，同时保持高性能。以下是文章的主要内容总结：

### 背景

- 随着 AI 和机器学习（ML）技术的广泛应用，企业面临在性能和成本之间找到平衡的挑战。
- 客户需求：开发用于视频智能解决方案的 AI 模型，要求低延迟、高准确性，但初始方案导致 GPU 资源利用率低且成本过高。

### 客户挑战

- 客户使用 YOLOv8 和 Ultralytics 库开发模型，部署分为预处理、推理和后处理三个阶段。
- 初始方案为每个模型分配专用 GPU，导致成本过高，每台摄像机每月成本为 353.03 美元，超出预算。

### 初始解决方案

- 采用客户端-服务器架构，将预处理和后处理放在 CPU 实例上，推理放在 GPU 实例上。
- 使用自定义 gRPC 进行组件间通信，但网络通信延迟和高成本问题仍未解决。在文章的测试中，使用自定义 gRPC 进行通信时，网络通信延迟为 10.26 毫秒，占据了总处理时间的很大一部分。

|             | Preprocess (ms) | Inference (ms) | Postprocess (ms) | Network communication (ms) | Total (ms) |
| ----------- | --------------- | -------------- | ---------------- | -------------------------- | ---------- |
| Custom gRPC | 2.7             | 7.9            | 1.1              | 10.26                      | 21.96      |

### 优化方案

- **GPU 时间切片**：通过 NVIDIA Kubernetes 设备插件在 EKS 集群中实现 GPU 时间切片，允许多个 AI 模型共享单个 GPU。
- **测试与结果**：
  1. **单 Pod 测试**：在`g4dn.xlarge`实例上运行单个 Pod，总处理时间为 10.8 毫秒，符合要求。
  1. **20 个 Pod 测试**：在`g4dn.2xlarge`实例上运行 20 个 Pod，总处理时间增加到 108 毫秒，但仍在可接受范围内。
  1. **54 个 Pod 测试**：在`g4dn.8xlarge`实例上运行 54 个 Pod，总处理时间为 205 毫秒，最终每台摄像机每月成本降至 27.81 美元，相比初始方案降低了 12 倍。

|         | Preprocess (ms) | Inference (ms) | Postprocess (ms) | Total (ms) |
| ------- | --------------- | -------------- | ---------------- | ---------- |
| 54 pods | 21              | 56             | 128              | 205        |

### 结论

- GPU 时间切片技术显著降低了 AI 模型的部署成本，同时保持了高性能。
- 该方法无需对模型代码进行大量修改，易于扩展和维护，适合大规模部署。

### 作者简介

- Claudiu Bota：Automat-it 高级解决方案架构师，专注于容器、无服务器技术和微服务。
- Oleg Yurchenko：Automat-it DevOps 总监，专注于容器、Kubernetes 和 CI/CD。
- Vladyslav Melnyk：Automat-it 高级 MLOps 工程师，专注于 AI 产品生命周期管理和高效模型部署。

文章强调了通过优化资源分配和架构设计，企业可以在不牺牲性能的前提下，大幅降低 AI 部署成本。
