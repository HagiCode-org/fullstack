# 复习测验:Docker Compose

- 课程:Docker 入门(`docker-for-beginners`)
- 课时:Docker Compose(`docker-compose`)
- 题型:单选

## 第 1 题

Docker Compose 的 `compose.yaml` 用来做什么?

- A. 用一个文件描述多个服务,并一起启动、停止它们
- B. 记录你一天用了多少流量
- C. 给镜像加密
- D. 把容器变成虚拟机

**答案:A**

解析:一个文件描述多项服务,用一条命令统一管理。

## 第 2 题

Compose 里的各个服务怎样互相访问?

- A. 必须手动写 IP 地址
- B. 只能通过浏览器
- C. 互相之间无法访问
- D. 通过 Compose 自动创建的网络,用服务名访问

**答案:D**

解析:Compose 为服务创建网络,服务之间可按服务名访问。

## 第 3 题

`down` 和 `down -v` 的区别是什么?

- A. 没有区别
- B. `down` 删除卷,`down -v` 保留卷
- C. `down` 保留卷,`down -v` 还会删除卷及其中的数据
- D. `down -v` 只重启服务

**答案:C**

解析:`down` 删除容器和网络但保留卷;加 `-v` 连数据一起删。
