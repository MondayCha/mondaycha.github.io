### 1. 求下列矩阵的满秩分解

$$
\begin{align*}
\begin{pmatrix}
1&1&1&1&1\\
3&2&1&1&-3\\
0&1&2&2&6\\
5&4&3&3&-1
\end{pmatrix}
\end{align*}
$$

**解：**

给定矩阵：

$$
A = \begin{pmatrix}
1&1&1&1&1\\
3&2&1&1&-3\\
0&1&2&2&6\\
5&4&3&3&-1
\end{pmatrix}
$$

我们将使用高斯消元法进行满秩分解。以下是具体步骤：

1. 第一步，将第二行减去 3 倍的第一行，将第四行减去 5 倍的第一行：

$$
\begin{pmatrix}
1&1&1&1&1\\
0&-1&-2&-2&-6\\
0&1&2&2&6\\
0&-1&-2&-2&-6
\end{pmatrix}
$$

2. 第二步，将第三行加上第二行，将第四行加上第二行：

$$
\begin{pmatrix}
1&1&1&1&1\\
0&-1&-2&-2&-6\\
0&0&0&0&0\\
0&0&0&0&0
\end{pmatrix}
$$

3. 第三步，将第一行加上第二行，将第二行乘以 $-1$，化为行最简形矩阵：

$$
\begin{pmatrix}
1&0&-1&-1&-5\\
0&1&2&2&6\\
0&0&0&0&0\\
0&0&0&0&0
\end{pmatrix}
$$

现在，我们可以看到矩阵的第三行和第四行全为零。这意味着矩阵的秩为 2。注意到第一行和第二行是非零行，因此我们可以选择它们作为矩阵的满秩分解。则有：

$$
A = RU = \begin{pmatrix}
1&1\\
3&2\\
0&1\\
5&4
\end{pmatrix}
\begin{pmatrix}
1&0&-1&-1&-5\\
0&1&2&2&6
\end{pmatrix}
$$

### 2. 证明：设 $n$ 元列向量 $X\not=0$，$A=I_n-\frac{2XX^H}{\Vert X \Vert ^2}$，则 $A^HA=I_n=A^2$.

要证明 $A^HA = I_n$，我们首先计算 $A^H$，其中 $(\cdot)^H$ 表示矩阵的共轭转置。由于 $A = I_n - \frac{2XX^H}{\Vert X\Vert ^2}$，我们有：

$$
A^H = \left( I_n - \frac{2XX^H}{\Vert X\Vert ^2} \right)^H
$$

由于 $I_n$ 是对称矩阵，而 $(\cdot)^H$ 表示共轭转置，我们可以将其应用到每个矩阵项上：

$$
A^H = I_n^H - \frac{2(XX^H)^H}{\Vert X\Vert ^2}
$$

由于 $I_n^H = I_n$ 和 $(XX^H)^H = (X^H)^HX^H = XX^H$，我们可以化简上述表达式为：

$$
A^H = I_n - \frac{2XX^H}{\Vert X\Vert ^2}=A
$$

即 $A^HA=A^2$ 成立。

现在，我们可以计算 $A^HA$：

$$
A^HA = \left( I_n - \frac{2XX^H}{\Vert X\Vert ^2} \right) \left( I_n - \frac{2XX^H}{\Vert X\Vert ^2} \right)
$$

展开上述表达式并进行简化：

$$
A^HA = I_nI_n - I_n\frac{2XX^H}{\Vert X\Vert ^2} - \frac{2XX^H}{\Vert X\Vert ^2}I_n + \frac{4(XX^H)(XX^H)}{\Vert X\Vert ^4}
$$

由于 $I_n$ 是单位矩阵，且矩阵乘法满足结合律和分配律，我们可以进一步简化上述表达式：

$$
\begin{align*}
A^HA &= I_n - \frac{2XX^H}{\Vert X\Vert ^2} - \frac{2XX^H}{\Vert X\Vert ^2} + \frac{4(XX^H)(XX^H)}{\Vert X\Vert ^4}\\
&= I_n - \frac{4XX^H}{\Vert X\Vert ^2} + \frac{4X(X^HX)X^H}{\Vert X\Vert ^4}\\
&= I_n - \frac{4XX^H}{\Vert X\Vert ^2} + \frac{4\Vert X\Vert ^2XX^H}{\Vert X\Vert ^4}\\
&= I_n - \frac{4XX^H}{\Vert X\Vert ^2} + \frac{4XX^H}{\Vert X\Vert ^2}\\
&= I_n
\end{align*}
$$

因此，我们证明了 $A^HA = A^2 = I_n$。
