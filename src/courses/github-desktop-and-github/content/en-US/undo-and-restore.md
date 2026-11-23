---
minutes: 25
outcome: "You can choose the right way to go back to an earlier state, whether the change is uncommitted, committed but not pushed, or already on GitHub."
terms: [revert, reset]
---

Mistakes happen, especially when a helper changes many files at once. The point of saving checkpoints is that you can go back. In this lesson you will learn four ways of going back, from the smallest to the largest, so that you are not afraid to try things. Each way depends on one question: has the change been committed, and has the [commit](../../../glossary/#github-desktop-and-github-commit) been pushed to GitHub? Once you can answer that question, you know which way to use.

## Choose the right way back

1. **Discard** a change that is not committed yet. The file returns to your last checkpoint.
2. **Undo** your last commit, as long as it has not been pushed. Its changes return to the Changes list, so you can fix them.
3. **Reset to a commit**, which takes the project back to an older commit that has not been pushed. The changes from the newer commits return to your working files.
4. **Revert** a commit that is already on GitHub. [Revert](../../../glossary/#github-desktop-and-github-revert) adds a new commit that cancels the old one, so the history stays honest.

The second and third ways move the branch back, so the commits after that point disappear from your local history. The fourth way never removes anything from the history. That is why it is the safe choice for work that others may already have copied.

## Discard uncommitted changes

Use this when you have changed a file and decided you do not want the change. In the **Changes** tab, select the file, click **Discard Changes**, and confirm. Remember what the official guide says: discarded changes are kept in a dated file in the Trash until the Trash is emptied. Treat a discard as final for your working copy. The Trash is a way to recover by accident, not a plan.

## Undo your last commit

Use this when you just made a commit and want its changes back in the list of changed files, so you can fix them before committing again.

1. In the left sidebar, make sure the **Changes** tab is open.
2. At the bottom of the sidebar, click **Undo**.

The changes from that commit return to your working files, and the branch moves back to the previous commit. You can undo only commits that have not been pushed. The full guide is [Undoing a commit in GitHub Desktop](https://docs.github.com/en/desktop/managing-commits/undoing-a-commit-in-github-desktop).

## Reset to an older commit

Use this when a mistake is several commits back and has not been pushed yet.

1. In the left sidebar, click **History**.
2. Right-click the commit you want to go back to, and click **Reset to commit**.

The changes from the commits after it come back to your working files, so you can keep some of them, change them or discard them. You can [reset](../../../glossary/#github-desktop-and-github-reset) only up to the most recent commit that was pushed. For the official details, see [Resetting to a commit in GitHub Desktop](https://docs.github.com/en/desktop/managing-commits/resetting-to-a-commit-in-github-desktop).

## Revert a commit that is on GitHub

Use this when a commit has already been pushed. Other people may have copied it, so you should not rewrite the history under them.

1. In the left sidebar, click **History**.
2. Right-click the commit you want to cancel, and click **Revert Changes in Commit**.
3. Click **Push origin** so GitHub gets the new commit.

The revert is a new commit. The original commit remains in the history. If you revert several commits, go from the newest to the oldest, because reverting them in another order can cause conflicts. The official guide is [Reverting a commit in GitHub Desktop](https://docs.github.com/en/desktop/managing-commits/reverting-a-commit-in-github-desktop).

**Safety note:** if you are unsure which way to use, create a new branch first and try the undo there. Branches come in the GitHub collaboration course. For now, the simplest protection is to commit often, so that every good state has a checkpoint.

## Check yourself

- You can name the difference between discarding a change and undoing a commit.
- You can say why reset works only before a [push](../../../glossary/#github-desktop-and-github-push), and why revert is safe after one.
- You have discarded an uncommitted change or undone a commit, and checked the result.
- You can explain why saving checkpoints often makes going back easier.

## Where to learn next

The next course is **Build with an AI Partner**. Its first lesson is **Choose an AI coding assistant**, where you will pick the helper you will work with and learn how to check its work.
