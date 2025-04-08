---
title: GPU 型号与计算能力
created_at: 2025-02-27
is_public: true
---

在使用 Vllm 时，使用 V100 显卡和 A100 显卡会显示，V100 不支持 BF16 精度。那么具体的 GPU 型号和支持精度的关系是怎么样的？

## Hardware and Precision

> [!NOTE] [Support Matrix — NVIDIA TensorRT Documentation](https://docs.nvidia.com/deeplearning/tensorrt/latest/getting-started/support-matrix.html#hardware-and-precision)

| [CUDA Compute Capability](https://developer.nvidia.com/cuda-gpus) | Example Devices       | TF32 | FP32 | FP16 | FP8 | FP4                                                                                                  | BF16 | INT8 | FP16 Tensor Cores | INT8 Tensor Cores | DLA |
| ----------------------------------------------------------------- | --------------------- | ---- | ---- | ---- | --- | ---------------------------------------------------------------------------------------------------- | ---- | ---- | ----------------- | ----------------- | --- |
| 12.0                                                              | NVIDIA RTX 5090       | Yes  | Yes  | Yes  | Yes | Yes                                                                                                  | Yes  | Yes  | Yes               | Yes               | No  |
| 10.0                                                              | NVIDIA B200           | Yes  | Yes  | Yes  | Yes | Yes                                                                                                  | Yes  | Yes  | Yes               | Yes               | No  |
| 9.0                                                               | NVIDIA H100           | Yes  | Yes  | Yes  | Yes | Yes [5](https://docs.nvidia.com/deeplearning/tensorrt/latest/getting-started/support-matrix.html#f5) | Yes  | Yes  | Yes               | Yes               | No  |
| 9.0                                                               | NVIDIA GH200 480 GB   | Yes  | Yes  | Yes  | Yes | Yes [5](https://docs.nvidia.com/deeplearning/tensorrt/latest/getting-started/support-matrix.html#f5) | Yes  | Yes  | Yes               | Yes               | No  |
| 8.9                                                               | NVIDIA L40S           | Yes  | Yes  | Yes  | Yes | Yes [5](https://docs.nvidia.com/deeplearning/tensorrt/latest/getting-started/support-matrix.html#f5) | Yes  | Yes  | Yes               | Yes               | No  |
| 8.7                                                               | NVIDIA DRIVE AGX Orin | Yes  | Yes  | Yes  | No  | No                                                                                                   | No   | Yes  | Yes               | Yes               | Yes |
| 8.6                                                               | NVIDIA A10            | Yes  | Yes  | Yes  | No  | No                                                                                                   | Yes  | Yes  | Yes               | Yes               | No  |
| 8.0                                                               | NVIDIA A100           | Yes  | Yes  | Yes  | No  | No                                                                                                   | Yes  | Yes  | Yes               | Yes               | No  |
| 7.5                                                               | NVIDIA T4             | No   | Yes  | Yes  | No  | No                                                                                                   | No   | Yes  | Yes               | Yes               | No  |

## GPU Compute Capability

> [!NOTE] [CUDA GPUs - Compute Capability | NVIDIA Developer](https://developer.nvidia.com/cuda-gpus#compute)

| GPU                                                                      | Compute Capability |
| ------------------------------------------------------------------------ | ------------------ |
| [NVIDIA H100](https://www.nvidia.com/en-us/data-center/h100/)            | 9.0                |
| [NVIDIA L4](https://www.nvidia.com/en-us/data-center/l4/)                | 8.9                |
| [NVIDIA L40](https://www.nvidia.com/en-us/data-center/l40/)              | 8.9                |
| [NVIDIA A100](https://www.nvidia.com/en-us/data-center/a100/)            | 8.0                |
| [NVIDIA A40](https://www.nvidia.com/en-us/data-center/a40/)              | 8.6                |
| [NVIDIA A30](https://www.nvidia.com/en-us/data-center/products/a30-gpu/) | 8.0                |
| [NVIDIA A10](https://www.nvidia.com/en-us/data-center/products/a10-gpu/) | 8.6                |
| [NVIDIA A16](https://www.nvidia.com/en-us/data-center/a16/)              | 8.6                |
| [NVIDIA A2](https://www.nvidia.com/en-us/data-center/products/a2/)       | 8.6                |
| [NVIDIA T4](https://www.nvidia.com/en-us/data-center/tesla-t4/)          | 7.5                |
| [NVIDIA V100](https://www.nvidia.com/en-us/data-center/tesla-v100/)      | 7.0                |
| [Tesla P100](https://www.nvidia.com/object/tesla-p100.html)              | 6.0                |
| [Tesla P40](https://www.nvidia.com/object/accelerate-inference.html%20)  | 6.1                |
| [Tesla P4](https://www.nvidia.com/object/accelerate-inference.html%20)   | 6.1                |
| [Tesla M60](https://www.nvidia.com/object/tesla-m60.html)                | 5.2                |
| [Tesla M40](https://www.nvidia.com/object/tesla-m40.html%20)             | 5.2                |
| [Tesla K80](https://www.nvidia.com/object/tesla-k80.html%20)             | 3.7                |
| [Tesla K40](https://www.nvidia.com/object/personal-supercomputing.html)  | 3.5                |
| [Tesla K20](https://www.nvidia.com/object/tesla-servers.html)            | 3.5                |
| [Tesla K10](https://www.nvidia.com/object/tesla-servers.html)            | 3.0                |
