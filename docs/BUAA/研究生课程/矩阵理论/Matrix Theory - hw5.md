## 矩阵函数 $e^{tA}$

```python
import numpy as np
from scipy.linalg import expm

# 定义方阵A
A = np.array([[1, 1], [0, 2]])

# 计算e^A
expA = expm(A)
print("e^A=\n", expA)

# 计算|e^A|
determinant = np.linalg.det(expA)
print("|e^A|=", determinant)
```
