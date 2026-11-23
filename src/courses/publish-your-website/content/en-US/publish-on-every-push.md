---
minutes: 25
outcome: "You will set up a GitHub Actions workflow that builds your site and publishes it on every push to the main branch, and you will read a run to find out why it failed."
terms: [push, workflow, run]
---

In the last lesson you turned publishing on once. In this lesson you make it automatic for a site that needs a build step. A [push](../../../glossary/#publish-your-website-push) sends your saved changes from your computer to GitHub. GitHub then starts a [workflow](../../../glossary/#publish-your-website-workflow), which is a list of steps that GitHub runs on its own computers. GitHub calls this feature GitHub Actions. Every time the workflow runs, GitHub records a [run](../../../glossary/#publish-your-website-run), with a status and a log for each step.

GitHub's documentation describes a workflow as a configurable automated process defined in a YAML file. The file lives in a folder named `.github/workflows` in your repository, and it runs when a chosen event happens, such as a push. For publishing, the usual event is a push to the default branch, which is `main` in this course.

## When you need this lesson

GitHub Pages can publish files from a branch with no workflow, as the last lesson did. A workflow becomes useful when your site must be built first. Frameworks write pages from templates, and the files you edit are not the files a visitor receives. A build step turns the first kind into the second. The workflow runs that build, collects the result, and publishes it.

GitHub's own guidance matches this. When you do not need control over the build, publish from a branch. When you need a build process, write a workflow. You do not have to write the file yourself. You will ask your AI assistant to write it and then read it together.

## What you will do

**Windows and Mac:** the steps happen on GitHub's website and in GitHub Desktop, so they are the same on both systems.

1. Open the **Settings** page of your repository, go to **Build and deployment**, and under **Source** choose **GitHub Actions**. GitHub offers templates. You can also ask your AI assistant for a workflow, as the next step describes.
2. Ask your AI assistant: "Add a GitHub Actions workflow that builds this site and publishes it to GitHub Pages every time I push to the main branch. Use the official GitHub Pages actions." Save the file it creates in `.github/workflows`.
3. Read the file with the AI, line by line. Check four things: it runs on a push to `main`, it runs the build command your project needs, it uploads the folder that holds the built site, and it deploys that folder with the GitHub Pages deploy action. The official workflow for Pages uses the actions `configure-pages`, `upload-pages-artifact` and `deploy-pages`, and the deploy job needs the `pages: write` and `id-token: write` permissions.
4. Commit the new file and push it with GitHub Desktop.
5. Open the **Actions** tab of your repository and open the run that started. Wait until every step has finished. A green mark means the steps passed, and a red mark means one failed.
6. If the run fails, open the failed step. GitHub expands it automatically, so you can read the error text. Copy that text exactly, give it to your AI assistant, apply the fix, push again and watch the new run.

When the run succeeds, reload your site's address after a short wait and check that your change is there.

## Keep the workflow small

A workflow should do only what the site needs: install the tools, build the files and publish them. Do not put passwords or keys into the workflow file, because the file is part of the repository and the repository is visible to anyone when it is public. The next lesson on fixing problems explains why secrets never belong in a website.

## Check yourself

- A push to the main branch starts a run by itself.
- You can find the status of each step in a run and tell a passed step from a failed one.
- You can copy the error text from a failed step and give it to your AI assistant.
- You can explain in one sentence what a workflow file is and where it lives in the repository.

## What comes next

The next lesson is **Fix publishing problems**. It shows the common errors you will meet with GitHub Pages and how to ask for the right fix.
