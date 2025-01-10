# Assignment 1

## 1. 用动态规划方法手工求解下面的问题:

### 变量:

- 按月份划分阶段, $k$为阶段变量, 其中$k=1,2,3,4,5$
- $n_k$表示第$k$月的需要量
- 状态变量$x_k$表示在第$k$个月月初时的库存量, 其中$x_1=x_5=0$
- 决策变量$u_k(x_k)$表示库存量为$x_k$时, 第$k$月的生产批量, 其中$0 \leq u_k \leq 6$

### 状态转移方程:

$$
x_{k+1}=x_k+u_k-n_k
$$

### 指标函数:

- 指标函数$V_{k,n}$表示第$k$月初至第 5 月初的总花费, 包含生产产品成本费和库存费

- 阶段指标$d_k(x_k,u_k)$表示第$k$月以$x_k$的库存生产$u_k$单位产品的花费, 由生产一批产品的固定成本费为 3 (千元), 每生产单位产品的成本费为 1 (千元), 每单位产品的库存费用为每月 0.5 (千元)，有:
  $$
  d_k(x_k,u_k)=d(x_k,u_k)=0.5x_k+
  \left\{
  \begin{aligned}
  &0 && u_k=0 \\
  &3+u_k && u_k > 0
  \end{aligned}
  \right.
  $$

- 最优指标函数$f_k(x_k)$表示第$k$月初以$x_k$的库存至第 5 月初的最小花费, 需求出$f_1(0)$的值

### 递推关系式:

$$
\left\{
\begin{aligned}
f_k(x_k) & = \min_{u_k(x_k) \in D_k(x_k)}\{d(x_k,u_k)+f_{k+1}(x_{k+1})\}&& 1 \leq k \leq 4 \\
f_k(x_k) & =0&& k=5
\end{aligned}
\right.
$$

### 计算步骤:

按照动态规划的方法, 从第 4 月开始计算, 由后向前逐步推移至 1 月, $u_k(m)$表示

当$k=4$时, $f_4(x_4) = \min\{d_4(x_4,u_4)\}$

$$
\begin{aligned}
f_4(0)&=d(0,4)=7\\
f_4(1)&=d(1,3)=0.5+6=6.5\\
f_4(2)&=d(2,2)=1+5=6\\
f_4(3)&=d(3,1)=1.5+4=5.5\\
f_4(4)&=d(4,0)=2+0=2
\end{aligned}
$$

当$k=3$时, $f_3(x_3) = \min\{d_3(x_3,u_3)+f_4(x_4)\}$

$$
\begin{aligned}
f_3(0)&=\min
\left\{
\begin{aligned}
&d(0,6)+f_4(4)\\
&d(0,5)+f_4(3)\\
&d(0,4)+f_4(2)\\
&d(0,3)+f_4(1)\\
&d(0,2)+f_4(0)\\
\end{aligned}
\right\}
=\min
\left\{
\begin{aligned}
&9+2\\
&8+5.5\\
&7+6\\
&6+6.5\\
&5+7\\
\end{aligned}
\right\}=d(0,6)+f_4(4)=11
\\
f_3(1)&=\min
\left\{
\begin{aligned}
&d(1,5)+f_4(4)\\
&d(1,4)+f_4(3)\\
&d(1,3)+f_4(2)\\
&d(1,2)+f_4(1)\\
&d(1,1)+f_4(0)\\
\end{aligned}
\right\}
=\min
\left\{
\begin{aligned}
&8.5+2\\
&7.5+5.5\\
&6.5+6\\
&5.5+6.5\\
&4.5+7\\
\end{aligned}
\right\}=d(1,5)+f_4(4)=10.5\\
f_3(2)&=\min
\left\{
\begin{aligned}
&d(2,4)+f_4(4)\\
&d(2,3)+f_4(3)\\
&d(2,2)+f_4(2)\\
&d(2,1)+f_4(1)\\
&d(2,0)+f_4(0)\\
\end{aligned}
\right\}
=\min
\left\{
\begin{aligned}
&8+2\\
&7+5.5\\
&6+6\\
&5+6.5\\
&1+7\\
\end{aligned}
\right\}=d(2,0)+f_4(0)=8\\
f_3(3)&=\min
\left\{
\begin{aligned}
&d(3,3)+f_4(4)\\
&d(3,2)+f_4(3)\\
&d(3,1)+f_4(2)\\
&d(3,0)+f_4(1)\\
\end{aligned}
\right\}
=\min
\left\{
\begin{aligned}
&7.5+2\\
&6.5+5.5\\
&5.5+6\\
&1.5+6.5\\
\end{aligned}
\right\}=d(3,0)+f_4(1)=8\\
f_3(4)&=\min
\left\{
\begin{aligned}
&d(4,2)+f_4(4)\\
&d(4,1)+f_4(3)\\
&d(4,0)+f_4(2)\\
\end{aligned}
\right\}
=\min
\left\{
\begin{aligned}
&7+2\\
&6+5.5\\
&2+6\\
\end{aligned}
\right\}=d(4,0)+f_4(2)=8\\
f_3(5)&=\min
\left\{
\begin{aligned}
&d(5,1)+f_4(4)\\
&d(5,0)+f_4(3)\\
\end{aligned}
\right\}
=\min
\left\{
\begin{aligned}
&6.5+2\\
&2.5+5.5\\
\end{aligned}
\right\}=d(5,0)+f_4(3)=8\\
f_3(6)&=\min
\left\{
\begin{aligned}
&d(6,0)+f_4(4)\\
\end{aligned}
\right\}
=\min
\left\{
\begin{aligned}
&3+2\\
\end{aligned}
\right\}=d(6,0)+f_4(4)=5
\end{aligned}
$$

当$k=2$时, $f_2(x_2) = \min\{d_2(x_2,u_2)+f_3(x_3)\}$

$$
\begin{aligned}

f_2(0)&=\min
\left\{
\begin{aligned}
&d(0,6)+f_3(3)\\
&d(0,5)+f_3(2)\\
&d(0,4)+f_3(1)\\
&d(0,3)+f_3(0)\\
\end{aligned}
\right\}
=\min
\left\{
\begin{aligned}
&9+8\\
&8+8\\
&7+10.5\\
&6+11\\
\end{aligned}
\right\}
=d(0,5)+f_3(2)
=16
\\

f_2(1)&=\min
\left\{
\begin{aligned}
&d(1,6)+f_3(4)\\
&d(1,5)+f_3(3)\\
&d(1,4)+f_3(2)\\
&d(1,3)+f_3(1)\\
&d(1,2)+f_3(0)\\
\end{aligned}
\right\}
=\min
\left\{
\begin{aligned}
&9.5+8\\
&8.5+8\\
&7.5+8\\
&6.5+10.5\\
&5.5+11\\
\end{aligned}
\right\}
=d(1,4)+f_3(2)
=15.5
\\

f_2(2)&=\min
\left\{
\begin{aligned}
&d(2,6)+f_3(5)\\
&d(2,5)+f_3(4)\\
&d(2,4)+f_3(3)\\
&d(2,3)+f_3(2)\\
&d(2,2)+f_3(1)\\
&d(2,1)+f_3(0)\\
\end{aligned}
\right\}
=\min
\left\{
\begin{aligned}
&10+8\\
&9+8\\
&8+8\\
&7+8\\
&6+10.5\\
&5+11\\
\end{aligned}
\right\}
=d(2,3)+f_3(2)
=15
\\

f_2(3)&=\min
\left\{
\begin{aligned}
&d(3,6)+f_3(6)\\
&d(3,5)+f_3(5)\\
&d(3,4)+f_3(4)\\
&d(3,3)+f_3(3)\\
&d(3,2)+f_3(2)\\
&d(3,1)+f_3(1)\\
&d(3,0)+f_3(0)\\
\end{aligned}
\right\}
=\min
\left\{
\begin{aligned}
&10.5+5\\
&9.5+8\\
&8.5+8\\
&7.5+8\\
&6.5+8\\
&5.5+10.5\\
&1.5+11\\
\end{aligned}
\right\}
=d(3,0)+f_3(0)
=12.5
\\

f_2(4)&=\min
\left\{
\begin{aligned}
&d(4,5)+f_3(6)\\
&d(4,4)+f_3(5)\\
&d(4,3)+f_3(4)\\
&d(4,2)+f_3(3)\\
&d(4,1)+f_3(2)\\
&d(4,0)+f_3(1)\\
\end{aligned}
\right\}
=\min
\left\{
\begin{aligned}
&10+5\\
&9+8\\
&8+8\\
&7+8\\
&6+8\\
&2+10.5\\
\end{aligned}
\right\}
=d(4,0)+f_3(1)
=12.5
\\

f_2(5)&=\min
\left\{
\begin{aligned}
&d(5,4)+f_3(6)\\
&d(5,3)+f_3(5)\\
&d(5,2)+f_3(4)\\
&d(5,1)+f_3(3)\\
&d(5,0)+f_3(2)\\
\end{aligned}
\right\}
=\min
\left\{
\begin{aligned}
&9.5+5\\
&8.5+8\\
&7.5+8\\
&6.5+8\\
&2.5+8\\
\end{aligned}
\right\}
=d(5,0)+f_3(2)
=10.5
\\

f_2(6)&=\min
\left\{
\begin{aligned}
&d(6,3)+f_3(6)\\
&d(6,2)+f_3(5)\\
&d(6,1)+f_3(4)\\
&d(6,0)+f_3(3)\\
\end{aligned}
\right\}
=\min
\left\{
\begin{aligned}
&9+5\\
&8+8\\
&7+8\\
&3+8\\
\end{aligned}
\right\}
=d(6,0)+f_3(3)
=11
\end{aligned}
$$

当$k=1$时, $f_1(0) = \min\{d_1(0,u_1)+f_2(x_2)\}$

$$
\begin{aligned}

f_1(0)&=\min
\left\{
\begin{aligned}
&d(0,6)+f_3(4)\\
&d(0,5)+f_3(3)\\
&d(0,4)+f_3(2)\\
&d(0,3)+f_3(1)\\
&d(0,2)+f_3(0)\\
\end{aligned}
\right\}
=\min
\left\{
\begin{aligned}
&9+12.5\\
&8+12.5\\
&7+15\\
&6+15.5\\
&5+16\\
\end{aligned}
\right\}
=d(0,5)+f_3(3)
=20.5
\end{aligned}
$$

全过程策略为$p_{1,4}(0)=\{5, 0, 6, 0\}$:

1. 第 1 个月, 生产 5 单位产品, 月底库存为 3 单位;
1. 第 2 个月, 不生产产品, 月底库存为 0 单位;
1. 第 3 个月,生产 6 单位产品,月底库存为 4 单位;
1. 第 4 个月,不生产产品,月底库存为 0 单位.

最低总成本费用为 20.5 (千元).

## 2. 用动态规划方法编程求解下面的问题：

### 递推关系式:

设$c(S,i)$表示从$1$出发经过$S$内所有城市有且只有一次后到达$i$的最短距离, dist(i,j)表示从城市$i$到城市$j$的距离,有递推式:

$$
\left\{
\begin{aligned}
&c(S,i)  = \min_{j \in S,i\neq j,j\neq 1}\{c(S-\{i\},j)+dist(j,i)\}&& |S| > 2 \\
&c(S,i)  =dist(1,i)&& |S|=2
\end{aligned}
\right.
$$

则最短总行程为$f=\min_{i \in [2,6]}\{c(\{1,2,3,4,5,6\},i)+dist(i,1)\}$

### 伪代码 (递归实现):

```python
# 输入: 距离二维数组dist, 当前城市的下标c=1, 城市数n, 二进制表示的城市集合N={1,2,3,4,5,6}
# 输出: 访问完集合中所有城市并回到1的最短距离和经过城市

cost[n][2^n] = INF

function TSP(N)
  min_cost = INF
  min_way = []
  for i in [2,6] do
    d, w = Cost(N, i)
    if d + dist[i][1] < min_cost then
      min_cost = d + dist[i][1]
      min_way = w
    end if
  end for
  return cost, min_way
end function

function Cost(N, i)
  if |N| = 2 then
    return dist[1][i], [1, i] # N = {1, i}
  end if
  min_way = []
  for j in N and j != i and j != 1 do
    d, w = Cost(N-{i}, j)
    if d + dist[j][i] < cost[i, N] then
      cost[i, N] = d + dist[j][i]
      min_way = w
    end if
  end for
  return cost[i, N], min_way.append(i)
end function
```

时间复杂度为$O(n!)$.

### 程序(非递归实现)

使用动态规划的方式, 自底向上地计算, Rust 代码如下:

```rust
fn main() {
    // 城市 {0,1,2,3,4,5}
    // dist[i][j] = 城市 i 到城市 j 的距离
    let dist = [
        [0, 10, 20, 30, 40, 50],
        [12, 0, 18, 30, 25, 21],
        [23, 19, 0, 5, 10, 15],
        [34, 32, 4, 0, 8, 16],
        [45, 27, 11, 10, 0, 18],
        [56, 22, 16, 20, 12, 0],
    ];
    // 初始化二维数组, 使用二进制表示集合
    // dp[b111111][0] 表示经过集合 {0,1,2,3,4,5} 内所有城市
    // 有且只有一次后到达城市 0 的最短路径
    let mut dp = [[65535 as i32; 6]; 64];
    let mut way = [[6; 6]; 64];
    for j in 0..6 {
        dp[1 << j][j] = dist[0][j];
        way[1 << j][j] = 0;
    }
    for i in 0..64 {
        for j in 0..6 {
            if i & (1 << j) == 0 {
                continue; // j 不在待遍历城市中, 跳过
            }
            // j 在待遍历城市中, 遍历其他城市
            // 计算 Cost 并得到 dp[i][j]
            for k in 0..6 {
                if j == k || i & (1 << k) == 0 {
                    continue; // k 不在待遍历城市中, 或者 j == k, 跳过
                }
                let cost = dp[i ^ (1 << j)][k] + dist[k][j];
                if cost < dp[i][j] {
                    dp[i][j] = cost;
                    way[i][j] = k;
                }
            }
        }
    }
    // 输出最短路径
    let mut i = 63;
    let mut j = 0;
    let mut path = vec![1];
    while i != 0 {
        let k = way[i][j];
        path.insert(0, k + 1);
        i ^= 1 << j;
        j = k;
    }
    println!("length: {}, path: {:?}", dp[63][0], path);
}

```

程序输出，结果为80, 经过城市分别是 1→2→6→5→4→3→1.

相比递归的版本, 动态规划节省了中间结果的重复计算, 时间复杂度为$O(n^22^n)$.
