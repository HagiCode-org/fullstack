---
minutes: 20
outcome: "You will check your site against the done list you wrote, remove private details, and save the finished version with a commit you can name."
terms: []
---

Before you call the site finished, check it against the "done" part of your brief, and then save the result. In this lesson you do a final check and make a final commit. By the end you will have a site that you have verified yourself and saved in your history. Putting the site on the internet is the next course.

## What you will do

1. Open `brief.md` and copy its "done" lines into a checklist.
2. Open the site and go through the checklist by hand. Tick a line only when you saw it yourself.
3. Check three more things that every site needs: every link goes where it should, every page has a heading, and no placeholder text such as "your name here" is left.
4. Check the site at a narrow width one more time.
5. Ask the assistant: `Read the brief and the site files. List anything the brief asks for that is missing, and anything you changed that I did not ask for.` Compare its answer with your own check.
6. Look through the files for anything private, such as a personal email address you do not want public, or a password. If you find one, remove it before you save.
7. Open GitHub Desktop and review the list of changed files. GitHub's documentation says that the checkbox at the top of the list includes all changes in the commit, and that unselecting a file leaves it out. Check that only the files you expect are ticked. Then make your final commit with a Summary such as `Finished first website`. [GitHub Docs, committing changes in GitHub Desktop](https://docs.github.com/en/desktop/making-changes-in-a-branch/committing-and-reviewing-changes-to-your-project-in-github-desktop)

## Why a checklist and not a feeling

After you have looked at a site for a while, every part can seem fine. A checklist makes you read each done line and check it on the screen, which catches what memory skips. Tick only what you saw with your own eyes. If a line is not ticked, write down what is missing in your notes, so the next change can fix it.

## About private information

Assume that anyone on the internet could read a public site. Only include details you are happy to share with strangers. If you find a private detail in a file, remove it before you commit. If a private detail was already saved in an earlier commit, do not assume that deleting it in a later commit is enough. Ask the assistant how to handle it. GitHub's documentation explains that each commit has an identifier, a SHA, which identifies the specific changes, when they were made and who made them. That identifier is why an earlier commit can still be found. [GitHub Docs](https://docs.github.com/en/desktop/making-changes-in-a-branch/committing-and-reviewing-changes-to-your-project-in-github-desktop)

## Check yourself

- Every line of your checklist is ticked, and you saw each one yourself.
- The site contains no private information and no placeholder text.
- Your final commit appears in GitHub Desktop, and you can name the last commit where the site was complete.

## What comes next

Go on to **Challenge: build a different site**, where you do the whole process again on your own.
