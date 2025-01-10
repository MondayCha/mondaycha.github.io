求 $(A-2)^2$ 与 $e^{tA}$，并求解 $\frac{\mathrm{d}X}{\mathrm{d}t}=AX$, $X=(x_1\ x_2)^T$，且$X(0) = (1\ 1)^T$.

$$
A=
\begin{align*}
\begin{pmatrix}
3&1\\
-1&1\\
\end{pmatrix}
\end{align*}
$$

## Claude (Wrong)

$(A-2I)^2 = \begin{pmatrix} 1 & 1 \\ -1 & -1 \end{pmatrix}^2 = \begin{pmatrix} 0 & -2 \\ -2 & 0 \end{pmatrix}$

$e^{tA} = \sum\limits_{k=0}^\infty \frac{t^k}{k!}A^k = I + tA + \frac{t^2}{2!}A^2 + \ldots$

给出的微分方程为:
$\frac{d}{dt} \begin{pmatrix} x_1\\x_2 \end{pmatrix} = \begin{pmatrix} 3 & 1\\ -1 & 1 \end{pmatrix}\begin{pmatrix} x_1\\x_2 \end{pmatrix}$

带入初始条件$X(0) = \begin{pmatrix} 1\\1 \end{pmatrix}$,可以解得:
$X(t) = e^{tA}\begin{pmatrix} 1\\1 \end{pmatrix} = \begin{pmatrix} 1\\1 \end{pmatrix} + t\begin{pmatrix} 3 & 1\\ -1 & 1 \end{pmatrix}\begin{pmatrix} 1\\1 \end{pmatrix} + \frac{t^2}{2!}\begin{pmatrix} 0 & -2\\ -2 & 0 \end{pmatrix}\begin{pmatrix} 1\\1 \end{pmatrix} + \ldots$

所以$X(t) = \begin{pmatrix} 1 + 3t\\ 1 - t \end{pmatrix}$
