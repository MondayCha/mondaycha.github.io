---
title: Nvidia 节点驱动安装
created_at: 2025-01-09
is_public: true
---

> [!note] 后续采用 GPU Operator 统一管理

```shell
#查看服务器是否有gpu
[root@gpu ~]# lspci | grep -i nvidia
0b:00.0 3D controller: NVIDIA Corporation Device 1eb8 (rev a1)
13:00.0 3D controller: NVIDIA Corporation Device 1eb8 (rev a1)
#查看服务器是否已经安装有gpu英伟达驱动
lsmod | grep  -i nvidia
#查看gpu型号、gpu驱动版本等,能列出信息说明驱动已经安装成功,没有信息则说明还没安装驱动
nvidia-smi
#查看是否安装有默认驱动,没有跳过该步骤，有显示内容则说明安装有默认驱动,需要卸载掉,不然会和nvidia冲突,卸载步骤如下
lsmod | grep nouveau
centos6：vim /etc/modprobe.d/blacklist.conf
centos7：vim /usr/lib/modprobe.d/dist-blacklist.conf
#centos 7直接使用命令修改
ls /usr/lib/modprobe.d/dist-blacklist.conf && echo $?
sed -i -e '/blacklist viafb/ablacklist nouveau' -e '/blacklist viafb/aoptions nouveau modeset=0' /usr/lib/modprobe.d/dist-blacklist.conf  && echo $?
echo "检查是否修改成功：";grep  'nouveau' /usr/lib/modprobe.d/dist-blacklist.conf
#或者手动编辑文件亦可,在blacklist viafb等列的文件末尾添加下面两句
blacklist nouveau
options nouveau modeset=0
#备份原来的镜像,重新生成镜像文件,可以临时禁用,重启,再次确认是否已经禁用/卸载
mv /boot/initramfs-$(uname -r).img /boot/initramfs-$(uname -r)-nouveau.img.bak
dracut /boot/initramfs-$(uname -r).img $(uname -r)
modprobe -r nouveau
reboot
lsmod | grep nouveau
```
