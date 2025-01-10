某日，例行打了一晚上牌之后开始焦虑。在知乎上翻到了 [23 届小硕秋招分享-数据库/存储方向 - 知乎](https://zhuanlan.zhihu.com/p/593252104) ，于是决定开始学习数据库。

跟着看了两节 Andy 的视频课（2022 Fall），于是先从 Homework 1 SQL 写起。实话实说，除了第一道送分题（哦不，这道题是 0 分），剩下的题目没有做的轻松的……

做题时参考的工具和资源：

- 试题： [Homework #1 - SQL | CMU 15-445/645 :: Intro to Database Systems (Spring 2023)](https://15445.courses.cs.cmu.edu/spring2023/homework1/)
- [评测脚本](https://github.com/MondayCha/Learning/blob/main/db/homework1/autograde.sh) ：在 [CMU 15-445: Database Systems - CS自学指南](https://csdiy.wiki/%E6%95%B0%E6%8D%AE%E5%BA%93%E7%B3%BB%E7%BB%9F/15445/) 分享的 Shell 脚本的基础上，做了一些修改：
  - 使用 2023 年的参考答案
  - 增加了跳过已通过测试的功能（会在 SQL 文件头打上 `--passed--` 的注释）
- SQL 命令参考：
  - 某位大佬整理的课堂笔记： [Advanced SQL - open-courses](https://zhenghe.gitbook.io/open-courses/cmu-15-445-645-database-systems/advanced-sql)
  - 查一些具体的命令： [SQL 教程](https://www.w3schools.cn/sql/default.html)

下面是我踩过的坑的环节……希望有一天再次看到这篇文章的时候我已经学会了。

## q2_not_the_same_title

- 字符串拼接方法：在 SQLite 中是使用 `||` 符号。
- SQL 中的不等于：符合 SQL-92 标准的应该是 `<>` 符号。
- 筛选条件：题目告诉我们「Note a work is `Action` even if it is categorized in multiple genres, as long as `Action` is one of the genres」，所以不能直接判断字段是否等于 `Action`，但因为英语苦手，挺后面才看到这句话的。

```sql
WHERE primary_title <> original_title
    AND genres like '%Action%'
    AND type = 'movie'
```

## q3_longest_running_tv

学到了 SQL 中的 `CASE` 语句。

## q5_german_type_ratings

一开始我的第一条结果的平均分是 6.63，和答案的 6.65 对不上。后来发现是在不需要的地方加了 `DISTINCT`，`title` 和 `akas` 并不是一对一的关系，而结果是不需要去重的。错误的答案如下：

```sql
SELECT tmp_titles.type,
    ROUND(AVG(ratings.rating), 2) AS average,
    MIN(ratings.rating),
    MAX(ratings.rating)
FROM (
        SELECT DISTINCT(titles.title_id) AS title_id,
            titles.type AS type
        FROM titles
            INNER JOIN akas ON titles.title_id = akas.title_id
        WHERE akas.language = 'de'
            AND akas.types IN ('imdbDisplay', 'original')
    ) AS tmp_titles
    INNER JOIN ratings ON ratings.title_id = tmp_titles.title_id
GROUP BY tmp_titles.type
ORDER BY average;
```

将这里的 `DISTINCT` 去掉就对了，这里我还是没有太明白……

```sql
SELECT titles.type,
    ROUND(AVG(ratings.rating), 2) AS average,
    MIN(ratings.rating),
    MAX(ratings.rating)
FROM titles
    INNER JOIN akas ON titles.title_id = akas.title_id
    INNER JOIN ratings ON ratings.title_id = titles.title_id
WHERE akas.language = 'de'
    AND akas.types IN ('imdbDisplay', 'original')
GROUP BY titles.type
ORDER BY average;
```

## q6_who_played_a_batman

需要先建立一个参演过蝙蝠侠的演员的临时表，再找到他对应的作品。这里同样纠结了一下作品是否是需要作为演员的，对了下答案发现不用。

```sql
FROM actors AS a
    INNER JOIN crew AS c ON c.person_id = a.person_id
    INNER JOIN ratings AS r ON c.title_id = r.title_id -- WHERE c.category = "actor"
```

## q7_born_with_prestige

英语太烂了，不知道男演员和女演员是两个词……`actor` 一把梭。

## q8_directing_rose.sql

吸取了前一题英语太差的教训，这次我明白了应该找 `actress` 了。但是在对「an actress with first name "Rose"」的理解上，出现了偏差：

- 我以为需要只有 Rose 或者是匹配 `'Rose %'` 的模式
- 看了下答案发现 `LIKE 'Rose%'` 就可以了，所以 Rosemary、Rosetta 云云也是 Rose。

## q9_ode_to_the_dead

感觉是难度最大的一道题，我的思路很不清晰。一开始想的是先建立一个包含 `category` 的 Set，然后想办法用 CTE 去遍历整张表，但也不会写。

后来偷看了一下答案发现原来有 `DENSE_RANK` 这种神仙函数，之后就慢慢改了。

## q10_all_played_by_leo

做完第 9 题竟然感觉这道题还好……我不知道 `json_each` 这个函数，所以是参考提示使用递归的 CTE 去做，后来发现答案连双引号都去掉了，所以加了额外的 `REPLACE`。

## 总结

总结一下就是如果不对答案一个也写不对，也感觉到了一点点 SQL 和一般语言的差异。从早上 9 点写到下午 15 点，中午把昨天炖的排骨热了下吃了，对我个人来说还是很吃力的。

希望研究生入学前，最好这两个月，就能把这门课做完，要不然我这一年真的就啥也没学会了……
