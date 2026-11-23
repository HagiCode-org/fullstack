---
minutes: 25
outcome: "You will have a written spec for your project, with a done-checklist that tells you when the first version is finished."
terms: [spec, done-checklist]
---

A [spec](../../../glossary/#capstone-project-spec) is a written description of what your app must do. It is the brief you wrote in Write the app brief, with one addition: a [done-checklist](../../../glossary/#capstone-project-done-checklist), which is a list of statements that are either true or false when you test the app. You finish this lesson with a spec your AI assistant can build from and a checklist that tells you when you are done.

## Why write the spec first

The assistant only knows what you tell it. If the spec is clear, the first version is more likely to match what you wanted, and you will know when it does. If the spec is vague, the assistant fills the gaps with its own guesses, and you may not notice until you test the app. A written spec also gives you something to check each change against.

## What you will do

1. Create a file named `spec.md` in the root folder of your project. Put your one-sentence goal from Choose your project on its first line.
2. Write **Who and why**: the person who uses the app and the problem it solves, in two or three sentences.
3. Write **What it does**: a short list of things a person can do in the app. Start each line with "A person can", for example "A person can add a note with a title and a body." Keep the list to the smallest useful set, usually three to six lines.
4. Write **What it does not do** in the first version. Copy the list of things you will not build from the previous lesson.
5. Write **What it must never do**. Think about private data, deleting things by accident and spending money. For example: "never delete a note without asking first" and "never show one person's data to another person."
6. Write the **done-checklist**. Turn each line of "What it does" into a test in the form "I do this and I see that". Add one more line for the plain message the app shows when something goes wrong, such as when a form is left empty.
7. Ask your assistant: "Read my spec. Point out anything unclear, anything missing and anything that conflicts." Fix the points that are fair. Do not accept extra features you did not ask for.
8. Save the spec as a checkpoint. In GitHub Desktop, write a commit message such as "Add the first spec" and commit the change, as you learned in Save a checkpoint (commit). GitHub's guide says that in GitHub Desktop you write the commit message in the Summary field, with an optional Description, and then click Commit to the branch.

## Keep the spec short

A useful spec fits on about two screens. If yours is longer, you are probably describing the finished product rather than the first version. Move the extra ideas into the "does not do" list, and keep the spec for the version you can finish.

## Test every line before you trust it

Read each line of the done-checklist and ask: could a friend test this in five minutes and say yes or no? If not, rewrite the line. "The app looks nice" cannot be tested. "I can see my three most recent notes on the first screen" can.

## Check yourself

- The spec has who and why, what it does, what it does not do and what it must never do.
- Every line of "What it does" has a matching line in the done-checklist.
- You asked your assistant to review the spec, and you fixed the points that were fair.
- The spec file is saved in your project and committed with a message.

## What comes next

The next lesson is **Build in small steps**. There you take the first item of your done-checklist and build it on its own branch, then check it before you move on to the next item.
