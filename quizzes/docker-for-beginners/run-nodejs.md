# 复习测验:运行 Node.js

- 课程:Docker 入门(`docker-for-beginners`)
- 课时:Run Node.js(`run-nodejs`)
- 题型:单选

## 第 1 题

docker run --rm 中的 --rm 有什么作用?

- A. 运行后保留容器
- B. 程序结束后自动删除容器
- C. 删除镜像
- D. 启动浏览器

**答案:B**

解析:--rm 让容器在程序结束时自动删除,不留下残余。

依据:Step 2: Run the script inside a container

## 第 2 题

docker run 中的 -d 选项让容器以什么方式运行?

- A. 前台运行
- B. 只读运行
- C. 停止运行
- D. 后台运行(分离模式)

**答案:D**

解析:-d 让容器在后台运行,终端可以继续输入其他命令。

依据:Step 3: Turn the script into a web server

## 第 3 题

服务器程序在容器里应当监听哪里,发布的端口才能访问到它?

- A. 只监听 localhost
- B. 只监听某个文件
- C. 监听所有网络接口
- D. 只监听数据库

**答案:C**

解析:只监听本地地址时发布的端口无法访问它,所以要监听所有网络接口。

依据:Step 3: Turn the script into a web server
