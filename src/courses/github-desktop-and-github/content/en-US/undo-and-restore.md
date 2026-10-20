> **Draft:** this lesson is an outline and will be expanded.

Mistakes happen, especially when a helper changes many files at once. The whole point of checkpoints is that nothing is lost. In this lesson you will practise three ways of going back, from the smallest to the largest, so that you are not afraid to try things. At the end you will know which one to use in each situation.

## What you will do

1. **Throw away changes that are not committed.** Ask your AI helper to change a file, look at the result, and decide you do not want it. In GitHub Desktop, discard the change. The file returns to the last checkpoint. Be careful: discarded changes that were never committed cannot be brought back.
2. **Undo your last commit.** Make a small commit you regret, and use the app to undo it. The changes return to the list of changed files, so you can fix or discard them.
3. **Reverse an older commit.** Choose an older commit in the History view and use the option to revert it. This adds a new commit that cancels the old one, and the history stays honest. Check the project afterwards.
4. **Look at an old version.** Open an older commit in the History view and read what the files looked like then. Ask your AI helper: "Compare this old version with the current one and tell me what changed."
5. Write down when you would use each way: before a commit, right after a commit, or a long time after.

**Safety note:** if you are unsure, make a new branch first and try the undo there. A branch costs nothing and protects `main`.

## Check yourself

- You discarded uncommitted changes and saw the file go back.
- You undid or reverted a commit and checked the result.
- You can explain why committing often makes undoing easier.
