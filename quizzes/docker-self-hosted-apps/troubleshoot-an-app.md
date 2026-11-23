# 复习测验:排查应用故障

- 课程:用 Docker 部署现成应用(`docker-self-hosted-apps`)
- 课时:Troubleshoot an app(`troubleshoot-an-app`)
- 题型:单选

## 第 1 题

`docker compose logs` 命令中的 `-f` 选项是做什么的?

- A. 删除日志
- B. 持续跟随新的日志输出
- C. 把日志转换成 PDF
- D. 停止容器

**答案:B**

解析:官方文档说明 -f 会跟随日志输出,新的日志行会不断显示出来。

依据:Step 2: Read the log

## 第 2 题

发生端口冲突时,应该修改哪一部分?

- A. 冒号右边的容器端口
- B. 镜像标签
- C. 冒号左边的主机端口,并让 APP_URL 与之匹配
- D. 数据库密码

**答案:C**

解析:冒号左边是主机端口,换成空闲端口后,APP_URL 也要改成相同的地址才能正常登录。

依据:Step 4: Fix a port conflict

## 第 3 题

`/api/health` 返回 `503` 表示什么?

- A. 应用完全健康
- B. 数据库已经被删除
- C. 需要重新安装 Docker
- D. 至少有一项检查失败

**答案:D**

解析:官方文档说明,健康检查有任何一项失败时返回 503,并且要找出标记为 unhealthy 的那一项。

依据:Step 5: Test the health endpoint
