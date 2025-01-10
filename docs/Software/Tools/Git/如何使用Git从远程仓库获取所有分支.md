---
title: 如何使用 Git 从远程仓库获取所有分支
---

```shell
git branch -r | grep -v '\->' | while read remote; do git branch --track "${remote#origin/}" "$remote"; done
git fetch --all
git pull --all
```

> 来源：Stackoverflow
>
> 链接：http://stackoverflow.com/questions/10312521/how-to-fetch-all-git-branches

::: note
这是一篇从 Hexo 迁移的文章，创建于 2020-03-24 01:00:36
:::
