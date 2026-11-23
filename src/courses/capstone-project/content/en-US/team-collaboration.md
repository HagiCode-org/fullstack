---
minutes: 30
outcome: "You will agree who does what in a small team, review a teammate's pull request and know how to resolve a merge conflict on GitHub."
terms: [review, merge-conflict, branch-protection]
---

Some projects are built by several people. This elective lesson covers splitting the work, sharing the code on GitHub, giving each other a [review](../../../glossary/#capstone-project-review) and handling a [merge conflict](../../../glossary/#capstone-project-merge-conflict), which happens when two people change the same part of a file. If you worked alone, skip this lesson.

## Split the work and agree the rules

Before anyone writes code, write a short team agreement in the project's README or in a file named `TEAM.md`. Include three things: who owns each part of the app, the branch name pattern you will all use, and what "done" means, which is the done-checklist from the spec. Each team member also needs access to the repository. On GitHub, the people with access are listed on the repository's collaborators and teams page. [GitHub's guide](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/managing-repository-settings/managing-teams-and-people-with-access-to-your-repository) says that from this page you can invite new people, change each person's role for the repository, or remove access.

## Share the code through branches

Each person works on a separate branch, one for each set of unrelated changes, as you learned in Work on a branch. [GitHub's guide to requesting reviews](https://docs.github.com/en/pull-requests/how-tos/create-pull-requests/requesting-a-pull-request-review) says that to request a review you need write access to the repository, and that the person you ask receives a notification.

Ask the team to protect the main branch with a [branch protection](../../../glossary/#capstone-project-branch-protection) rule. [GitHub's guide to protected branches](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/about-protected-branches) explains that a branch protection rule defines whether collaborators can delete or force push to a branch, and what must happen before a push is accepted. One option it lists is to require pull request reviews before merging. Turn that option on, so that no change reaches the main version without a second person reading it.

## Review a teammate's change

Open the pull request and read the files changed. [GitHub's guide to giving reviews](https://docs.github.com/en/pull-requests/concepts/giving-reviews) describes three choices. A comment leaves general feedback without approving or requesting changes. Approve signals that the changes are ready to merge. Request changes flags feedback that the author should address before the pull request merges.

Be specific. A comment such as "The empty-name case shows a blank page. Can you show the plain message from the spec here?" helps more than "This looks wrong." Ask a question when you do not understand something, and do not approve a change you have not run yourself.

## Handle a merge conflict

A conflict appears when two branches change the same lines. [GitHub's guide to merge conflicts](https://docs.github.com/en/pull-requests/reference/merge-conflicts) says Git cannot safely choose which version to keep, so you must resolve every conflict before a pull request can be merged on GitHub. It also says simple line conflicts can often be resolved on GitHub, while more complex conflicts must be resolved in a local clone and pushed back to the pull request branch.

Follow these steps. First, do not panic: a conflict is a question about which words to keep, not a sign that the project is broken. Second, read both versions, and ask the teammate who wrote the other one what they were trying to do. Third, agree the final version together, and write it into the file. Fourth, run the app again and check the done-checklist before you merge. To avoid conflicts next time, keep pull requests small and merge them often.

## Check yourself

- Your team has written down who owns which part of the app.
- You reviewed a teammate's pull request and left at least one comment.
- You can list the steps to resolve a merge conflict, and you know which conflicts GitHub can resolve in the browser.
- The main branch requires a review before merging.

## What comes next

The next lesson is **Look back**. There you read the history of your project and turn what you learned into a checklist you can reuse on the next project.
