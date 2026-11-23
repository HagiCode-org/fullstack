# 复习测验:用 GitHub Pages 发布

- 课程:发布你的网站(`publish-your-website`)
- 课时:Publish with GitHub Pages(`publish-with-github-pages`)
- 题型:单选

## 第 1 题

仓库名不是 `your-name.github.io` 时,项目站点的默认地址通常是什么形式?

- A. `localhost:8080`
- B. `your-name.github.io/仓库名`
- C. `ftp://仓库名`
- D. `file:///仓库名`

**答案:B**

解析:GitHub 说明项目站点的默认地址是账号的 github.io 地址后面加上仓库名。

依据:Two addresses you can get

## 第 2 题

在 GitHub 的 Settings 中,要让站点直接从某个分支发布,应选择哪个 Source 选项?

- A. Deploy from a branch
- B. Upload a zip file
- C. Install a plugin
- D. Restart the repository

**答案:A**

解析:Build and deployment 下的 Source 选择 Deploy from a branch,然后再选分支和文件夹。

依据:What you will do

## 第 3 题

纯手写的 HTML 站点,是否还需要构建步骤?

- A. 必须安装 Node.js 才能发布
- B. 必须使用 Cloudflare 才能发布
- C. 必须先把文件改名为 gh-pages
- D. 不需要,仓库里的文件就是最终要发布的文件

**答案:D**

解析:没有框架或模板的站点,文件本身已经是浏览器可以直接读取的最终文件,所以不需要构建。

依据:Build is not needed for this site
