---
minutes: 15
outcome: "You can explain what Git and GitHub do, and you have a GitHub account with two-factor sign-in turned on."
terms: [git, repository, commit]
---

When you work with an AI helper, it changes your files quickly, and sometimes it changes them in a way you did not want. You need a way to try a change safely and go back when it goes wrong. [Git](../../../glossary/#github-desktop-and-github-git) is a program that keeps the history of a folder of files, so you can return to an earlier state at any time. GitHub is a website that stores a copy of that history online, so you can share it, work with other people and keep a backup. In this lesson you will learn the words this course uses and create a GitHub account that asks for a second proof of identity when you sign in.

## What Git and GitHub do

Git tracks the changes you save in a folder. The folder together with its history is called a [repository](../../../glossary/#github-desktop-and-github-repository). Git lets you work on your own copy of a project, keep a record of what changed and combine your work with other people's work safely. The official overview describes Git as a version control system, a tool that tracks changes to files over time. You can read it in [About Git](https://docs.github.com/en/get-started/using-git/about-git).

GitHub does not replace Git. It hosts Git repositories in the cloud and adds tools for planning and working together, such as issues and pull requests. The official introduction explains this in [About GitHub and Git](https://docs.github.com/en/get-started/start-your-journey/about-github-and-git).

## Words you will meet

**Repository.** A project and the complete record of how each of its files has changed. You can think of it as the project folder with its memory attached.

**Commit.** A saved checkpoint in the history. A [commit](../../../glossary/#github-desktop-and-github-commit) records the changes to one or more files, together with a message that says what changed. Git gives each commit a unique ID, called a SHA or hash, and records when it was made and who made it. The official page is [About commits](https://docs.github.com/en/pull-requests/committing-changes-to-your-project/creating-and-editing-commits/about-commits).

**Branch.** A separate line of work inside a repository. A branch lets you experiment without changing the main version of the project. You will use branches in the GitHub collaboration course, which comes later.

**Pull request.** A proposal to merge the changes on one branch into another, so that people can discuss and review them first. You will open one in that later course.

## Create your GitHub account

1. Open the official [account creation guide](https://docs.github.com/en/get-started/start-your-journey/creating-an-account-on-github) and follow its sign-up steps. A personal account needs a verified email address.
2. Choose a username you would be happy to show a future employer. It becomes part of the public address of your profile and of anything you publish.
3. Verify your email address when GitHub asks you to. If sign-up fails, the same guide lists steps to try, such as using a different browser.

## Turn on two-factor authentication

Two-factor authentication, usually called 2FA, asks for a second code when you sign in, so a stolen password is not enough. GitHub recommends a time-based one-time password (TOTP) app on your phone or computer, and it recommends security keys as a backup instead of text messages.

1. Install a TOTP app of your choice on your phone or computer.
2. In the upper-right corner of any GitHub page, click your profile picture, then click **Settings**.
3. In the sidebar, under the Access section, click **Password and authentication**.
4. In the Two-factor authentication section, click **Enable two-factor authentication**, then scan the QR code with your TOTP app.
5. Type the six-digit code that the app shows into the field under "Verify the code from the app".
6. Download your recovery codes and store them somewhere safe, such as a password manager. They are the way back into your account if you lose access to your phone.
7. Click the button to confirm that you have saved the recovery codes.

These steps are the same on Windows and on macOS, because they happen in the browser. The full official steps are in [Configuring two-factor authentication](https://docs.github.com/en/authentication/securing-your-account-with-two-factor-authentication-2fa/configuring-two-factor-authentication).

**Safety note:** never type your password or a recovery code into an AI helper, a chat window or a page you did not reach yourself from GitHub.

## Check yourself

- You can explain the difference between Git and GitHub in one sentence each.
- You have a GitHub account with a verified email address and two-factor authentication turned on.
- You can say what a commit, a branch and a pull request are.
- You stored your recovery codes somewhere safe.

## What comes next

Next, you will install [GitHub Desktop](../../../glossary/#github-desktop-and-github-github-desktop), the app that lets you do this course's Git work with buttons instead of typed commands. Continue with **Install GitHub Desktop and sign in**.
