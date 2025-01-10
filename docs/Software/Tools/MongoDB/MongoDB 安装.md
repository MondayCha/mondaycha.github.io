## 在 MacOS 安装

> [Download MongoDB Community Server | MongoDB](https://www.mongodb.com/try/download/community)

```bash
tar -zxvf mongodb-macos-x86_64-5.0.24.tgz
sudo mkdir -p /usr/local/mongodb
sudo mv mongodb-macos-x86_64-5.0.24/* /usr/local/mongodb
```

Set Environment Variables:

```bash
export PATH=/usr/local/mongodb/bin:$PATH
```

## 启动 MongoDB

在 macOS 系统上，遇到 “Read-only file system” 错误通常是因为系统安全性和隐私保护功能限制了对某些系统目录的写入权限。从 macOS Catalina (10.15) 版本开始，系统对根目录进行了分区，使得 `/` 目录变为只读，以增强系统安全性。

针对 MongoDB，默认的数据目录 `/data/db` 在新版 macOS 中可能不再可行。你可以选择在用户目录或其他非受限目录下创建数据目录。以下是修改 MongoDB 数据目录的步骤：

1. **创建新的数据目录**：
   在用户目录下或者任何其他有写权限的地方创建一个新的数据目录。例如，你可以创建一个目录在你的用户目录下：

   ```bash
   mkdir -p ~/mongodb-data
   ```

1. **运行 MongoDB**：
   当启动 `mongod` 时，使用 `--dbpath` 选项指定新的数据目录。例如：

   ```bash
   mongod --dbpath ~/mongodb-data
   ```

   这样会告诉 MongoDB 使用你刚刚创建的目录来存储数据。

1. **更新配置文件（可选）**：
   如果你使用配置文件来启动 MongoDB，你也需要更新该文件中的 `dbpath` 设置，指向新的数据目录。

通过这种方式，你可以绕过 macOS 的文件系统限制，同时确保 MongoDB 能够正常存取其数据文件。

## 载入数据库文件

```bash
# 进入 Mongo Shell
mongo
# 创建数据库 Interpret
use interpret
# 退出 Shell，导入平哥在群里提供的 js 数据库文件
mongo interpret interpreter.js
```
