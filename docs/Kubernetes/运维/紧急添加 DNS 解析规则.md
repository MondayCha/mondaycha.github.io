## B U A A

## title: "[紧急添加 DNS 解析规则](%E7%B4%A7%E6%80%A5%E6%B7%BB%E5%8A%A0%20DNS%20%E8%A7%A3%E6%9E%90%E8%A7%84%E5%88%99.md)" created_at: 2025-03-07 is_public: true tags:

目前 Crater 平台的 DNS 解析出现问题，以下是解决方法：

### 修改本地 Hosts 文件

Hosts 文件是一个用于将主机名映密到 IP 地址的系统文件。它可以用来测试网站、屏蔽某些网站等。

- **Windows**: Hosts 文件通常位于 `C:\Windows\System32\drivers\etc\hosts`。
- **macOS 和 Linux**: Hosts 文件通常位于 `/etc/hosts`。

要编辑 Hosts 文件，请使用文本编辑器（如记事本、TextEdit 或 Vi），并以管理员身份运行该编辑器。然后，在文件末尾添加一行或多行如下格式的内容：

```
<IP地址> <域名>
```

例如，如果你想要将所有对 `example.com` 的请求指向 IP 地址 `192.0.2.1`，你可以在 Hosts 文件中添加如下行：

```
192.168.5.35    gpu.act.buaa.edu.cn
```

保存文件后，这些更改会立即生效，无需重启电脑。但是，在某些操作系统上，可能需要刷新 DNS 缓存才能使更改生效。在 Windows 上，可以通过命令提示符执行 `ipconfig /flushdns` 来刷新 DNS 缓存；在 Linux 或 macOS 上，可以尝试 `sudo killall -HUP mDNSResponder` 或 `sudo dscacheutil -flushcache` 命令。
