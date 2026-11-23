---
minutes: 20
outcome: "You get a first version of your site running on your own computer and write down what is wrong or missing, without fixing anything yet."
terms: [local-preview, checkpoint]
---

In this lesson you let the assistant build the first version of your site from your brief. The first version will not be perfect, and that is normal. Your job is to get it running, look at it honestly, and write down the gaps. You will fix them in later lessons, one at a time.

Start by asking for the whole first version at once. Paste your brief, then ask the assistant to build the files it needs. Keep the request to what the brief says, and do not add extra features while it works.

## What you will do

1. Ask the assistant to build the site from your brief and to list every file it creates or changes.
2. Open the folder yourself and check that each file on the list exists. Note any file that is missing.
3. Open the site in your browser. A [local preview](../../../glossary/#build-with-ai-local-preview) shows the site from files on your own computer, so nobody else can see it yet.
   - **Windows:** open `index.html` from your `my-first-site` folder by double-clicking it.
   - **Mac:** open `index.html` from your `my-first-site` folder by double-clicking it.
4. Click through every page. Check that each link from the home page reaches the page it names.
5. Write a list called `gaps.md`, with one line for each thing that is wrong or missing, measured against your brief's done checklist.

A useful line in the gap list says what you saw and where you saw it, for example: "The about page has no link back to the home page." A weak line such as "it looks ugly" is true but cannot be acted on, so rewrite it until someone else could find the problem and check the fix.

If the assistant offers to start a local server or to run the site for you, read what it proposes first. Only accept commands you understand.

## Why you do not fix anything yet

It is tempting to ask for fixes straight away. Resist that for now. Fixing a list of problems in one go makes it hard to tell which change helped and which broke something else. In the next lesson you will change one thing at a time, and each change will get its own save point.

Your assistant may keep its own record of the edits it made. Claude Code, for example, keeps [checkpoints](../../../glossary/#build-with-ai-checkpoint) of its file edits and offers a rewind option. Those checkpoints are useful, but Anthropic's documentation says they are not a replacement for version control, so you will also save your work yourself. Source: [Claude Code checkpointing](https://code.claude.com/docs/en/checkpointing).

## Check yourself

- The site opens in your browser, and every page can be reached from the home page.
- Your `gaps.md` list names each problem in plain words, with no fixes written in.
- You know which checks from your brief already pass, and you wrote them down.

## What comes next

Go on to **Change one thing at a time**, where you make small, separate changes and save each one before the next.
