# 复习测验:部署 Reactive Resume

- 课程:用 Docker 部署现成应用(`docker-self-hosted-apps`)
- 课时:Deploy Reactive Resume(`deploy-reactive-resume`)
- 题型:单选

## 第 1 题

执行 `docker compose up -d --wait` 时,`--wait` 的作用是什么?

- A. 删除所有容器
- B. 等服务运行或健康之后,命令才结束
- C. 打开浏览器
- D. 生成新的密钥

**答案:B**

解析:官方文档说明,使用 --wait 时命令会在服务运行或健康后退出,并受超时时间限制。

依据:Step 5: Start the containers

## 第 2 题

Windows 上官方给出的密钥生成命令需要哪个版本的 PowerShell?

- A. PowerShell 7 或更新版本
- B. PowerShell 5
- C. 命令提示符
- D. 不需要 PowerShell

**答案:A**

解析:官方指南在 Windows 命令旁注明需要 PowerShell 7 或更新版本,所以要先确认版本。

依据:Step 3: Generate the secret values

## 第 3 题

`.env` 文件中的 `APP_URL` 应该怎样设置?

- A. 必须是 example.com
- B. 必须是数字
- C. 必须与浏览器地址栏中的地址完全一致
- D. 可以随意写

**答案:C**

解析:官方文档说明,APP_URL 必须与浏览器地址栏中的地址完全一致,否则登录会跳转到错误的地方。

依据:Step 2: Create the .env file
