---
title: 操作系统 OS Lab0 实验报告
---

# OS Lab0实验报告

## 一、实验思考题

### 思考题0.1

通过你的使用经验，简单分析 CLI Shell，GUI Shell 在你使用过程中的各自优劣（100 字以内）

**CLI Shell：**

- 优点：操作符合计算机工作逻辑，有利于我们理解计算机的工作方式；大部分情况下比GUI效率高
- 缺点：不直观，上手有一定门槛

**GUI Shell：**

- 优点：易用，更加直观，所见即所得
- 缺点：消耗资源大，效率低

### 思考题0.2

使用你知道的方法（包括重定向）创建下图内容的文件（文件命名为test），将创建该文件的命令序列保存在command文件中，并将test文件作为批处理文件运行，将运行结果输出至result文件中。给出command文件和result文件的内容，并对最后的结果进行解释说明（可以从test文件的内容入手）

具体实现的过程中思考下列问题：`echo echo Shell Start` 与 `echo 'echo Shell Start'`效果是否有区别；`echo echo \$c>file1` 与 `echo 'echo \$c>file1'` 效果是否有区别？

**command文件：**

```shell
touch test
echo 'echo Shell Start...' > test
echo 'echo set a = 1' >> test
echo 'a=1' >> test
echo 'echo set b = 2' >> test
echo 'b=2' >> test
echo 'echo set c = a+b' >> test
echo 'c=$[$a+$b]' >> test
echo 'echo c = $c' >> test
echo 'echo save c to ./file1' >> test
echo 'echo $c>file1' >> test
echo 'echo save b to ./file2' >> test
echo 'echo $b>file2' >> test
echo 'echo save a to ./file3' >> test
echo 'echo $a>file3' >> test
echo 'echo save file1 file2 file3 to file4' >> test
echo 'cat file1>file4' >> test
echo 'cat file2>>file4' >> test
echo 'cat file3>>file4' >> test
echo 'echo save file4 to ./result' >> test
echo 'cat file4>>result' >> test
```

**result文件：**

```shell
3
2
1
```

**效果是否有区别：**

`echo echo Shell Start` 与 `echo 'echo Shell Start'`效果没有区别，均在Shell中打印`echo Shell Start`内容。

```shell
$ echo echo Shell Start
echo Shell Start

$ echo 'echo Shell Start'
echo Shell Start
```

`echo echo \$c>file1` 与 `echo 'echo \$c>file1'` 效果有区别：前者将`echo $c`重定向至file1，后者在Shell中打印`echo \$c>file1`内容。

```shell
$ cat file1
3

$ echo echo \$c>file1

$ cat file1
echo $c

$ echo 'echo \$c>file1'
echo \$c>file1
```

### 思考题0.3

仔细看看这张图，思考一下箭头中的 add the file 、stage the file 和commit 分别对应的是 Git 里的哪些命令呢？

```shell
git add		// add the file
git add		// stage the file
git commit	// commit
```

### 思考题0.4

深夜，小明在做操作系统实验。困意一阵阵袭来，小明睡倒在了键盘上。等到小明早上醒来的时候，他惊恐地发现，他把一个重要的代码文件printf.c删除掉了。苦恼的小明向你求助，你该怎样帮他把代码文件恢复呢？

正在小明苦恼的时候，小红主动请缨帮小明解决问题。小红很爽快地在键盘上敲下了git rm printf.c，这下事情更复杂了，现在你又该如何处理才能弥补小红的过错呢？

处理完代码文件，你正打算去找小明说他的文件已经恢复了，但突然发现小明的仓库里有一个叫Tucao.txt，你好奇地打开一看，发现是吐槽操作系统实验的，且该文件已经被添加到暂存区了，面对这样的情况，你该如何设置才能使Tucao.txt在不从工作区删除的情况下不会被git commit指令提交到版本库？

**(1)帮小明把代码文件恢复：**

```shell
git checkout -- printf.c
```

**(2)弥补小红的过错：**

```shell
git reset HEAD printf.c
git checkout -- printf.c
```

**(3)删除暂存区文件：**

```shell
git rm --cached Tucao.txt
```

### 思考题0.5

思考下面四个描述，你觉得哪些正确，哪些错误，请给出你参考的资料或实验证据。

1. 克隆时所有分支均被克隆，但只有HEAD指向的分支被检出。

   错误。`git clone <远程仓库地址>`命令默认克隆master分支。

   如果要克隆子分支可以使用`git clone -b  <指定分支名> <远程仓库地址>`命令。

1. 克隆出的工作区中执行 git log、git status、git checkout、git commit等操作不会去访问远程版本库。

   正确。克隆出的工作区执行以上操作均是对本地版本库操作，需要用`git push`命令访问修改远程版本库。

1. 克隆时只有远程版本库HEAD指向的分支被克隆。

   正确。证据同(1)。

1. 克隆后工作区的默认分支处于master分支。

   正确。证据同(1)。

## 二、实验难点图示

不传图了……

## 三、体会与感想

\*\*难度评价：\*\*★★☆☆☆

\*\*花费时间：\*\*平台时间3h，查阅资料等5h左右

**体会和感想：**

Lab0要求我们了解实验环境，熟悉Linux 操作系统（Ubuntu），了解控制终端，掌握一些常用工具并能够脱离可视化界面进行工作。

虽然“本章节难度非常低”，但在进行实验时我还是遇到了不少阻力——对命令行界面不熟悉、编写Shell脚本时不清楚步骤的内涵、在使用Vim时忍不住“Ctrl+S”却阻断输入……要学习与熟悉的还有很多。

:::note
这是一篇从Hexo迁移的文章，创建于2020-03-06 08:30:59
:::
