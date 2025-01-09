---
title: Kube Alias 常用命令
created_at: 2025-01-09
is_public: true
---

## 启动补全

在 zsh 中启动 `kubectl` 自带补全功能并让别名生效的步骤：

确保已经安装了 `kubectl` 并且补全脚本可用。通常，在安装 `kubectl` 后，补全脚本会自动安装到特定位置（如 `/usr/share/bash-completion/completions/kubectl`）。

在 `.zshrc` 文件中添加以下内容：

```bash
source <(kubectl completion zsh)
autoload -U compinit && compinit
```

这将加载 `kubectl` 的补全功能并初始化 zsh 的补全系统。

## 添加常用别名

为了让别名生效，可以在 `.zshrc` 文件中直接定义别名：

```bash
alias k='kubectl'
alias kg='kubectl get'
alias kgd='kubectl get deployments'
alias kgp='kubectl get pods'
alias kgn='kubectl get nodes'
alias kgs='kubectl get services'
alias kgi='kubectl get ingress'
alias kl='kubectl logs'
alias ktn='kubectl config set-context --current --namespace'

source <(kubectl completion zsh)
autoload -U compinit && compinit
```

重新加载 `.zshrc` 文件以使更改生效：

```bash
source ~/.zshrc
```

现在，`kubectl` 的补全功能应该已经启动，并且你的别名也应该生效了。在输入 `k` 或者其他别名后，按下 `Tab` 键应该可以触发补全功能。
