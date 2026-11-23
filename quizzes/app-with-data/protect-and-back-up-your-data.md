# 复习测验:保护并备份你的数据

- 课程:带数据库的应用(`app-with-data`)
- 课时:Protect and back up your data(`protect-and-back-up-your-data`)
- 题型:单选

## 第 1 题

数据库的 volume 应该挂载到哪个路径,取决于什么?

- A. 电脑的颜色设置
- B. PostgreSQL 的版本(18 及以后与 17 及以前的路径不同)
- C. 你使用的浏览器
- D. 你的 GitHub 用户名

**答案:B**

解析:官方 Docker Hub 页面说明,PostgreSQL 18 及以后与 17 及以前的数据路径不同。挂错路径时,重新创建容器后数据可能无法保留。

依据:Where your data lives

## 第 2 题

下面哪个命令会在删除容器的同时删除命名 volume 中的数据?

- A. docker compose up --detach
- B. docker compose logs
- C. docker compose ps
- D. docker compose down -v

**答案:D**

解析:Compose 参考说明,-v 会删除 Compose 文件中声明的命名 volume,数据会随之消失。

依据:Commands that can delete data

## 第 3 题

应该把哪个文件加入 .gitignore,以免保存到 GitHub 时把密码一起提交?

- A. .env
- B. README.md
- C. compose.yaml
- D. brief.md

**答案:A**

解析:.env 文件保存着真实的密码。GitHub 的文档说明,.gitignore 可以告诉 Git 提交时忽略哪些文件。

依据:What you will do
