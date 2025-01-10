## Dockerd 代理

> [如何优雅的给 Docker 配置网络代理-腾讯云开发者社区-腾讯云](https://cloud.tencent.com/developer/article/1806455) > [Use a proxy server with the Docker CLI](https://docs.docker.com/engine/cli/proxy/)

在执行 `docker pull` 时，是由守护进程 `dockerd` 来执行。因此，代理需要配在 `dockerd` 的环境中。而这个环境，则是受 `systemd` 所管控，因此实际是 `systemd` 的配置。

```javascript
sudo mkdir -p /etc/systemd/system/docker.service.d
sudo touch /etc/systemd/system/docker.service.d/proxy.conf
```

在这个 `proxy.conf` 文件（可以是任意 `*.conf` 的形式）中，添加以下内容：

```javascript
[Service]
Environment="HTTP_PROXY=http://192.168.5.58:1080/"
Environment="HTTPS_PROXY=http://192.168.5.58:1080/"
Environment="NO_PROXY=localhost,127.0.0.1,.example.com,.cn"
```

（查看代理机器 IP，开启 V2Ray 的局域网模式）

`dockerd` 代理的修改比较特殊，它实际上是改 `systemd` 的配置，因此需要重载 `systemd` 并重启 `dockerd` 才能生效。

```javascript
sudo systemctl daemon-reload
sudo systemctl restart docker
```

## Docker 镜像转移

```bash
#!/bin/bash

IMAGE_TO_TRANSFER=$1

# 拉取镜像
docker pull $IMAGE_TO_TRANSFER

# 获取原始镜像的名称和标签
ORIGINAL_IMAGE_NAME=$(echo $IMAGE_TO_TRANSFER | awk -F ':' '{print $1}')
ORIGINAL_IMAGE_TAG=$(echo $IMAGE_TO_TRANSFER | awk -F ':' '{print $2}')

# 重命名镜像
NEW_IMAGE_NAME="harbor.act.buaa.edu.cn/crater-images/${ORIGINAL_IMAGE_NAME##*/}:${ORIGINAL_IMAGE_TAG}"
docker tag $IMAGE_TO_TRANSFER $NEW_IMAGE_NAME

# 上传镜像
docker push $NEW_IMAGE_NAME

# 清理镜像
docker rmi $IMAGE_TO_TRANSFER
docker rmi $NEW_IMAGE_NAME
```

需要通过 Sudo 运行上述脚本。
