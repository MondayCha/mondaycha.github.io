---
title: Ansible 基本使用
created_at: 2024-12-02
is_public: true
---

## 系统环境准备

[Zsh 配置](../../Software/Linux/Zsh%20%E9%85%8D%E7%BD%AE.md)

## Ansible 安装

### 清单文件

Ansible 使用一个文本文件来定义要管理的服务器列表，这个文件被称为主机清单。默认情况下，Ansible 会查找  `/etc/ansible/hosts`  文件作为主机清单。

例如，创建一个简单的主机清单文件：

```toml
[master]
192.168.5.[73:75]

[worker-v100]
192.168.5.[24:30]

[worker-a100]
192.168.5.190
```

### 配置免密登录

Ansible 通过 SSH 连接到远程服务器进行管理。确保控制节点可以通过 SSH 无密码登录到被管理的服务器。可以使用 SSH 密钥对来实现这一点。

生成 SSH 密钥对（如果还没有）：

```shell
ssh-keygen -t ed25519
```

将公钥复制到被管理的服务器上：

```shell
ssh-copy-id root@10.8.0.1
# 以此类推，将公钥复制到所有被管理的服务器上
```

特殊情况，将控制节点的公钥私钥复制到其他节点上（较危险 ⚠️）：

```shell
scp ~/.ssh/id_ed25519 root@10.8.0.3:~/.ssh/
scp ~/.ssh/id_ed25519.pub root@10.8.0.3:~/.ssh/
scp ~/.ssh/known_hosts root@10.8.0.3:~/.ssh/
scp ~/.ssh/known_hosts.old root@10.8.0.3:~/.ssh/
```

### 测试连接

如果有初次连接需要确认的情况，必须手动确认才可以。

```shell
$ ssh 192.168.5.28
The authenticity of host '192.168.5.28 (192.168.5.28)' can't be established.
ED25519 key fingerprint is SHA256:FdDplwem2ryEso7SIHtgsReoXLzABpAVXg84zIENOcE.
This host key is known by the following other names/addresses:
    ~/.ssh/known_hosts:20: [hashed name]
Are you sure you want to continue connecting (yes/no/[fingerprint])? yes
```

手动确认 SSH 可以免密登录到所有节点后，执行测试：

```shell
ansible all -m ping
```

## Playbook

### OpenEBS HostPath

> [!NOTE] [Installation | OpenEBS Docs](https://openebs.io/docs/user-guides/local-storage-user-guide/local-pv-hostpath/hostpath-installation#prerequisites)

用于创建 HostPath 路径的 Playbook：

```yaml
- name: Create or Skip /var/openebs/local directory on all nodes
  hosts: master
  become: true
  tasks:
    - name: Check if directory exists
      stat:
        path: /var/openebs/local
      register: dir_status

    - name: Create directory if not exists
      file:
        path: /var/openebs/local
        state: directory
        mode: 0755
      when: not dir_status.stat.exists
```

使用方法：

```shell
ansible-playbook openebs-create-hostpath.yaml
```

### 安装 Nerdctl

先在 Master 节点上测试一下，[Nerdctl 使用](../Containerd/Nerdctl%20%E4%BD%BF%E7%94%A8.md)。
