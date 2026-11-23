---
minutes: 30
outcome: "You will build the first version one checklist item at a time, with each change on its own branch and reviewed in a pull request before it joins the main version."
terms: [branch, pull-request]
---

Now you build. The rule is simple: every change is small, lives on its own [branch](../../../glossary/#capstone-project-branch) and is reviewed in a [pull request](../../../glossary/#capstone-project-pull-request) before it joins the main version. A branch is a separate line of work, so the main version of your project stays safe while you try something new. A pull request is a request to bring the changes from a branch into the main version, after someone has looked at them. You finish with the first working version of your app.

## Why one step at a time

[GitHub's guide to its branch-based workflow](https://docs.github.com/en/get-started/using-github/github-flow) says that a branch gives you a space to work without affecting the default branch, and that you should make a separate branch for each set of unrelated changes. Small changes are easier to review and easier to undo. If one step goes wrong, you lose one small change, not the whole app.

## What you will do

1. Choose the first item from your done-checklist. Pick the one that the other items depend on. If one item needs another item to work, build the other item first.
2. Create a branch for it. Give the branch a short, descriptive name such as `add-note-form`. GitHub's guide says a short, descriptive name lets collaborators see the ongoing work at a glance. You create and switch branches the way you learned in Work on a branch.
3. Ask your assistant to build exactly one thing. Paste the part of the spec that describes it, then say: "Do only this. Do not change anything else."
4. Run the app and try the item exactly as the checklist describes it. If you see an error, copy the exact message and paste it to the assistant. The lesson Read an error and ask for help in Docker for Beginners shows you how to copy an error completely.
5. If three tries do not fix a problem, stop. Go back to your last checkpoint using the steps from Undo a change and restore old work, then say the goal again in different words.
6. When the item works, commit the change with a short message, publish the branch and open a pull request. The lesson Open a pull request and read the changes shows how to do this.
7. Read the pull request before you accept it. Look at the list of changed files, and ask the assistant to explain any change you do not understand. Look for files you did not expect, and for anything that looks like a secret. GitHub's guide says reviewers examine each changed file, leave comments and then approve the pull request or request changes.
8. Merge the pull request, tick the item on your checklist and repeat with the next item.

## Keep the main version running

Your main version should run at the end of every step, even if it does not yet do everything. If a change breaks it, you find out in one pull request, not after you have built five more things on top. A simple rule helps: if a step is not finished, leave it on its branch and do not merge it.

## Check yourself

- Each checklist item was built on its own branch and merged through a pull request.
- You read the changes in every pull request before you accepted it.
- Every ticked item passes when you try it yourself, not only when the assistant says it does.
- Your main version still runs, even if it does not do everything yet.

## What comes next

The next lesson is **Check before you ship**. There you check the finished app for secrets, data loss and surprise costs before anyone else uses it.
