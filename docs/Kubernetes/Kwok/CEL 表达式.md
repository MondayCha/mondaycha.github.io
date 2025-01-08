---
title: CEL 表达式
created_at: 2024-11-03
is_public: true
tags:
  - cel
  - kwok
---

## CEL 表达式

> [!quote] [Kubernetes 中的通用表达式语言 | Kubernetes](https://kubernetes.io/zh-cn/docs/reference/using-api/cel/)

[通用表达式语言 (Common Expression Language, CEL)](https://github.com/google/cel-go)  用于声明 Kubernetes API 的验证规则、策略规则和其他限制或条件。

CEL 表达式在  [API 服务器](https://kubernetes.io/zh-cn/docs/concepts/architecture/#kube-apiserver)中直接进行处理， 这使得 CEL 成为许多可扩展性用例的便捷替代方案，而无需使用类似 Webhook 这种进程外机制。 只要控制平面的 API 服务器组件保持可用状态，你的 CEL 表达式就会继续执行。

## 基本语法

> [!quote]
>
> - CEL 官方仓库：[GitHub - google/cel-spec: Common Expression Language -- specification and binary representation](https://github.com/google/cel-spec)
> - Google Codelab 教程：[CEL-Go Codelab：快速、安全的嵌入式表达式](https://codelabs.developers.google.com/codelabs/cel-go?hl=zh-cn#0)

### 语法

The grammar of CEL is defined below, using `|` for alternatives, `[]` for optional, `{}` for repeated, and `()` for grouping.

```python
Expr           = ConditionalOr ["?" ConditionalOr ":" Expr] ;
ConditionalOr  = [ConditionalOr "||"] ConditionalAnd ;
ConditionalAnd = [ConditionalAnd "&&"] Relation ;
Relation       = [Relation Relop] Addition ;
Relop          = "<" | "<=" | ">=" | ">" | "==" | "!=" | "in" ;
Addition       = [Addition ("+" | "-")] Multiplication ;
Multiplication = [Multiplication ("*" | "/" | "%")] Unary ;
Unary          = Member
               | "!" {"!"} Member
               | "-" {"-"} Member
               ;
Member         = Primary
               | Member "." IDENT ["(" [ExprList] ")"]
               | Member "[" Expr "]"
               ;
Primary        = ["."] IDENT ["(" [ExprList] ")"]
               | "(" Expr ")"
               | "[" [ExprList] [","] "]"
               | "{" [MapInits] [","] "}"
               | ["."] IDENT { "." IDENT } "{" [FieldInits] [","] "}"
               | LITERAL
               ;
ExprList       = Expr {"," Expr} ;
FieldInits     = IDENT ":" Expr {"," IDENT ":" Expr} ;
MapInits       = Expr ":" Expr {"," Expr ":" Expr} ;
```

### 数值类型

Values in CEL represent any of the following:

| Type | Description |
| \-------- | ---------------------------------- |
| `int` | 64-bit signed integers |
| `uint` | 64-bit unsigned integers |
| `double` | 64-bit IEEE floating-point numbers |

## Kwok 中的应用

在 Kwok 中，如果希望自定义 Pod/Node Metrics 模拟，就需要用到 CEL 表达式。

> [!quote] [ResourceUsage | KWOK](https://kwok.sigs.k8s.io/docs/user/resource-usage-configuration/#what-is-a-resourceusage)
>
> With CEL expressions, it is even possible to simulate resource usages dynamically. For example, the following expression yields memory usage that grows linearly with time.
>
> ```yaml
> expression: 'Quantity("1Mi") * (pod.SinceSecond() / 60.0)'
> ```
>
> Please refer to [CEL expressions in `kwok`](https://kwok.sigs.k8s.io/docs/user/cel-expressions/) for an exhausted list that may be helpful to configure dynamic resource usage.

### Kwok CEL 存在的问题

实际使用发现，Kwok 的 CEL 表达式计算有一些问题，实际上还不可用。提了两个相关的 Issue：

- 计算过程结果会放大：[Incorrect quantity calculations in CEL expressions · Issue #1259 · kubernetes-sigs/kwok · GitHub](https://github.com/kubernetes-sigs/kwok/issues/1259)
- 计算内存时结果溢出：[Overflow in quantity calculations for large values in CEL expressions · Issue #1261 · kubernetes-sigs/kwok · GitHub](https://github.com/kubernetes-sigs/kwok/issues/1261)
