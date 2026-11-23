# 复习测验:再试几个应用

- 课程:用 Docker 部署现成应用(`docker-self-hosted-apps`)
- 课时:Try more apps(`try-more-apps`)
- 题型:单选

## 第 1 题

Memos 的 Docker Compose 示例把数据文件夹映射到容器内的哪个路径?

- A. /app/data
- B. /var/opt/memos
- C. /run/secrets
- D. /backup

**答案:B**

解析:官方示例把 ./data 映射到容器内的 /var/opt/memos,Memos 的数据保存在那里。

依据:Step 1: Run Memos

## 第 2 题

Uptime Kuma 的官方安装命令使用哪个端口?

- A. 5230
- B. 3000
- C. 3001
- D. 8080

**答案:C**

解析:官方安装页给出的命令是 -p 3001:3001,访问地址是 http://localhost:3001。

依据:Step 2: Run Uptime Kuma

## 第 3 题

判断一个应用能否用于工作时,四个问题中的许可证问题要看什么?

- A. 许可证是否允许你的用途
- B. 应用的颜色
- C. 它的 Docker 镜像大小
- D. 它的图标设计

**答案:A**

解析:许可证说明你可以对软件做什么,必须在使用前读懂它的条款。

依据:Step 3: Check each app with four questions
