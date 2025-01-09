---
title: 从 HuggingFace 下载模型
created_at: 2025-01-09
is_public: true
---

> [国内快速下载 huggingface（镜像）上的模型和数据](https://zhuanlan.zhihu.com/p/685765714)

## 1. 安装依赖

```shell
pip config set global.index-url https://mirrors.aliyun.com/pypi/simple/
pip install -U huggingface_hub
```

## 2. 设置环境变量

_Linux_

```text
export HF_ENDPOINT=https://hf-mirror.com
```

_Windows Powershell_

```text
$env:HF_ENDPOINT = "https://hf-mirror.com"
```

**3.1 下载模型**

```text
huggingface-cli download --resume-download SakuraLLM/Sakura-32B-Qwen2beta-v0.9.1-GGUF sakura-32b-qwen2beta-v0.9.1-iq4xs.gguf --local-dir sakura32b

huggingface-cli download --resume-download SakuraLLM/Sakura-7B-Qwen2.5-v1.0-GGUF sakura-7b-qwen2.5-v1.0-iq4xs.gguf --local-dir sakura7b

huggingface-cli download --resume-download SakuraLLM/LN-Korean-14B-v0.2.1 --local-dir LN-Korean-14B-v0.2.1
```
