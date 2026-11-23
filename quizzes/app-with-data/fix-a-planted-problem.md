# 复习测验:修复一个预设的问题

- 课程:带数据库的应用(`app-with-data`)
- 课时:Fix a planted problem(`fix-a-planted-problem`)
- 题型:单选

## 第 1 题

收集证据时,页面上的报错文字应该怎样处理?

- A. 原样复制完整的报错,不要改写
- B. 用自己的话概括成一句
- C. 只保留第一个字
- D. 删除其中的数字,使它更清楚

**答案:A**

解析:课文强调原样复制报错。改写会丢掉定位原因需要的细节,例如文件名和数字。

依据:Evidence you will collect

## 第 2 题

哪个命令可以查看服务的日志输出?

- A. docker volume prune
- B. docker compose down -v
- C. docker compose logs
- D. docker version

**答案:C**

解析:Compose 参考说明 docker compose logs 会显示服务的日志输出,加上 -f 可以持续跟踪新行。

依据:Evidence you will collect

## 第 3 题

得到 AI 给出的修复后,应该怎样判断它是否正确?

- A. 相信 AI 的说法即可
- B. 按刚才失败的步骤重新测试,并检查应用的其他部分是否仍能工作
- C. 只看它改了几行代码
- D. 删除日志,看看问题是否消失

**答案:B**

解析:AI 也可能说得对却不完全对。课文要求你亲自重测失败的步骤,并检查其他部分有没有被影响。

依据:Judge the fix, not only the AI
