# 复习测验:第一个容器

- 课程:Docker 入门(`docker-for-beginners`)
- 课时:Your first container(`your-first-container`)
- 题型:单选

## 第 1 题

用 `docker run` 运行 hello-world,它会做什么?

- A. 只下载镜像,不运行
- B. 永远在后台运行
- C. 把你的电脑重启
- D. 根据镜像创建容器并启动,打印一条消息后停止

**答案:D**

解析:`docker run` 创建并启动容器;hello-world 打印消息后就结束了。

## 第 2 题

hello-world 容器运行结束后,它还在你的电脑上吗?

- A. 在,容器停止后仍然保留,直到你把它删除
- B. 不在,容器结束后立刻消失
- C. 只在重启之前保留
- D. 会自动变成一个镜像

**答案:A**

解析:容器停止后仍会留在电脑上,需要用 `docker rm` 删除。

## 第 3 题

要看到包括已停止在内的所有容器,应该用哪个命令?

- A. `docker ps`
- B. `docker ps -a`
- C. `docker rm`
- D. `docker stop`

**答案:B**

解析:`docker ps` 只显示正在运行的,`docker ps -a` 显示全部。
