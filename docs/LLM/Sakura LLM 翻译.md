---
title: Sakura LLM 翻译
created_at: 2025-01-09
is_public: true
---

## 资源整理

- [Docker Env](https://hub.docker.com/r/kurikomoe/sakura-13b-galgame/tags)
- [llama-cpp-python 后端](https://github.com/SakuraLLM/Sakura-13B-Galgame/wiki/Python%E9%83%A8%E7%BD%B2%E6%95%99%E7%A8%8B#llama-cpp-python%E5%90%8E%E7%AB%AF)
- [Sakura-32B-Galgame-Kaggle-llama.cpp.ipynb](https://github.com/Isotr0py/SakuraLLM-Notebooks/blob/main/Sakura-32B-Galgame-Kaggle-llama.cpp.ipynb?short_path=5e98739)

## 尝试安装

```bash
source /miniconda/etc/profile.d/conda.sh
conda create -n sakura python=3.10
conda activate sakura
```

指令中的 `AVX2` 和 `cu117` 需要根据自己的硬件情况进行调整。

- CPU 支持到 AVX、AVX2 或 AVX512 的，可以将 `AVX2` 分别替换成 `AVX`、`AVX2` 或 `AVX512`。
- 不存在 CUDA 运行环境(纯 CPU)、存在 CUDA 运行环境 11.7、11.8、12.1、12.2 的，可以将 `cu117` 分别替换成 `CPU`、`cu117`、`cu118`、`cu121` 或 `cu122`。

### 换源

```powershell
# aliyun
pip config set global.index-url https://mirrors.aliyun.com/pypi/simple/
# unset
pip config unset global.index-url
```

```bash
cd Sakura-13B-Galgame
sudo apt update
sudo apt install build-essential

export http_proxy=192.168.3.126:10811
export https_proxy=192.168.3.126:10811

# 机器是 12.5 的，凑合试试 12.4
pip install llama-cpp-python -i https://isotr0py.github.io/llama.cpp-python-index/wheels/cu124

pip install -r requirements.llamacpp.txt
```

### Translate Novel

```bash
python3 translate_novel.py \
    --llama_cpp --use_gpu --trust_remote_code --text_length 512 \
    --model_name_or_path "./models/sakura-13b-lnovel-v0.9.0pre3-Q4_K_M.gguf" \
    --model_version "0.9" \
    --data_path "./raw.txt" \
    --output_path "./out.txt"
```

### Server

```bash
python3 server.py \
    --model_name_or_path "./models/sakura-13b-lnovel-v0.9.0pre3-Q4_K_M.gguf" \
    --llama_cpp \
    --use_gpu \
    --model_version "0.9" \
    --no-auth

python server.py \
    --model_name_or_path "./models/sakura-32b-qwen2beta-v0.9.1-iq4xs.gguf" \
    --llama_cpp \
    --use_gpu \
    --model_version 0.9 \
    --trust_remote_code \
    --no-auth
```

端口转发：

```
kubectl port-forward service/jupyter-liyilong-d48f7 -n crater-workspace  8080:81
```

## TODO

编译和启动都可以参考 kaggle [轻小说机翻机器人](https://books.fishhawk.top/forum/6630f091c92d3f7ad7f50f23) ，cp cuda 那行不用管

[Kaggle Notebook Editor](https://www.kaggle.com/code/scratchpad/notebook196c723043/edit)
