# 复习测验:更多社区容器

- 课程:Docker 入门(`docker-for-beginners`)
- 课时:More community containers(`more-community-containers`)
- 题型:单选

## 第 1 题

运行 Dozzle 或其他使用 Docker 套接字的工具之前,应先读什么?

- A. 镜像标签
- B. 安全提示
- C. 端口号
- D. 费用说明

**答案:B**

解析:使用 Docker 套接字的工具能控制全部容器,所以运行前要先读安全提示。

依据:Security note: tools that use the Docker socket

## 第 2 题

为什么 Adminer 虽然不需要 Docker 套接字,仍然要妥善保护?

- A. 因为它能修改数据库中的任何一行
- B. 因为它会删除镜像
- C. 因为它只能在 Windows 上运行
- D. 因为它只能在网络上运行

**答案:A**

解析:Adminer 不需要套接字,但它能修改数据库中的任何一行,所以页面只应留在本机。

依据:Card: Adminer

## 第 3 题

哪个工具是反向代理,能把访问转交给正确的服务?

- A. Dozzle
- B. Uptime Kuma
- C. Adminer
- D. Nginx Proxy Manager

**答案:D**

解析:Nginx Proxy Manager 接收访问并转给对应服务,其指南还说明可以提供免费 SSL。

依据:Card: Nginx Proxy Manager
