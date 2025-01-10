---
title: 操作系统 OS Lab1 实验报告
---

# OS Lab1 实验报告

## 一、实验思考题

### 思考题0.1

也许你会发现我们的readelf程序是不能解析之前生成的内核文件(内核文件是可执行文件)的，而我们之后将要介绍的工具readelf则可以解析，这是为什么呢？(提示：尝试使用readelf -h，观察不同)

**答：**

通过`readelf -h`可以发现，我们之前生成的内核文件vmlinux是大尾端elf文件，而测试使用的testELF是小尾端elf文件。

```shell
~/work/18373580-lab/gxemul$ readelf -h vmlinux
ELF Header:
  Magic:   7f 45 4c 46 01 02 01 00 00 00 00 00 00 00 00 00
  Class:                             ELF32
  Data:                              2's complement, big endian
  ...
  
~/work/18373580-lab/gxemul$ readelf -h ../readelf/testELF
ELF Header:
  Magic:   7f 45 4c 46 01 01 01 00 00 00 00 00 00 00 00 00
  Class:                             ELF32
  Data:                              2's complement, little endian
  ...
```

由于我们的readelf程序尚未完善，目前只能在小尾端环境下运行，无法正确读取大尾端elf文件的内容，因此不能正确输出段头表内信息。在Lab1-extra中通过对readelf的补充修改，就可以进行解析了。

### 思考题0.2

内核入口在什么地方？main 函数在什么地方？我们是怎么让内核进入到想要的 main 函数的呢？又是怎么进行跨文件调用函数的呢？

**答：**

内核在kseg0内，main 函数在User Space(kuseg)内。

在本次Lab1中，scse0_3.lds里通过`ENTRY(_start)`指令指定了`start.S`中的`_start()`函数指向内核入口。main 函数路径为`init/main.c`。

`_start()`函数初始化CPU，设置栈指针，通过`jal`指令让内核跳转到main函数。在链接可执行文件之后通过跳转指令跨文件调用函数。

## 二、实验难点图示

不传图了

## 三、体会与感想

\*\*Lab1难度评价：\*\*★★★☆☆

\*\*Lab1-extra难度评价：\*\*★★★☆☆

\*\*花费时间：\*\*Lab1 9h，Lab1-extra2h

**体会和感想：**

在Lab1我感受到了深深的恐惧。我意识到了如果我不再采取策略，很快我就会难以跟上目前的进度。

在这一节中难点是print函数的补充，然而一开始我却毫无思路，参考PPT和Ausar的指导书补充才填写出来；而在Lab1-extra，我花费了大量的时间de翻转函数的bug，如果是课上测试的话根本做不出；思考题0.2更是让我一头雾水，不清楚题目表达的意思。

目前正在读指导书和ELF手册，我非常迷茫，但OO将占据我的另一大半时间……完全不清楚要采取什么策略来学习，也只能走一步看一步了。

最后是对于接下来Lab的想法：

- 在开始Lab之前，获取全部资料（Lab1的资料我觉得很分散，让人摸不到头脑）
- 对于不理解的内容，搜集相关资料（但真的太杂了，系统差别也大）

祈祷我能存活下去吧。

:::note
这是一篇从Hexo迁移的文章，创建于2020-03-21 18:37:09
:::
