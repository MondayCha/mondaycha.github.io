---
title: Kind 集群 Kube-Proxy 启动失败
created_at: 2024-12-14
is_public: true
---

为了在自己的电脑上配置 Karmada 开发环境，试图运行 Karmada 的一键安装脚本，但一直报错：

```shell
F1214 11:59:15.061488       1 instance.go:225] Error creating leases: error creating storage factory: context deadline exceeded
```

查看 Meta 集群的 Pod，发现 Kube-Proxy 起不来：

```shell
$ kgp -A
NAMESPACE            NAME                                                 READY   STATUS             RESTARTS      AGE
karmada-system       etcd-0                                               1/1     Running            0             59s
karmada-system       karmada-apiserver-76b7f97dd4-mpsk6                   0/1     Running            1 (10s ago)   48s
kube-system          coredns-7c65d6cfc9-5gpd6                             0/1     Running            0             3m41s
kube-system          coredns-7c65d6cfc9-7pj5d                             0/1     Running            0             3m41s
kube-system          etcd-karmada-host-control-plane                      1/1     Running            0             3m44s
kube-system          kindnet-lk44q                                        1/1     Running            0             3m41s
kube-system          kube-apiserver-karmada-host-control-plane            1/1     Running            0             3m44s
kube-system          kube-controller-manager-karmada-host-control-plane   1/1     Running            0             3m44s
kube-system          kube-proxy-cvmc8                                     0/1     CrashLoopBackOff   5 (20s ago)   3m41s
kube-system          kube-scheduler-karmada-host-control-plane            1/1     Running            0             3m44s
local-path-storage   local-path-provisioner-57c5987fd4-hrr4d              0/1     CrashLoopBackOff   3 (39s ago)   3m41s
```

查看日志，发现这个问题似乎是官方指南就有提到的：

```shell
$ k logs kube-proxy-cvmc8
E1214 11:54:31.203455       1 run.go:72] "command failed" err="failed complete: too many open files"
```

> [!quote] [kind – Known Issues](https://kind.sigs.k8s.io/docs/user/known-issues/#pod-errors-due-to-too-many-open-files)

这可能是由于  [inotify](https://linux.die.net/man/7/inotify)  资源不足造成的。资源限制由  `fs.inotify.max_user_watches`  和  `fs.inotify.max_user_instances`  系统变量定义。例如，在 Ubuntu 中，这些默认值分别为 8192 和 128，这不足以创建具有许多节点的集群。

要使更改持久化，请编辑文件  `/etc/sysctl.conf`  并添加以下行：

```toml
fs.inotify.max_user_watches = 524288
fs.inotify.max_user_instances = 512
```
