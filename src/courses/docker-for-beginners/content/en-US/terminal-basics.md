---
minutes: 15
outcome: "You will open a terminal, run one command, read its output and stop a running command."
terms: [terminal, command]
---

The [terminal](../../../glossary/#docker-for-beginners-terminal) is a text window where you type a [command](../../../glossary/#docker-for-beginners-command) and press Enter. Many people have never used one, and that is normal. This lesson treats the terminal as a new tool: how to open it on Windows and on a Mac, how to copy and run one command, how to read what it prints, and how to stop a command that is still running.

Every command in this course is typed into a terminal and answered by a line of text. You do not need to understand every word of an answer yet. You need to know where to type, what to type and where the answer appears.

## What the terminal is

A terminal does not show pictures or buttons. You type one line, press Enter, and the program reads that line and prints its answer under it. The line you type is a command. The answer is the output. When the program has finished, the terminal shows a new prompt, which is a short piece of text that waits for your next command.

Docker's [command reference](https://docs.docker.com/reference/cli/docker/container/run/) describes each command with its own options. The `docker run` command, for example, creates and runs a new container from an image. You will use `docker run` in the next lessons, so the same pattern will be familiar by then.

## Open it on Windows

Windows PowerShell is the terminal this course uses on Windows. To open it, press the Start button, type `PowerShell`, and select **Windows PowerShell**. Some commands in later lessons ask for administrator rights, so the lesson that needs them tells you to open PowerShell with **Run as administrator** instead.

Do not use a program whose name you do not recognize just because it has a black window. Use Windows PowerShell for every command in this course unless a lesson says otherwise.

## Open it on Mac

On a Mac, the terminal is the **Terminal** app. Open it from your Applications folder or search for `Terminal` with the search tool on your Mac. Apple's Terminal User Guide describes the app. Every command in this course is typed into the Terminal app.

## Run your first command

Type the following command into your terminal, then press Enter. It asks Docker for its version. If Docker is not installed yet, the command will fail, which is expected at this point. Go back to **Install Docker** first.

```
docker version
```

Read the answer. It is printed under the line you typed, and then a new prompt appears. The first lines name the program that answered. You do not need to understand the numbers yet.

## Copy, paste and Enter

Each command in this course is shown in its own box. Copy the text inside the box exactly, without the box itself. Do not copy the `$` or `>` characters that some guides show at the start of a line, because they only mark the prompt. Paste the text into the terminal with the paste shortcut for your system. Then press Enter once.

If you press Enter before the whole command is pasted, the command runs with only part of its text and prints an error. Read the error, check what you pasted, and type or paste the command again.

## Stop a running command (Ctrl+C)

Some commands keep running until you stop them. A command that streams new lines, such as a log view, does not return to the prompt by itself. To stop it, press Ctrl+C in the terminal window. The command stops, and a new prompt appears. Ctrl+C stops the command you started in that window, so check that you are not interrupting something else.

When a command does not return, read its output before you press Ctrl+C. It may simply be waiting for more output, which is not a problem.

## What comes next

Go on to **Your first container**, where you run your first container from the terminal.

## What you learned

- A command is one line of text that you type, and the answer is the output below it.
- On Windows you use Windows PowerShell, and on a Mac you use the Terminal app.
- Copy a command from its box exactly, paste it, and press Enter once.
- Ctrl+C stops a command that is still running in the terminal window.
