# Courses

> - [高级数据库十二：数据库压缩_数据库高级压缩_SuPhoebe 的博客-CSDN 博客](https://blog.csdn.net/u013007900/article/details/78920781)
> -

## OLAP 列压缩

- Null Suppression
  - 数据中连续的零或空白被替换为有多少和哪里存在的描述。
- Run-length Encoding
  - 三元组：值、起始位置、长度
  - 需要排序以最大化压缩效率
- Bitmap Encoding
  - 为特定属性的每个唯一值存储单独的位图
- Delta Encoding
  - 记录在同一列中相互跟随的值之间的差异（时序）
- Incremental Encoding
  - 类似 Delta Encoding，字符串公共前缀
  - 解码的时候也需要一行一行地解
- Mostly Encoding
  - 如果属性的值 “大部分” 小于最大大小，则可以将它们存储为较小的数据类型
  - 将不能压缩的剩余值将以其原始格式存储
- Dictionary Encoding
  - 用较小的代码替换频繁的模式
  - DBMS 中最普遍的压缩方案
  - 支持范围查询：Order-Perserving Encoding

## 哈希表

> - [CMU 15445 5. hash 表 - 简书](https://www.jianshu.com/p/0bf2400786f6)
> - [Hash Tables - open-courses](https://zhenghe.gitbook.io/open-courses/cmu-15-445-645-database-systems/hash-tables)

### 静态 hash 结构

- Open Addressing
- Robin Hood Hashing
- Cuckoo Hashing
  - [布谷鸟哈希（Cuckoo hash） - 知乎](https://zhuanlan.zhihu.com/p/594818514)

### 动态 hash 结构

- Chained Hashing
  - Java：进化成红黑树
- Extendible Hashing
  - [数据库——可拓展哈希（Extendable Hashing） - 知乎](https://zhuanlan.zhihu.com/p/375039823)
  - [Extendible hashing](https://en.wikipedia.org/wiki/Extendible_hashing)
  -
- Linear Hashing
  - split pointer

### 哈希表一般不作为索引的原因

- 散列，难以范围查找

## B+ 树

- [Data Structure Visualization](https://www.cs.usfca.edu/~galles/visualization/Algorithms.html)
- [B+ Tree Visualization | B+ Tree Animation](https://dichchankinh.com/~galles/visualization/BPlusTree.html)

# Homework 2

在进行 Project 2 之前，我先完成了 Homework 2。个人觉得还是很值得做的：一方面，今年 P1 没有考察 Extendible Hash Table 的实现，作业可以巩固这方面知识；另一方面，听完课对 B+Tree 的理解确实还不够，通过作业手动推演插入与删除，也是一次绝妙的体验。

- **Storage Models**：考察了对 DSM 和 NSM 的理解，primary key 一定是唯一的。
- **Cuckoo Hashing**：最后问哪个数会导致死循环，对于 2 个桶的情况，如果处于替换队列上的 3 个数对 2 个 hash 函数都有相同的结果，就会导致死循环。
- **Extendible Hashing**：对「doubles the table’s size」来说，size 是指目前分配的桶的空间大小，还是使用 $2^{global\_depth}$ 呢？应该是后者。
- **B+Tree**：对于删除操作，课程组提供的可视化程序的结果和选项不太一样（如果想用程序模拟，插入的时候 5/7/22 中的某一个应该最后插入）。
