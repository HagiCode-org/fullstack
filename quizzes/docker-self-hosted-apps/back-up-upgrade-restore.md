# 复习测验:备份、升级与恢复

- 课程:用 Docker 部署现成应用(`docker-self-hosted-apps`)
- 课时:Back up, upgrade and restore(`back-up-upgrade-restore`)
- 题型:单选

## 第 1 题

`pg_dump` 命令中的 `--format=custom` 有什么作用?

- A. 把数据库写成 pg_restore 可以读取的自定义格式归档
- B. 删除数据库
- C. 修改数据库密码
- D. 启动应用

**答案:A**

解析:PostgreSQL 手册说明,自定义格式的归档适合交给 pg_restore 恢复,这是备份命令的关键选项。

依据:Step 2: Back up the database

## 第 2 题

为什么要先把备份恢复到一个测试副本里?

- A. 为了让应用运行得更快
- B. 为了删除旧数据
- C. 为了证明备份确实能用,同时不破坏正在运行的应用
- D. 为了换一种界面语言

**答案:C**

解析:只有恢复过一次,才能确认备份文件是完整可用的,测试副本不会影响正在运行的应用。

依据:Step 5: Restore into a test copy

## 第 3 题

Memos 的升级指南说,在已经执行过数据库迁移之后降级,会怎样?

- A. 完全支持,随时可以降级
- B. 会自动删除所有数据
- C. 不支持降级,备份才是回退的途径
- D. 没有任何影响

**答案:C**

解析:升级指南说明,迁移执行后不支持降级,因此升级前的备份是唯一可靠的回退方式。

依据:Step 7: Keep a way back
