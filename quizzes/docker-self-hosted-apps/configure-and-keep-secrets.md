# 复习测验:配置应用并保管好密钥

- 课程:用 Docker 部署现成应用(`docker-self-hosted-apps`)
- 课时:Configure it and keep secrets safe(`configure-and-keep-secrets`)
- 题型:单选

## 第 1 题

改变 `AUTH_SECRET` 会发生什么?

- A. 什么也不会发生
- B. 所有人都会被登出,用旧值加密的数据无法再读取
- C. 数据库会被自动删除
- D. 应用会变成免费

**答案:B**

解析:官方设置说明写明,更改 AUTH_SECRET 会让所有人登出,并使用旧值加密的数据无法读取。

依据:Step 2: Understand AUTH_SECRET

## 第 2 题

为什么要把 `.env` 文件排除在 Git 提交之外?

- A. 让 Git 记录它的每一次修改
- B. 让 Docker 读不到它
- C. 让它自动变大
- D. 让 Git 在提交时忽略它,降低误提交和泄露的风险

**答案:D**

解析:.gitignore 告诉 Git 忽略指定文件,把 .env 列进去可以避免密钥被提交。

依据:Step 5: Keep the .env file out of Git

## 第 3 题

设置 `FLAG_DISABLE_SIGNUPS="true"` 并重新启动之后,会发生什么?

- A. 已有账号仍可登录,新用户无法注册
- B. 所有账号都会被删除
- C. 所有人都无法登录
- D. 应用会关闭 HTTPS

**答案:A**

解析:官方设置说明写明,这个开关阻止创建新账号,而已有账号继续可用。

依据:Step 7: Close sign-up
