# 复习测验:在分支上工作

- 课程:GitHub 协作:分支与 Pull Request(`github-collaboration`)
- 课时:Work on a branch(`work-on-a-branch`)
- 题型:单选

## 第 1 题

为什么要在分支上做改动?

- A. 让电脑运行得更快
- B. 不影响 main 的稳定版本,试错失败也不会弄坏主线
- C. 避免写提交说明
- D. 这样就不需要推送

**答案:B**

解析:分支是一条独立的工作线,在分支上的改动在合并之前不会影响 main。
依据:Why use a branch

## 第 2 题

只存在于你电脑上的分支,要让别人看到需要怎么做?

- A. 在 GitHub Desktop 中点击 Publish branch 把它发布到 GitHub
- B. 删除这个分支
- C. 把 main 改名
- D. 关闭 GitHub Desktop

**答案:A**

解析:官方说明,在电脑上新建的分支要先发布,才能在 GitHub 上供协作者使用。
依据:Publish the branch to GitHub

## 第 3 题

切换到 main 后,分支上的提交看不见,这说明什么?

- A. 提交被删除了
- B. GitHub 出错了
- C. 两条分支的内容是分开的,main 不包含分支上尚未合并的提交
- D. 必须重新安装 GitHub Desktop

**答案:C**

解析:分支让改动彼此隔离,只有在合并之后,分支上的内容才会进入 main。
依据:Compare `main` with your branch
