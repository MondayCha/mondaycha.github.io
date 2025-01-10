## 前期学习

- [Git-Day1](Git-Day1.md)
- [Git-Day2](Git-Day2.md)
- [Git-Day3](Git-Day3.md)

## 使用技巧

- [如何使用 Git 从远程仓库获取所有分支](%E5%A6%82%E4%BD%95%E4%BD%BF%E7%94%A8Git%E4%BB%8E%E8%BF%9C%E7%A8%8B%E4%BB%93%E5%BA%93%E8%8E%B7%E5%8F%96%E6%89%80%E6%9C%89%E5%88%86%E6%94%AF.md)

## Git 初始化配置

### SSH Keys

> [Sign in to GitHub · GitHub](https://github.com/settings/ssh/new)

```bash
ssh-keygen -t ed25519
```

### Config

```bash
git config --local user.name "mondaycha"
git config --local user.email "mondaycha@outlook.com"

git config --local user.name "liyilong"
git config --local user.email "liyilong@act.buaa.edu.cn"
```

### Repo

```bash
echo "# deep-learning-system" >> README.md
git init
git add README.md
git commit -m "first commit"
git branch -M main
git remote add origin git@github.com:MondayCha/deep-learning-system.git
git push -u origin main
```

## 删除历史中的敏感数据

> [Removing sensitive data from a repository](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/removing-sensitive-data-from-a-repository)

这里提供了两种方案，BFG 需要安装 Java 运行时，而 `git filter-repo` 需要 Python 运行环境。后者好像更方便一些。

```bash
sudo apt install git-filter-repo
git filter-repo --invert-paths --path PATH-TO-YOUR-FILE-WITH-SENSITIVE-DATA
git remote add origin REPOSITORY-ADDRESS
git push origin --force --all
git push origin --force --tags
```

## 修改已提交的代码文件

> 因为发现 Commit 里不小心包含了 lint，需要修改已经提交的内容

```bash
git rebase -i HEAD^
# 将标记位修改为 edit
# 修改文件
git add .
git commit --amend
git rebase --continue
git push myfork master --force
```

## 无法连接到 Github

在 PowerShell 中配置 Git 使用特定端口（如 10809）的代理，可以通过设置 Git 的全局配置来实现。具体来说，你需要设置 Git 的 `http.proxy` 配置项。这里是一个如何设置的步骤指南：

1. **打开 PowerShell**：首先，打开一个 PowerShell 窗口。

1. **设置 Git 代理**：使用以下命令设置 Git 的代理。这里假设你的代理服务器运行在 `127.0.0.1` 的 `10809` 端口上：

   ```powershell
   git config --global http.proxy http://127.0.0.1:10809
   git config --global https.proxy https://127.0.0.1:10809
   ```

   这会将 Git 的 HTTP 和 HTTPS 代理设置为本地的 `10809` 端口。

1. **验证配置**：为了确认代理设置是否生效，你可以查看 Git 的全局配置：

   ```powershell
   git config --global --list
   ```

   这个命令会列出所有全局配置，你应该能看到刚才设置的代理地址。

请注意，如果你的代理服务器需要认证，你可能还需要在代理地址中包含用户名和密码。此外，如果你不再需要使用代理，可以通过以下命令来移除这些设置：

```powershell
git config --global --unset http.proxy
git config --global --unset https.proxy
```

请确保你了解使用代理的安全性和隐私方面的影响，特别是在包含认证信息的情况下。

## 批量删除本地和远程仓库的所有 Tag

```
git show-ref --tag | awk '{print ":" $2}' | xargs git push origin

```
