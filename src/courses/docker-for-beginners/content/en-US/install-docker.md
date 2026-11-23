---
minutes: 20
outcome: "You will install Docker on your system and confirm that the Docker engine answers and can run a container."
terms: [docker-engine]
---

This lesson installs [Docker Engine](../../../glossary/#docker-for-beginners-docker-engine) on your computer. Read the short introduction, then follow **only the section for your system**: Windows, macOS or Linux. Each section lists what you install, the steps in order, and the official page for that system. The official page is the authority: if a button or menu name has changed, follow the page.

Each section is complete on its own, so you never need to read the others. When you finish, go to the shared checks at the end of this lesson.

## Windows

**What you install:** Docker Desktop, using the WSL 2 backend. WSL 2 is the Linux environment that Docker Desktop runs its containers inside, which is why you turn it on first.

**Steps:**
1. Open Windows PowerShell as administrator. Press Start, type `PowerShell`, right-click **Windows PowerShell** and choose **Run as administrator**.
2. Type `wsl --install` and press Enter. Restart your computer if Windows asks you to. Docker's Windows page includes this command in its WSL 2 setup steps.
3. Open the [Docker Desktop for Windows installation page](https://docs.docker.com/desktop/setup/install/windows-install/) and download **Docker Desktop Installer.exe**.
4. Double-click the installer. On the **Configuration** page, choose the WSL 2 option. Older versions show it as **Use WSL 2 instead of Hyper-V**. Keep the other defaults unless you know you need different ones.
5. When the installation is successful, select **Close**, then start **Docker Desktop** from the Start menu.
6. Accept the terms when Docker Desktop asks, and wait until Docker Desktop shows that it is running before you continue.

Continue to **Check it worked** below and run its commands in Windows PowerShell.

## macOS

**What you install:** Docker Desktop for Mac. Choose the download that matches your chip, Apple silicon or Intel, as explained in **Can your computer run Docker?**.

**Steps:**
1. Open the [Docker Desktop for Mac installation page](https://docs.docker.com/desktop/setup/install/mac-install/).
2. Download the Apple silicon or Intel chip version that matches your Mac.
3. Open the downloaded `Docker.dmg` file and drag the **Docker** icon into the **Applications** folder. The official page says Docker Desktop is installed at `/Applications/Docker.app` this way.
4. Open **Docker** from the Applications folder. Accept the terms when asked, and enter your macOS password if Docker asks for it.
5. Wait until Docker Desktop shows that it is running before you continue.

Continue to **Check it worked** below and run its commands in the Terminal app.

## Linux

**What you install:** Docker Engine, from Docker's own package repository for your Linux distribution. Docker Engine runs directly on Linux, so no desktop app is needed. The official page for each distribution gives the exact commands, and you should copy them from that page rather than typing repository addresses by hand.

**Steps:**
1. Open the official page for your distribution:
   - [Install Docker Engine on Ubuntu](https://docs.docker.com/engine/install/ubuntu/)
   - [Install Docker Engine on Debian](https://docs.docker.com/engine/install/debian/)
   - [Install Docker Engine on Fedora](https://docs.docker.com/engine/install/fedora/)
   - Other distributions are listed on the [Docker Engine install page](https://docs.docker.com/engine/install/).
2. If the page has an **Uninstall old versions** step, follow it first.
3. Set up Docker's repository and install Docker Engine by copying the commands from the page.
4. Start Docker. On Ubuntu the official page uses `sudo systemctl start docker`. On many distributions Docker already starts when the computer starts. For other systemd distributions, the [post-installation page](https://docs.docker.com/engine/install/linux-postinstall/) shows `sudo systemctl enable docker.service`.
5. Let your user run Docker without `sudo`. Run `sudo usermod -aG docker $USER`, then log out and log back in so the new group membership takes effect. Docker's [post-installation steps](https://docs.docker.com/engine/install/linux-postinstall/) describe this.

The Docker daemon always runs as root, and the `docker` group is the way to let a user reach it without `sudo`. Anyone in that group can control Docker, which means they can control the machine. Add only your own user.

Continue to **Check it worked** below and run its commands in your terminal.

## Check it worked

These two checks look the same on every system. Run them in the terminal you use for your system, and compare the results with what is described here.

**Check 1: ask Docker for its version.** Type this command and press Enter:

```
docker version
```

The output has two parts. The **Client** part describes the Docker command line you typed. The **Server** part describes the Docker engine that runs in the background. If the **Server** part is missing, or the output says it cannot connect to the engine, Docker is not running yet.

**Check 2: run the test container.** Type this command and press Enter:

```
docker run hello-world
```

Docker downloads a small test image the first time and runs it. The container prints a short message and stops. The official Ubuntu page uses this same command to verify an installation.

If a check fails, start Docker Desktop on Windows or macOS, or start the Docker service on Linux, then run the command again. If the problem continues, read the matching entry in the **Troubleshooting** lesson at the end of this course.

## What comes next

Go on to **Your first look at the terminal**, where you learn how to type a command and read its answer before you start your first container.

## What you learned

- Follow only the section for your own system, and use the official page when a name has changed.
- `docker version` shows a Client part and a Server part, and the Server part must answer.
- `docker run hello-world` checks that Docker can run a container.
- On Linux, membership in the `docker` group gives control over Docker, so add only your own user.
