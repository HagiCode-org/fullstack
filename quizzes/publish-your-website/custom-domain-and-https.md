# 复习测验:自定义域名与 HTTPS（选做）

- 课程:发布你的网站(`publish-your-website`)
- 课时:Custom domain and HTTPS (optional)(`custom-domain-and-https`)
- 题型:单选

## 第 1 题

要让 apex 域名（如 `example.com`）指向 GitHub Pages,DNS 中应添加什么记录?

- A. 指向 GitHub Pages IP 地址的 A 记录
- B. 通配符记录 `*.example.com`
- C. 多条 MX 邮件记录
- D. 只需一条 TXT 记录

**答案:A**

解析:GitHub 文档说明 apex 域名应创建 A 记录,指向 GitHub Pages 的 IP 地址,而不是通配符记录。

依据:What you will do

## 第 2 题

`www` 子域名应使用什么记录指向 GitHub Pages?

- A. 指向 127.0.0.1 的 A 记录
- B. 指向 `你的用户名.github.io`(不含仓库名)的 CNAME 记录
- C. 一条 TXT 记录
- D. 不需要任何记录

**答案:B**

解析:CNAME 记录应指向账号的 github.io 地址本身,不能带上仓库名。

依据:What you will do

## 第 3 题

中国大陆地区的 ESA 加速区域,对域名有什么要求?

- A. 无需任何备案
- B. 域名需要先完成 ICP 备案
- C. 需要购买 GitHub 企业版
- D. 需要使用 Windows 系统

**答案:B**

解析:ESA 文档说明,选择 Global 或 Chinese Mainland 区域时,域名需要先完成中国大陆的 ICP 备案。

依据:Mainland China and ICP filing
