---
title: Zsh 配置
created_at: 2024-12-02
is_public: true
---

> [!NOTE] [ohmyzsh.git | 镜像站使用帮助 | 清华大学开源软件镜像站 | Tsinghua Open Source Mirror](https://mirrors.tuna.tsinghua.edu.cn/help/ohmyzsh.git/)

```shell
apt install zsh git

git clone --depth 1 https://mirrors.tuna.tsinghua.edu.cn/git/ohmyzsh.git
cd ohmyzsh/tools
REMOTE=https://mirrors.tuna.tsinghua.edu.cn/git/ohmyzsh.git sh install.sh
```

常用插件配置：

```bash
#!/bin/bash
ZSH_CUSTOM="$HOME/.oh-my-zsh/custom"
export ZSH_CUSTOM

# Configure plugins.
git clone --depth=1 https://gitee.com/mirrors/zsh-syntax-highlighting.git "${ZSH_CUSTOM}"/plugins/zsh-syntax-highlighting
git clone --depth=1 https://gitee.com/mirrors/zsh-autosuggestions.git "${ZSH_CUSTOM}"/plugins/zsh-autosuggestions
sed -i 's/^plugins=.*/plugins=(git\n extract\n sudo\n jsontools\n colored-man-pages\n zsh-autosuggestions\n zsh-syntax-highlighting\n)/g' ~/.zshrc
```
