---
minutes: 30
outcome: "You can write a clear issue, fork a public project, propose a small change to it and read its license before you contribute."
terms: [issue, fork, open-source]
---

GitHub hosts millions of public projects that anyone can read, and many of them welcome help. Software whose source code is shared so that others may read, use and change it is called [open source](../../../glossary/#github-collaboration-open-source). In this lesson you will learn the three things people do to take part: write an [issue](../../../glossary/#github-collaboration-issue) that describes a problem, copy a project with a [fork](../../../glossary/#github-collaboration-fork) and propose a change back to the original. At the end you will know how to ask for a fix in someone else's project and how to check what you are allowed to do with it.

This is an elective lesson. You can skip it and still finish the course.

## What an issue is

GitHub's official guide says that issues keep track of bugs, enhancements and other requests. An issue is a written note with a title and a description, and people can discuss it under the note. Anyone with read access to a repository where issues are turned on can create one. You can read more in [Creating an issue](https://docs.github.com/en/issues/tracking-your-work-with-issues/using-issues/creating-an-issue).

Before you write one, read two or three issues on a public project. Notice how the good ones say what happened, what was expected and how to repeat the problem.

## Write a useful issue

Try this in your own `practice-notes` repository, so nothing outside your account is affected.

1. On the GitHub website, open the repository and click the **Issues** tab. If you cannot see the tab, the repository owner has turned issues off.
2. Click **New issue**, then click **Open a blank issue** if no template fits.
3. Type a title, such as "The README has no setup steps", and describe what you would expect to find there.
4. Click **Submit new issue**.

In GitHub Desktop, you can start the same form from the menu: click **Repository**, then **Create Issue on GitHub**. The official reference is [Creating an issue or pull request from GitHub Desktop](https://docs.github.com/en/desktop/working-with-your-remote-repository-on-github-or-github-enterprise/creating-an-issue-or-pull-request-from-github-desktop).

Ask your AI helper to improve the issue, then check that every sentence is accurate and polite.

## Fork a project

A fork is a copy of another repository that you own. It has its own settings, issues and pull requests, but it stays connected to the original, which GitHub calls the upstream repository. You can change a fork freely without changing the original. The official overview is [About forks](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks/about-forks).

1. Choose a small public project that welcomes changes. Read its README first.
2. On the project's GitHub page, click **Fork** in the upper-right corner.
3. Under Owner, choose your account. The fork keeps the same name unless you change it.
4. Select **Copy the DEFAULT branch only** for a normal contribution, then click **Create fork**.

The full steps are in [Fork a repository](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks/fork-a-repo).

## Propose a change back

Make the change in your fork, not in the original. In GitHub Desktop, clone your fork, create a [branch](../../../glossary/#github-collaboration-branch), make a small change such as fixing a typo, [commit](../../../glossary/#github-collaboration-commit) it and publish the branch, the same way you did in the last lesson.

Then open a [pull request](../../../glossary/#github-collaboration-pull-request) from your fork's branch to the original project. The original owners decide whether to accept it. GitHub's guide to creating a pull request from a fork explains that this is how people propose changes without write access. You can read it in [Creating a pull request](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request).

GitHub Desktop also helps here. If you try to [push](../../../glossary/#github-collaboration-push) a change to a repository you cannot write to, it prompts you to create a fork. See [Cloning and forking repositories from GitHub Desktop](https://docs.github.com/en/desktop/adding-and-cloning-repositories/cloning-and-forking-repositories-from-github-desktop).

## Read the license

A public repository can be viewed and forked by other users of GitHub.com. That does not mean you may use the code however you like. Without a license, the default copyright laws apply, and nobody may reproduce, distribute or create derivative works from the code without permission. A license tells people what they may do.

Open the project's main folder on GitHub and look for a file named `LICENSE`, `LICENSE.md` or `LICENSE.txt`. Ask your AI helper to explain it in plain words, then write down two things the license lets you do and one thing it asks you to keep. The official guide is [Licensing a repository](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/licensing-a-repository).

**Safety note:** be kind and patient. Maintainers of open-source projects are often volunteers. Issues on public projects are visible to everyone, so never post a password, a key or personal information in one.

## Check yourself

- You wrote one clear issue in your own practice repository.
- You have a fork of a project and a branch with a small change in it.
- You can say what the license of one project lets you do, and what it asks you to keep.

## Where to learn next

The main line continues with the capstone project. Its first lesson is **Choose your project**, where you pick the app you will build and share, using the branch and pull request habits you learned here.
