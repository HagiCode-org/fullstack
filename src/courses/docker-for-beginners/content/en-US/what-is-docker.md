---
minutes: 10
outcome: "You will know what a Docker image, container and volume are, and why the rest of this course uses them."
terms: [image, container, volume]
---

Docker is a tool that runs programs in small, sealed packages called [containers](../../../glossary/#docker-for-beginners-container). A container holds a program together with the files and settings it needs, so the same program runs the same way on any computer that has Docker. Docker's [concepts guide](https://docs.docker.com/get-started/docker-concepts/the-basics/what-is-a-container/) describes a container as an isolated process with its own filesystem, which is why one container does not disturb another or the rest of your computer.

In this course you will use Docker to run three kinds of program on your own computer without installing each one by hand: a web server (a program that sends web pages to a browser), a database (a program that stores data in organized tables) and a small Node.js program (a program written in JavaScript). This lesson explains the three words you will meet most often. Nothing here needs to be installed yet.

## Words you will meet

**Image.** A package that holds a program and everything it needs to start: its files and settings. An [image](../../../glossary/#docker-for-beginners-image) is a template. Starting a container from it does not change the image, and Docker downloads an image from the internet the first time it needs it.

**Container.** A running copy of an image. You can start several containers from the same image, and each one runs separately from the others and from the rest of your computer. When you remove a container, that copy is gone, but the image it came from stays on your computer.

**Volume.** A storage space that Docker keeps outside a container. A [volume](../../../glossary/#docker-for-beginners-volume) keeps its files after the container that used it is removed. Docker's [volume guide](https://docs.docker.com/storage/volumes/) says that data in a volume persists after its container is removed, so a database can keep its data across restarts.

## Why beginners use containers

Without Docker, running a database means downloading its installer, choosing settings, and later removing it cleanly. With Docker, you name the image you want and start a container. When you have finished, you stop and remove the container. Your computer keeps its original set of programs, and you can try the same setup again in a few seconds.

The course uses three more words, which are explained the first time they appear. A port is a numbered door on your computer, such as 8080. A network is a private connection that lets containers reach each other. Compose is a tool that starts several containers from one file named `compose.yaml`.

## Before you go on

Read this lesson once more and say each of the three words in your own sentence. You do not need to remember the exact wording, only the idea. If a word does not make sense later, come back here.

## What comes next

Go on to **Can your computer run Docker?**, where you check that your computer can run Docker before you install anything.

## What you learned

- An image is a template, and a container is a running copy of an image.
- Removing a container does not remove the image it came from.
- A volume keeps data after a container is removed.
- Docker lets you run a program without installing it by hand on your computer.
