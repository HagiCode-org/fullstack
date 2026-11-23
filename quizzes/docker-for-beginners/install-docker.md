# 复习测验:安装 Docker

- 课程:Docker 入门(`docker-for-beginners`)
- 课时:Install Docker(`install-docker`)
- 题型:单选

## 第 1 题

在 Linux 上,把用户加入 docker 组的目的是什么?

- A. 为了安装图形界面
- B. 为了让普通用户不加 sudo 也能运行 Docker
- C. 为了关闭系统防火墙
- D. 为了删除旧版本的 Docker

**答案:B**

解析:加入 docker 组并重新登录后可以不用 sudo 运行 Docker 命令,但该组也能控制 Docker。

依据:Linux

## 第 2 题

docker version 的输出分为哪两部分?

- A. 输入和输出
- B. Windows 和 Linux
- C. 镜像和容器
- D. Client 和 Server

**答案:D**

解析:Client 部分描述你输入的命令行,Server 部分描述后台运行的 Docker 引擎。

依据:Check it worked

## 第 3 题

安装后的两项检查中,哪一条用来确认 Docker 能运行容器?

- A. docker version
- B. docker run hello-world
- C. docker logs
- D. docker volume ls

**答案:B**

解析:hello-world 会启动一个测试容器,能说明 Docker 可以运行容器。

依据:Check it worked
