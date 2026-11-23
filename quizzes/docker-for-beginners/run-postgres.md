# 复习测验:运行 PostgreSQL

- 课程:Docker 入门(`docker-for-beginners`)
- 课时:Run PostgreSQL(`run-postgres`)
- 题型:单选

## 第 1 题

第 3 步实验中,删除容器后数据为什么丢失了?

- A. 数据库没有设置密码
- B. 表是保存在第一个容器内部的
- C. psql 无法连接数据库
- D. 镜像已经被删除

**答案:B**

解析:表存在第一个容器内部,删除该容器时数据一同消失。

依据:Step 3: Remove the container and see what is lost

## 第 2 题

用命名卷 pgdata 保存数据后,删除容器再新建一个容器会怎样?

- A. 数据消失
- B. 数据库拒绝启动
- C. 数据仍在,因为新容器使用同一个卷
- D. 数据自动被发送到网络

**答案:C**

解析:新容器挂载的是同一个卷,所以之前写入的行仍然存在。

依据:Step 4: Keep the data in a named volume

## 第 3 题

本课提醒:使用 PostgreSQL 18 镜像时要注意什么?

- A. 数据目录路径可能与 17 不同
- B. 必须改用 Nginx 镜像
- C. 不需要设置密码
- D. 端口必须是 80

**答案:A**

解析:从 PostgreSQL 18 起数据目录路径按版本区分,不能照搬 17 的路径。

依据:Step 4: Keep the data in a named volume
