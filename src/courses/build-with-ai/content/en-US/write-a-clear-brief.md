---
minutes: 15
outcome: "You write a brief with five specific parts, answer the assistant's questions, and leave it ready to paste before the build starts."
terms: [brief, done-checklist]
---

A [brief](../../../glossary/#build-with-ai-brief) is a short written request that tells the assistant what to build. The clearer the brief, the less you will need to correct later. In this lesson you write one for a small site of two or three pages. By the end you will have a brief you can paste into your assistant, and a template you can reuse for every later project.

An assistant cannot read your mind. If you write "make me a nice website", it will guess, and its guess will probably not match the picture in your head. Spending five minutes on five short answers saves far more time later. Anthropic's official best-practices guide for Claude Code makes a similar point: tell the assistant what it cannot see, and give it a check it can run. Source: [Claude Code best practices](https://code.claude.com/docs/en/best-practices).

## Why a brief matters

Without a brief, every correction becomes a new guess. With a brief, the assistant has a target, and you have something to check the result against. Write the brief before you open the assistant, not while you wait for it to answer.

## The five parts of a brief

1. **Goal.** What is this site for? Write one sentence.
2. **Who uses it.** Who will open it, and what do they want from it?
3. **What it does.** List the pages and the main things on each page.
4. **What it must not do.** Name the things you do not want, such as pop-ups, background music or collecting personal data.
5. **How you will know it is done.** Write three or four things you can check by looking. This part becomes your [done checklist](../../../glossary/#build-with-ai-done-checklist).

A good "done" line can be checked by looking or clicking. "The contact page has a form that shows a thank-you message after sending" is good. "It looks professional" is not, because nobody can tick it reliably.

## A fill-in template

Copy this into a new file and fill in each line. Keep each answer short and specific.

```
Goal: <one sentence>
Who uses it: <who, and what they want>
It has these pages: <page name and what is on each one>
It must not: <things to avoid>
It is done when: <three or four checks I can do by looking>
```

## What you will do

1. Choose a small site you would like to have, such as a page about a hobby, with a home page, an about page and a contact page.
2. Create a new plain-text file in your `my-first-site` folder and name it `brief.md`.
   - **Windows:** create the file with Notepad, then save it into the folder.
   - **Mac:** create the file with TextEdit in plain-text mode, then save it into the folder.
3. Copy the template into the file and fill in every line.
4. Read the brief out loud. If a sentence could mean two things, rewrite it until it cannot.
5. Before you send the brief to the assistant, ask it: `Before you start, list any questions you have about this brief.`
6. Answer each question, and add the answers to the brief itself, not only to the chat.
7. Paste the finished brief into the assistant. Do not send it while any line is still a guess.

## Check yourself

- Your brief has all five parts, and each part is specific enough to check.
- The "done" part lists things you can see or click, not feelings such as "looks good".
- The assistant asked its questions, and your answers are written into the brief file.

## What comes next

Go on to **Get the first version running**, where the assistant builds the site from your brief.
