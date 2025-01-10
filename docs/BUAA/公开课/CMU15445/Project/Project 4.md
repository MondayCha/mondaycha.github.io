- [Project #4 - Concurrency Control](https://15445.courses.cs.cmu.edu/spring2023/project4/)

## 讲义

### Gitbook

- [Concurrency Control Theory - open-courses](https://zhenghe.gitbook.io/open-courses/cmu-15-445-645-database-systems/concurrency-control-theory)
- [Fetching Title#v0ib](https://zhenghe.gitbook.io/open-courses/cmu-15-445-645-database-systems/two-phase-locking)

### 简书

- [CMU 15445 13.并发控制理论 - 简书](https://www.jianshu.com/p/b2070c903fde)
- [CMU 15445 14.二阶段锁定 + homework 4 - 简书](https://www.jianshu.com/p/3aa634b0567c)

### 视频

- [16-两阶段锁 [中文讲解] CMU-15445 数据库内核_哔哩哔哩_bilibili](https://www.bilibili.com/video/BV1AZ4y1Q7vx)

## 博客

- [【CMU15445】Project 4 - Concurrency Control | 册页晚的学习笔记](https://ceyewan.github.io/p/997e1890.html)
- [CMU15445-2022 P4 Concurrency Control - 知乎](https://zhuanlan.zhihu.com/p/600001968)
- [做个数据库：2022 CMU15-445 Project4 Concurrency Control - 知乎](https://zhuanlan.zhihu.com/p/592700870)
- [BusTub2022-Solution/BusTub-Lab4.md at master · Fischer0522/BusTub2022-Solution · GitHub](https://github.com/Fischer0522/BusTub2022-Solution/blob/master/BusTub-Lab4.md)

## Github

- [bustub/lock_manager.cpp at master · ejunjsh/bustub · GitHub](https://github.com/ejunjsh/bustub/blob/master/src/concurrency/lock_manager.cpp#L527)
- [cmu15445/lock_manager.cpp at master · JiahaoZou/cmu15445 · GitHub](https://github.com/JiahaoZou/cmu15445/blob/master/src/concurrency/lock_manager.cpp)
- [CMU15-445-2022fall/lock_manager.cpp at main · Jiodah/CMU15-445-2022fall · GitHub](https://github.com/Jiodah/CMU15-445-2022fall/blob/main/src/concurrency/lock_manager.cpp#L21)

## 实现

### Delete

```sql
bustub> explain delete from t1 where v1 = 1;
 === BINDER ===                                                          
 Delete { table=BoundBaseTableRef { table=t1, oid=22 }, expr=(t1.v1=1) } 
 === PLANNER ===                                                         
 Delete { table_oid=22 } | (__bustub_internal.delete_rows:INTEGER)       
   Filter { predicate=(#0.0=1) } | (t1.v1:INTEGER)                       
     SeqScan { table=t1 } | (t1.v1:INTEGER)                              
 === OPTIMIZER ===                                                       
 Delete { table_oid=22 } | (__bustub_internal.delete_rows:INTEGER)       
   SeqScan { table=t1, filter=(#0.0=1) } | (t1.v1:INTEGER)
```

### Index

```sql
CREATE TABLE nft(id INT, terrier INT);
CREATE INDEX nftid ON nft(id);
INSERT INTO nft VALUES (0, 0), (1, 1);
EXPLAIN UPDATE nft SET terrier = 2 WHERE id = 1;
EXPLAIN SELECT * FROM nft WHERE id = 1;
EXPLAIN SELECT * FROM nft;
SELECT * FROM nft WHERE id = 1;
```

## Q&A

### 1. For an insert operation, what should we locked? The rid is determined after the insert.

You can first insert then lock. This is a long-term bug to be fixed.

### 2. Halloween problem

- [SQL 中的 Halloween Problem - 知乎](https://zhuanlan.zhihu.com/p/36758138)
- test/sql/p3.03-update.slt \`update t1 set v3 = 445 where v1 >= 3;
