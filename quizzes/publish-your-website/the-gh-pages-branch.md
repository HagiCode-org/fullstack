# 复习测验:使用 gh-pages 分支发布

- 课程:发布你的网站(`publish-your-website`)
- 课时:Use a gh-pages branch(`the-gh-pages-branch`)
- 题型:单选

## 第 1 题

`gh-pages` 这个分支名是必需的吗?

- A. 必需,GitHub 只读取这个名字的分支
- B. 不必需,发布来源可以是仓库中的任何分支
- C. 只有付费账号才能使用
- D. 必须与 main 分支同名

**答案:B**

解析:GitHub 说明发布来源可以是任何分支,gh-pages 只是很多工具使用的常见名字。

依据:Does the branch have to be called gh-pages?

## 第 2 题

为什么不应该手工修改输出分支上的文件?

- A. 因为 GitHub 禁止任何修改
- B. 因为这些文件太大,无法编辑
- C. 因为下一次运行可能会覆盖手工修改
- D. 因为它们只能在手机上查看

**答案:C**

解析:输出分支上的文件由构建生成,应当回到 main 修改源文件,再让 workflow 重新生成。

依据:Treat the gh-pages branch as output

## 第 3 题

从分支发布 GitHub Pages 时,来源文件夹可以选择哪两个位置?

- A. 仓库的根目录 `/` 或 `/docs` 文件夹
- B. `/src` 或 `/public`
- C. `/node_modules` 或 `/.git`
- D. `/dist` 或 `/build`

**答案:A**

解析:GitHub 文档说明来源文件夹可以是分支的根目录,也可以是 /docs 文件夹。

依据:Does the branch have to be called gh-pages?
