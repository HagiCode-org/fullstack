# 复习测验:每次推送自动发布

- 课程:发布你的网站(`publish-your-website`)
- 课时:Publish on every push(`publish-on-every-push`)
- 题型:单选

## 第 1 题

GitHub Actions 的 workflow 文件应放在仓库的哪个文件夹中?

- A. `.github/workflows`
- B. `src/`
- C. `gh-pages`
- D. `node_modules`

**答案:A**

解析:GitHub 把 workflow 文件放在 `.github/workflows` 文件夹中,让 GitHub 能找到并运行它们。

依据:What you will do

## 第 2 题

下面哪个动作会自动启动一次 workflow run?

- A. 在 Settings 里修改仓库的颜色
- B. 推送修改到默认分支
- C. 打开日志查看上一次的结果
- D. 删除 README 文件

**答案:B**

解析:推送(push)是 workflow 最常见的触发事件,推送到默认分支后会自动开始新的 run。

依据:What you will do

## 第 3 题

一次 run 失败后,最好的做法是什么?

- A. 删除整个仓库重新开始
- B. 忽略它,直接再推送一次
- C. 打开失败的步骤,原样复制错误文字,交给 AI 助手
- D. 凭感觉猜一个修复方法

**答案:C**

解析:原样复制日志中的错误文字能让 AI 助手看到真正的原因,比凭记忆描述更准确。

依据:What you will do
