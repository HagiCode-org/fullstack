# 复习测验:路径 A：用 Cloudflare 发布

- 课程:发布你的网站(`publish-your-website`)
- 课时:Path A: Publish with Cloudflare(`publish-with-cloudflare`)
- 题型:单选

## 第 1 题

如果站点没有构建步骤,Cloudflare 的构建命令可以怎样填写?

- A. `npm run build`
- B. 留空,或填写 `exit 0`
- C. `pip install`
- D. 删除整个仓库

**答案:B**

解析:Cloudflare 的构建配置文档说明,不使用预设时可以把构建命令留空或填写 exit 0。

依据:What you will do

## 第 2 题

预览部署对正式站点有什么影响?

- A. 它会替换正式站点
- B. 它只能在手机上打开
- C. 它不影响正式站点和绑定的自定义域名
- D. 它会删除 main 分支

**答案:C**

解析:Cloudflare 的预览部署拥有自己的地址,不会影响正式站点或绑定的自定义域名。

依据:Preview deployments

## 第 3 题

回滚时,可以回到哪一种版本?

- A. 只能是预览部署
- B. 只能是上周的版本
- C. 必须是 gh-pages 分支上的文件
- D. 任何一个未被删除的正式部署的旧版本

**答案:D**

解析:回滚的目标必须是成功构建、未被删除的正式部署,预览部署不能作为回滚目标。

依据:Rollbacks
