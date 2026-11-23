# 复习测验:运行 Nginx

- 课程:Docker 入门(`docker-for-beginners`)
- 课时:Run Nginx(`run-nginx`)
- 题型:单选

## 第 1 题

命令 -p 8080:80 中左边的 8080 代表什么?

- A. 容器内部的端口
- B. 你电脑上的端口(门)
- C. 镜像的版本号
- D. 一个文件夹

**答案:B**

解析:左边是电脑上的端口,右边是容器内 Nginx 监听的端口。

依据:Step 1: Start Nginx and publish port 8080

## 第 2 题

命令中 -v 的挂载选项末尾写上 :ro,作用是什么?

- A. 让文件夹只读
- B. 让容器可以写入文件夹
- C. 删除这个文件夹
- D. 启动浏览器

**答案:A**

解析:ro 表示只读,Nginx 能读取网页,但不能修改你的文件夹。

依据:Step 4: Serve your own page

## 第 3 题

修改 my-site 文件夹里的 index.html 后,要看到变化应该怎么做?

- A. 删除容器
- B. 重新构建镜像
- C. 保存文件并在浏览器里刷新
- D. 重启电脑

**答案:C**

解析:课文说明保存文件后刷新浏览器即可,不必重启容器。

依据:Step 4: Serve your own page
