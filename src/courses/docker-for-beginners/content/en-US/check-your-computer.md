---
minutes: 10
outcome: "You will know whether your computer meets Docker's requirements, and what to do if it does not."
terms: [virtualization]
---

Before you install Docker you should check that your computer can run it. Docker needs a supported operating system, enough memory, and in some cases a processor feature called [virtualization](../../../glossary/#docker-for-beginners-virtualization). This course does all of its practice on your own computer, so this check matters: if your computer cannot run Docker, you need a different computer before the rest of the course will work.

Read only the section for your system. Each section lists what Docker's official page for that system requires, such as the [Windows page](https://docs.docker.com/desktop/setup/install/windows-install/), the [Mac page](https://docs.docker.com/desktop/setup/install/mac-install/) or the [Docker Engine install page](https://docs.docker.com/engine/install/) for Linux, and then the steps you can follow to check it. The official page is the authority. If it has changed since this lesson was written, follow the page.

## Windows

Docker Desktop for Windows uses WSL 2 by default. WSL 2 is the Windows Subsystem for Linux, a Linux environment that Docker runs its containers inside. Docker's Windows page lists these requirements:

- Windows 10 64-bit, version 22H2 or higher, or Windows 11 64-bit, version 23H2 or higher. The page names the Enterprise, Pro and Education editions. If you have Windows Home, read the official page's note on editions before you install.
- A 64-bit processor with Second Level Address Translation (SLAT).
- 8 GB of system memory.
- Hardware virtualization turned on in the BIOS or UEFI settings of the computer.
- WSL version 2.1.5 or later.

To check the Windows version and edition, open the system information screen in Windows settings. To check virtualization, look at the settings your computer maker provides. If virtualization is off, turning it on is done in the BIOS or UEFI settings, which differ between computers. If you are not sure how to do that, ask someone who knows the computer.

If your computer is managed by an employer or a school, check with its administrator before you continue. The official page says that the per-user installation of Docker Desktop does not need administrator privileges, but turning on WSL 2 is a Windows change that a managed computer may block.

## macOS

Docker Desktop for Mac comes in two versions, one for Apple silicon (M-series chips) and one for Intel chips. Apple's menu called **About This Mac** shows which chip your Mac has. The official page says Docker Desktop supports the current macOS release and the two previous major releases. If your Mac runs an older system, check the official page before you install.

## Linux

Docker Engine installs from Docker's own package repository for your Linux distribution. The official install page lists the distributions it supports, including Ubuntu, Debian and Fedora. If your distribution is not on that list, the lesson on installation does not cover it, so check the official page first. You also need administrator access, because the install uses `sudo`, which asks for your password.

## What to do if your computer does not qualify

If your computer does not meet the requirements, do not try to work around them. Use a computer that does. The rest of this course assumes you can run Docker on the machine you are reading this on.

## Before you continue

Write down three facts about your computer: its operating system and version, its memory, and whether you can install software on it. Keep them for the next lesson, where you install Docker.

## What comes next

Go on to **Install Docker** and follow only the section for your system.

## What you learned

- Docker needs a supported operating system, a 64-bit processor and enough memory.
- On Windows, the official page requires WSL 2 and hardware virtualization turned on in the BIOS or UEFI settings.
- On a Mac, the chip type decides which Docker Desktop download you choose.
- If your computer cannot run Docker, use one that can before you start the course.
