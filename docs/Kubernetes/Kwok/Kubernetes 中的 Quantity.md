---
title: Kubernetes 中的 Quantity
created_at: 2024-11-05
is_public: true
tags:
  - kubernetes
---

> [!NOTE] [Quantity](https://kubernetes.io/docs/reference/kubernetes-api/common-definitions/quantity/)
> No matter which of the three exponent forms is used, no quantity may represent a number greater than $2^{63}-1$ in magnitude, nor may it have more than 3 decimal places.
>
> Numbers larger or more precise will be capped or rounded up. (E.g.: 0.1m will rounded up to 1m.) This may be extended in the future if we require larger or smaller quantities.

那么对于 `uint64` 类型的数值，其表示范围为 $0\sim 2^{64}-1$，但没有涵盖在 Quantity 的范围内。
