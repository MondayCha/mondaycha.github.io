---
title: Git-Day3
---

### 工作区和暂存区

- 工作区：在电脑下的工作目录
- 版本库：工作区下的隐藏目录`.git`
- 暂存区：stage(index)

引评论区 @九只蜗牛Leo 的例子：

> 感觉大家把简单问题复杂化了，看着头晕，
>
> Git管理的文件分为：工作区，版本库，版本库又分为暂存区stage和暂存区分支master(仓库)
>
> 工作区>>>>暂存区>>>>仓库
>
> git add把文件从工作区>>>>暂存区，git commit把文件从暂存区>>>>仓库，
>
> git diff查看工作区和暂存区差异，
>
> git diff --cached查看暂存区和仓库差异，
>
> git diff HEAD 查看工作区和仓库的差异，
>
> git add的反向命令git checkout，撤销工作区修改，即把暂存区最新版本转移到工作区，
>
> git commit的反向命令git reset HEAD，就是把仓库最新版本转移到暂存区。

### 管理修改

如果不使用`git add`添加到暂存区，那么就不会添加到`commit`中。

### 撤销修改

场景1：当你改乱了工作区某个文件的内容，想直接丢弃工作区的修改时，用命令`git checkout -- file`。

场景2：当你不但改乱了工作区某个文件的内容，还添加到了暂存区时，想丢弃修改，分两步，第一步用命令`git reset HEAD `，就回到了场景1，第二步按场景1操作。

场景3：已经提交了不合适的修改到版本库时，想要撤销本次提交，参考版本回退一节，不过前提是没有推送到远程库。

### 删除文件

从版本库中删除文件`git rm`

并且使用`git commit`进行提交操作

```c
$ git rm test.txt
rm 'test.txt'

$ git commit -m "remove test.txt"
[master d46f35e] remove test.txt
 1 file changed, 1 deletion(-)
 delete mode 100644 test.txt
```

`git checkout`是用版本库里的版本替换工作区的版本，无论工作区是修改还是删除，都可以“一键还原”。

### 远程仓库

ssh密钥的配置在研究HEXO的时候做过了，感动！

### 添加远程库

origin: Git远程库的名字

```
$ git push -u origin master
```

只要本地作了提交，就可以通过命令：

```c
$ git push origin master
```

把本地`master`分支的最新修改推送至GitHub，现在，你就拥有了真正的分布式版本库！

- 要关联一个远程库，使用命令`git remote add origin git@server-name:path/repo-name.git`；
- 关联后，使用命令`git push -u origin master`第一次推送master分支的所有内容；
- 此后，每次本地提交后，只要有必要，就可以使用命令`git push origin master`推送最新修改；

### 从远程库克隆

- 要克隆一个仓库，首先必须知道仓库的地址，然后使用`git clone`命令克隆。
- Git支持多种协议，包括`https`，但通过`ssh`支持的原生`git`协议速度最快。

我在学习Hexo的时候用的是`https`协议，而采用`git`协议的参考样例如下——

```
$ git clone git@github.com:michaelliao/gitskills.git
Cloning into 'gitskills'...
remote: Counting objects: 3, done.
remote: Total 3 (delta 0), reused 0 (delta 0), pack-reused 3
Receiving objects: 100% (3/3), done.
```

:::note
这是一篇从Hexo迁移的文章，创建于2020-02-09 20:34:45
:::
