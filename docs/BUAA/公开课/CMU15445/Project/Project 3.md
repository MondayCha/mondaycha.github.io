拉取新分支：

```bash
git fetch public
git merge public/master
```

## 课程页面

- [Project #3 - Query Execution](https://15445.courses.cs.cmu.edu/spring2023/project3/)

## 博客

### 2021

- [CMU 15-445: project3 - Query Execution](https://jameywoo.github.io/post/cmu15-445/project3-query-execution/)
- [CMU15445-project3-满分收获总结_Korpse 的博客-CSDN 博客](https://blog.csdn.net/Kprogram/article/details/125837906)
- [CMU-15445 Lab 3 笔记](https://deepz.cc/2022/07/cmu15445-lab3/)
- [Project 3 : QUERY EXECUTION](https://github.com/jlu-xiurui/CMU15445-2021-FALL/blob/ghess/p2-refinement/notes/Project%203%20%20QUERY%20EXECUTION.md)

### 2022

- [做个数据库：2022 CMU15-445 Project3 Query Execution - 知乎](https://zhuanlan.zhihu.com/p/587566135)
- [CMU15-445 Project.3 总结_犬兄的海角的博客-CSDN 博客](https://blog.csdn.net/weixin_43825194/article/details/129394446)

### 优化 & 拓展

- [CMU15445 课程项目 BusTub 查询引擎解析 - 知乎](https://zhuanlan.zhihu.com/p/602413477)
- [CMU 15445-2022 P3 Query Optimize - 知乎](https://zhuanlan.zhihu.com/p/593909820)
- [CMU 15-445 2022 Project 3 Query Execution - 知乎](https://zhuanlan.zhihu.com/p/609571136)
- [[VLDB 06]Cost-based query transformation in Oracle 论文学习 - 知乎](https://zhuanlan.zhihu.com/p/595947967)
- [数据库经典论文学习-优化器&执行器 - 知乎](https://www.zhihu.com/column/c_1590335398940659712)
- [Teradata 文档 | 快速访问技术手册](https://docs.teradata.com/r/8mHBBLGP88~HK9Auie2QvQ/4PC2qalhztpNrpq9R~zpDw)
- [SQL 优化流程简介 | PingCAP 文档中心](https://docs.pingcap.com/zh/tidb/stable/sql-optimization-concepts)

## 学习

### 1. `++i` 与 `i++` 的区别？

`++i` 的内部类定义为 `T& T:: operator++();`，而 `i++` 的内部类定义为 `T T:: operator++(int);`，前置操作返回引用，后置操作返回值。后置操作的 `int` 参数是一个虚拟参数，用于区分运算符 `++` 的前置和后置。

在 Project 2 中，我们的 B+Tree 迭代器仅实现了 `auto INDEXITERATOR_TYPE:: operator++() -> INDEXITERATOR_TYPE &` 这一前置操作方法，测试代码也是使用前置操作：

```c++
  // test/storage/b_plus_tree_insert_test.cpp
  // InsertTest3
  for (auto iterator = tree.Begin(index_key); iterator != tree.End(); ++iterator) {
    ...
  }
```

理论上，`i++` 会产生临时对象，实践中，编译器会对内置类型进行优化；而对于自定义类型（如这里的 Iterator），`++i` 的性能通常优于 `i++`。

### 2. Join 的实现

> [详解 Mysql LEFT JOIN 和 JOIN 查询区别及原理_Young 丶的博客-CSDN 博客](https://blog.csdn.net/agonie201218/article/details/106993948)

- 三种 Join 的实现方式：
  - Simple Nested-Loop Join
  - Index Nested-Loop Join
  - Block Nested-Loop Join

### 3. Nested Loop Join 的实现

Spring 2023 中 `src/include/execution/execution_engine.h` 新增了函数 `PerformChecks` ，要求 `casted_right_executor->GetInitCount() + 1 >= casted_left_executor->GetNextCount()`。

### 4. Class template specialization of 'hash' not in a namespace enclosing 'std'

## 测试

### 1. Insert / Delete / Update

```sql
CREATE TABLE t1(v1 INT, v2 VARCHAR(100), v3 INT);
SELECT * FROM t1;
INSERT INTO t1 VALUES (1, 'a', 1), (2, 'b', 2), (3, 'c', 3), (4, 'd', 4), (5, 'e', 5);
UPDATE t1 SET v2 = 'm' WHERE v1 = 1;
```

### 2. Index Scan

```sql
CREATE TABLE t2(v3 int, v4 int);
INSERT INTO t2 VALUES (5, 5), (2, 2), (3, 3), (1, 1), (4, 4);
CREATE INDEX t2v3 ON t2(v3);
SELECT * FROM t2 ORDER BY v3;
SELECT * FROM t2;
```

> test/sql/p3.06-empty-table.slt

```sql
create table t1(v1 int);
select * from t1;
delete from t1;
create index t1v1 on t1(v1);
select * from t1 order by v1;
insert into t1 values (1);
```

> test/sql/p3.05-index-scan.slt

```sql
create table t1(v1 int, v2 int, v3 int);
create index t1v1 on t1(v1);
insert into t1 values (5, 10, 445), (4, 20, 445), (7, -10, 645), (3, 30, 645), (1, 50, 645), (6, 0, 721), (2, 40, 721);
update t1 set v3 = 645, v1 = 8, v2 = -20 where v1 = 2;
select * from t1 order by v1;
```

### 3. Aggregate

```sql
CREATE TABLE t2(v3 int, v4 int);
SELECT count(*) FROM t2;
INSERT INTO t2 VALUES (5, 5), (5, 2), (5, 3), (1, 1), (1, 4);
SELECT count(*) FROM t2;
SELECT count(v3) FROM t2;
SELECT t2.v3, MAX(t2.v4), MIN(v4) FROM t2 GROUP BY t2.v3;
```

### 4. Leaderboard 1

```sql
CREATE TABLE t1(x INT, y INT, z INT);
CREATE INDEX t1xy ON t1(x, y);
insert into t1 values (1,-2,3), (-2,-3,4), (3,-4,5);
insert into t1 values (1,-7,3), (-2,-8,4), (3,-2,5);
insert into t1 values (100,10,36), (111,10,4), (30,10,50);
SELECT * FROM t1 WHERE x >= 90 AND y = 10;
explain SELECT * FROM t1 WHERE x >= 90 AND y = 10;

create table t1(v1 int, v2 int, v3 int);
insert into t1 values (1, 50, 645), (2, 40, 721), (4, 20, 445), (5, 10, 445), (3, 30, 645);
create index t1v1 on t1(v1);
create index t1v2 on t1(v2);
create index t1v1v3 on t1(v1, v3);
create index t1v3v1 on t1(v3, v1);
create index t1v2v3 on t1(v2, v3);
create index t1v3v2 on t1(v3, v2);
insert into t1 values (6, 0, 721), (7, -10, 645);
update t1 set v3 = 645, v1 = 8, v2 = -20 where v1 = 2;
select * from t1 order by v1;
delete from t1;
insert into t1 values (6, 0, 445), (7, -10, 645), (8, 10, 445);
select * from t1 order by v3, v2;
```

### 5. Leaderboard 3

```sql
CREATE TABLE t1(x INT, y INT, z INT);
insert into t1 values (1,2,3);
select * from t1 where 1=1;
select * from t1 where 1=1 and 1=2;
explain select * from t1 where 1=1 and 1=2;

CREATE TABLE t7(v INT, v1 INT, v2 INT);
CREATE TABLE t8(v INT, v1 INT, v2 INT, v3 INT, v4 INT);
insert into t7 values (1,2,3), (1,3,4);
explain SELECT v, d1, d2 FROM (
  SELECT v,
         MAX(v1) AS d1, MIN(v1), MAX(v2), MIN(v2),
         MAX(v1) + MIN(v1), MAX(v2) + MIN(v2),
         MAX(v1) + MAX(v1) + MAX(v2) AS d2
    FROM t7 LEFT JOIN (SELECT v4 FROM t8 WHERE 1 == 2) ON v < v4
    GROUP BY v
);

create table t1(id int);
create table t2(id int);
explain select * from t1 left join t2 on 1 = 1 where (t1.id = t2.id) and (t2.id = 1 or t1.id =1) and t1.id =2;
explain select * from t1, t2 where (t1.id = t2.id) and (t2.id = 1 or t1.id =1) and t1.id =2;
```

### 6. Leaderboard 2

```sql
create table t1(id int);
create table t2(id int);
explain select * from t1 left join t2 on 1 = 1 where (t1.id = t2.id) and (t2.id = 1 or t1.id =1) and t1.id =2;
explain select * from t1, t2 where (t1.id = t2.id) and (t2.id = 1 or t1.id =1) and t1.id =2;

CREATE TABLE t4(x int, y int);
CREATE TABLE t5(x int, y int);
CREATE TABLE t6(x int, y int);
explain SELECT * FROM t4, t5, t6
  WHERE (t4.x = t5.x) AND (t5.y = t6.y) AND (t4.y >= 1000000)
    AND (t4.y < 1500000) AND (t6.x >= 100000) AND (t6.x < 150000);
```

### 7. P4

```sql
create table t1(v1 int, v2 int, v3 int);
insert into t1 values (5, 10, 445), (4, 20, 445), (7, -10, 645), (3, 30, 645), (1, 50, 645), (6, 0, 721), (2, 40, 721);
CREATE TABLE t2(v3 int, v4 int);
INSERT INTO t2 VALUES (5, 5), (5, 2), (5, 3), (1, 1), (1, 4);

explain select * from t1 left join t2 on 1=1 where t2.v3 > 4;
```
