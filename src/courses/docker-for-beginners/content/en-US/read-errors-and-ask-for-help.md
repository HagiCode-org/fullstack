---
minutes: 15
outcome: "You will find the key line of an error message, copy it exactly, and describe a problem clearly to an AI assistant or a classmate."
terms: [error-message]
---

A red line in the terminal does not always mean something is broken. Some messages are warnings, and some are only progress reports. When a command really fails, the message usually tells you what went wrong, but it is often buried in other text. This lesson shows you how to find the important line, copy it exactly, and describe the problem so that someone else can help you.

Docker's [guide to troubleshooting Docker Desktop](https://docs.docker.com/desktop/troubleshoot-and-support/troubleshoot/) describes how to check the logs of a problem. You will use the `docker logs` command in later lessons, which is described in the [`docker logs` reference](https://docs.docker.com/reference/cli/docker/container/logs/).

## What an error message looks like

An [error message](../../../glossary/#docker-for-beginners-error-message) is text that a program prints when it cannot finish what you asked. It often has several parts: a short phrase that says what failed, a longer phrase that gives the reason, and sometimes a path, a name or a number. The error may appear in red, but colour is not what makes it an error. The words are.

Messages from Docker often start with a word such as `docker`, `Error` or `failed`. A message can also come from a program inside a container, and then its words are the program's own. The rule is the same either way: read the whole block once from the top, then look for the line that names the problem.

## Find the key line

Most error blocks contain one line that matters more than the rest. Look for:

- a word such as `error`, `failed`, `denied`, `not found` or `already in use`;
- a name you recognize, such as the name of a container, a port or a file;
- the last line before the prompt, which is often the newest message.

Ignore lines that only repeat a path or show a long identifier unless you need them. Once you have the key line, you can search for its main words in the troubleshooting lesson of this course, or in the documentation of the program that printed it.

## Copy it exactly, do not retype it

When you ask for help, copy the message from the terminal and paste it into your message. Do not retype it from memory, because a single changed letter can make the search or the explanation useless. Copy the key line first, then the lines around it, so the reader sees the context.

If you cannot select the text in the window, use the screenshot method below instead. A screenshot is a second choice, because it cannot be searched or copied.

## Take a screenshot

If the text cannot be copied, take a screenshot of the whole terminal window, including the command you typed and the message under it. Include the prompt line before the command, so the reader knows which folder you were in. Do not crop the image so tightly that the command or the error disappears.

Before you share a screenshot, check it for passwords, access keys or personal details. The course's own examples use placeholder passwords, but your real passwords must never appear in a message.

## Describe the problem

A good request for help has five parts. Write each one in a few words:

1. **What you did.** The exact command you typed, copied from its box.
2. **What you expected.** What the lesson said should happen.
3. **What actually happened.** The error message, copied exactly.
4. **Your system.** Windows, macOS or Linux, and its version if you know it.
5. **What you already tried.** Any fix you tried, and what it changed.

Put these parts in a short list. A reader can then see the problem without asking follow-up questions.

## Ask an AI assistant or a classmate

You can describe the problem to an AI assistant or to a classmate in the same way. Paste the command and the error message exactly, then add the five parts above. Ask a clear question, such as "What does this message mean, and what should I check first?" rather than "It does not work."

Read the answer before you run any new command it suggests. If a suggestion asks you to delete containers, volumes or images, check what they hold before you agree, because deleting a volume removes its data.

## What comes next

Go on to **Run Nginx**, where a container serves a web page you can open in your browser.

## What you learned

- An error message often has one key line, so find it before you ask for help.
- Copy the command and the message exactly, and use a screenshot only when copying is not possible.
- A good request names what you did, what you expected, what happened, your system and what you already tried.
- Read any suggested command before you run it, especially one that deletes data.
