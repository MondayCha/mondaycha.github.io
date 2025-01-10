---
title: 操作系统 OS Lab2 学习笔记 「Part 1」
---

### 前言

挑战开始了，加油！！！

### 双向链表操作拾遗

在Exercise2.1，需要对双向链表进行操作。

![](https://pic.downk.cc/item/5e78981c5c56091129c65218.png)

在这里采用了一种特殊的链表形式，如上图（我找不到这个课件了，图片来自群成员）

链表的插入操作，对注释做了一点修正——

```c
// Note: assign a to b <==> a = b
//Step 1, assign elm.next to listelem.next.
//Step 2: Judge whether listelm.next is NULL, if not, then assign listelm.next.pre to a proper value.
//step 3: Assign listelm.next to a proper value.
//step 4: Assign elm.pre to a proper value.
```

这个设计感觉还是很巧妙的。

### 关于全局变量

```c
/* Step 1: Initialize basemem.
* (When use real computer, CMOS tells us how many kilobytes there are). */
basemem = 0x4000000;
maxpa = 0x4000000;
extmem = 0x0;
// Step 2: Calculate corresponding npage value.
npage = basenum >> 12;
```

后来看了一下在mmu.h里面有对SHIFT的定义，更严谨的来说应该是要写那个吧。

### 如何用命令行压缩文件

压缩服务器上当前目录的内容为xxx.zip文件

```
zip -r xxx.zip ./*
```

解压zip文件到当前目录

```
unzip filename.zip
```

这样就可以从实验环境copy代码了！

### 如何运行内核

```
gxemul -E testmips -C R3000 -M 64
```

后面可以跟vmlinux的地址，也可以写个sh脚本来运行。

### 课程群零散知识点收集

#### 2.1

1. 助教提示：typeof的使用
1. 注释提示错误：应该是listelm->field.next->field.prev

#### 2.2

1. npage指的是64MB/4KB
1. extra那个填0（原因：根据输出判断为0，另一方面我们就没有外置存储，gx模拟的时候没有模拟你额外插内存条）

### Debug记录

#### 1

Exercise2.1 双向链表操作错误

借助pb的test程序

#### 2

Exercise 2.4，输出如下结果——

```
-------------------------------------------------------------------------------

main.c: main is start ...

init.c: mips_init() is called

Physical memory: 65536K available, base = 65536K, extended = 0K

to memory 80401000 for struct page directory.

to memory 80431000 for struct Pages.

pmap.c:  mips vm init success

[ dev_mp: unimplemented relative addr 0x8 ]
[ dev_mp: unimplemented relative addr 0x14 ]
Segmentation fault (core dumped)
```

初步分析：与pmap.c中的三个函数填写有关

检查警告——

```
pmap.c: In function 'page_init':
pmap.c:183: warning: passing argument 1 of 'va2pa' from incompatible pointer type
pmap.c: In function 'page_alloc':
pmap.c:230: warning: passing argument 1 of 'bzero' makes pointer from integer without a cast
```

说明type不对，进行修改完成debug工作。

:::note
这是一篇从Hexo迁移的文章，创建于2020-03-24 01:54:36
:::
