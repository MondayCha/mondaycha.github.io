### 1. 设 $A=A_{n\times p}$ 半优阵（$A^HA=I_p$），$X \in \mathbb{C}^p$ 为列向量，则 $\Vert AX \Vert ^2= \Vert X \Vert ^2$ （保长公式）。

证明：由 $\Vert X \Vert ^2=X^HX$ 有：

$$
\begin{align*}
\Vert AX \Vert ^2 &= (AX)^H(AX) \\
&= X^H A^H A X \quad \text{(穿脱原则)}\\
&= X^H (A^H A) X \quad \text{(结合律)} \\
&= X^H (I_p) X \quad \text{(半优阵定义)} \\
&= X^H X \quad \text{(单位阵性质)} \\
&= \Vert X \Vert ^2
\end{align*}
$$

故 $\Vert AX \Vert ^2= \Vert X \Vert ^2$。

### 2. 若 $A^HAX=0$，则有 $AX=0$ （提示：$X^HX=\Vert X \Vert ^2$，$(AX)^H(AX)=\Vert AX \Vert ^2$）。

证明：根据提示：

$$
\begin{align*}
\Vert AX \Vert ^2=(AX)^H(AX) &= X^H A^H A X \quad \text{(穿脱原则)} \\
&= X^H (A^H A X) \quad \text{(结合律)} \\
&= X^H 0 \quad \text{(}A^HAX=0\text{)} \\
&= 0
\end{align*}
$$

其中 $\Vert AX \Vert ^2=0$，则向量 $AX$ 必为零向量。即 $AX=0$。

### 3. 若方阵 $A$ 使 $AX=\lambda_1X$，$X \not= \vec{0}$ 为特征向量，则 $\lambda_1=\frac{X^HAX}{\Vert X \Vert^2}$。此公式叫特征根的特商公式。

证明：等式 $AX=\lambda_1X$ 两边同左乘 $X^H$，有：

$$
\begin{align*}
X^H(AX) &= X^H (\lambda_1X) \\
X^HAX &= \lambda_1(X^HX)
\end{align*}
$$

等式两边同除以 $\Vert X \Vert^2$，有：

$$
\begin{align*}
\frac{X^HAX}{\Vert X \Vert^2} &= \frac{\lambda_1(X^HX)}{\Vert X \Vert^2} \\
\frac{X^HAX}{\Vert X \Vert^2} &= \lambda_1 \quad \text{(}X^HX=\Vert X \Vert ^2\text{)}
\end{align*}
$$

故 $\lambda_1=\frac{X^HAX}{\Vert X \Vert^2}$ 是特征向量 $X$ 对应的特征值。
