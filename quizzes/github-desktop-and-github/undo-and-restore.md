# 复习测验:撤销改动并找回旧内容

- 课程:GitHub Desktop 与 GitHub(`github-desktop-and-github`)
- 课时:Undo a change and restore old work(`undo-and-restore`)
- 题型:单选

## 第 1 题

已经推送到 GitHub、可能已被他人复制的提交想撤销,应该用哪种方式?

- A. Reset to commit(重置到提交)
- B. Revert(还原提交)
- C. Undo(撤销)
- D. Discard(放弃改动)

**答案:B**

解析:Revert 会新增一条提交来抵消旧提交,原来的提交仍保留在历史中,因此不会改写别人已有的历史。
依据:Revert a commit that is on GitHub

## 第 2 题

Undo 按钮适合用在哪种情况?

- A. 已经推送到 GitHub 的提交
- B. 从未提交过的文件改动
- C. 所有很久以前的提交
- D. 尚未推送的最近一次提交

**答案:D**

解析:官方说明 Undo 只能撤销尚未推送的提交,它会把那次提交的改动放回工作文件中。
依据:Undo your last commit

## 第 3 题

Reset to commit 最多能回到哪里?

- A. 最多回到最近一次已推送的提交
- B. 任何提交都可以,包括很久以前已推送的提交
- C. 只能回到上一个提交
- D. 不能回退到任何提交

**答案:A**

解析:官方说明 Reset to commit 只能回到最近一次已推送的提交,已推送之后的改动应使用 Revert。
依据:Reset to an older commit
