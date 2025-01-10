- [Project #0 - C++ Primer | CMU 15-445/645 :: Intro to Database Systems (Fall 2022)](https://15445.courses.cs.cmu.edu/fall2022/project0/)
- [Project #0 - C++ Primer | CMU 15-445/645 :: Intro to Database Systems (Spring 2023)](https://15445.courses.cs.cmu.edu/spring2023/project0/)

# 关系代数 (Based on sets)

- SELECT `σ`
- PROJECTION（投影）`π`
- UNION`∪`
- INTERSECTION`∩`
- DIFFERENCE（R-S）`-`
- PRODUCT（笛卡尔积）`×`
- JOIN`⋈`

# SQL

- DML/DDL/DCL
  - 数据操作语言（DML）：SELECT，INSERT，UPDATE，DELETE。
  - 数据定义语言（DDL）：模式定义。
  - 数据控制语言（DCL）：安全性，访问控制。
- char 类型和 varchar 类型的比较，可能不会对齐，所以可能返回 false。

# 存储引擎

> [Database Storage - open-courses](https://zhenghe.gitbook.io/open-courses/cmu-15-445-645-database-systems/database-storage)

- volatile: 易失的
  - CPU Registers
  - CPU Caches
  - Dram
- Non-volatile (按照块存储)
  - SSD/HDD/Network Storage/Tape

## Database pages

- postgreSQL (read as postgress)
- Log Structured (KV)
