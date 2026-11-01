# 复习测验:配置应用并保管好密钥

- 课程:用 Docker 部署现成应用(`docker-self-hosted-apps`)
- 课时:Configure it and keep secrets safe(`configure-and-keep-secrets`)
- 题型:单选

## 第 1 题

“密钥/密码”这类 secrets 的特点是什么?

- A. 可以公开发布的值
- B. 可以写在网页上的值
- C. 随便填什么都行
- D. 只应该由你知道的值

**答案:D**

解析:secrets 是只有你该知道的值,如数据库密码。

## 第 2 题

`.env` 文件应该怎样处理?

- A. 列入 `.gitignore`,不要提交到仓库
- B. 提交到公开仓库
- C. 发给朋友保存
- D. 直接写进网页

**答案:A**

解析:自检标准要求 `.env` 在 `.gitignore` 里。

## 第 3 题

新生成的密钥应该保存在哪里?

- A. 桌面上的便签
- B. 密码管理器
- C. 公开的聊天群
- D. 浏览器地址栏

**答案:B**

解析:自检标准要求新密钥保存在密码管理器里。
