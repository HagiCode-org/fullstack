# 复习测验:第一个容器

- 课程:Docker 入门(`docker-for-beginners`)
- 课时:Your first container(`your-first-container`)
- 题型:单选

## 第 1 题

哪个命令只列出正在运行的容器?

- A. docker ps
- B. docker ps -a
- C. docker rm
- D. docker run

**答案:A**

解析:docker ps 默认只显示正在运行的容器,加上 -a 才会显示全部容器。

依据:Step 3: List the running containers

## 第 2 题

要删除已停止的 hello-world 容器,应使用哪个命令?

- A. docker stop
- B. docker rm,后面跟容器名
- C. docker pull
- D. docker version

**答案:B**

解析:docker rm 按名称删除已停止的容器,镜像仍会保留在电脑上。

依据:Step 5: Remove the container

## 第 3 题

STATUS 列显示 Exited (0) 表示什么?

- A. 容器仍在运行
- B. 镜像已被删除
- C. 容器正常结束,没有报错
- D. 端口已被占用

**答案:C**

解析:0 是退出码,表示程序正常结束;其他数字表示程序出现了问题。

依据:Step 4: List all containers, including stopped ones
