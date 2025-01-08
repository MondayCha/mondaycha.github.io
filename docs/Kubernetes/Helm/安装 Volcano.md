---
title: 安装 Volcano
created_at: 2024-10-01
is_public: true
tags:
  - volcano
  - helm
---

Once Helm is set up properly, add the repo as follows:

```shell
helm repo add volcano-sh https://volcano-sh.github.io/helm-charts
```

You can then run `helm search repo volcano-sh` to see the charts. If you had already added this repo before, please run the following command to get the latest version.

```shell
helm repo update
```

## Install Volcano

### v1.10.0

```
helm install volcano volcano-sh/volcano -n volcano-system --create-namespace --set basic.image_registry=crater-harbor.act.buaa.edu.cn/docker.io
```

### v1.9.0

```
helm upgrade --install volcano volcano-sh/volcano -n volcano-system --create-namespace \
--set basic.controller_image_name="crater-harbor.act.buaa.edu.cn/docker.io/volcanosh/vc-controller-manager" \
--set basic.scheduler_image_name="crater-harbor.act.buaa.edu.cn/docker.io/volcanosh/vc-scheduler" \
--set basic.admission_image_name="crater-harbor.act.buaa.edu.cn/docker.io/volcanosh/vc-webhook-manager" \
--version 1.9.0
```

## Uninstall Volcano

```shell
helm uninstall volcano -n volcano-system
```
