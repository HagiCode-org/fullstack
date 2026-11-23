# 复习测验:Docker Compose

- 课程:Docker 入门(`docker-for-beginners`)
- 课时:Docker Compose(`docker-compose`)
- 题型:单选

## 第 1 题

compose.yaml 文件的作用是什么?

- A. 记录所有镜像的密码
- B. 描述多个服务及其设置,供 docker compose 一次启动
- C. 备份数据库
- D. 替代浏览器

**答案:B**

解析:文件中列出了 web、app 和 db 三个服务,docker compose 按它一次启动。

依据:compose.yaml

## 第 2 题

docker compose down 与 docker compose down -v 有什么区别?

- A. 前者删除所有镜像,后者不删除
- B. 两者都会删除数据
- C. 后者只停止服务,前者删除容器
- D. 前者保留命名卷,后者同时删除命名卷

**答案:D**

解析:-v 会删除文件里声明的命名卷,不加 -v 时卷会保留。

依据:Step 6: Remove the services and the data

## 第 3 题

在 Compose 网络中,Nginx 通过什么找到 Node.js 程序?

- A. 服务的 IP 地址
- B. 服务名 app
- C. 电脑的 IP 地址
- D. 镜像名

**答案:B**

解析:课文说明 Nginx 按服务名 app 找到 Node.js 程序,服务名就是容器之间的地址。

依据:Step 3: Check that everything is running
