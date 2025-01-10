# Assignment 4

## 1.

> 设计一遗传算法求解下面的问题，要求写明编码方式、目标函数与适值函数、选择策略、交叉与变异运算，和算法的伪代码。
>
> 假设一个工厂要在 *n* 个地点*li* (*i*=1,2,…,*n*) 建*n*个厂房 *aj* ( *j*= 1, 2, …, *n*)，其中每个地点建一个厂房。已知任意两个厂房 *ai* 和*aj*之间存在物资运送 *wij*，且任意两个地点*li* 和*lj*之间的距离为*dij* (*i*, *j*=1, 2, …,*n*)。
>
> 需要找到花费最小的建厂房方案，使得任意两个厂房间的物资运送与距离的乘积的和最小。
>
> 定义0-1变量 *xij*，满足，若厂房*ai*建在地点*lj*，则*xij* = 1；否则*xij* = 0 (*i*, *j*=1, 2, …,*n*)，则建厂房的花费为 $\sum_{i,j,k,l=1}^{n}x_{ij}x_{kl}w_{ik}d_{jl}$。

**解：**

### 1.1 编码方式：

采用顺序编码。每个染色体表示为 $X = (b_1, b_2, ⋯ , b_n)$， $b_i∈\{1, 2, …, n\}$，且若$i ≠ j$，$b_i≠b_j$ 。

$b_i$表示在城市$l_{i}$处搭建厂房$a_{b_i}$，满足$x_{ib_i}=1$。

### 1.2 目标函数与适值函数：

目标函数为建厂房的花费，$f(x)=\sum_{i,j,k,l=1}^{n}x_{ij}x_{kl}w_{ik}d_{jl}$。

对于求目标函数最小值的优化问题，加负号转求最大值，适值函数为 $F(x)=-\min f(x)$。

### 1.3 选择策略：

采用正比选择(Proportional Selection)策略，每个个体被选中进行遗传运算的概率为该个体的适应值和群体中所有个体适应值总和的比例。

对于个体$i$，设其适应值为$F_i$，种群规模为$NP$，则该个体的选择概率为：
$$
P_i=\frac{F_i}{\sum_{i=1}^{NP}F_i}
$$
得到选择概率后，采用旋轮法来实现选择操作。

个体的累积概率为$PP_0=0$，$PP_i=\sum_{j=1}^{i}P_j$，共转$NP$次。每次转轮时：

- 随机产生 $\xi _k \in U(0,1)$
- 当$PP_{i-1} ≤ \xi _k ≤PP_i$时，选择个体$i$。

### 1.4 交叉与变异运算：

- 交叉运算：采用部分映射交叉(Partially Mapped Crossover, PMX)方式
  - 首先随机从父代选取两个个体 $P_1,P_2$，并随机选取染色体上的两个起止位置
  - 交换划分的两组基因的位置
  - 检测冲突的基因，根据交换的两组基因建立映射关系，通过映射关系将非交换段重复的基因映射为不冲突的基因。最后所有冲突的基因都会被映射，得到两个满足顺序编码的子代
- 变异运算：按照变异概率 $P_m$，采用逆位遗传方式
  - 首先从父代选取待变异个体 $P_1$，并随机选取染色体上的两个变异点
  - 对两点间的基因，将其逆序重新排列，得到变异子代

### 1.5 算法伪代码：

```python
输入：任意两个厂房ai和aj之间的物资运送关系w[][], 任意两个地点li和lj之间的距离d[][], 种群规模NP, 最大代数NG 
输出：NG代后种群表示的建厂房方案

Function GA(w, d, NP, NG):
	time = 0;
	# 初始化大小为NP的种群
	population[time] = initializePopulation(NP);
	# 根据1.2计算适值函数
	evaluatePopulation(w, d, population[time]);	
	While time < NG do
		# 根据1.3旋轮法选择父代
		parents = selectParents(population[time]);
		# 对父代实施1.4的PMW交叉方法
		population[time+1] = crossover(parents);
		# 对种群进行1.4的逆序变异
		population[time+1] = mutate(population[time+1]);
		# 根据1.2计算适值函数
		evaluatePopulation(w, d, population[time+1]);
		time++;
	End While;
    Return population[time];	# 得到NG代后种群表示的建厂房方案
End;
```

对于实际问题，还可以采取停止准则纳入种群收敛程度等方式，对遗传算法进行进一步优化。

## 2.

> 用分支定界算法编程求解以下问题，写出你所设计算法的分支策略、所使用的界及其正确性说明、算法的伪代码，并提交程序源代码。
>
> 某公司于乙城市的销售点急需一批成品，该公司成品生产基地在甲城市。甲城市与乙城市之间共有 *n* 座城市，互相以公路连通。甲城市、乙城市以及其它各城市之间的公路连通情况及每段公路的长度由矩阵 *M*1 给出。每段公路均由地方政府收取不同额度的养路费等费用，具体数额由矩 阵*M*2给出。
>
> 请给出在需付养路费总额不超过 1500 的情况下，该公司货车运送其产品从甲城市到乙城市的最短运送路线。
>
> 具体数据参见文件:
> m1.txt: 各城市之间的公路连通情况及每段公路的长度矩阵(有向图); 甲城市为城市 Num.1，乙城市为城市 Num.50。
>
> m2.txt: 每段公路收取的费用矩阵(非对称)。

**解：**

### 2.1 分支策略

对搜索树上的某些结点（即当前路径终点的城市）做出分支决策，采用FIFO的队列式分支策略，从最新产生的各子集中按顺序选择各结点进行分支，对于下界比上界还大的节点不进行分支。详细的判断条件见2.2节。

### 2.2 所使用的界及其正确性说明

- 上界：
  - 初始为无穷大，当找到某个具有更短运送路线且满足付养路费总额不超过1500条件的可行解后，使用该运送路线的长度和1500的路费限制作为上界。
  - 正确性说明：如果某个子问题的下界对应的运送路线长度或路费比现有的可行解还要差，那么增加约束条件会使该子问题的解变得更差，因此没有必要继续探索当前搜索树的节点，因此选择现有的可行解的路线长度以及题设给出的1500路费条件作为上界。
- 下界：
  - 当现有路径的终点位于城市 $i$ 时（初始时在城市甲），可以使用 Dijkstra 等算法求出无约束条件下，城市 $i$ 到城市乙的最短路线和最少路费。则下界为当前路径长度与城市 $i$ 到城市乙的最短路线长度之和，以及当前路费与城市 $i$ 到城市乙的最少路费之和。
  - 正确性说明：对于从当前路径终点城市 $i$ 到城市乙的可能路线，增加约束条件会使该子问题的解变得更差，一定不优于无约束条件下城市 $i$ 到城市乙的最短路线或最少路费。因此选取当前路径长度与城市 $i$ 到城市乙的最短路线长度之和为下界。

由此，在采用FIFO方式考察各子问题时，对于当前位于城市$j$，待考察的城市为$i$的情况，主要从三方面判断是否剪枝：

1. 城市$j$到城市$i$之间不存在有向道路（对应题设数据中道路长度为9999的情况）；
1. 路费下界超过已知可行解的路费：路费下界=现有路费+从城市$j$到城市$i$的路费+城市$i$到城市乙的最小路费；
1. 路径长度下界超过已知最短可行解的长度：路径长度下界=现有路径长度+从城市$j$到城市$i$的道路长度+城市$i$到城市乙的最小路径长度。

对于满足这三点的节点，其子问题不可能存在比已知可行解更优的解，可以剪枝。该策略可以保证分支定界算法能得到非近似的最优解。

### 2.3 算法的伪代码

```python
输入：各城市公路连通情况dists[][], 各城市公路收费情况costs[][]
输出：需付养路费总额不超过1500的情况下，该公司货车运送其产品从甲城市(0)到乙城市(49)的最短运送路线

distsToB = getMinDists(dists, 49)  # 获取各城市到城市乙的最短路径
costsToB = getMinCosts(costs, 49)  # 获取各城市到城市乙的最小收费
path = [0] 						 # 初始化经过的城市，从0出发
Function BnB():
    If path.last == 49:
        到达城市乙, 更新已知最优可行解;
        return;
    Else:
        For i in 49 to 0:
            If isLowerBoundNotSatisfied(i):	# 根据2.2判断对于下一步经过城市i的子问题, 该子问题的下界是否超出上界.
                continue;	# 剪枝
            End If;
            将城市i添加到path中, 并更新当前花费和长度;
            BnB();	# 继续搜索并剪枝子问题
            回溯，弹出城市i, 复位花费和长度;
        End For;
    End If;
End;
```

### 2.4 程序源代码

使用 Rust 语言编写分支定界算法。

```rust
use std::fs;
use std::io::Read;
use std::time::Instant;

const INF: i32 = 65535;
const UNREACHABLE: i32 = 9999;
const MAX_COST: i32 = 1500;

/// 从文件中读取图的邻接矩阵.
/// 返回一个邻接矩阵, 其中每个元素的值为边的权重.
/// 如果没有边, 则该元素的值为 UNREACHABLE = 9999.
fn read_vec_from_file(filename: &str) -> Vec<Vec<i32>> {
    let mut vec: Vec<Vec<i32>> = vec![];
    let mut f = fs::File::open(filename).expect(format!("open {} failed", filename).as_str());
    let mut buffer = String::new();
    f.read_to_string(&mut buffer)
        .expect(format!("something went wrong when reading {}", filename).as_str());
    for line in buffer.lines() {
        let mut line_vec: Vec<i32> = vec![];
        for num in line.split_whitespace() {
            line_vec.push(num.parse().unwrap());
        }
        vec.push(line_vec);
    }
    vec
}

/// 计算最短路径所用算法.
#[derive(Debug, PartialEq, Eq, Clone, Copy)]
pub enum MinDistAlgorithm {
    FloydWarshall,
    Dijkstra,
}

/// 用 Floyd Warshall 算法求解各城市到城市乙的最短路径.
/// 城市乙为编号最大的城市.
/// # Arguments
/// * `edges` - 城市之间路径的权重.
/// # Returns
/// * `dists` - 各城市到城市乙的最短路径.
fn floyd(edges: &Vec<Vec<i32>>) -> Vec<i32> {
    if edges.len() == 0 {
        return vec![];
    }

    let mut dists: Vec<Vec<i32>> = vec![];
    for i in 0..edges.len() {
        dists.push(edges[i].to_vec());
    }

    // Floyd 算法求解各城市之间的最短路径.
    for k in 0..edges.len() {
        for i in 0..edges.len() {
            for j in 0..edges.len() {
                if dists[i][k] + dists[k][j] < dists[i][j] {
                    dists[i][j] = dists[i][k] + dists[k][j];
                }
            }
        }
    }

    // 返回各城市到城市乙的最短路径.
    dists[edges.len() - 1][edges.len() - 1] = 0; // 城市乙到自身的最短路径为 0.
    dists
        .iter()
        .map(|x| -> i32 { x.last().unwrap().clone() })
        .collect()
}

/// 用 Dijkstra 算法求解各城市到城市乙的最短路径.
/// 城市乙为编号最大的城市.
/// 本题不存在负权边, Dijkstra 算法直接适用.
/// # Arguments
/// * `edges` - 城市之间路径的权重.
/// # Returns
/// * `dists` - 各城市到城市乙的最短路径.
fn dijkstra(edges: &Vec<Vec<i32>>) -> Vec<i32> {
    if edges.len() == 0 {
        return vec![];
    }

    let mut dists: Vec<i32> = vec![INF; edges.len()];
    let mut visited: Vec<bool> = vec![false; edges.len()];
    dists[edges.len() - 1] = 0;
    for _ in (0..edges.len()).rev() {
        let mut min_dist = INF;
        let mut min_index = edges.len() - 1;

        // 找到未访问的城市中最短路径的城市.
        for i in (0..edges.len()).rev() {
            if !visited[i] && dists[i] < min_dist {
                min_dist = dists[i];
                min_index = i;
            }
        }
        visited[min_index] = true;
        for i in 0..edges.len() {
            // 由于这里是求解各城市到城市乙的最短路径, 因此反向读取 edges.
            if !visited[i] && dists[min_index] + edges[i][min_index] < dists[i] {
                dists[i] = dists[min_index] + edges[i][min_index];
            }
        }
    }
    dists
}

#[derive(Debug)]
pub struct Solution {
    city_count: usize,              // 城市数量.
    city_dists: Vec<Vec<i32>>,      // 城市之间的距离.
    city_costs: Vec<Vec<i32>>,      // 城市之间的费用.
    min_dists_to_b: Vec<i32>,       // 各城市到城市乙的最短路径.
    min_costs_to_b: Vec<i32>,       // 各城市到城市乙的最短费用.
    current_path: Vec<usize>,       // 当前路径.
    current_cost: i32,              // 当前费用.
    current_dist: i32,              // 当前距离.
    best_possible_path: Vec<usize>, // 已知最优可行解对应路径.
    best_possible_cost: i32,        // 已知最优可行解对应费用.
    best_possible_dist: i32,        // 已知最优可行解对应距离.
}

impl Solution {
    /// 实例化一个新的 Solution 对象.
    /// # Arguments
    /// * `distance_graph` - 城市之间的距离.
    /// * `cost_graph` - 城市之间的费用.
    /// # Returns
    /// * `Solution` - 新的 Solution 对象.
    pub fn new(
        city_dists: Vec<Vec<i32>>,
        city_costs: Vec<Vec<i32>>,
        min_dist_algorithm: MinDistAlgorithm,
    ) -> Solution {
        assert_eq!(city_dists.len(), city_costs.len());
        assert_eq!(city_dists.len(), city_dists[0].len());
        assert_eq!(city_costs.len(), city_costs[0].len());
        Solution {
            city_count: city_dists.len(),
            // min_dists_to_b: floyd(&city_dists),
            // min_costs_to_b: floyd(&city_costs),
            min_dists_to_b: if min_dist_algorithm == MinDistAlgorithm::FloydWarshall {
                floyd(&city_dists)
            } else {
                dijkstra(&city_dists)
            },
            min_costs_to_b: if min_dist_algorithm == MinDistAlgorithm::FloydWarshall {
                floyd(&city_costs)
            } else {
                dijkstra(&city_costs)
            },
            city_dists,
            city_costs,
            current_path: vec![0], // 初始路径为编号为 0 的城市甲.
            current_cost: 0,
            current_dist: 0,
            best_possible_path: vec![],
            best_possible_cost: MAX_COST,
            best_possible_dist: INF,
        }
    }

    /// 判断对于下一步经过城市 i 的子问题, 该子问题的下界是否超出上界.
    /// # Arguments
    /// * `next_city` - 下一个经过的城市 i.
    /// # Returns
    /// * `bool` - 若该子问题的下界超出上界, 则返回 true, 否则返回 false.
    pub fn is_lower_bound_not_satisfied(&self, next_city: usize) -> bool {
        let current_city = self.current_path.last().unwrap().clone();
        // 若当前城市到下一城市之间不存在路径, 则返回 true.
        if self.city_dists[current_city][next_city] == UNREACHABLE {
            return true;
        }
        // 若从城市甲到下一城市的路径长度, 加上下一城市到城市乙的路径长度的下界，
        // 超出已知可行解的路径长度, 则返回 true.
        if self.current_dist
            + self.city_dists[current_city][next_city]
            + self.min_dists_to_b[next_city]
            > self.best_possible_dist
        {
            return true;
        }
        // 若从城市甲到下一城市的路径费用, 加上下一城市到城市乙的路径费用的下界,
        // 超出题设养路费上限, 则返回 true.
        if self.current_cost
            + self.city_costs[current_city][next_city]
            + self.min_costs_to_b[next_city]
            > MAX_COST
        {
            return true;
        }
        false
    }

    /// 分支定界算法.
    pub fn branch_and_bound(&mut self) {
        let current_city = self.current_path.last().unwrap().clone();
        if current_city == self.city_count - 1 {
            // 当前路线到达城市乙.
            // 因为已对不符合下界的子问题进行了剪枝, 所以该路线一定比已知最优解更优.
            self.best_possible_cost = self.current_cost;
            self.best_possible_dist = self.current_dist;
            self.best_possible_path = self.current_path.clone();
            return;
        } else {
            for next_city in (0..self.city_count).rev() {
                if self.is_lower_bound_not_satisfied(next_city) {
                    continue;
                }
                self.current_path.push(next_city);
                self.current_cost += self.city_costs[current_city][next_city];
                self.current_dist += self.city_dists[current_city][next_city];
                // 对下一个子问题进行剪枝.
                self.branch_and_bound();
                // 回溯.
                self.current_path.pop();
                self.current_cost -= self.city_costs[current_city][next_city];
                self.current_dist -= self.city_dists[current_city][next_city];
            }
        }
    }

    /// 打印最优解.
    pub fn print_best_solution(&self) {
        let best_possible_path: Vec<usize> =
            self.best_possible_path.iter().map(|x| x + 1).collect();
        println!("最优解的路径为: {:?}", best_possible_path);
        println!("最优解的费用为: {}", self.best_possible_cost);
        println!("最优解的距离为: {}", self.best_possible_dist);
    }
}

/// 使用不同的最短路径算法, 求解带有约束条件的最短路径问题.
/// 并打印最优解和计算时间.
/// # Arguments
/// * `min_dist_algorithm` - 最短路径算法.
fn call_solution(min_dist_algorithm: MinDistAlgorithm) {
    let start_time = Instant::now();
    let dists = read_vec_from_file("m1.txt");
    let costs = read_vec_from_file("m2.txt");
    let mut solution = Solution::new(dists, costs, min_dist_algorithm);
    solution.branch_and_bound();
    solution.print_best_solution();
    let duration = start_time.elapsed();
    println!("{:?} 耗时: {:?}\n", min_dist_algorithm, duration);
}

fn main() {
    call_solution(MinDistAlgorithm::FloydWarshall);
    call_solution(MinDistAlgorithm::Dijkstra);
}

```

对于题设提供的数据，使用Dijkstra算法求解各城市到城市乙的最短路径的版本，比使用Floyd算法的版本，平均快了约10倍。

```bash
最优解的路径为: [1, 3, 8, 11, 15, 21, 23, 26, 32, 37, 39, 45, 47, 50]
最优解的费用为: 1448
最优解的距离为: 464
```
