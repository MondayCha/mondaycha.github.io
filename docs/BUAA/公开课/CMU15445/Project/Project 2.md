## Course

- [Project #2 - B+Tree | CMU 15-445/645 :: Intro to Database Systems (Spring 2023)](https://15445.courses.cs.cmu.edu/spring2023/project2/)

## Homework

[Homework 2](../Homework/Homework%202.md)

## References

- [[已满分在线评测] cmu15445 2022 PROJECT #2 B+Tree Index - Alyjay - 博客园](https://www.cnblogs.com/alyjay/p/16885958.html)
- [CMU 15-445 Project #2 B+Tree 题解 通过 B+树实现索引_AntiO2 的博客-CSDN 博客](https://blog.csdn.net/AntiO2/article/details/129402394)
- [CMU-15-445/Lab2-B-Tree at master · liu-jianhao/CMU-15-445 · GitHub](https://github.com/liu-jianhao/CMU-15-445/tree/master/Lab2-B-Tree)
- [CMU 15445-2022 P2 B+Tree Insert/Delete - 知乎](https://zhuanlan.zhihu.com/p/592964493)
- [CMU 15445-2022 P2 B+Tree Concurrent Control - 知乎](https://zhuanlan.zhihu.com/p/593214033)
- [CMU 15445 Project2 B+TREE | 简单的谈一谈 B+树 - 知乎](https://zhuanlan.zhihu.com/p/382244184)
- [做个数据库：2022 CMU15-445 Project2 B+Tree Index - 知乎](https://zhuanlan.zhihu.com/p/580014163)
- [[已满分]CMU 数据库(15-445)实验 2-b+树索引实现(上) - 周小伦 - 博客园](https://www.cnblogs.com/JayL-zxl/p/14324297.html)

## 可视化

- [BusTub B+Tree Printer](https://15445.courses.cs.cmu.edu/fall2022/bpt-printer/)

## 优化

- [CMU15445 学习经验(附简单的 b+树优化策略） - 知乎](https://zhuanlan.zhihu.com/p/590579860)

## 思考

- 重复的 key 应该如何实现？

## 关于 C++

### `(void)ctx` 的作用？

在 `b_plus_tree.cpp` 中可以看到这样的代码：

```c++
  // Declaration of context instance.
  Context ctx;
  (void)ctx;
```

- 禁止编译器警告未使用的参数。
- [c - Why cast an unused function parameter value to void? - Stack Overflow](https://stackoverflow.com/questions/4647665/why-cast-an-unused-function-parameter-value-to-void)

Checkpoint 1 要求我们实现 B+ 树的插入、查询、迭代功能。起初我打算按顺序实现每个 Task 的功能，但着实是一头雾水：比如 Task 1 要求我们实现 B+Tree Page、B+Tree Leaf Page、B+Tree Internal Page 这三个类， 但这时还没有写 B+ 树的查询和插入功能，因此我并不清楚这三个类到底该做什么。

参考教材的伪代码，我完成 Checkpoint 1 的顺序是：先写 B+ 树的查询方法，补充节点的 Get/Set 方法、中间节点的二分查找功能；再写 B+ 树的插入方法，补充叶子节点和中间节点的分裂功能；最后实现迭代器。
