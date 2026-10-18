Docker is a tool that runs programs in small, sealed packages called containers. A container holds a program together with the files and settings it needs, so the program runs the same way on any computer that has Docker. You will use Docker to run a web server, a database and a small Node.js program on your own computer without installing each one by hand.

In this lesson you will learn the handful of words the rest of the course uses. You will also see how to open a terminal, the window where you type commands. Nothing here needs to be installed yet.

## Words you will meet

**Image.** A ready-made package of a program and its files. An image is a template that never changes while you use it. Docker downloads images from the internet when it needs them.

**Container.** A running copy of an image. You can start several containers from the same image, and each one runs separately from the others and from the rest of your computer. When you remove a container, the copy is gone, but the image it came from stays.

**Volume.** A storage space that Docker keeps outside a container. Files stored in a volume are still there after the container is removed, so a database can keep its data across restarts.

**Port.** A numbered entrance on your computer, such as 8080. A container cannot receive visits from your browser until you connect one of your computer's ports to a port inside the container. This connection is called publishing a port.

**Network.** A private connection that lets containers talk to each other. On a network you create yourself, containers can reach each other by name.

**Compose.** A tool that starts several containers together from one file named `compose.yaml`. The file lists each container, its image, its ports and its volumes, so one command starts the whole set.

## Open a terminal

A terminal is a window where you type a command and press Enter. Most of this course uses a terminal. Commands are shown in boxes like this one. Type the text exactly as shown, press Enter, and read the answer the terminal prints.

Do not type the characters you see at the start of a line in other guides, such as `$` or `>`. They only mark the prompt.

- **Windows:** press the Start button, type `PowerShell`, and open **Windows PowerShell**. Every command in this course works there. The Portainer lesson also asks you to use a WSL terminal, and it explains when.
- **macOS:** press Command and Space together, type `Terminal`, and press Enter to open the Terminal app.
- **Linux:** open your application menu and search for `Terminal`. On many desktops you can press Ctrl, Alt and T together.

If a command says `not recognized` or prints an error, the command was usually typed differently from the box. Read the message, correct the text and try again.

## What comes next

Go on to **Install Docker** and follow only the section for your system. Read the official Docker overview at [Docker concepts: what is a container](https://docs.docker.com/get-started/docker-concepts/the-basics/what-is-a-container/) if you want more background now.
