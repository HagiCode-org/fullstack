---
minutes: 15
outcome: "You know the four kinds of decision you must make yourself, and you set how much your assistant may do without asking you."
terms: [permission-mode, secret]
---

An assistant can read files, run commands and change your project. That speed is the reason to keep control. Some decisions should never be handed over completely, however good the assistant seems. This lesson names four kinds of decision you must make yourself, and shows you where to set how much the assistant may do without asking.

The first control is the assistant's [permission mode](../../../glossary/#build-with-ai-permission-mode). Anthropic's security documentation for Claude Code says that a session's permission mode sets which actions Claude can take without asking you first. Read the mode your assistant uses before you let it run commands on your files. Source: [Claude Code security](https://code.claude.com/docs/en/security).

## Secrets and passwords

A [secret](../../../glossary/#build-with-ai-secret) is any value that lets someone act as you or spend your money. Passwords, [API keys](../../../glossary/#build-with-ai-api-key) and tokens are all secrets. Never paste a secret into a brief, a chat message or a file in your project. If you need one for a later lesson, store it outside the project folder, and check that the assistant does not read that file. A secret that reaches a shared place must be treated as leaked, so revoke it at the provider and create a new one.

## Commands that delete data

Some commands remove files and cannot be undone by a commit. Before you approve a command, ask the assistant what it does, which folder it touches and whether it can be reversed. Refuse any command you cannot explain in one sentence.

## Anything that costs money

Usage-based services bill you for every request. Before you approve an action that calls a paid service, check the billing page for that service, set a spending limit if one is offered, and confirm the amount you are willing to spend. A "try it" step can cost more than you expect.

## Things you did not ask for

The assistant may add features, rename files or restyle pages that you did not request. Each one is a decision you did not make. Compare every change with your brief, and undo anything the brief does not mention, in its own commit so it is easy to reverse.

## What you will do

1. Write a short checklist with four headings: Secrets and passwords, Commands that delete data, Anything that costs money, and Things you did not ask for.
2. Under each heading, write one rule you will follow for this project.
3. Open your project folder and check for any file that contains a secret. If you find one, move it out of the folder and make sure it is not committed.
4. Choose the permission setting your assistant offers, and write down which one you picked.
5. Next time the assistant asks to run a command, read it in full and ask what it does before you approve it.

Steps 1 to 5 are the same on Windows and on Mac. The place where you keep your checklist is up to you, as long as it is outside the project folder.

## Check yourself

- Your checklist has all four headings, and each one has a rule you wrote yourself.
- You know which files in your project, if any, contain a secret, and you have moved any such file out.
- You asked what a deleting or paid action does before you approved it, at least once.

## Where to learn next

You have finished the method course. Go on to the course **Your First Website**, and start with its first lesson, **See the finished site**, where you can see a complete result before you build your own.
