---
minutes: 20
outcome: "You make one change at a time, check it, and save each working state as a commit you can find again."
terms: [commit, diff]
---

Once the first version runs, the next step is to improve it. The safest way is small steps: ask for one change, check it, and save it before you ask for the next one. This lesson shows you that loop and explains why the phrase "change nothing else" matters. Each change gets its own [commit](../../../glossary/#build-with-ai-commit), which is a labelled save point you can return to.

Small steps make problems easy to find. If the site breaks after one change, you know which change caused it. If it breaks after five changes made together, you have to guess.

## The loop

Every improvement follows the same four stages:

1. **Ask.** Give one request, with the page or file it concerns and the result you expect.
2. **Check.** Look at the change yourself, in the browser and in the files. Read the [diff](../../../glossary/#build-with-ai-diff), which shows the lines that were added and removed.
3. **Save.** If the change does what you asked and nothing else, save it as a commit with a short description.
4. **Repeat.** Start the next request from the saved state, not from a half-finished one.

GitHub Desktop is an app that shows your changes and records commits. Its official guide says that a commit must include a commit message that briefly describes the changes, and that the app shows which lines were added and removed before you commit. Source: [Committing and reviewing changes in GitHub Desktop](https://docs.github.com/en/desktop/making-changes-in-a-branch/committing-and-reviewing-changes-to-your-project-in-github-desktop).

## What you will do

1. Pick one improvement from your `gaps.md` list, such as a missing link or a heading that is too small.
2. Ask the assistant to make that one change, and to change nothing else. Use this wording: `Change only the heading on the about page. Do not edit any other file.`
3. Open the changed file and the site. Check the change by eye.
4. Open GitHub Desktop, select your `my-first-site` folder, and read the list of changed files. If a file you did not expect is listed, stop and ask the assistant why.
5. Write a commit message such as `Make the about heading larger`, then commit.
6. Repeat for at least two more changes, each with its own request and its own commit.

Steps 1 to 6 are the same on Windows and on Mac. When GitHub Desktop asks you to choose a folder, use the folder picker of your own system to find `my-first-site`.

## Why "change nothing else" matters

Assistants often tidy things you did not ask about: they reformat a file, rename a heading or change a colour. Each unrequested change makes the next check harder, and it may hide a real bug. Saying "change nothing else" is a small, specific rule. Checking the diff before each commit is how you enforce it.

## Check yourself

- You made at least three changes, and each one has its own request and its own commit.
- GitHub Desktop shows a history of save points, each with a clear description.
- You can name the last save point where the site still worked.

## What comes next

Go on to **When something breaks**, where you learn what to do when a change goes wrong.
