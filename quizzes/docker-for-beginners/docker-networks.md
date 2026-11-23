# 复习测验:Docker 网络

- 课程:Docker 入门(`docker-for-beginners`)
- 课时:Docker networks(`docker-networks`)
- 题型:单选

## 第 1 题

在你自己创建的网络里,容器之间可以怎样找到对方?

- A. 只能靠 IP 地址
- B. 可以用容器名
- C. 只能经过电脑的已发布端口
- D. 只能用浏览器访问

**答案:B**

解析:在自定义网络中容器可以用容器名互相访问,这是默认网络做不到的。

依据:What you learned

## 第 2 题

为什么在默认网络上,容器无法用名字找到 db?

- A. 因为 db 没有启动
- B. 因为镜像不支持网络
- C. 因为默认网络不提供按名字查找
- D. 因为密码错误

**答案:C**

解析:默认网络不提供按名字查找,只有自己创建的网络才提供。

依据:Step 4: Try the same thing on the default network

## 第 3 题

在本课里,为什么数据库 db 不发布端口?

- A. 因为数据库不需要网络
- B. 因为只有同一网络上的容器需要访问它
- C. 因为端口已被占用
- D. 因为 Compose 不允许发布端口

**答案:B**

解析:db 没有发布端口,所以只有 course-net 上的容器能访问它。

依据:Step 5: Know which path is which
