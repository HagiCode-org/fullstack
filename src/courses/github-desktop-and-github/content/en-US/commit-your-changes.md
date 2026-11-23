---
minutes: 25
outcome: "You can review the changes to your files in GitHub Desktop, save them as a commit with a clear message, discard a change you do not want and send the commit to GitHub."
terms: [push, diff]
---

A [commit](../../../glossary/#github-desktop-and-github-commit) is a checkpoint: a record of your project at one moment, with a short message that says what changed. If an AI helper changes your files and something breaks, you can return to your last checkpoint. That makes it safe to try bold changes. The habit to build is simple: save a checkpoint before you ask the AI for something big, and save another whenever you are happy with the result. In this lesson you will make your first checkpoints from the practice [repository](../../../glossary/#github-desktop-and-github-repository) you cloned.

## What a commit records

Each commit stores the changes to the files you selected, the message you wrote and the time and author of the change. [Git](../../../glossary/#github-desktop-and-github-git) gives every commit a unique ID, called a SHA or hash. You do not need to remember the IDs, because [GitHub Desktop](../../../glossary/#github-desktop-and-github-github-desktop) shows the messages instead. The official explanation is in [About commits](https://docs.github.com/en/pull-requests/committing-changes-to-your-project/creating-and-editing-commits/about-commits).

GitHub Desktop notices every change as soon as you save a file, so you do not need to tell it anything. The changes wait in the **Changes** tab until you commit them.

## Edit a file and read the changes

1. Open the `practice-notes` folder in a text editor. Any editor works. Open `README.md` and add one sentence that says what the project is for.
2. Save the file, then switch to GitHub Desktop and open the **Changes** tab in the left sidebar.
3. Look at the list of changed files. The icons show what happened: a red icon means a removed file, a yellow icon means a modified file and a green icon means an added file.
4. Click the README file. The diff view shows the [diff](../../../glossary/#github-desktop-and-github-diff): the lines you added or removed. In the top-right corner of the diff view you can choose **Unified**, which shows the changes one after another, or **Split**, which shows the old text on the left and the new text on the right.

Ask your AI helper to add a new file, for example "Create a file called `ideas.md` with three project ideas." The new file appears in the same list with a green icon. Read every change before you keep it.

## Write a message and commit

1. Tick the files you want in this checkpoint. If the box at the top of the list is ticked, every changed file is included.
2. In the **Summary** field at the bottom of the list, type a short message that says what you did, such as "Describe the project in the README".
3. Optionally, type more detail in the **Description** field.
4. Click the button that reads **Commit to main**. The button names the branch the commit goes to. In this course that is always `main`.

Your first commit is now saved on your computer, and the History tab lists it.

## Discard a change you do not want

Sometimes the AI changes a file in a way you do not want, and you want to go back to the checkpoint without keeping the change. Discarding does that for changes that are not committed yet.

1. In the **Changes** list, select the file with the unwanted change.
2. Click **Discard Changes** and confirm in the window that appears.

The official guide says that discarded changes are saved in a dated file in the Trash, and you can recover them until the Trash is emptied. Discarding is still a step to take carefully, so read the file first.

## Push to GitHub

A commit exists only on your computer until you send it to GitHub. This step is called [pushing](../../../glossary/#github-desktop-and-github-push). In the repository bar at the top, click **Push origin**. When it finishes, reload the repository's page on GitHub in your browser. Your commit message appears in the list of commits.

You need write permission to push to a repository. Your own practice repository gives you that.

**Safety note:** check the list of changed files before every commit. If a file holds a password, a key or a personal detail, do not commit it. Remove the secret, then ask your AI helper how to keep that kind of file out of the project. The official guide on creating repositories explains that a `.gitignore` file is a set of ignore rules for files you do not want in the project, in [Creating a new repository](https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-new-repository).

## Check yourself

- Your History tab shows at least two commits, each with a clear message.
- You can read the diff of a file and say what was added and removed.
- You discarded one unwanted change on purpose and saw the file go back.
- The commits are visible on the GitHub website after you pushed.

## What comes next

Next, you will go back to an older checkpoint in three different ways and learn when each way is right. Continue with **Undo a change and restore old work**.
