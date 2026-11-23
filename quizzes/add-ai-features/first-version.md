# 复习测验:让第一版跑起来

- 课程:给应用加上 AI 功能(`add-ai-features`)
- 课时:Get the first version working(`first-version`)
- 题型:单选

## 第 1 题

根据课文,在创建 API 密钥之前应该先做什么?

- A. 把密钥写进项目文件
- B. 在服务那里设置消费上限
- C. 把密钥发到网页上
- D. 关闭互联网

**答案:B**

解析:课文要求先设好消费上限,再创建密钥,以免一次错误就产生无限的账单。

依据:Set a spending limit before you create a key

## 第 2 题

在 Windows 的 PowerShell 中,课文给出的设置环境变量的命令是哪一个?

- A. export AI_API_KEY="your-key-here"
- B. echo AI_API_KEY
- C. setx AI_API_KEY "your-key-here"
- D. 把密钥写进 config.js 文件

**答案:C**

解析:课文按 OpenAI 快速入门的形式,Windows 使用 setx,macOS 与 Linux 使用 export。

依据:Put the key in an environment variable

## 第 3 题

课文说应用应当从环境变量读取哪三个值?

- A. 颜色、字体和图标
- B. 用户名、邮箱和密码
- C. 页面标题、描述和关键词
- D. 服务地址、密钥和模型名

**答案:D**

解析:课文中应用从环境变量读取 AI_SERVICE_URL、AI_API_KEY 和 AI_MODEL_NAME 三个值。

依据:Put the key in an environment variable
