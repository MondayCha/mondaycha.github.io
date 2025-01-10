---
title: 操作系统 OS Lab0
---

## 练习0.1

在 bash 中分别输入

```
echo “Hello Ubuntu”

bash –version

ls
```

三条命令，简单思考其回显结果

## 思考0.1

通过你的使用经验，简单分析 CLI Shell，GUI Shell 在你使用过程中的各自优劣（100 字以内）

## 练习 0.2

执行如下命令,并查看结果

```
echo first
echo second > output.txt
echo third > output.txt
echo forth > > output.txt
```

ctags，很好用的小工具

(若实验环境中tree命令无效，输入sudo apt-get install tree命令安装，后面locate、tmux等同理)

## 练习0.3

在/home/17xxxxxx_2019_jac/learnGit（已init）目录下创建一个名为README.txt的文件。这时使用 git status > Untracked.txt 。

在 README.txt 文件中随便写点什么，然后使用刚刚学到的 add 命令，再使用 git status > Stage.txt 。

之后使用上面学到的 Git 提交有关的知识把 README.txt 提交，并在提交说明里写入自己的学号。

使用 cat Untracked.txt 和 cat Stage.txt，对比一下两次的结果，体会一下README.txt 两次所处位置的不同。

修改 README.txt 文件，再使用 git status > Modified.txt 。

使用 cat Modified.txt ，观察它和第一次 add 之前的 status 一样吗，思考一 下为什么？

## 思考题 0.2

使用你知道的方法（包括重定向）创建下图内容的文件（文件命名为test），将创建该文件的命令序列保存在command文件中，并将test文件作为批处理文件运行，将运行结果输出至result文件中。给出command文件和result文件的内容，并对最后的结果进行解释说明（可以从test文件的内容入手） 具体实现的过程中思考下列问题：echo echo Shell Start 与 echo 'echo Shell Start'效果是否有区别 echo echo \$c>file1 与 echo 'echo \$c>file1' 效果是否有区别

## 思考题 0.3

仔细看看这张图，思考一下箭头中的 add the file 、stage the file 和commit 分别对应的是 Git 里的哪些命令呢？

## 思考题0.4

深夜，小明在做操作系统实验。困意一阵阵袭来，小明睡倒在了键盘上。等到小明早上醒来的时候，他惊恐地发现，他把一个重要的代码文件printf.c删除掉了。苦恼的小明向你求助，你该怎样帮他把代码文件恢复呢？

正在小明苦恼的时候，小红主动请缨帮小明解决问题。小红很爽快地在键盘上敲下了git rm printf.c，这下事情更复杂了，现在你又该如何处理才能弥补小红的过错呢？

处理完代码文件，你正打算去找小明说他的文件已经恢复了，但突然发现小明的仓库里有一个叫Tucao.txt，你好奇地打开一看，发现是吐槽操作系统实验的，且该文件已经被添加到暂存区了，面对这样的情况，你该如何设置才能使Tucao.txt在不从工作区删除的情况下不会被git commit指令提交到版本库？

## 练习0.4

找到我们在/home/17xxxxxx_2019_jac/下刚刚创建的README.txt，没有的话就新建一个。

在文件里加入Testing 1，add，commit，提交说明写 1。

模仿上述做法，把1分别改为 2 和 3，再提交两次。

使用 git log命令查看一下提交日志，看是否已经有三次提交了？记下提交说明为 3 的哈希值1。

开动时光机！使用 git reset --hard HEAD^ ，现在再使用git log，看看什么没了？

找到提交说明为1的哈希值，使用 `git reset --hard <Hash-code>` ，再使用git log，看看什么没了？

现在我们已经回到过去了，为了再次回到未来，使用 `git reset --hard <Hash-code>` ，再使用git log，我胡汉三又回来了！

## 思考题0.5

思考下面四个描述，你觉得哪些正确，哪些错误，请给出你参考的资料或实验证据。

克隆时所有分支均被克隆，但只有HEAD指向的分支被检出。

克隆出的工作区中执行 git log、git status、git checkout、git commit等操作不会去访问远程版本库。

克隆时只有远程版本库HEAD指向的分支被克隆。

克隆后工作区的默认分支处于master分支。

## 练习0.5

仔细回顾一下上面这些指令，然后完成下面的任务

在 /home/17xxxxxx_2019_jac/17xxxxxx-lab下新建分支，名字为Test

切换到Test分支，添加一份readme.txt，内容写入自己的学号

将文件提交到本地版本库，然后建立相应的远程分支。

:::note
这是一篇从Hexo迁移的文章，创建于2020-03-02 07:59:59
:::
