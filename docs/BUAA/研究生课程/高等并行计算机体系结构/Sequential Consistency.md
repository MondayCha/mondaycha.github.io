## 目录

## 什么是内存一致性？==2

- Cache Coherence
- Memory Consistency

第一组的同学为我们介绍了缓存一致性 (Cache Coherence) 基于侦听和基于目录的两大机制，以及可能降低性能的伪共享问题。

在中文翻译里，缓存一致性 (Conherence) 和内存一致性 (Consistency) 中的”一致性”相同，但意义是不同的。

![Pasted image 20231111163213.png](accachments/Pasted%20image%2020231111163213.png)

前者关注多个 CPU 对同一内存地址的读写顺序，后者关注多个 CPU 对所有内存地址的读写顺序。

## 为什么需要内存一致性？==3

多个 CPU 对所有内存地址的读写会带来哪些问题？

![Pasted image 20231111160527.png](accachments/Pasted%20image%2020231111160527.png)

CPU 指令乱序执行：由于 CPU 乱序只保证单线程语义，因此无法解析因果关系。

Store-store reordering：如果某个 core 使用 non-FIFO write buffer，那么两个 store 操作就可能被重排。比如第一个 store 操作 cache miss 了，第二个命中了或者和更早的一个 store 合并了，第二个就能比第一个 store 更早地完成。

即使 core 没有改变指令的执行顺序，这样的 reordering 也可能发生。

![Pasted image 20231111161145.png](accachments/Pasted%20image%2020231111161145.png)

这个执行满足缓存一致性，因为没有违反 SWMR 属性（就是说在任意时刻只能有一个写者或多个读者），但并不符合我们对因果的认知。

- 缓存 coherence 不等于内存 consistency。
- 内存 consistency 实现可以将缓存 coherence 用作有用的“黑盒”。

## 谁应该关心内存一致性？==2

## 顺序一致性的定义 ==1

任何执行的结果与所有处理器（核心）的操作都以某种顺序执行的结果相同，并且每个单独的处理器（核心）的操作都以该顺序出现在其程序指定的顺序。

## 参考资料

- [A Primer on Memory Consistency and Cache Coherence (Second Edition) 翻译计划](https://github.com/kaitoukito/A-Primer-on-Memory-Consistency-and-Cache-Coherence)
- [wiki/Cache_coherence](https://en.wikipedia.org/wiki/Cache_coherence)
