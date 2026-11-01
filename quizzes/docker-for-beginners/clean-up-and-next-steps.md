# 复习测验:清理与后续步骤

- 课程:Docker 入门(`docker-for-beginners`)
- 课时:Clean up and next steps(`clean-up-and-next-steps`)
- 题型:单选

## 第 1 题

本课程创建的东西包括哪些,需要清理?

- A. 只有镜像
- B. 只有浏览器书签
- C. 容器、网络和卷
- D. 什么都不需要清理

**答案:C**

解析:课程创建了容器、网络和卷,最后要逐一清除。

## 第 2 题

清理完成后,应该做什么来确认?

- A. 立刻关机
- B. 再检查一遍确认没有残留
- C. 不需要检查
- D. 再创建一遍

**答案:B**

解析:最后一步是检查是否还有残留。

## 第 3 题

想删除 Compose 服务并连同它们的数据一起清掉,应该用什么?

- A. `docker compose down -v`
- B. `docker compose down`
- C. `docker ps -a`
- D. `docker logs`

**答案:A**

解析:`down -v` 同时删除卷及其中的数据。
