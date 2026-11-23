---
minutes: 20
outcome: "You have GitHub Desktop installed on Windows or macOS, signed in to your GitHub account, and you know where the main areas of the app are."
terms: [github-desktop, remote-repository]
---

[GitHub Desktop](../../../glossary/#github-desktop-and-github-github-desktop) is a free app from GitHub that lets you do the [Git](../../../glossary/#github-desktop-and-github-git) work in this course by clicking instead of typing commands. In this lesson you will install it, sign in with the account you made in the last lesson and set the name that goes on your checkpoints. At the end the app will be open, signed in and ready for the next lesson.

GitHub Desktop runs on Windows and macOS only. Linux is not supported yet. If you use Linux, you can still follow the GitHub website parts of this course and ask your AI helper how to do the same steps with the tools you have.

## Before you install

Check that your computer meets the official requirements. GitHub Desktop needs macOS 12.0 or later, or Windows 10 64-bit or later. On Windows, you must have a 64-bit operating system. You can check the full list in [Supported operating systems for GitHub Desktop](https://docs.github.com/en/desktop/overview/supported-operating-systems-for-github-desktop).

Download the app only from the official site, [desktop.github.com](https://desktop.github.com/). Do not use a download link from an advertisement or a third-party site.

## Install on Windows

1. Open the official download page and click **Download for Windows**.
2. Open your Downloads folder and double-click the setup file.
3. Wait for the installation to finish. GitHub Desktop opens by itself when it is done.

## Install on macOS

1. Open the official download page and click **Download for macOS**.
2. Open your Downloads folder and double-click the zip file to unzip it.
3. Double-click the GitHub Desktop application file that appears. GitHub Desktop opens when it is ready.

The official installation guide is [Installing GitHub Desktop](https://docs.github.com/en/desktop/installing-and-authenticating-to-github-desktop/installing-github-desktop).

## Sign in to GitHub

Signing in opens your browser, so the password is typed on GitHub's own page and never in the app. Username and password sign-in is not supported. Once you are signed in, the app can copy projects from your GitHub account and send your changes back to the [remote repository](../../../glossary/#github-desktop-and-github-remote-repository) where they are stored.

**On Windows:**

1. Click **File**, then click **Options**.
2. In the Options window, click **Accounts**, then click the **Sign Into** button for GitHub.com.
3. Click **Continue With Browser**. Your browser opens.
4. Sign in on GitHub. If you use two-factor authentication, enter the code from your TOTP app.
5. Return to GitHub Desktop and follow the prompts until your username appears.

**On macOS:**

1. In the menu bar, click **GitHub Desktop**, then click **Settings**.
2. In the Settings window, click **Accounts**, then click the **Sign Into** button for GitHub.com.
3. Click **Continue With Browser**. Your browser opens.
4. Sign in on GitHub and enter your two-factor code if asked.
5. Return to GitHub Desktop and follow the prompts until your username appears.

The official sign-in guide is [Authenticating to GitHub in GitHub Desktop](https://docs.github.com/en/desktop/installing-and-authenticating-to-github-desktop/authenticating-to-github-in-github-desktop).

## Set your commit name and email

Every checkpoint you save records a name and an email address. GitHub Desktop reads them from your Git configuration and lets you set them in the app.

- **On Windows:** click **File**, then **Options**, then **Git**.
- **On macOS:** click **GitHub Desktop**, then **Settings**, then **Git**.

Type the name you want to use. In the Email list, choose one of the addresses linked to your GitHub account. If the address does not match an account you are signed in to, GitHub Desktop warns you before you [commit](../../../glossary/#github-desktop-and-github-commit). The default branch for new repositories is `main`. More detail is in [Configuring Git for GitHub Desktop](https://docs.github.com/en/desktop/configuring-and-customizing-github-desktop/configuring-git-for-github-desktop).

## Find the three main areas

Look at the main window and find these three areas, which you will use in every lesson:

1. **The repository bar** at the top. It shows the **Current repository**, the **Current Branch** and the button that sends or fetches changes.
2. **The Changes tab** in the left sidebar. It lists the files that changed since your last checkpoint.
3. **The History tab** in the same sidebar. It lists the checkpoints that already exist.

You will not have a [repository](../../../glossary/#github-desktop-and-github-repository) yet, so the app may show a welcome screen. That is expected. The next lesson creates one.

**Safety note:** approve a sign-in only if you started it yourself a moment ago. If the browser asks you to sign in to something you did not open, close it and sign out of GitHub Desktop.

## Check yourself

- GitHub Desktop opens and shows your username.
- You can find the Changes tab and the History tab.
- You downloaded the app from desktop.github.com and not from another site.
- You know which menu opens the Git settings on your system.

## What comes next

Next, you will make a copy of a project on GitHub on your own computer. Continue with **Clone a repository**.
