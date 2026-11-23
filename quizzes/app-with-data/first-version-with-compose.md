# 复习测验:用 Docker Compose 运行第一个版本

- 课程:带数据库的应用(`app-with-data`)
- 课时:Get the first version running with Docker Compose(`first-version-with-compose`)
- 题型:单选

## 第 1 题

数据库密码应该放在哪里?

- A. 直接写进 compose.yaml,并提交到 GitHub
- B. 写进聊天框里,让 AI 记住
- C. 写在 README 文件里
- D. 放在项目文件夹根目录的 .env 文件中,并使用占位符

**答案:D**

解析:Docker 的变量插值文档说明,.env 文件应放在项目根目录,与 compose.yaml 相邻。课文的示例只用占位符。

依据:Set the database password in a settings file

## 第 2 题

停止应用再重新启动后,之前添加的条目仍然在,这说明什么?

- A. 条目只保存在页面上,没有保存到数据库
- B. 条目已经保存到数据库中,重启没有丢失
- C. 应用需要重新构建
- D. Docker 没有运行

**答案:B**

解析:重启之后条目仍然在,说明它已经被保存下来。如果不在,就要把问题告诉 AI。

依据:Why you stop and start the app

## 第 3 题

在 Windows 和 Mac 上运行 docker compose 命令,有什么区别?

- A. 只有进入项目文件夹的路径不同,Compose 命令本身相同
- B. Mac 上不能使用 Compose
- C. Windows 上不能使用 Compose
- D. 两个系统必须使用不同的 Compose 命令

**答案:A**

解析:课文分别给出了 Windows 和 Mac 进入项目文件夹的例子,之后的 up、down 和 logs 命令在两个系统上完全相同。

依据:Start and stop on a Mac
