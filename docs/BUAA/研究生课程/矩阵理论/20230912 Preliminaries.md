## 1. 复习

$$
R,\ C,\ R^{m\times n},\ C^{m\times n}
$$

- R: real numbers
- C: complex numbers

$$
R^n=R^{n\times 1},\ R_n=R^{1\times n}
$$

- 方阵：[Square matrix - Wikipedia](https://en.wikipedia.org/wiki/Square_matrix)
- 三角矩阵，特征根，特征向量
- 分块矩阵：[分块矩阵 - 维基百科，自由的百科全书](https://zh.wikipedia.org/zh-hans/%E5%88%86%E5%A1%8A%E7%9F%A9%E9%99%A3)
- [Hamilton-Carley定理：方阵的特征多项式为何总能将该方阵零化 - 知乎](https://zhuanlan.zhihu.com/p/78374199)

## 2023.10.19

- [矩阵指数 - 维基百科，自由的百科全书](https://zh.wikipedia.org/zh-hans/%E7%9F%A9%E9%98%B5%E6%8C%87%E6%95%B0)

## 2023.11.2

- [二阶矩阵逆矩阵的公式是哪个_百度知道](https://zhidao.baidu.com/question/812413801459433732)

给定的矩阵 ( A = \\begin\{pmatrix} 1 & -i \\ i & 1 \\end\{pmatrix} ) 和两个特征根（特征值）2 和 0，我们将按照以下步骤计算对应的特征向量。

### 对于特征值 2

1. 构造特征方程：( (A - 2I)x = 0 )。

   这里 ( I ) 是单位矩阵，所以 ( 2I = \\begin\{pmatrix} 2 & 0 \\ 0 & 2 \\end\{pmatrix} )。

   因此，( A - 2I = \\begin\{pmatrix} 1 & -i \\ i & 1 \\end\{pmatrix} - \\begin\{pmatrix} 2 & 0 \\ 0 & 2 \\end\{pmatrix} = \\begin\{pmatrix} -1 & -i \\ i & -1 \\end\{pmatrix} )。

1. 解线性方程组 ( \\begin\{pmatrix} -1 & -i \\ i & -1 \\end\{pmatrix} \\begin\{pmatrix} x_1 \\ x_2 \\end\{pmatrix} = \\begin\{pmatrix} 0 \\ 0 \\end\{pmatrix} )。

### 对于特征值 0

1. 构造特征方程：( (A - 0I)x = 0 )。

   这里 ( 0I = \\begin\{pmatrix} 0 & 0 \\ 0 & 0 \\end\{pmatrix} )。

   因此，( A - 0I = \\begin\{pmatrix} 1 & -i \\ i & 1 \\end\{pmatrix} - \\begin\{pmatrix} 0 & 0 \\ 0 & 0 \\end\{pmatrix} = \\begin\{pmatrix} 1 & -i \\ i & 1 \\end\{pmatrix} )。

1. 解线性方程组 ( \\begin\{pmatrix} 1 & -i \\ i & 1 \\end\{pmatrix} \\begin\{pmatrix} x_1 \\ x_2 \\end\{pmatrix} = \\begin\{pmatrix} 0 \\ 0 \\end\{pmatrix} )。

现在，我将进行这些计算。
