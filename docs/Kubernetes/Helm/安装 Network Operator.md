---
title: 安装 Network Operator
created_at: 2025-01-03
is_public: true
---

```shell
# Add NVIDIA Helm repository
$ helm repo add nvidia https://helm.ngc.nvidia.com/nvidia \
   && helm repo update  # Install Operator

# Install NVIDIA Network Operato Helm chart
$ helm upgrade --install network-operator \
     -n nvidia-network-operator --create-namespace \
     nvidia/network-operator \
     -f values.yaml

# View deployed resources
$ kubectl -n nvidia-network-operator get pods
```
