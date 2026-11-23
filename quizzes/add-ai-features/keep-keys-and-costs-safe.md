# 复习测验:保管好密钥,控制好费用

- 课程:给应用加上 AI 功能(`add-ai-features`)
- 课时:Keep keys and costs safe(`keep-keys-and-costs-safe`)
- 题型:单选

## 第 1 题

根据课文,API 密钥应当放在哪里?

- A. 项目文件里
- B. 聊天记录中
- C. 公开的网页上
- D. 只放在环境变量里,不写进任何会被保存到 GitHub 或展示出来的文件

**答案:D**

解析:课文要求密钥只保存在环境变量中,不能出现在任何会被保存到 GitHub 或展示在网站上的文件里。

依据:Where the key must never appear

## 第 2 题

OpenAI 的硬性消费上限(hard spend limit)被触发后会怎样?

- A. 只发送一条通知
- B. 受影响的 API 请求返回 429 错误
- C. 自动删除你的密钥
- D. 把价格降低

**答案:B**

解析:课文说明消费提醒只发送通知而不停止请求,硬性上限则会让受影响的 API 请求返回 429 错误。

依据:Set a spending limit and an alert

## 第 3 题

超过长度限制的文本,应该怎样处理?

- A. 直接发送给模型
- B. 随机截断后发送
- C. 显示约定的提示语,并且不发送给模型
- D. 删除用户的全部输入

**答案:C**

解析:课文要求功能拒绝超长文本,显示说明书里约定的提示语,并且绝不把它发给模型服务。

依据:Limit how much text the feature accepts
