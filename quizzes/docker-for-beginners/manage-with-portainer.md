# 复习测验:用 Portainer 管理容器

- 课程:Docker 入门(`docker-for-beginners`)
- 课时:Manage containers with Portainer(`manage-with-portainer`)
- 题型:单选

## 第 1 题

为什么 Portainer 只应该留在自己的电脑上?

- A. 因为它需要访问 Docker 套接字,能控制所有容器
- B. 因为它只能离线运行
- C. 因为它只支持 Windows
- D. 因为它不需要密码

**答案:A**

解析:套接字让 Portainer 以管理员身份控制全部容器,所以页面只应留在本机。

依据:Security note: read this first

## 第 2 题

首次设置 Portainer 时,setup token 应从哪里获得?

- A. 官网下载页
- B. 服务器日志中 setup_token= 那一行
- C. 浏览器地址栏
- D. 镜像标签

**答案:B**

解析:Portainer 把 setup token 写入服务器日志,用 docker logs 查找 setup_token= 即可。

依据:Step 2: Find the setup token

## 第 3 题

管理员账号应在多长时间内创建?

- A. 1 分钟
- B. 5 分钟
- C. 1 小时
- D. 没有时间限制

**答案:B**

解析:官方 FAQ 说明必须在 5 分钟内创建管理员,超时后重启 Portainer 再试。

依据:Step 3: Create the administrator account
