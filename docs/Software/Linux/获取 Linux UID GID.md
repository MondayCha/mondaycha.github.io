---
title: 获取 Linux UID GID
created_at: 2024-12-05
is_public: true
---

以下是支持后台运行的修改版本，我提供两种方法：

1. 使用 `nohup` 方式（推荐）：

```python
from flask import Flask, jsonify, request
import subprocess
import logging
from logging.handlers import RotatingFileHandler
import os

app = Flask(__name__)

# 配置日志
if not os.path.exists('logs'):
    os.mkdir('logs')

handler = RotatingFileHandler('logs/app.log', maxBytes=10000, backupCount=3)
handler.setLevel(logging.INFO)
app.logger.addHandler(handler)
formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
handler.setFormatter(formatter)

@app.route('/get_user_id', methods=['GET'])
def get_user_id():
    username = request.args.get('username')

    if not username:
        app.logger.error('Username not provided')
        return jsonify({'error': 'Username not provided'}), 400

    try:
        result = subprocess.run(['id', username], capture_output=True, text=True, check=True)
        result_output = result.stdout.strip()

        uid_gid = parse_id_output(result_output)
        app.logger.info(f'Successfully got user ID for {username}')

        return jsonify(uid_gid)

    except subprocess.CalledProcessError as e:
        app.logger.error(f'Error getting user ID: {str(e)}')
        return jsonify({'error': str(e)}), 500

def parse_id_output(output):
    parts = output.split()
    uid_part = parts[0]
    gid_part = parts[1]

    uid = uid_part.split('=')[1].split('(')[0]
    gid = gid_part.split('=')[1].split('(')[0]

    return {'uid': uid, 'gid': gid}

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
```

使用方法：

1. 将脚本保存为 `query_id.py`
1. 在终端中运行：

```bash
nohup python3 query_id.py > logs/output.log 2>&1 &
```

2. 使用 `systemd` 服务方式：

创建服务文件 `/etc/systemd/system/flask-app.service`：

```ini
[Unit]
Description=Flask User ID Service
After=network.target

[Service]
User=your_username
WorkingDirectory=/path/to/your/app
Environment="PATH=/path/to/your/virtual/env/bin"
ExecStart=/path/to/your/virtual/env/bin/python app.py
Restart=always

[Install]
WantedBy=multi-user.target
```

使用方法：

```bash
# 启动服务
sudo systemctl start flask-app

# 设置开机自启
sudo systemctl enable flask-app

# 查看状态
sudo systemctl status flask-app

# 停止服务
sudo systemctl stop flask-app
```

两种方法的特点：

1. `nohup` 方式：

   - 简单快捷
   - 适合开发和临时使用
   - 添加了日志功能便于调试

1. `systemd` 服务方式：

   - 更加专业和可靠
   - 支持开机自启
   - 自动重启功能
   - 适合生产环境

选择建议：

- 如果是简单测试或开发环境，使用 `nohup` 方式即可
- 如果是生产环境，建议使用 `systemd` 服务方式

补充说明：

- 两种方式都添加了基本的日志功能
- 建议根据实际需求调整端口号和主机地址
- 生产环境建议使用 Gunicorn 或 uWSGI 作为 WSGI 服务器
- 可以考虑添加更多的错误处理和安全措施
