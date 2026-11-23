# 复习测验:清理与后续步骤

- 课程:Docker 入门(`docker-for-beginners`)
- 课时:Clean up and next steps(`clean-up-and-next-steps`)
- 题型:单选

## 第 1 题

删除卷之前应该怎样做?

- A. 直接删除所有卷
- B. 逐个检查卷名,确认其中的数据已不再需要
- C. 先删除网络
- D. 先运行 docker system prune

**答案:B**

解析:卷保存着数据库等文件,删除后数据无法找回,所以要逐个确认。

依据:Step 4: Remove the volumes the course created

## 第 2 题

docker system prune 有什么风险?

- A. 它只删除本课程的容器
- B. 它会删除 Docker 本身
- C. 它会删除未使用的容器、网络和镜像,包括其他项目的
- D. 它只能在 Windows 上运行

**答案:C**

解析:prune 会清理所有未使用的资源,包括其他项目的容器、网络和镜像。

依据:Step 4: Remove the volumes the course created

## 第 3 题

用哪组命令可以确认课程创建的内容是否已经删除?

- A. docker run
- B. docker ps -a、docker network ls 和 docker volume ls
- C. docker compose up
- D. docker logs

**答案:B**

解析:三条列表命令分别显示容器、网络和卷,课程的名称应从列表中消失。

依据:Step 5: Check that nothing is left
