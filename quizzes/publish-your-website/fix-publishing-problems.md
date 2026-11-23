# 复习测验:排查发布问题

- 课程:发布你的网站(`publish-your-website`)
- 课时:Fix publishing problems(`fix-publishing-problems`)
- 题型:单选

## 第 1 题

页面显示 "not found" 时,首先应检查什么?

- A. 电脑的音量设置
- B. `index.html` 是否在发布来源的顶层,并且文件名的大小写正确
- C. 你的头像是否已经上传
- D. 仓库的星标数量

**答案:B**

解析:GitHub 要求入口文件位于发布来源的顶层,并且 index.html 的名字区分大小写,这是最常见的原因。

依据:Six problems and the first check for each

## 第 2 题

你改了网站,却仍然看到旧版本,最可能的原因是什么?

- A. 浏览器或其他地方保存了旧副本,即缓存
- B. 网站从来不会更新
- C. 域名已经被删除
- D. 访客太多

**答案:A**

解析:浏览器会复用保存过的响应,所以刷新时应绕过缓存,并确认最新的 run 已经完成。

依据:Six problems and the first check for each

## 第 3 题

为什么不能把密码或密钥放进网站的发布文件里?

- A. 因为网站文件会被压缩,密码会失效
- B. 因为发布的网站是公开的,访客可以读到已发布的文件
- C. 因为密码太长,无法显示
- D. 因为 GitHub 不支持密码

**答案:B**

解析:GitHub 说明 Pages 站点在互联网上是公开可访问的,任何已发布的内容都可能被复制。

依据:Keep secrets out of the website
