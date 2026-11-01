# HagiCode Fullstack 课程路线与大纲

> 这是课程的**设计稿**:先在这里调整路线和每课大纲,确定要填什么内容,再去 `src/courses/` 里落地。
> 本稿在现有 `src/courses/*/outline.ts` 与各课 en-US 草稿正文的基础上,落实了 `COURSE-REVIEW.md` 中的调整:共 12 门课程(主线 10、选修 2)、97 个课时(其中新增 9 个)。
> 每门课程、每个分组、每个课时都有一段「概述」(中文总结,可直接改);「小节」和「自检标准」取自现有正文,新增课时为新写。每个课时有 3 道单选「复习测验」,单独存放在 `quizzes/<课程 id>/<课时 id>.md`(含答案和解析),为初稿,落地前需对照正文逐题核对。
> 标记:🆕 新增(尚无正文);✏️ 调整(现有课时有改动,正文待同步);🔹 选修。其余为沿用现有课时。
> 状态:✅ 已完成正文;📝 草稿(正文只是大纲,待扩写和核对事实)。

## 如何用这份文档

1. 先看「本次调整一览」,确认每一项调整是否符合预期。
2. 再看「课程路线」和「学习路径」,决定课程顺序、选修划分与路径。
3. 逐门课程改「大纲」:课时标题、概述、小节、自检标准。
4. 定稿后再改 `outline.ts` 和正文。课时 id(反引号里的名字)是稳定标识,改它会影响阅读进度和链接,改标题则不会;本稿有 2 个现有课时被并入或拆分,其旧 id 会作废。

## 本次调整一览

**前提**:学生从 Docker 开始学;读者是未来的开发者,会基础电脑操作但没有用过终端;交付方式是**学生自学**(不按学期或课堂安排来设计);不新增“电脑基础”课,也不加“聊天 AI 体验”。

| 类型 | 课时 | 说明 |
|------|------|------|
| ✏️ 调整 | `docker-for-beginners/what-is-docker` 什么是 Docker？ | 调整:原“打开终端”小节移到新增的“终端第一课”;第一段改为先讲“你会得到什么”,术语后置并配类比 |
| 🆕 新增 | `docker-for-beginners/check-your-computer` 你的电脑能装 Docker 吗 | 新增课时 |
| 🆕 新增 | `docker-for-beginners/terminal-basics` 终端第一课 | 新增课时 |
| 🆕 新增 | `docker-for-beginners/read-errors-and-ask-for-help` 读懂报错,学会求助 | 新增课时 |
| ✏️ 调整 | `github-desktop-and-github/what-are-git-and-github` 什么是 Git 和 GitHub | 调整:概述明确包含“注册 GitHub 账号并开启二次验证”(现有自检标准已含此项,此前评审误判为缺失) |
| ✏️ 调整 | `build-with-ai/choose-an-ai-coding-assistant` 选择 AI 编程助手 | 调整:扩成“怎么选 AI 助手”,新增费用与计费方式、能否稳定访问(含国内可用性)、数据与隐私政策、怎样更换,并提供选择对照表;不新增聊天 AI 体验 |
| ✏️ 调整 | `build-with-ai/check-the-result` 验收结果 | 调整:并入原“另一种语言”课里最有价值的能力——不读代码也能验收(用固定输入对比预期输出) |
| 🆕 新增 | `first-website/peek-at-the-files` 看一眼 AI 做出的文件 | 新增课时 |
| 🆕 新增 | `publish-your-website/how-a-page-opens` 一个网页是怎样被打开的 | 新增课时 |
| ✏️ 调整 | `publish-your-website/publish-on-every-push` 每次推送自动发布 | 调整:并入原“初识 Actions 与 Pages”里的 GitHub Actions 介绍 |
| 🆕 新增 | `app-with-data/front-end-and-back-end` 前端和后端 | 拆分:由原“前端、后端和数据库”拆成两课(旧 id `front-end-back-end-and-database` 作废) |
| 🆕 新增 | `app-with-data/database-and-api` 数据库与 API | 拆分:同上 |
| ✏️ 调整 | `add-ai-features/first-version` 让第一版跑起来 | 调整:把最关键的两步前置——创建密钥之前先在服务里设好消费上限,并确定密钥放在项目文件之外;明确说明可能产生少量费用(已决定不提供免费方案)。完整的复查和泄露预案仍在后面的“保管好密钥,控制好费用” |
| ✏️ 调整 | `github-collaboration/work-on-a-branch` 在分支上工作 | 移动:由“GitHub Desktop 与 GitHub”移到本课(课程路径变化,阅读进度需迁移) |
| ✏️ 调整 | `github-collaboration/open-a-pull-request` 发起 Pull Request 并查看改动 | 移动:同上;可顺带练习“审阅 AI 做出的改动” |
| ✏️ 调整 | `github-collaboration/issues-forks-and-open-source` Issue、Fork 与开源 | 移动:同上 |
| 🆕 新增 | `capstone-project/show-your-work` 把成果讲给别人 | 新增课时 |
| 🆕 新增 | `capstone-project/team-collaboration` 小组协作 | 新增课时 |
| ➖ 并入/拆分 | `github-desktop-and-github/actions-and-pages-preview` | 内容并入 publish-your-website 的 publish-on-every-push 与 publish-with-github-pages |
| ➖ 并入/拆分 | `app-with-data/front-end-back-end-and-database` | 拆成 front-end-and-back-end 与 database-and-api |
| 🔹 改为选修 | `publish-your-website/the-gh-pages-branch` 使用 gh-pages 分支发布 | 选修,不影响主线 |
| 🔹 改为选修 | `publish-your-website/publish-with-cloudflare` 路径 A：用 Cloudflare 发布 | 选修,不影响主线 |
| 🔹 改为选修 | `publish-your-website/publish-with-aliyun-esa` 路径 B（中国大陆）：用阿里云 ESA 发布 | 选修,不影响主线 |
| 🔹 改为选修 | `publish-your-website/custom-domain-and-https` 自定义域名与 HTTPS（选做） | 选修,不影响主线 |
| 🔹 改为选修 | `publish-your-website/choose-where-to-publish` 选择发布位置 | 选修,不影响主线 |
| 🆕 新增课程 | `github-collaboration` GitHub 协作:分支与 Pull Request | 由原“GitHub Desktop 与 GitHub”拆出,放在“与 AI 搭档开发”之后;原课程只保留基础 |
| 🔹 整门选修 | `docker-self-hosted-apps`、`another-language` | 移出主线,放在选修 |

## 课程路线

| # | 类型 | 课程 id | 课程 | 课时(含选修) | 状态 |
|---|------|---------|------|--------------|------|
| 1 | 主线 | `docker-for-beginners` | Docker for Beginners / Docker 入门 | 15,新增 3 | ✅ 现有课时已完成,新增课时待写 |
| 2 | 主线 | `github-desktop-and-github` | GitHub Desktop and GitHub / GitHub Desktop 与 GitHub | 5 | 📝 草稿 |
| 3 | 主线 | `build-with-ai` | Build with an AI Partner / 与 AI 搭档开发 | 7 | 📝 草稿 |
| 4 | 主线 | `first-website` | Your First Website / 你的第一个网站 | 9,新增 1 | 📝 草稿 |
| 5 | 主线 | `publish-your-website` | Publish Your Website / 发布你的网站 | 10(选修 5),新增 1 | 📝 草稿 |
| 6 | 主线 | `first-web-app` | Your First Web App / 你的第一个 Web 应用 | 8 | 📝 草稿 |
| 7 | 主线 | `app-with-data` | An App with a Database / 带数据库的应用 | 9,新增 2 | 📝 草稿 |
| 8 | 主线 | `add-ai-features` | Add AI Features to Your App / 给应用加上 AI 功能 | 8 | 📝 草稿 |
| 9 | 主线 | `github-collaboration` | GitHub: Branches and Pull Requests / GitHub 协作:分支与 Pull Request | 3(选修 1) | 📝 草稿(新增课程) |
| 10 | 主线 | `capstone-project` | Capstone: Build and Launch Your Own App / 毕业项目：做出并上线你自己的应用 | 8(选修 1),新增 2 | 📝 草稿 |
| 11 | 选修 | `docker-self-hosted-apps` | Run Ready-Made Apps with Docker / 用 Docker 部署现成应用 | 7 | 📝 草稿 |
| 12 | 选修 | `another-language` | The Same App in Another Language / 用另一种语言做同一个应用 | 8 | 📝 草稿 |

主线按编号 1–10 顺序学习;11–12 是选修课程,可在对应主线课程之后按需选学。

### 学习路径

站点已有学习路径的数据结构(课程步骤、多选一步骤),但还没有定义任何路径。建议定义下面三条;“选哪款 AI 助手”由“与 AI 搭档开发”第 1 课负责,不做成多选一的路径步骤。

| 路径 id | 名称 | 步骤 |
|---------|------|------|
| `quick-start` | 快速上手 | Docker 入门 → GitHub Desktop 与 GitHub(基础)→ 与 AI 搭档开发 → 你的第一个网站 → 发布你的网站(只学到这里,就能拿到一个公开的网站) |
| `build-apps` | 做出应用 | 快速上手的全部课程 → 你的第一个 Web 应用 → 带数据库的应用 → 给应用加上 AI 功能 → GitHub 协作 → 毕业项目 |
| `electives` | 进阶选修 | 用 Docker 部署现成应用 / 用另一种语言做同一个应用 / 发布进阶(gh-pages、Cloudflare、阿里云 ESA、域名与 HTTPS)/ Issue、Fork 与开源 / 小组协作(不分先后,按需选学) |

## 站点功能需求(待实现)

- **术语表**:每个新词有一句话解释和一个生活类比,正文里的术语可点开。
- **每课预计用时和成果提示**:15–30 分钟,“本课你会得到什么”。
- **自学支持**:每门课程页写明预计总用时和“学完你会得到什么”;“怎样求助”一课要写明学生在哪里能得到帮助(渠道待定);测验的答案和解析用于自测。
- **每课新词不超过 3 个**,第一课的第一段不放陌生词;操作类课时分 Windows / Mac 两套命令。
- **正文先只写 en-US**(已决定):其他语言以后再补,缺译时站点现有机制会显示英文并带提示。本稿的大纲、概述和测验用中文,仅作设计用。

## 课程大纲

### 1. Docker for Beginners(Docker 入门)

- 课程 id:`docker-for-beginners`
- 类型:主线
- 状态:✅ 现有课时已完成正文;新增课时待写
- **概述**:从零开始认识 Docker,作为整个系列的入口:先检查电脑、学会用终端和读报错,再把 Nginx、PostgreSQL 和 Node.js 当作容器跑起来,用网络和 Docker Compose 连成一套服务,最后学会排错和清理。

#### 分组:Get started(快速开始)  `get-started`

- **概述**:检查电脑、认识终端、装好 Docker,运行并删除第一个容器,学会读报错和求助。

##### What is Docker?(什么是 Docker？)  `what-is-docker`

- **概述**:用通俗的话解释容器是什么、为什么用它,并介绍后面会遇到的基本词汇和如何打开终端。
- **标记**:✏️ 调整:原“打开终端”小节移到新增的“终端第一课”;第一段改为先讲“你会得到什么”,术语后置并配类比
- **小节**:Words you will meet
- **复习测验**:[`quizzes/docker-for-beginners/what-is-docker.md`](quizzes/docker-for-beginners/what-is-docker.md)(3 道单选)

##### Can your computer run Docker?(你的电脑能装 Docker 吗)  `check-your-computer`

- **概述**:安装之前先检查系统版本、内存与磁盘、是否允许安装软件(受管控的托管电脑常被禁止)以及 Windows 的虚拟化;课程不提供其他环境,所有练习都在你自己的电脑上进行,所以不满足要求时需要先换一台满足要求的电脑。具体要求以 Docker 官方页面为准。
- **标记**:🆕 新增,尚无正文
- **小节**:系统与版本 / 内存与磁盘空间 / 是否允许安装软件 / Windows:虚拟化与 WSL 2 / 不满足要求怎么办:换一台满足要求的电脑
- **自检标准**:
  - 你知道自己电脑的系统和版本
  - 你确认了可用内存和磁盘空间
  - 你知道自己能不能在这台电脑上安装软件
  - 你知道虚拟化是否可用(Windows)
  - 如果这台电脑不满足要求,你知道需要换一台电脑再继续
- **复习测验**:[`quizzes/docker-for-beginners/check-your-computer.md`](quizzes/docker-for-beginners/check-your-computer.md)(3 道单选)

##### Install Docker(安装 Docker)  `install-docker`

- **概述**:按你的系统(Windows、macOS 或 Linux)安装 Docker,并确认它能正常工作。
- **小节**:Windows / macOS / Linux / Check it worked
- **复习测验**:[`quizzes/docker-for-beginners/install-docker.md`](quizzes/docker-for-beginners/install-docker.md)(3 道单选)

##### Your first look at the terminal(终端第一课)  `terminal-basics`

- **概述**:把终端当作一个新工具来认识:怎样在 Windows 和 Mac 上打开它,怎样原样复制并运行一条命令,怎样看懂输出,以及怎样用 Ctrl+C 停掉正在运行的命令。
- **标记**:🆕 新增,尚无正文
- **小节**:什么是终端 / 在 Windows 上打开 / 在 Mac 上打开 / 运行第一条命令 / 复制、粘贴与回车 / 停止正在运行的命令(Ctrl+C)
- **自检标准**:
  - 你能自己打开终端
  - 你能粘贴并运行一条命令
  - 你能指出输出里的第一行说了什么
  - 你知道怎样用 Ctrl+C 停止命令
- **复习测验**:[`quizzes/docker-for-beginners/terminal-basics.md`](quizzes/docker-for-beginners/terminal-basics.md)(3 道单选)

##### Your first container(第一个容器)  `your-first-container`

- **概述**:运行官方的 hello-world 测试容器,学会查看正在运行和已停止的容器,并把它删除。
- **小节**:Step 1: Check that Docker answers / Step 2: Run the test container / Step 3: List the running containers / Step 4: List all containers, including stopped ones / Step 5: Remove the container / What you learned
- **复习测验**:[`quizzes/docker-for-beginners/your-first-container.md`](quizzes/docker-for-beginners/your-first-container.md)(3 道单选)

##### Read an error and ask for help(读懂报错,学会求助)  `read-errors-and-ask-for-help`

- **概述**:红色文字不一定是坏事。学会在报错里找到关键的一行,原样复制它,再连同“你做了什么、期望什么、实际发生了什么、你的系统”向 AI、同学或社区求助。
- **标记**:🆕 新增,尚无正文
- **小节**:报错长什么样 / 找到关键的一行 / 原样复制,不要转述 / 求助时要带上什么 / 截图和文字各在什么时候用
- **自检标准**:
  - 你能在一段报错里指出关键的一行
  - 你原样复制过一条报错,没有改写
  - 你能写出一条包含四项信息的求助
- **复习测验**:[`quizzes/docker-for-beginners/read-errors-and-ask-for-help.md`](quizzes/docker-for-beginners/read-errors-and-ask-for-help.md)(3 道单选)

#### 分组:Run services(运行服务)  `run-services`

- **概述**:把三类常见程序——Web 服务器、数据库和一小段 Node.js 程序——当作容器运行起来。

##### Run Nginx(运行 Nginx)  `run-nginx`

- **概述**:把 Nginx 作为容器跑起来并映射端口,在浏览器中打开欢迎页,查看日志,再换成自己的页面。
- **小节**:Step 1: Start Nginx and publish port 8080 / Step 2: Read the logs / Step 3: Stop and remove the container / Step 4: Serve your own page / Step 5: Read the logs and clean up / What you learned
- **复习测验**:[`quizzes/docker-for-beginners/run-nginx.md`](quizzes/docker-for-beginners/run-nginx.md)(3 道单选)

##### Run PostgreSQL(运行 PostgreSQL)  `run-postgres`

- **概述**:运行 PostgreSQL 容器,写入并读回一行数据,通过对比理解容器会丢数据、命名卷能保住数据。
- **小节**:Step 1: Start the database / Step 2: Write a row and read it back / Step 3: Remove the container and see what is lost / Step 4: Keep the data in a named volume / Step 5: Clean up the container / What you learned
- **复习测验**:[`quizzes/docker-for-beginners/run-postgres.md`](quizzes/docker-for-beginners/run-postgres.md)(3 道单选)

##### Run Node.js(运行 Node.js)  `run-nodejs`

- **概述**:不在本机安装 Node.js,直接在容器里运行一个单文件脚本,并把它变成一个 Web 服务。
- **小节**:Step 1: Write a one-file script / Step 2: Run the script inside a container / Step 3: Turn the script into a web server / Step 4: Stop and remove the server / What you learned
- **复习测验**:[`quizzes/docker-for-beginners/run-nodejs.md`](quizzes/docker-for-beginners/run-nodejs.md)(3 道单选)

#### 分组:Connect services(让服务互相连接)  `connect-services`

- **概述**:让多个容器按名字互相找到对方,并用 Docker Compose 一条命令启动整套服务。

##### Docker networks(Docker 网络)  `docker-networks`

- **概述**:创建自定义网络,让一个容器按名字访问另一个容器里的数据库,并与默认网络的行为对比。
- **小节**:Step 1: Create a network / Step 2: Start a database on the network / Step 3: Reach the database by name from a second container / Step 4: Try the same thing on the default network / Step 5: Know which path is which / Step 6: Clean up / What you learned
- **复习测验**:[`quizzes/docker-for-beginners/docker-networks.md`](quizzes/docker-for-beginners/docker-networks.md)(3 道单选)

##### Docker Compose(Docker Compose)  `docker-compose`

- **概述**:用一个 compose.yaml 描述 Nginx、Node.js 和 PostgreSQL,一条命令启动、查看、读日志和停止全部服务。
- **小节**:Step 1: Create the project folder and its files / Step 2: Start all the services / Step 3: Check that everything is running / Step 4: Read the logs / Step 5: Stop the services, keeping the data / Step 6: Remove the services and the data / What you learned
- **复习测验**:[`quizzes/docker-for-beginners/docker-compose.md`](quizzes/docker-for-beginners/docker-compose.md)(3 道单选)

#### 分组:Community tools(社区工具)  `community-tools`

- **概述**:用 Portainer 在浏览器里管理容器,并认识几款值得继续尝试的社区容器。

##### Manage containers with Portainer(用 Portainer 管理容器)  `manage-with-portainer`

- **概述**:安装 Portainer 社区版,在网页里查看容器、网络和卷,读日志、启停容器,并注意其中的安全事项。
- **小节**:Security note: read this first / Step 1: Start Portainer / Step 2: Find the setup token / Step 3: Create the administrator account / Step 4: Find your containers / Step 5: Read a container's logs / Step 6: Stop and start a container from the browser / Step 7: Optional: keep Portainer in a Compose file / What you learned
- **复习测验**:[`quizzes/docker-for-beginners/manage-with-portainer.md`](quizzes/docker-for-beginners/manage-with-portainer.md)(3 道单选)

##### More community containers(更多社区容器)  `more-community-containers`

- **概述**:用卡片介绍 Dozzle、Uptime Kuma、Adminer、Nginx Proxy Manager 等社区容器,并说明挑选标准与 Docker socket 的风险。
- **小节**:Security note: tools that use the Docker socket / How these tools were chosen / Card: Dozzle / Card: Uptime Kuma / Card: Adminer / Card: Nginx Proxy Manager / After you try a card
- **复习测验**:[`quizzes/docker-for-beginners/more-community-containers.md`](quizzes/docker-for-beginners/more-community-containers.md)(3 道单选)

#### 分组:Wrap up(收尾)  `wrap-up`

- **概述**:集中排查本课程中常见的报错,并把课程创建的所有东西清理干净。

##### Troubleshooting(故障排查)  `troubleshooting`

- **概述**:按报错信息查原因和解法:Docker 未运行、端口被占用、Linux 权限、Windows 的 WSL 2、容器秒退、名称冲突等。
- **小节**:Docker is not running or cannot be reached / Port is already in use / Permission denied on Linux / WSL 2 or virtualization is not available on Windows / Container exits immediately / Name already in use / A service cannot be reached by name / Portainer cannot reach Docker / Still stuck?
- **复习测验**:[`quizzes/docker-for-beginners/troubleshooting.md`](quizzes/docker-for-beginners/troubleshooting.md)(3 道单选)

##### Clean up and next steps(清理与后续步骤)  `clean-up-and-next-steps`

- **概述**:依次清除本课程创建的容器、网络和卷,确认没有残留,并给出官方的后续学习入口。
- **小节**:Step 1: Remove the Compose services and their data / Step 2: Remove every container the course started / Step 3: Remove the network the course created / Step 4: Remove the volumes the course created / Step 5: Check that nothing is left / Where to learn next
- **复习测验**:[`quizzes/docker-for-beginners/clean-up-and-next-steps.md`](quizzes/docker-for-beginners/clean-up-and-next-steps.md)(3 道单选)

### 2. GitHub Desktop and GitHub(GitHub Desktop 与 GitHub)

- 课程 id:`github-desktop-and-github`
- 类型:主线
- 状态:📝 草稿
- **概述**:GitHub 基础:用 GitHub Desktop 点鼠标完成日常工作——注册账号并开启二次验证,安装并登录,克隆仓库,提交,以及撤销和找回旧内容。目的是让你在 AI 改乱文件时能随时退回。分支和 Pull Request 放在紧随其后的“GitHub 协作”课。

##### What are Git and GitHub(什么是 Git 和 GitHub)  `what-are-git-and-github`

- **概述**:说明为什么和 AI 协作时需要安全地试改并能退回,Git 与 GitHub 各解决什么问题,并注册 GitHub 账号、开启二次验证。
- **标记**:✏️ 调整:概述明确包含“注册 GitHub 账号并开启二次验证”(现有自检标准已含此项,此前评审误判为缺失)
- **小节**:What you will do
- **自检标准**:
  - You can explain the difference between Git and GitHub in one sentence each.
  - You have a GitHub account with extra sign-in protection turned on.
  - You can say what a commit, a branch and a pull request are.
- **复习测验**:[`quizzes/github-desktop-and-github/what-are-git-and-github.md`](quizzes/github-desktop-and-github/what-are-git-and-github.md)(3 道单选)

##### Install GitHub Desktop and sign in(安装 GitHub Desktop 并登录)  `install-github-desktop`

- **概述**:安装 GitHub Desktop,并用上一课创建的账号登录。
- **小节**:What you will do
- **自检标准**:
  - GitHub Desktop opens and shows your username.
  - You can find the area that lists your repositories.
  - You downloaded it from the official GitHub site.
- **复习测验**:[`quizzes/github-desktop-and-github/install-github-desktop.md`](quizzes/github-desktop-and-github/install-github-desktop.md)(3 道单选)

##### Clone a repository(克隆一个仓库)  `clone-a-repository`

- **概述**:把一个项目克隆到本机,得到可以工作的副本。
- **小节**:What you will do
- **自检标准**:
  - Your practice repository exists on GitHub and on your computer.
  - You can find the README in your file manager.
  - GitHub Desktop shows the repository as the current one.
- **复习测验**:[`quizzes/github-desktop-and-github/clone-a-repository.md`](quizzes/github-desktop-and-github/clone-a-repository.md)(3 道单选)

##### Save a checkpoint (commit)(保存一个存档点（提交）)  `commit-your-changes`

- **概述**:把项目在某一时刻的状态保存为带说明的“存档点”(提交),AI 改坏时可以回到上一个存档点。
- **小节**:What you will do
- **自检标准**:
  - Your History view shows at least two commits with clear messages.
  - You discarded one change on purpose and saw the project go back.
  - The commits are visible on the GitHub website after pushing.
- **复习测验**:[`quizzes/github-desktop-and-github/commit-your-changes.md`](quizzes/github-desktop-and-github/commit-your-changes.md)(3 道单选)

##### Undo a change and restore old work(撤销改动并找回旧内容)  `undo-and-restore`

- **概述**:撤销改动、找回旧内容,体会存档点“什么都不会丢”的意义。
- **小节**:What you will do
- **自检标准**:
  - You discarded uncommitted changes and saw the file go back.
  - You undid or reverted a commit and checked the result.
  - You can explain why committing often makes undoing easier.
- **复习测验**:[`quizzes/github-desktop-and-github/undo-and-restore.md`](quizzes/github-desktop-and-github/undo-and-restore.md)(3 道单选)

### 3. Build with an AI Partner(与 AI 搭档开发)

- 课程 id:`build-with-ai`
- 类型:主线
- 状态:📝 草稿
- **概述**:学会和 AI 编程助手协作的通用方法:怎么选并装好助手、写清晰的需求、让第一版跑起来、小步迭代、出错时回退、不读代码也能验收,并明确哪些决定必须自己把关。后面所有做项目的课程都沿用这套方法。

##### Choose an AI coding assistant(选择 AI 编程助手)  `choose-an-ai-coding-assistant`

- **概述**:了解 AI 编程助手是什么,并学会怎么选:除了“能改文件、能展示改动、能运行”,还要比较费用与计费方式、能否稳定访问(含国内可用性)、数据与隐私政策、以后怎样更换;然后装好一个,让它创建第一个文件。
- **标记**:✏️ 调整:扩成“怎么选 AI 助手”,新增费用与计费方式、能否稳定访问(含国内可用性)、数据与隐私政策、怎样更换,并提供选择对照表;不新增聊天 AI 体验
- **小节**:What to look for / 费用与计费方式 / 能否稳定访问 / 数据与隐私政策 / 怎样更换助手 / 选择对照表 / What you will do
- **自检标准**:
  - The assistant is installed and you are signed in.
  - A file named `hello.txt` exists in your `my-first-site` folder, and you saw it yourself.
  - You know what using this assistant may cost you.
  - 你填好了一张选择对照表,并写下为什么选它。
- **复习测验**:[`quizzes/build-with-ai/choose-an-ai-coding-assistant.md`](quizzes/build-with-ai/choose-an-ai-coding-assistant.md)(3 道单选)

##### Write a clear brief(写一份清晰的需求)  `write-a-clear-brief`

- **概述**:学会写需求(brief)的五个部分,并提供可套用的填空模板;需求越清楚,后面越少返工。
- **小节**:The five parts of a brief / A fill-in template / What you will do
- **自检标准**:
  - Your brief has all five parts, and each one is specific.
  - The "done" part lists things you can check by looking, not feelings such as "looks good".
  - The assistant asked its questions, and your answers are written in the brief.
- **复习测验**:[`quizzes/build-with-ai/write-a-clear-brief.md`](quizzes/build-with-ai/write-a-clear-brief.md)(3 道单选)

##### Get the first version running(让第一版跑起来)  `get-the-first-version`

- **概述**:让助手按需求做出第一版,明确第一版不完美是正常的,先不要急着修。
- **小节**:What you will do / Why you do not fix anything yet
- **自检标准**:
  - The site opens in your browser and every page can be reached.
  - You have a written list of what is wrong or missing.
  - You know which checks from your brief already pass.
- **复习测验**:[`quizzes/build-with-ai/get-the-first-version.md`](quizzes/build-with-ai/get-the-first-version.md)(3 道单选)

##### Change one thing at a time(一次只改一件事)  `iterate-in-small-steps`

- **概述**:建立“提一个改动—检查—保存”的小步循环,并理解为什么要强调“其他都不要动”。
- **小节**:The loop / What you will do / Why "change nothing else" matters
- **自检标准**:
  - You made at least three changes, each with its own request and its own commit.
  - GitHub Desktop shows a history of save points with clear descriptions.
  - You can name the last save point where the site worked.
- **复习测验**:[`quizzes/build-with-ai/iterate-in-small-steps.md`](quizzes/build-with-ai/iterate-in-small-steps.md)(3 道单选)

##### When something breaks(出错了怎么办)  `when-something-breaks`

- **概述**:出错时的固定做法:先描述现象、给出证据,必要时回退而不是继续往下改。
- **小节**:The routine / Go back instead of going on / What you will do
- **自检标准**:
  - You pasted the error text without changing it.
  - You stopped after three failed tries and returned to a save point.
  - The site works again and you did not lose earlier commits.
- **复习测验**:[`quizzes/build-with-ai/when-something-breaks.md`](quizzes/build-with-ai/when-something-breaks.md)(3 道单选)

##### Check the result(验收结果)  `check-the-result`

- **概述**:助手说“完成”只代表它的判断。学会设计好的检查方法,并学会在不读代码的情况下验收:用固定的输入对比预期输出;知道自检仍然离不开你。
- **标记**:✏️ 调整:并入原“另一种语言”课里最有价值的能力——不读代码也能验收(用固定输入对比预期输出)
- **小节**:Good and bad checks / 不读代码也能验收 / What you will do / Why the self-review still needs you
- **自检标准**:
  - Every line of your checklist is ticked, and you saw each one yourself.
  - You read the assistant's self-review and acted on it.
  - Your last commit is made after the final check.
- **复习测验**:[`quizzes/build-with-ai/check-the-result.md`](quizzes/build-with-ai/check-the-result.md)(3 道单选)

##### What you must still check yourself(哪些事必须自己把关)  `keep-control`

- **概述**:认清四类必须由自己决定的事:密钥与密码、会删数据的命令、会花钱的操作、你没要求的改动。
- **小节**:1. Secrets and passwords / 2. Commands that delete data / 3. Anything that costs money / 4. Things you did not ask for / What you will do
- **自检标准**:
  - Your checklist has all four headings.
  - You know which files in your project, if any, contain a secret.
  - You asked what a deleting or paid action does before approving it.
- **复习测验**:[`quizzes/build-with-ai/keep-control.md`](quizzes/build-with-ai/keep-control.md)(3 道单选)

### 4. Your First Website(你的第一个网站)

- 课程 id:`first-website`
- 类型:主线
- 状态:📝 草稿
- **概述**:和 AI 搭档做出一个个人主页:先看成品、写需求,得到第一版后看一眼 AI 做出的文件,再加上作品栏目、适配手机、修复一个预设问题,最后验收存档,并用挑战课独立做一个不同的网站。

##### See the finished site(先看看成品)  `see-the-finished-site`

- **概述**:先看最终要做出的个人主页,并掌握谈论任何网站都用得到的三个基本词(页面、浏览器、文件)。
- **小节**:The concept card / What the finished site contains / What you will do
- **自检标准**:
  - You can explain what a page, a browser and a file are.
  - You have decided who the site is about and written down three projects.
  - You have an empty folder open in your assistant.
- **复习测验**:[`quizzes/first-website/see-the-finished-site.md`](quizzes/first-website/see-the-finished-site.md)(3 道单选)

##### Write the site brief(写网站需求)  `write-the-site-brief`

- **概述**:用五段式模板为个人主页写需求,并补上自己的取舍。
- **小节**:The five parts, filled in for a homepage / Add a few choices of your own / What you will do
- **自检标准**:
  - Your brief has five parts and each is specific.
  - The "done" part can be checked by clicking and looking.
  - The assistant's questions are answered inside the brief.
- **复习测验**:[`quizzes/first-website/write-the-site-brief.md`](quizzes/first-website/write-the-site-brief.md)(3 道单选)

##### Get the first version(得到第一版)  `first-version`

- **概述**:向助手要第一版,打开它,并记录有哪些问题。
- **小节**:What you will do / If the site does not open
- **自检标准**:
  - The site opens in your browser.
  - You have a written list of problems with the most important first.
  - A commit named `First version` appears in your GitHub Desktop history.
- **复习测验**:[`quizzes/first-website/first-version.md`](quizzes/first-website/first-version.md)(3 道单选)

##### A first look at the files the AI made(看一眼 AI 做出的文件)  `peek-at-the-files`

- **概述**:只读不写:用生活类比认识 HTML(结构)、CSS(样式)和 JavaScript(行为)三类文件各管什么,学会让 AI 逐个解释它们,并自己核对解释是否对得上页面。
- **标记**:🆕 新增,尚无正文
- **小节**:HTML:页面的结构 / CSS:页面的样式 / JavaScript:页面的行为 / 让 AI 解释一个文件,并自己核对
- **自检标准**:
  - 你能说出三类文件各管什么
  - 你能在项目文件夹里找到这三类文件
  - 你能请 AI 用一句话解释某个文件,并对照页面核实
- **复习测验**:[`quizzes/first-website/peek-at-the-files.md`](quizzes/first-website/peek-at-the-files.md)(3 道单选)

##### Add a projects section(添加作品栏目)  `add-a-projects-section`

- **概述**:一次一个小请求地添加或改进作品栏目,每次改动单独存档,并注意链接和图片的来源。
- **小节**:What a good projects section needs / What you will do / About links and pictures
- **自检标准**:
  - The site shows three projects in the same layout.
  - Every link goes where you expect.
  - You made at least two commits in this lesson, each describing one change.
- **复习测验**:[`quizzes/first-website/add-a-projects-section.md`](quizzes/first-website/add-a-projects-section.md)(3 道单选)

##### Make it work on phones(适配手机)  `make-it-work-on-phones`

- **概述**:学会用手机尺寸查看页面,检查并让网站在窄屏上也好读(响应式)。
- **小节**:How to look at a phone-sized page / What to look for / What you will do
- **自检标准**:
  - At a narrow width no text is cut off and the page does not scroll sideways.
  - Links and buttons are large enough to press.
  - The wide layout still looks right, and each fix has its own commit.
- **复习测验**:[`quizzes/first-website/make-it-work-on-phones.md`](quizzes/first-website/make-it-work-on-phones.md)(3 道单选)

##### Fix a planted problem(修复一个预设的问题)  `fix-a-planted-problem`

- **概述**:拿到一个带有预设故障的页面,描述现象、找出问题并让助手修复,再判断修得对不对。
- **小节**:Describing a symptom / What you will do / Judging a fix
- **自检标准**:
  - You wrote a three-part symptom report.
  - The symptom is gone and the rest of the page is unchanged.
  - You read the list of changed files before you committed.
- **复习测验**:[`quizzes/first-website/fix-a-planted-problem.md`](quizzes/first-website/fix-a-planted-problem.md)(3 道单选)

##### Check the site and save it(验收并存档)  `check-and-save`

- **概述**:对照需求里的“完成标准”做最后检查,留意隐私信息,并做最终提交。
- **小节**:What you will do / About private information
- **自检标准**:
  - Every line of your checklist is ticked and you saw each one yourself.
  - The site contains no private information and no placeholder text.
  - Your final commit appears in GitHub Desktop, and you can name the last commit where the site was complete.
- **复习测验**:[`quizzes/first-website/check-and-save.md`](quizzes/first-website/check-and-save.md)(3 道单选)

##### Challenge: build a different site(挑战：做一个不同的网站)  `variation-challenge`

- **概述**:用同样的流程、换一个新点子,独立做一个不同的网站。
- **小节**:The challenge / What you will do
- **自检标准**:
  - You built a site with at least two pages without copying the earlier one.
  - Every change has its own commit, and you handled at least one problem with the error routine.
  - You ticked every line of your checklist by looking at the site yourself.
- **复习测验**:[`quizzes/first-website/variation-challenge.md`](quizzes/first-website/variation-challenge.md)(3 道单选)

### 5. Publish Your Website(发布你的网站)

- 课程 id:`publish-your-website`
- 类型:主线
- 状态:📝 草稿
- **概述**:把网站放到公网上。主线只学一条路:理解网页是怎样被打开的和发布的原理,用 GitHub Pages 发布,并让每次推送自动发布(含 GitHub Actions 是什么),再学会排查发布问题。gh-pages 分支、Cloudflare、阿里云 ESA、域名与 HTTPS 作为进阶选修。

#### 分组:Main line(主线)  `publish-main`

- **概述**:理解发布的原理,用 GitHub Pages 发布并自动化,学会排错。

##### How a web page gets to your screen(一个网页是怎样被打开的)  `how-a-page-opens`

- **概述**:用直觉讲清楚:浏览器向服务器发出请求,服务器把页面文件返回,浏览器把它显示出来;并认识网址由哪几部分组成。只讲直觉,不讲协议细节。
- **标记**:🆕 新增,尚无正文
- **小节**:网址的组成 / 请求与响应 / 浏览器做了什么 / 为什么别人暂时打不开你电脑上的网站
- **自检标准**:
  - 你能说出网址里哪一段是域名
  - 你能用自己的话描述“请求与响应”
  - 你知道为什么本地文件别人打不开
- **复习测验**:[`quizzes/publish-your-website/how-a-page-opens.md`](quizzes/publish-your-website/how-a-page-opens.md)(3 道单选)

##### How publishing works(网站是如何发布的)  `how-publishing-works`

- **概述**:说明“发布”的本质:把网站文件放到一台常开且别人能访问的电脑上,并介绍相关词汇。
- **小节**:Words you will meet / What you will do
- **自检标准**:
  - You can explain what a domain, DNS, a CDN and HTTPS are without looking at the page.
  - You know that a published website is public to everyone.
  - You know whether you will use a domain you own or a free address.
- **复习测验**:[`quizzes/publish-your-website/how-publishing-works.md`](quizzes/publish-your-website/how-publishing-works.md)(3 道单选)

##### Publish with GitHub Pages(用 GitHub Pages 发布)  `publish-with-github-pages`

- **概述**:用 GitHub Pages 把网站发到 your-name.github.io 这样的公开地址。
- **小节**:What you will do
- **自检标准**:
  - Your site opens at a `github.io` address from a different device.
  - A small change you push appears online after a short wait.
  - You checked that the repository contains nothing private.
- **复习测验**:[`quizzes/publish-your-website/publish-with-github-pages.md`](quizzes/publish-your-website/publish-with-github-pages.md)(3 道单选)

##### Publish on every push(每次推送自动发布)  `publish-on-every-push`

- **概述**:先认识 GitHub Actions(在仓库发生某些事时自动运行任务),再把发布改成自动的:每次推送到主分支,网站自动构建并发布。
- **标记**:✏️ 调整:并入原“初识 Actions 与 Pages”里的 GitHub Actions 介绍
- **小节**:What you will do
- **自检标准**:
  - A push to the main branch starts a run by itself.
  - A finished run shows a working site at your address.
  - You can find the error text in a failed run and give it to your AI assistant.
  - Images and links work at the published address, not only on your computer.
- **复习测验**:[`quizzes/publish-your-website/publish-on-every-push.md`](quizzes/publish-your-website/publish-on-every-push.md)(3 道单选)

##### Fix publishing problems(排查发布问题)  `fix-publishing-problems`

- **概述**:认识发布中几类典型故障,并学会向 AI 助手要到正确的修复办法。
- **小节**:What you will do
- **自检标准**:
  - You know the first thing to check for each of the six problems.
  - You can copy an error message exactly, instead of describing it from memory.
  - You know that nothing secret belongs in a website.
- **复习测验**:[`quizzes/publish-your-website/fix-publishing-problems.md`](quizzes/publish-your-website/fix-publishing-problems.md)(3 道单选)

#### 分组:Advanced (optional)(进阶(选修))  `publish-advanced`

- **概述**:其他发布方式和域名,按需选学。

##### Use a gh-pages branch(使用 gh-pages 分支发布)  `the-gh-pages-branch`

- **概述**:了解把成品站点放在独立的 gh-pages 分支上发布的做法。
- **标记**:🔹 选修
- **小节**:What you will do
- **自检标准**:
  - You can say why a finished site is kept on its own branch.
  - Your repository has a `gh-pages` branch that holds only the finished files.
  - You can find the main branch history untouched after a publication.
- **复习测验**:[`quizzes/publish-your-website/the-gh-pages-branch.md`](quizzes/publish-your-website/the-gh-pages-branch.md)(3 道单选)

##### Path A: Publish with Cloudflare(路径 A：用 Cloudflare 发布)  `publish-with-cloudflare`

- **概述**:路径 A:面向能顺畅访问 Cloudflare 的读者,用 Cloudflare 发布网站。
- **标记**:🔹 选修
- **小节**:What you will do
- **自检标准**:
  - Your site opens at an address on a Cloudflare domain.
  - A change on a branch has its own preview link.
  - You went back to an earlier version once, and then forward again.
- **复习测验**:[`quizzes/publish-your-website/publish-with-cloudflare.md`](quizzes/publish-your-website/publish-with-cloudflare.md)(3 道单选)

##### Path B (mainland China): Publish with Alibaba Cloud ESA(路径 B（中国大陆）：用阿里云 ESA 发布)  `publish-with-aliyun-esa`

- **概述**:路径 B:面向中国大陆读者,用阿里云 ESA 从离访客更近的节点提供网站。
- **标记**:🔹 选修
- **小节**:What you will do
- **自检标准**:
  - Your site opens from the address ESA gives you.
  - ESA reads the `gh-pages` branch, and a new push changes the site.
  - You know that real-name verification came first and can say why it takes time.
- **复习测验**:[`quizzes/publish-your-website/publish-with-aliyun-esa.md`](quizzes/publish-your-website/publish-with-aliyun-esa.md)(3 道单选)

##### Custom domain and HTTPS (optional)(自定义域名与 HTTPS（选做）)  `custom-domain-and-https`

- **概述**:选做:给网站绑定自己的域名并启用 HTTPS,免费地址本身已经可用。
- **标记**:🔹 选修
- **小节**:What you will do
- **自检标准**:
  - Your own domain opens your site.
  - The browser shows a padlock.
  - You know the yearly cost and whether a filing is needed for your path.
- **复习测验**:[`quizzes/publish-your-website/custom-domain-and-https.md`](quizzes/publish-your-website/custom-domain-and-https.md)(3 道单选)

##### Choose where to publish(选择发布位置)  `choose-where-to-publish`

- **概述**:对比已学的三种发布位置,为下一个项目选定一个。
- **标记**:🔹 选修
- **小节**:A short comparison / What you will do
- **自检标准**:
  - You can name one strength and one limit of each service.
  - You chose a place for your next project and wrote down why.
- **复习测验**:[`quizzes/publish-your-website/choose-where-to-publish.md`](quizzes/publish-your-website/choose-where-to-publish.md)(3 道单选)

### 6. Your First Web App(你的第一个 Web 应用)

- 课程 id:`first-web-app`
- 类型:主线
- 状态:📝 草稿
- **概述**:和 AI 搭档做出第一个在浏览器里运行的小应用(记账或待办):从需求到第一版,加上刷新后保留数据、筛选与合计,修复一个预设问题,验收后发布,最后用挑战课独立再做一个不同的小工具。

##### See the finished app(看看完成的应用)  `see-the-finished-app`

- **概述**:先看要做的小应用(记账或待办,任选其一),并介绍相关词汇;你不需要自己写代码。
- **小节**:Words you will meet / What you will do
- **自检标准**:
  - You can say the difference between a page and an app.
  - You wrote down three things your app must do.
  - You chose which app to build.
- **复习测验**:[`quizzes/first-web-app/see-the-finished-app.md`](quizzes/first-web-app/see-the-finished-app.md)(3 道单选)

##### Write the app brief(写应用需求)  `write-the-app-brief`

- **概述**:把想要的应用写成清晰的需求,让助手更容易做出合格的第一版。
- **小节**:What you will do
- **自检标准**:
  - Your brief fits on one screen and has a "does not do yet" list.
  - Your done checklist has one "I can" sentence for each thing the app does.
  - You answered the AI's questions and the brief is saved in your repository.
- **复习测验**:[`quizzes/first-web-app/write-the-app-brief.md`](quizzes/first-web-app/write-the-app-brief.md)(3 道单选)

##### Get the first version(得到第一个版本)  `first-version`

- **概述**:让助手按需求做出第一版,运行它,并对照完成清单检查。
- **小节**:What you will do
- **自检标准**:
  - The app starts and opens in your browser.
  - You can add and remove an item.
  - You committed the working first version, so you can come back to it.
- **复习测验**:[`quizzes/first-web-app/first-version.md`](quizzes/first-web-app/first-version.md)(3 道单选)

##### Keep the data after a refresh(刷新后保留数据)  `add-saving-in-the-browser`

- **概述**:让应用把数据存进浏览器存储,刷新页面后列表不再清空。
- **小节**:What you will do
- **自检标准**:
  - Items are still there after a reload.
  - A removed item stays removed after a reload.
  - The app still works the first time you open it with nothing stored.
  - You committed the change.
- **复习测验**:[`quizzes/first-web-app/add-saving-in-the-browser.md`](quizzes/first-web-app/add-saving-in-the-browser.md)(3 道单选)

##### Add filters and totals(添加筛选和合计)  `add-filters-and-totals`

- **概述**:请助手加上筛选(只显示符合条件的条目)和合计(把数字加起来)。
- **小节**:What you will do
- **自检标准**:
  - The filter shows exactly the items it should.
  - The total matches your own calculation.
  - You made two commits, one per feature.
- **复习测验**:[`quizzes/first-web-app/add-filters-and-totals.md`](quizzes/first-web-app/add-filters-and-totals.md)(3 道单选)

##### Fix a planted problem(修复一个故意留下的问题)  `fix-a-planted-problem`

- **概述**:拿到一个被故意埋了问题的应用,练习发现问题、向助手描述,并核实修复确实有效。
- **小节**:What you will do
- **自检标准**:
  - You found the problem yourself, from the checklist.
  - The problem is gone after the fix, and the rest of the checklist still passes.
  - You know what to do when three tries do not work: go back to the last commit and start again.
- **复习测验**:[`quizzes/first-web-app/fix-a-planted-problem.md`](quizzes/first-web-app/fix-a-planted-problem.md)(3 道单选)

##### Check the app and publish it(验收并发布应用)  `check-and-publish`

- **概述**:最后检查一次,然后发布,让任何人都能使用。
- **小节**:What you will do
- **自检标准**:
  - Every sentence of your done checklist works at the published address.
  - You checked that nothing private is in the project.
  - Another person used the app without your help.
- **复习测验**:[`quizzes/first-web-app/check-and-publish.md`](quizzes/first-web-app/check-and-publish.md)(3 道单选)

##### Challenge: build a different tool(挑战：做一个不同的小工具)  `variation-challenge`

- **概述**:换一个点子,独立再做一遍“构建、修复、发布”。
- **小节**:What you will do
- **自检标准**:
  - You finished a second tool without following step-by-step instructions.
  - Every sentence of its checklist works at the published address.
  - You can explain, in your own words, the loop you used: describe, run, check, save.
- **复习测验**:[`quizzes/first-web-app/variation-challenge.md`](quizzes/first-web-app/variation-challenge.md)(3 道单选)

### 7. An App with a Database(带数据库的应用)

- 课程 id:`app-with-data`
- 类型:主线
- 状态:📝 草稿
- **概述**:做一个会“记住东西”的应用(留言板或书签管理器):分两步理解前端、后端、数据库和 API,用 Docker Compose 跑起第一版,再添加功能、修复预设问题、保护并备份数据,最后独立做一个不同的数据应用。

##### See the finished app(看看完成的应用)  `see-the-finished-app`

- **概述**:先看要做的会记事的应用(留言板或书签管理器,任选其一)。
- **小节**:What you will do
- **自检标准**:
  - You saw an entry stay in the app after you reloaded the page.
  - You can say in one sentence what your app lets a person do.
  - You know that the app runs only on your computer in this course.
- **复习测验**:[`quizzes/app-with-data/see-the-finished-app.md`](quizzes/app-with-data/see-the-finished-app.md)(3 道单选)

##### Front end and back end(前端和后端)  `front-end-and-back-end`

- **概述**:认识应用的前端和后端各做什么,以及它们怎样各自监听一个端口;不需要懂内部原理,只需要认识它们。(由原“前端、后端和数据库”拆出)
- **标记**:🆕 新增,尚无正文;✏️ 拆分:由原“前端、后端和数据库”拆成两课(旧 id `front-end-back-end-and-database` 作废)
- **小节**:Words you will meet:前端、后端、端口 / What you will do
- **自检标准**:
  - 你能说出哪一部分是你看到的,哪一部分在幕后
  - 你能说出端口的作用
- **复习测验**:[`quizzes/app-with-data/front-end-and-back-end.md`](quizzes/app-with-data/front-end-and-back-end.md)(3 道单选)

##### The database and the API(数据库与 API)  `database-and-api`

- **概述**:认识数据库怎样把数据保存下来,API 是前端和后端约定的“对话方式”,并能解释为什么刷新页面后条目仍然在。(由原“前端、后端和数据库”拆出)
- **标记**:🆕 新增,尚无正文;✏️ 拆分:同上
- **小节**:Words you will meet:数据库、API / 为什么刷新后条目还在 / What you will do
- **自检标准**:
  - 你能说出哪一部分负责保存数据
  - 你能解释为什么刷新后条目仍然在
  - 你能说出 API 是什么
- **复习测验**:[`quizzes/app-with-data/database-and-api.md`](quizzes/app-with-data/database-and-api.md)(3 道单选)

##### Write the app brief(写应用需求说明)  `write-the-app-brief`

- **概述**:写应用需求说明,因为 AI 猜不到你脑子里的想法,所以需求是最重要的输入。
- **小节**:What you will do
- **自检标准**:
  - Your brief has a purpose, a list of stored items, the actions and the access rules.
  - Your brief has a finish checklist you could tick off.
  - The AI had no unanswered questions left after you updated the brief.
- **复习测验**:[`quizzes/app-with-data/write-the-app-brief.md`](quizzes/app-with-data/write-the-app-brief.md)(3 道单选)

##### Get the first version running with Docker Compose(用 Docker Compose 运行第一个版本)  `first-version-with-compose`

- **概述**:让 AI 做出第一版,并用 Docker Compose 一次启动多个容器来运行它。
- **小节**:What you will do
- **自检标准**:
  - The app opens in your browser at an address with a port number.
  - An entry you added is still there after you stop and start the app.
  - You saved a checkpoint of the working version.
- **复习测验**:[`quizzes/app-with-data/first-version-with-compose.md`](quizzes/app-with-data/first-version-with-compose.md)(3 道单选)

##### Add a feature(添加一个功能)  `add-a-feature`

- **概述**:加一个会改变存储内容的功能,例如给书签加标签,或给留言加回复。
- **小节**:What you will do
- **自检标准**:
  - The new feature works when you use it.
  - Entries that existed before the change still appear.
  - You saved a checkpoint before and after the change.
- **复习测验**:[`quizzes/app-with-data/add-a-feature.md`](quizzes/app-with-data/add-a-feature.md)(3 道单选)

##### Fix a planted problem(修复一个预设的问题)  `fix-a-planted-problem`

- **概述**:在应用副本里被故意埋了问题,练习描述现象、提供证据,并判断修复是否正确。
- **小节**:What you will do
- **自检标准**:
  - The step that failed now works.
  - The rest of the app still works after the fix.
  - You can say in one sentence what the cause was.
  - You gave the AI the exact error text and not a paraphrase.
- **复习测验**:[`quizzes/app-with-data/fix-a-planted-problem.md`](quizzes/app-with-data/fix-a-planted-problem.md)(3 道单选)

##### Protect and back up your data(保护并备份你的数据)  `protect-and-back-up-your-data`

- **概述**:防止三类风险:密钥进入仓库、有风险的改动毁掉数据、会悄悄删数据的命令,并做好备份。
- **小节**:Words you will meet / What you will do
- **自检标准**:
  - The settings file with the secret is not among the changes saved to GitHub.
  - You made a backup and restored an entry from it.
  - You can name the commands that you will always read before running.
- **复习测验**:[`quizzes/app-with-data/protect-and-back-up-your-data.md`](quizzes/app-with-data/protect-and-back-up-your-data.md)(3 道单选)

##### Challenge: build a different data app on your own(挑战：独立做一个不同的数据应用)  `variation-challenge`

- **概述**:不看示例,独立做一个不同的数据应用。
- **小节**:What you will do
- **自检标准**:
  - The app runs from one start command and keeps its entries after a restart.
  - No secret was saved to GitHub.
  - You made a backup before changing what the app stores.
  - You finished without copying an example from the course.
- **复习测验**:[`quizzes/app-with-data/variation-challenge.md`](quizzes/app-with-data/variation-challenge.md)(3 道单选)

### 8. Add AI Features to Your App(给应用加上 AI 功能)

- 课程 id:`add-ai-features`
- 类型:主线
- 状态:📝 草稿
- **概述**:给小应用加上 AI 功能:先了解模型常识、写功能说明,再接入模型 API 让第一版跑起来(创建密钥之前先设好消费上限,密钥放在项目文件之外,课程会说明可能产生的少量费用),然后加第二个能力、系统地复查密钥与费用,并学会判断输出好不好。

##### See the finished feature(先看做好的功能)  `see-the-finished-feature`

- **概述**:先看要加的 AI 功能,并说明“模型读文字、写出有用回答”指的是什么。
- **小节**:What you will do
- **自检标准**:
  - You used the finished example and wrote down at least one good and one weak answer.
  - You can say your feature in one sentence, for example "Summarise each note in two lines".
  - You know which earlier app will receive the feature.
  - You have a model service you can reach from your computer.
- **复习测验**:[`quizzes/add-ai-features/see-the-finished-feature.md`](quizzes/add-ai-features/see-the-finished-feature.md)(3 道单选)

##### What builders need to know about models(做应用的人需要了解的模型常识)  `how-models-work-for-builders`

- **概述**:一页纸的名词卡,列出做应用前需要知道的模型常识,不涉及内部原理。
- **小节**:What you will do
- **自检标准**:
  - You can explain all five words without looking at the card.
  - You know that a model can be wrong while sounding sure.
  - You wrote one thing each word means for your own feature.
  - You decided what the app shows when the model fails.
- **复习测验**:[`quizzes/add-ai-features/how-models-work-for-builders.md`](quizzes/add-ai-features/how-models-work-for-builders.md)(3 道单选)

##### Write the feature brief(写功能说明)  `write-the-feature-brief`

- **概述**:写一份功能说明,写清功能必须做什么、不能做什么,作为助手构建和你验收的依据。
- **小节**:What you will do
- **自检标准**:
  - The brief names the person, the input, the output and one real example.
  - The brief lists at least three things the feature must never do.
  - The brief says what the person sees when something fails.
  - You have at least three test inputs with the answers you would accept.
- **复习测验**:[`quizzes/add-ai-features/write-the-feature-brief.md`](quizzes/add-ai-features/write-the-feature-brief.md)(3 道单选)

##### Get the first version working(让第一版跑起来)  `first-version`

- **概述**:选择可用的模型服务,说明可能产生的少量费用;创建密钥之前先设好消费上限,并把密钥放在项目文件之外;让应用里的第一个 AI 功能在本机跑起来。
- **标记**:✏️ 调整:把最关键的两步前置——创建密钥之前先在服务里设好消费上限,并确定密钥放在项目文件之外;明确说明可能产生少量费用(已决定不提供免费方案)。完整的复查和泄露预案仍在后面的“保管好密钥,控制好费用”
- **小节**:What you will do
- **自检标准**:
  - Your app shows an answer from the model for your first test input.
  - The key is not written in any project file you can see.
  - A failure, such as turning off your internet, shows the plain message from your brief.
  - You saved a checkpoint after it worked.
  - 创建密钥之前,你已经在服务那里设好了消费上限。
- **复习测验**:[`quizzes/add-ai-features/first-version.md`](quizzes/add-ai-features/first-version.md)(3 道单选)

##### Add a second ability(再加第二个能力)  `add-a-second-ability`

- **概述**:再加第二个能力,让应用从“一个功能”更像“一个产品”。
- **小节**:What you will do
- **自检标准**:
  - The second ability works on its own test inputs.
  - The first ability still gives the answers you accepted before.
  - The brief describes both abilities, including what each must never do.
  - You saved a checkpoint after both worked.
- **复习测验**:[`quizzes/add-ai-features/add-a-second-ability.md`](quizzes/add-ai-features/add-a-second-ability.md)(3 道单选)

##### Keep keys and costs safe(保管好密钥，控制好费用)  `keep-keys-and-costs-safe`

- **概述**:把 API 密钥当银行卡号一样保密,并给费用设上限。
- **小节**:What you will do
- **自检标准**:
  - The key is not in any project file that is saved to GitHub or shown on the website.
  - You set a spending limit and an alert at the service.
  - The feature rejects a very long text instead of sending it.
  - You have your three-line leak plan written down.
- **复习测验**:[`quizzes/add-ai-features/keep-keys-and-costs-safe.md`](quizzes/add-ai-features/keep-keys-and-costs-safe.md)(3 道单选)

##### Judge the output(判断输出好不好)  `judge-the-output`

- **概述**:模型可能说得很肯定却是错的,学会判断输出好不好,不能因为它回答了就相信。
- **小节**:What you will do
- **自检标准**:
  - You have at least ten test inputs, each with an accepted answer.
  - You can rerun the full list and read the score in a minute.
  - A change is kept only when the score does not get worse.
  - You tested one input that tries to give the model new instructions.
- **复习测验**:[`quizzes/add-ai-features/judge-the-output.md`](quizzes/add-ai-features/judge-the-output.md)(3 道单选)

##### Challenge: add an AI feature to an earlier app(挑战：给之前的应用加一个 AI 功能)  `variation-challenge`

- **概述**:不再给示例,用另一个应用和另一个功能,独立重做整门课程。
- **小节**:What you will do
- **自检标准**:
  - The second app has a working AI feature of a different kind from your first.
  - The brief and the test list were written before the feature was built.
  - The key, the spending limit and the input limits are in place.
  - You finished without copying from an earlier lesson's steps line by line.
- **复习测验**:[`quizzes/add-ai-features/variation-challenge.md`](quizzes/add-ai-features/variation-challenge.md)(3 道单选)

### 9. GitHub: Branches and Pull Requests(GitHub 协作:分支与 Pull Request)

- 课程 id:`github-collaboration`
- 类型:主线
- 状态:📝 草稿(新增课程)
- **概述**:GitHub 协作(新增课程,由原“GitHub Desktop 与 GitHub”拆出):在做完几个应用之后、毕业项目之前,学习用分支隔离改动、用 Pull Request 审阅 AI 写的改动再合并;“Issue、Fork 与开源”为选修。紧接着的毕业项目要求每个改动都走分支和 Pull Request。

##### Work on a branch(在分支上工作)  `work-on-a-branch`

- **概述**:在分支上做改动,让主线 main 始终保持可用的版本。
- **标记**:✏️ 移动:由“GitHub Desktop 与 GitHub”移到本课(课程路径变化,阅读进度需迁移)
- **小节**:What you will do
- **自检标准**:
  - You have a branch with a clear name and at least one commit on it.
  - You saw the README differ between `main` and your branch.
  - The branch is visible on GitHub.
- **复习测验**:[`quizzes/github-collaboration/work-on-a-branch.md`](quizzes/github-collaboration/work-on-a-branch.md)(3 道单选)

##### Open a pull request and read the changes(发起 Pull Request 并查看改动)  `open-a-pull-request`

- **概述**:发起 Pull Request 请求把分支合入 main,并在页面上审阅具体改了什么。
- **标记**:✏️ 移动:同上;可顺带练习“审阅 AI 做出的改动”
- **小节**:What you will do
- **自检标准**:
  - You opened a pull request and wrote a clear description.
  - You read all of the changes before merging.
  - `main` on GitHub and on your computer now contain your work.
- **复习测验**:[`quizzes/github-collaboration/open-a-pull-request.md`](quizzes/github-collaboration/open-a-pull-request.md)(3 道单选)

##### Issues, forks and open source(Issue、Fork 与开源)  `issues-forks-and-open-source`

- **概述**:了解 Issue、Fork 与开源:如何阅读、使用并改进别人公开的项目。
- **标记**:✏️ 移动:同上;🔹 选修
- **小节**:What you will do
- **自检标准**:
  - You wrote one clear issue.
  - You have a fork of a project and a branch with a small change in it.
  - You can say what the licence of one project lets you do.
- **复习测验**:[`quizzes/github-collaboration/issues-forks-and-open-source.md`](quizzes/github-collaboration/issues-forks-and-open-source.md)(3 道单选)

### 10. Capstone: Build and Launch Your Own App(毕业项目：做出并上线你自己的应用)

- 课程 id:`capstone-project`
- 类型:主线
- 状态:📝 草稿
- **概述**:毕业项目:用前面学到的全部方法,从一个空文件夹做出并上线一个属于你自己的小应用——选题、写需求、小步构建、上线前检查、发布,再把成果讲给别人,最后回顾并整理成下一次可用的清单。

##### Choose your project(选定你的项目)  `choose-your-project`

- **概述**:选定属于自己的小应用,从空文件夹一路做到别人能打开。
- **小节**:What you will do
- **自检标准**:
  - You chose one project and can explain it in one sentence.
  - You named the person who will use it.
  - You wrote down at least three things you will not build in the first version.
  - The project exists on GitHub with its goal written down.
- **复习测验**:[`quizzes/capstone-project/choose-your-project.md`](quizzes/capstone-project/choose-your-project.md)(3 道单选)

##### Write the spec(写需求说明)  `write-the-spec`

- **概述**:写需求说明:在需求之上再加一份“完成清单”,每一条测试时都能判断真假。
- **小节**:What you will do
- **自检标准**:
  - The spec has who and why, what it does, what it does not do and what it must never do.
  - Every item of "What it does" has a matching line in the done-checklist.
  - You asked your assistant to review the spec and you fixed what was fair.
  - The spec is saved in your project.
- **复习测验**:[`quizzes/capstone-project/write-the-spec.md`](quizzes/capstone-project/write-the-spec.md)(3 道单选)

##### Build in small steps(小步构建)  `build-in-small-steps`

- **概述**:每次改动都小、都在独立分支、都存档,并通过 Pull Request 审阅。
- **小节**:What you will do
- **自检标准**:
  - Each checklist item was built on its own branch and merged by a pull request.
  - You read the changes of every pull request before accepting it.
  - Every ticked item passes when you try it yourself.
  - Your main version always runs, even if it does not do everything yet.
- **复习测验**:[`quizzes/capstone-project/build-in-small-steps.md`](quizzes/capstone-project/build-in-small-steps.md)(3 道单选)

##### Check before you ship(上线前的检查)  `check-before-you-ship`

- **概述**:上线前再检查一遍,除了自己的主流程,还要查密钥、数据丢失和意外费用。
- **小节**:What you will do
- **自检标准**:
  - Every line of the done-checklist passes, or is written down as a known gap.
  - No secret appears in the project, its history or the public part of the app.
  - A wrong click cannot delete data without a question first.
  - Every paid service has a spending limit and an alert.
- **复习测验**:[`quizzes/capstone-project/check-before-you-ship.md`](quizzes/capstone-project/check-before-you-ship.md)(3 道单选)

##### Launch it(上线发布)  `launch`

- **概述**:按发布课程学到的方式把应用发布出去,让别人能在一个地址打开。
- **小节**:What you will do
- **自检标准**:
  - A person who is not you can open your app from a link.
  - The done-checklist passes on the live address.
  - You watched someone use it and wrote down what you saw.
  - If there is a back end, you know it is not on a public server yet, and you did not expose your own computer.
- **复习测验**:[`quizzes/capstone-project/launch.md`](quizzes/capstone-project/launch.md)(3 道单选)

##### Show your work(把成果讲给别人)  `show-your-work`

- **概述**:为项目写 README、准备一段三分钟内能讲完的演示、写一页项目说明,并把它放进你的作品集,让别人不靠你的解释也能看懂你做了什么。
- **标记**:🆕 新增,尚无正文
- **小节**:README 写什么 / 演示怎么做 / 项目说明 / 作品集链接
- **自检标准**:
  - 别人只看 README 就知道项目做什么、怎么运行
  - 你有一段能在三分钟内讲完的演示
  - 项目说明里写明了你自己把关了哪些事
- **复习测验**:[`quizzes/capstone-project/show-your-work.md`](quizzes/capstone-project/show-your-work.md)(3 道单选)

##### Work on a project with others(小组协作)  `team-collaboration`

- **概述**:用分支和 Pull Request 让组员互相审阅改动,约定谁改什么,并处理合并时遇到的冲突。适合小组完成项目的同学,个人项目可跳过。
- **标记**:🆕 新增,尚无正文;🔹 选修
- **小节**:分工与约定 / 分支与 Pull Request / 审阅别人的改动 / 遇到冲突怎么办
- **自检标准**:
  - 你们约定了谁负责哪一部分
  - 你审阅过组员的一个 Pull Request 并留下了意见
  - 你处理过一次合并冲突,或能说出处理步骤
- **复习测验**:[`quizzes/capstone-project/team-collaboration.md`](quizzes/capstone-project/team-collaboration.md)(3 道单选)

##### Look back(回顾总结)  `look-back`

- **概述**:回顾整个项目,把学到的东西整理成下一次可用的检查清单。
- **小节**:What you will do
- **自检标准**:
  - You read the full history of your project.
  - Your checklist has ten lines or fewer, and each can be answered yes or no.
  - You can name at least one thing the AI got wrong that you caught.
  - You wrote the goal of your next project.
- **复习测验**:[`quizzes/capstone-project/look-back.md`](quizzes/capstone-project/look-back.md)(3 道单选)

### 11. Run Ready-Made Apps with Docker(用 Docker 部署现成应用)

- 课程 id:`docker-self-hosted-apps`
- 类型:🔹 选修
- 状态:📝 草稿
- **概述**:把 Docker 用在“自己托管现成应用”上(选修,紧接 Docker 入门之后,不影响主线):读懂应用的 compose 文件,部署 Reactive Resume,配置并保管密钥,做好备份、升级和恢复,再把同一套流程用到更多应用上。

##### Why run apps yourself(为什么要自己运行应用)  `why-self-host`

- **概述**:说明什么是自托管、为什么值得自己运行应用,以及自托管需要承担哪些责任。
- **小节**:What you will do
- **自检标准**:
  - You can explain self-hosting in one sentence to a friend.
  - You can name two benefits and two costs.
  - You have a written shortlist of one to three apps and can say which one you would try first.
- **复习测验**:[`quizzes/docker-self-hosted-apps/why-self-host.md`](quizzes/docker-self-hosted-apps/why-self-host.md)(3 道单选)

##### Understand an app’s compose file with AI(让 AI 帮你读懂应用的 compose 文件)  `read-the-compose-file`

- **概述**:让 AI 帮你读懂应用自带的 compose 文件:它需要哪些容器、彼此如何连接。
- **小节**:What you will do
- **自检标准**:
  - Your note answers all four questions: ports, where data lives, passwords, how to back up.
  - You found each answer in the file and did not rely on the AI alone.
  - You can say which service in the file is the database and which is the app.
- **复习测验**:[`quizzes/docker-self-hosted-apps/read-the-compose-file.md`](quizzes/docker-self-hosted-apps/read-the-compose-file.md)(3 道单选)

##### Deploy Reactive Resume(部署 Reactive Resume)  `deploy-reactive-resume`

- **概述**:以开源简历工具 Reactive Resume 为例,部署一个由多个容器组成的真实应用。
- **小节**:What you will do
- **自检标准**:
  - The app opens in your browser at an address on your own computer.
  - You can see all of its containers running in Docker.
  - You made a test resume and it is still there after you refresh the page.
- **复习测验**:[`quizzes/docker-self-hosted-apps/deploy-reactive-resume.md`](quizzes/docker-self-hosted-apps/deploy-reactive-resume.md)(3 道单选)

##### Configure it and keep secrets safe(配置应用并保管好密钥)  `configure-and-keep-secrets`

- **概述**:认识应用所需的密钥(数据库密码、会话密钥等),学会修改默认值并妥善保管,不让它们泄露。
- **小节**:What you will do
- **自检标准**:
  - No example password or key remains in your `.env` file.
  - Your new secrets are saved in a password manager.
  - `.env` is listed in `.gitignore`.
  - The app still opens after the restart.
- **复习测验**:[`quizzes/docker-self-hosted-apps/configure-and-keep-secrets.md`](quizzes/docker-self-hosted-apps/configure-and-keep-secrets.md)(3 道单选)

##### Back up, upgrade and restore(备份、升级与恢复)  `back-up-upgrade-restore`

- **概述**:给应用数据做备份、把应用升级到新版本,并演练升级失败时如何退回。
- **小节**:What you will do
- **自检标准**:
  - You have a backup file stored outside Docker.
  - You have restored it at least once in a test copy.
  - You know the version you are running and where to change it.
- **复习测验**:[`quizzes/docker-self-hosted-apps/back-up-upgrade-restore.md`](quizzes/docker-self-hosted-apps/back-up-upgrade-restore.md)(3 道单选)

##### Try more apps(再试几个应用)  `try-more-apps`

- **概述**:把同一套流程(找官方说明、读 compose、四项检查、改密钥、做备份)用到另外两个应用上,并学会安装前评估一个应用。
- **小节**:What you will do
- **自检标准**:
  - Memos runs and keeps a note after a restart.
  - You can name the four checks and applied them to each new app.
  - You set a spending limit before entering any key that costs money.
- **复习测验**:[`quizzes/docker-self-hosted-apps/try-more-apps.md`](quizzes/docker-self-hosted-apps/try-more-apps.md)(3 道单选)

##### Troubleshoot an app(排查应用故障)  `troubleshoot-an-app`

- **概述**:总结应用起不来或页面打不开时最常见的几类原因,以及如何逐项排查。
- **小节**:What you will do
- **自检标准**:
  - You can find and read the log of one container.
  - You can say what a port conflict is and how to fix it.
  - You solved one deliberately broken setup, such as a wrong port, using your own steps.
- **复习测验**:[`quizzes/docker-self-hosted-apps/troubleshoot-an-app.md`](quizzes/docker-self-hosted-apps/troubleshoot-an-app.md)(3 道单选)

### 12. The Same App in Another Language(用另一种语言做同一个应用)

- 课程 id:`another-language`
- 类型:🔹 选修
- 状态:📝 草稿
- **概述**:让 AI 用 Python 把同一件事再做一遍(选修):先理解语言与运行环境,写出与语言无关的需求,运行、扩展、对比两个版本,修复预设问题,最后挑战第三种语言。“不读代码也能验收”已并入主线的“验收结果”一课。

##### See the goal(看看目标)  `see-the-goal`

- **概述**:此前工具都由 AI 选好,这一课开始让它用你没用过的 Python 完成一件事,先看清目标。
- **小节**:What you will do
- **自检标准**:
  - You can describe the job without naming any language.
  - You have a short way to check that the job is done.
  - You know which of the two options you chose.
- **复习测验**:[`quizzes/another-language/see-the-goal.md`](quizzes/another-language/see-the-goal.md)(3 道单选)

##### What a language and a runtime are(什么是编程语言和运行环境)  `what-a-language-and-runtime-are`

- **概述**:认识语言、运行环境等几个反复出现的词,只求能听懂 AI 要你装什么、缺什么。
- **小节**:Words you will meet / What you will do
- **自检标准**:
  - You can say what a runtime is and why a program needs one.
  - You know whether Python is installed on your computer.
  - You can say what a dependency is and who writes it.
- **复习测验**:[`quizzes/another-language/what-a-language-and-runtime-are.md`](quizzes/another-language/what-a-language-and-runtime-are.md)(3 道单选)

##### Write the brief for a Python version(为 Python 版本写需求说明)  `write-the-brief-for-python`

- **概述**:好的需求描述的是任务而不是语言,所以 Python 版的需求几乎就是现成的那份。
- **小节**:What you will do
- **自检标准**:
  - The brief says what to build, in what language, and what the AI must not do.
  - The brief asks the AI to ask before risky actions.
  - Your finish checklist is part of the brief.
- **复习测验**:[`quizzes/another-language/write-the-brief-for-python.md`](quizzes/another-language/write-the-brief-for-python.md)(3 道单选)

##### Get the first version running(运行第一个版本)  `first-version`

- **概述**:AI 写出第一个 Python 版本,你运行它;做应用时它大概率会用 FastAPI 之类的框架。
- **小节**:What you will do
- **自检标准**:
  - The program runs from the steps the AI gave you.
  - Most of your finish checklist already passes.
  - You saved a checkpoint of the working version.
- **复习测验**:[`quizzes/another-language/first-version.md`](quizzes/another-language/first-version.md)(3 道单选)

##### Add a feature(添加一个功能)  `add-a-feature`

- **概述**:练习在读不懂的语言里提出修改要求,让 Python 版本多一个功能。
- **小节**:What you will do
- **自检标准**:
  - The new feature does what your sentence said.
  - One thing that worked before still works.
  - You know which files the AI changed and saved a checkpoint.
- **复习测验**:[`quizzes/another-language/add-a-feature.md`](quizzes/another-language/add-a-feature.md)(3 道单选)

##### Compare with the first version(与第一个版本对比)  `compare-with-the-first-version`

- **概述**:对比同一件事的两种实现,学会不逐行读代码也能判断结果好不好。
- **小节**:What you will do
- **自检标准**:
  - Both versions were tested with the same three inputs.
  - You can name at least one thing that is the same and one that differs.
  - You wrote down what you could and could not judge without reading code.
- **复习测验**:[`quizzes/another-language/compare-with-the-first-version.md`](quizzes/another-language/compare-with-the-first-version.md)(3 道单选)

##### Fix a planted problem(修复一个预设的问题)  `fix-a-planted-problem`

- **概述**:在一份练习用的 Python 小程序里被故意埋了问题,你不用读懂 Python 也能把它修好。
- **小节**:What you will do
- **自检标准**:
  - The step that failed now works and the rest still works.
  - You gave the AI the exact error text.
  - You can say what the cause was in one sentence, even though you did not read the code.
- **复习测验**:[`quizzes/another-language/fix-a-planted-problem.md`](quizzes/another-language/fix-a-planted-problem.md)(3 道单选)

##### Challenge: the same job in a third language(挑战：用第三种语言完成同一件事)  `variation-challenge`

- **概述**:让 AI 用第三种语言完成同一件事,并独立评判结果。
- **小节**:What you will do
- **自检标准**:
  - The third version passes the same finish checklist or you know exactly why it does not.
  - You compared the results using the same inputs.
  - You wrote down what mattered more than the language.
- **复习测验**:[`quizzes/another-language/variation-challenge.md`](quizzes/another-language/variation-challenge.md)(3 道单选)

## 已确定的决定

- Docker 放在最前;读者是未来的开发者,会基础电脑操作但没有用过终端。
- 不新增“电脑基础”课,也不加“聊天 AI 体验”;“与 AI 搭档开发”第 1 课只扩成“怎么选 AI 助手”。
- “给应用加上 AI 功能”**不提供免费方案**:课程说明可能产生的少量费用,并要求先设好消费上限;**不给具体金额**,只教学生自己设上限和提醒。
- **不提供共享服务器或其他备选环境**:所有练习都在学生自己的电脑上进行;“你的电脑能装 Docker 吗”一课只负责让学生提前确认电脑是否满足要求。
- 课程正文**先只写 en-US**。
- “读懂报错”和“怎样求助”**合并为一课**。
- **新增的 9 个课时全部都做**,按优先级逐步扩写正文。
- **“与 AI 搭档”提前**:把 GitHub 拆成“基础”(5 课)和“协作”(分支、Pull Request);基础留在 AI 搭档之前,协作挪到毕业项目之前。AI 之前的课时从 21 个减到 19 个。
- **交付方式是学生自学**,不按学期或课堂安排来设计;保留“快速上手”路径,让学习者先拿到一个公开网站。
- **各课程里的“挑战”课保持在主线,不降为选修。**
- **GitHub 协作放在毕业项目之前**(紧接“给应用加上 AI 功能”)。
- **移除了“在学校用 AI”一课**:它是按高校场景加的,而课程并不是面向学校学生的。

## 待拍板的问题

目前没有待拍板的问题。
