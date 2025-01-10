# Course

- [Project #1 - Buffer Pool | CMU 15-445/645 :: Intro to Database Systems (Spring 2023)](https://15445.courses.cs.cmu.edu/spring2023/project1/)

# 讲义

- [CMU 15445 4. 缓存层 - 简书](https://www.jianshu.com/p/0851421f4cb8)
- [Buffer Pools - open-courses](https://zhenghe.gitbook.io/open-courses/cmu-15-445-645-database-systems/buffer-pools)

# References

## Project 1

- [做个数据库：2022 CMU15-445 Project1 Buffer Pool Manager - 知乎](https://zhuanlan.zhihu.com/p/571927310)
- [cmu15445 2022 PROJECT #1 - BUFFER POOL - Alyjay - 博客园](https://www.cnblogs.com/alyjay/p/16709121.html)
- [CMU15445 2022 Project1-Buffer Pool Manager 攻略 - 知乎](https://zhuanlan.zhihu.com/p/593982056)

## LRU-K

- [缓存替换策略：LRU-K 算法详解及其 C++实现 CMU15-445 Project#1](https://blog.csdn.net/AntiO2/article/details/128439155)
- [LRU-K 和 2Q 缓存算法介绍 - 简书](https://www.jianshu.com/p/c4e4d55706ff)
- [LRU-K，2Q，LIRS 算法介绍与比较_PunWinger 的博客-CSDN 博客](https://blog.csdn.net/pun_c/article/details/50920469)

### 是否应该记录时间戳？

> 感觉这个 LRU-K 的实现不太对。因为 LRU-K 优先驱逐的是倒数第 K 个最远的，所以即使在 Cache 里面，再次访问也不一定会把记录提升到队头。
> 举个例子：
> 假如 K=3
> 已经插入了 1 1 1 2 2 2
> 如果再插入一次 1，按照 up 的方法会把 1 放在 cache_list 的队头，下次会优先驱逐 2
> 但是插入后的队列 1 1 1 2 2 2 1 按照倒数第 K 次出现的位置，2 的时间戳还是比 1 晚的，所以应该驱逐 1。就出现了问题（欢迎讨论）

[【CMU15-445/645】可扩展哈希与 LRU-K（代码篇）\_哔哩哔哩_bilibili](https://www.bilibili.com/video/BV1h14y1H7g1)

## Buffer Pool

- [CMU 15-445 (FALL 2022) Project #1 Buffer Pool 题解](https://blog.csdn.net/AntiO2/article/details/128554356)

# 传统 LRU

```c++
class LRUCache {
public:
    LRUCache(int capacity) : cap(capacity) {
    }

    int get(int key) {
        if (map.find(key) == map.end()) return -1;
        auto key_value = *map[key];
        cache.erase(map[key]);
        cache.push_front(key_value);
        map[key] = cache.begin();
        return key_value.second;
    }

    void put(int key, int value) {
        if (map.find(key) == map.end()) {
            if (cache.size() == cap) {
                map.erase(cache.back().first);
                cache.pop_back();
            }
        }
        else {
            cache.erase(map[key]);
        }
        cache.push_front({key, value});
        map[key] = cache.begin();
    }
private:
    int cap;
    list<pair<int, int>> cache;
    unordered_map<int, list<pair<int, int>>::iterator> map;
};
```

# C++

## 1. 构造函数问题

# 优化

- [CMU 15-445 Project 1 (Spring 2023) 优化记录 - 知乎](https://zhuanlan.zhihu.com/p/617466684)
- [CMU 15-445 P1 优化（偷分）攻略 - 知乎](https://zhuanlan.zhihu.com/p/644160340)
