---
minutes: 15
outcome: "You check the finished site against your own checklist with a fixed input and expected output, and treat the assistant's self-review as a second opinion."
terms: [self-review, acceptance-check]
---

An assistant that says "done" has only told you what it believes. You are the one who decides whether the work is finished. In this lesson you check the site against the [done checklist](../../../glossary/#build-with-ai-done-checklist) you wrote before you started. Then you run an [acceptance check](../../../glossary/#build-with-ai-acceptance-check): a test you run yourself, with a fixed input and an expected output. By the end you will have a site you have verified with your own eyes.

Writing the checklist before the work started keeps you honest. You cannot move the target to fit what you got. Anthropic's Claude Code best-practices guide gives the same advice in its own words: give the assistant a check it can run, so the result can be verified rather than trusted. Source: [Claude Code best practices](https://code.claude.com/docs/en/best-practices).

## Good and bad checks

- **Good:** "The home page links to the about page and the contact page." You can click and see.
- **Good:** "Typing `hello` into the search box shows the word `hello` in the results." You know the input and the expected output.
- **Good:** "The page is readable in a narrow browser window." You can resize the window and see.
- **Bad:** "It looks professional." Nobody can tick this reliably.

## Why the self-review still needs you

When you ask the assistant to review its own work, you get a [self-review](../../../glossary/#build-with-ai-self-review). It can list what it changed and what the brief still asks for. It is useful, but it can miss its own mistakes, and it can also report problems that do not exist. Treat it as a second opinion that points you at places to look. It does not replace your check.

## What you will do

1. Open your brief and copy its "done" part into a checklist file named `checklist.md`.
2. Open the site in your browser and go through the checklist by hand, one line at a time. Tick a line only when you have seen it yourself.
3. For each line that involves a specific input, run the acceptance check. Type the input, note the output, and compare it with the expected output you wrote down.
4. Note every line that fails.
5. Ask the assistant to review its own work with this wording: `Read the brief and the site files. List anything in the brief that the site does not do yet, and anything you changed that I did not ask for.`
6. Compare its answer with your checklist. Where they disagree, trust what you saw, and look again.
7. Fix the failing lines one at a time, with one commit for each fix.

Steps 1 to 7 are the same on Windows and on Mac. Only the browser window you use may look slightly different.

## Check yourself

- Every line of your checklist is ticked, and you saw each one yourself.
- You read the assistant's self-review and acted on the points that held up under your own check.
- Your last commit was made after your final check, not before it.

## What comes next

Go on to **What you must still check yourself**, the few decisions you should never hand over completely.
