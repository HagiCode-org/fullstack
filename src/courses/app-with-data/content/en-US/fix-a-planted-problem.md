---
minutes: 30
outcome: "You will describe a failure in clear terms, gather its evidence from the logs, and check that a fix works without breaking the rest of the app."
terms: [log]
---

Real apps break. In this lesson a problem is planted on purpose in a copy of the app, so that you can practise the habit that matters most when you work with an AI: describe what you see, hand over the evidence, and judge whether the fix is right. The problem is designed to look ordinary, so that you cannot solve it by guessing.

The course page links to a copy of the app with one hidden problem. You do not need to know where the problem is, and you should not search the code for it before you have collected the evidence.

## Evidence you will collect

A program writes a [log](../../../glossary/#app-with-data-log): a running list of messages about what it is doing, including the errors. Logs are the most honest witness you have, because they record what happened and not what someone remembers. In this lesson you use two kinds of evidence. The first is the exact text of any error shown on the page. The second is the recent lines of the log of your containers.

[Docker's Compose reference](https://docs.docker.com/reference/cli/docker/compose/logs/) says that `docker compose logs` displays the log output from the services. With `-f`, it keeps following the output as new lines arrive. You will run it in the project folder, the same way you started the app.

## What you will do

1. Get the practice copy from the link on the course page, and start it the same way you started your own app, with the commands from the previous lesson.
2. Use the app until something looks wrong. Typical signs are an entry that does not appear, a button that does nothing, or a message saying that something failed.
3. Write down exactly what you did, what you expected and what happened instead. Use the same words you would use to describe a bug to a colleague.
4. Collect the evidence. Copy the full text of any error on the page, without changing it. Then run `docker compose logs` in the project folder, and copy the recent lines that match the moment the problem appeared.
5. Give the AI your notes and the evidence. Ask it to find the cause before it changes anything, and to say which line of the evidence supports its explanation. Read the explanation carefully.
6. Let the AI make the fix. Restart the app with `docker compose down` and `docker compose up --detach`, then repeat exactly the steps that failed.
7. Check that the rest of the app still works, and ask the AI whether its fix could affect anything else. A fix that solves one symptom and breaks another is not a fix.
8. If the problem is still there after three attempts, go back to the starting point of the practice copy and describe the problem in different words.

This lesson uses the same commands on Windows and on a Mac. The only difference is the folder path that you open in the terminal.

## Why the exact text matters

When you copy an error, do not tidy it up. A paraphrase such as "it said the database was broken" loses the detail that points to the cause. The exact words, including file names and numbers, let the AI and you search the right place. If the message is long, copy the whole block, and mark the line that looks most important.

## Judge the fix, not only the AI

The AI can say that a fix is correct, and still be wrong. So check the result yourself, with the same steps that failed before. Then check an unrelated part of the app. If the fix changed one line but the whole page now behaves differently, ask the AI to explain why before you accept the change.

## Check yourself

- The step that failed now works.
- The rest of the app still works after the fix.
- You can say in one sentence what the cause was.
- You gave the AI the exact error text and not a paraphrase.

## What comes next

Go on to **Protect and back up your data**, where you keep secrets out of GitHub, make a backup of your database and learn which commands can delete your data.
