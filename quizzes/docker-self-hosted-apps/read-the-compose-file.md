# 复习测验:让 AI 帮你读懂应用的 compose 文件

- 课程:用 Docker 部署现成应用(`docker-self-hosted-apps`)
- 课时:Understand an app’s compose file with AI(`read-the-compose-file`)
- 题型:单选

## 第 1 题

在 Reactive Resume 的 `"3000:3000"` 这一行里,左边的数字表示什么?

- A. 容器内部的端口
- B. 你的电脑(主机)上的端口
- C. 数据卷的名字
- D. 密码的长度

**答案:B**

解析:左边是主机端口,右边是容器内部端口,这一对叫端口映射。

依据:What you will do

## 第 2 题

在 Reactive Resume 的 compose 文件里,哪一个服务是数据库?

- A. reactive-resume
- B. .env
- C. 3000
- D. postgres

**答案:D**

解析:postgres 服务运行 PostgreSQL 数据库,应用通过这个服务名连接它。

依据:Find the database and the app

## 第 3 题

为什么要先读 `ports` 一节,再启动应用?

- A. 因为 `-p` 会让端口在主机之外可以访问,要先确认哪些端口对外开放
- B. 因为 `ports` 决定了应用的颜色
- C. 因为 `ports` 会自动删除数据
- D. 因为端口号必须和用户名相同

**答案:A**

解析:发布端口会让它在主机之外可以访问,所以启动前要先读懂每一个端口。

依据:What the ports mean for safety
