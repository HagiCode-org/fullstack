This lesson installs Docker on your computer. Read the short introduction, then follow **only the section for your system**: Windows, macOS or Linux. Each section lists what you need, the steps in order and the official page for that system. The official page is the authority: if a button or menu name has changed, follow the page.

Each section is complete on its own, so you never need to read the others. When you finish, go to the shared checks at the end of this lesson.

## Windows

**What you install:** Docker Desktop, using the WSL 2 backend. WSL 2 is Windows' built-in Linux environment. Docker Desktop runs the containers inside it, which is why you install WSL 2 first.

**What you need:**
- Windows 10 version 22H2 or Windows 11 version 23H2 or later, 64-bit. Windows Home, Pro, Enterprise and Education all run the Linux containers this course uses.
- A 64-bit processor with hardware virtualization turned on in the BIOS or UEFI settings. Most computers have this, but it can be switched off. The troubleshooting lesson explains how to check it.
- At least 8 GB of memory.
- An administrator account for the WSL step. Docker Desktop itself can be installed per user.

**Steps:**
1. Open **Windows PowerShell as administrator**: press Start, type `PowerShell`, right-click it and choose **Run as administrator**.
2. Type `wsl --install` and press Enter. Restart your computer when Windows asks you to. Docker's guide to WSL 2 is at [Docker Desktop WSL 2 backend](https://docs.docker.com/desktop/features/wsl/).
3. Open the [Docker Desktop for Windows installation page](https://docs.docker.com/desktop/setup/install/windows-install/) and download **Docker Desktop Installer.exe**.
4. Double-click the installer. On the **Configuration** page, keep **Use WSL 2 instead of Hyper-V** selected. Accept the default settings unless you know you need others.
5. When the installer finishes, select **Close**, then start **Docker Desktop** from the Start menu.
6. Accept the terms when Docker Desktop asks. Wait until Docker Desktop shows that it is running before you continue.

Continue to **Check it worked** below and run its commands in Windows PowerShell.

## macOS

**What you install:** Docker Desktop for Mac.

**What you need:**
- A Mac with Apple silicon (M-series chip) or an Intel chip. To check, choose the Apple menu, then **About This Mac**, and read the chip name.
- A macOS version that Docker Desktop still supports. The official page lists the current supported versions.

**Steps:**
1. Open the [Docker Desktop for Mac installation page](https://docs.docker.com/desktop/setup/install/mac-install/).
2. Download **Docker Desktop for Mac with Apple silicon** or **Docker Desktop for Mac with Intel chip**, whichever matches your Mac.
3. Open the downloaded `Docker.dmg` file and drag the **Docker** icon into the **Applications** folder.
4. Open **Docker** from the Applications folder. Accept the terms when asked, and enter your macOS password if Docker asks for it to install its helper.
5. Wait until Docker Desktop shows that it is running before you continue.

Continue to **Check it worked** below and run its commands in the Terminal app.

## Linux

**What you install:** Docker Engine from Docker's own package repository for your distribution. Docker Engine runs directly on Linux, so no separate desktop app is needed. This course does not walk through Docker Desktop for Linux, which is an optional alternative described on the official page.

**What you need:**
- A 64-bit Linux distribution that the official page lists, such as Ubuntu, Debian or Fedora.
- Administrator access with `sudo`. Commands marked `sudo` ask for your password.

**Steps:**
1. Open the official page for your distribution:
   - [Install Docker Engine on Ubuntu](https://docs.docker.com/engine/install/ubuntu/)
   - [Install Docker Engine on Debian](https://docs.docker.com/engine/install/debian/)
   - [Install Docker Engine on Fedora](https://docs.docker.com/engine/install/fedora/)
   - Other distributions are listed under **Install Docker Engine** on the [Docker Engine install page](https://docs.docker.com/engine/install/).
2. Follow the page's **Uninstall old versions** step if it applies to you.
3. Set up Docker's package repository and install Docker Engine. Copy the commands from the page for your distribution. Do not type repository addresses by hand, because they can change.
4. Start Docker and make it start with your computer. On most systems this is `sudo systemctl enable --now docker`.
5. Let your user run Docker without `sudo`. Follow the **Post-installation steps for Linux** on the [official page](https://docs.docker.com/engine/install/linux-postinstall/). In short, add your user to the `docker` group with `sudo usermod -aG docker $USER`, then log out of your session and log back in.

Anyone in the `docker` group can control Docker, and Docker can give that person full control of the machine. Add only your own user to the group.

Continue to **Check it worked** below and run its commands in your terminal.

## Check it worked

These two checks look the same on every system. Run them in the terminal you use for your system, and compare the results with the examples here. Your version numbers will be different.

**Check 1: ask Docker for its version.** Type this command and press Enter:

```
docker version
```

A successful run prints two parts. The first, **Client**, is the command you typed. The second, **Server**, is the Docker engine running in the background. The line that starts with `Server:` must appear, and it must not print an error. A typical result on Linux looks like this:

```
Client: Docker Engine - Community
 Version:           29.9.1
 ...

Server: Docker Engine - Community
 Engine:
  Version:          29.9.1
  ...
```

**Check 2: run the test container.** Type this command and press Enter:

```
docker run hello-world
```

It downloads a small test image the first time, then prints a message that starts with `Hello from Docker!` and ends with `For more examples and ideas, visit:` followed by a web address. Seeing `Hello from Docker!` means Docker can start containers.

If `docker version` says that it cannot connect to the Docker engine, Docker is not running yet. Start Docker Desktop on Windows or macOS, or start the Docker service on Linux, then run the command again. If anything else fails, read the matching entry in the **Troubleshooting** lesson at the end of this course.
