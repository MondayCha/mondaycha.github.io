---
title: Kubernetes 中的 e2e 测试
created_at: 2024-11-21
is_public: true
tags:
  - kubernetes
---

> [!quote] [单元测试和集成测试 · Kubernetes 中文指南——云原生应用架构实战手册](https://jimmysong.io/kubernetes-handbook/develop/testing.html)

## End to End (e2e)测试

End to end (e2e) 测试模拟用户行为操作 Kubernetes，用来保证 Kubernetes 服务或集群的行为完全符合设计预期。

在开启 e2e 测试之前，需要先编译测试文件，并设置 `KUBERNETES_PROVIDER`（默认为 gce）：

```shell
make WHAT='test/e2e/e2e.test'
make ginkgo
export KUBERNETES_PROVIDER=local
```

### 测试

```shell
bash hack/ginkgo-e2e.sh
```

**仅测试指定的用例**

```
go run hack/e2e.go -v -test --test_args='--ginkgo.focus=Kubectl\sclient\s\[k8s\.io\]\sKubectl\srolling\-update\sshould\ssupport\srolling\-update\sto\ssame\simage\s\[Conformance\]$'
```

**略过测试用例**

```
go run hack/e2e.go -- -v --test --test_args="--ginkgo.skip=Pods.*env
```

**并行测试**

```
# Run tests in parallel, skip any that must be run serially
GINKGO_PARALLEL=y go run hack/e2e.go --v --test --test_args="--ginkgo.skip=\[Serial\]"

# Run tests in parallel, skip any that must be run serially and keep the test namespace if test failed
GINKGO_PARALLEL=y go run hack/e2e.go --v --test --test_args="--ginkgo.skip=\[Serial\] --delete-namespace-on-failure=false"
```

**清理测试**

```
go run hack/e2e.go -- -v --down
```

**有用的`-ctl`**

```
# -ctl can be used to quickly call kubectl against your e2e cluster. Useful for
# cleaning up after a failed test or viewing logs. Use -v to avoid suppressing
# kubectl output.
go run hack/e2e.go -- -v -ctl='get events'
go run hack/e2e.go -- -v -ctl='delete pod foobar'
```
