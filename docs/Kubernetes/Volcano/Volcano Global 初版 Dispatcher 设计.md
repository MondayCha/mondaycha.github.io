---
title: Volcano Global 初版 Dispatcher 设计
created_at: 2025-01-12
is_public: true
---

> [!NOTE] [Change the traversal method of queue to round-robin by MondayCha · Pull Request #6 · volcano-sh/volcano-global · GitHub](https://github.com/volcano-sh/volcano-global/pull/6)

社区的修改意见：把 Share 值考虑进来，哪个队列分配的少就先分配哪个，如果队列优先级相同。
