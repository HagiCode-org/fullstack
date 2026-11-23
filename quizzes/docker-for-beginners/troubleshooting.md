# 复习测验:故障排查

- 课程:Docker 入门(`docker-for-beginners`)
- 课时:Troubleshooting(`troubleshooting`)
- 题型:单选

## 第 1 题

端口已被占用时,哪种做法可行?

- A. 把 -p 左边的数字换成另一个空闲端口
- B. 删除 Docker
- C. 重装操作系统
- D. 关闭浏览器

**答案:A**

解析:改变 -p 左边的数字即可换一个电脑上的端口,容器内的端口不变。

依据:Port is already in use

## 第 2 题

在 Linux 上出现 permission denied 时,本课建议的根本做法是什么?

- A. 永远使用 root 账号运行所有程序
- B. 把用户加入 docker 组并重新登录
- C. 删除 Docker 镜像
- D. 关闭防火墙

**答案:B**

解析:加入 docker 组并重新登录后,普通用户就能不加 sudo 使用 Docker。

依据:Permission denied on Linux

## 第 3 题

在 Windows 上 Docker 无法启动并提示虚拟化问题时,应怎么做?

- A. 删除 Windows
- B. 在 BIOS 或 UEFI 中开启硬件虚拟化,然后启动 Docker Desktop
- C. 只安装 Nginx
- D. 把 Docker 换成记事本

**答案:B**

解析:虚拟化关闭时要在 BIOS 或 UEFI 中开启,然后运行 wsl --install 并重新启动 Docker Desktop。

依据:WSL 2 or virtualization is not available on Windows
