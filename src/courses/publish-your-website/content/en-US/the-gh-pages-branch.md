---
minutes: 25
outcome: "You will know how a finished site can live on its own gh-pages branch, separate from your source code, and how to set GitHub Pages to publish from that branch."
terms: [branch, deploy]
---

This is an optional lesson. Everything in it is for readers who want to keep the finished files of a site apart from the source files. You can skip it and still have a working site from the previous lessons.

A [branch](../../../glossary/#publish-your-website-branch) is a separate line of saved changes inside a repository. Your work normally lives on `main`. Some projects keep the finished site on a second branch, often named `gh-pages`, so the source files and the site files never mix. A publishing service then reads only that branch. To [deploy](../../../glossary/#publish-your-website-deploy) means to put the finished files where the public address can serve them. A deployment on GitHub Pages is what makes your site visible.

## Does the branch have to be called gh-pages?

No. GitHub's documentation says the source branch can be any branch in the repository. When you publish from a branch, you choose the branch and a folder, either the root of the repository or a folder named `/docs`. The name `gh-pages` is common because many tools use it by convention, not because GitHub requires it.

GitHub's documentation also describes the two publishing methods. Publishing from a branch is the simplest choice when you do not need control over the build. Publishing with a workflow is the better choice when you need a build process, or when you do not want a dedicated branch to hold the compiled files. Even when a tool deploys by committing its output to a `gh-pages` branch, GitHub still runs a deployment through GitHub Actions, and that run is what appears in the Pages settings.

## What you will do

**Windows and Mac:** the steps happen on GitHub's website and in GitHub Desktop, so they are the same on both systems.

1. Ask your AI assistant: "Explain the difference between publishing from a branch and publishing with a workflow, using my project as the example. Which one fits a site that has a build step?" Read the answer and check it against the GitHub documentation.
2. If your site has a build step, ask your AI assistant to write a workflow that builds the site and pushes the finished files to a branch named `gh-pages`. Read the workflow together with the AI, and check that it runs on a push to `main` and writes only the built files to that branch.
3. Push the change, open the **Actions** tab, and wait for the run to finish.
4. Open your repository on GitHub, switch to the `gh-pages` branch, and look at the files at its top level. You should see `index.html` and the other built files, and no source files such as your notes or your workflow.
5. Go to **Settings**, then **Build and deployment**, and check the Pages source. Choose the branch and folder that hold the finished files, then wait for the site to update.
6. Switch back to `main` and confirm that the history of your source files is unchanged.

## Treat the gh-pages branch as output

The finished files on `gh-pages` are output of a build. Their history shows each publication, but the files are meant to be regenerated from your source. If you edit them by hand, the next run can overwrite your edit. Make every change on `main`, let the workflow build it, and read the new run to confirm.

## Check yourself

- You can say why a finished site can be kept on its own branch.
- Your repository has a branch that holds only the finished files, and your source files stay on `main`.
- You can explain why a hand edit on the output branch can be lost in the next run.

## What comes next

The next lesson is **Path A: Publish with Cloudflare**. It is also optional and shows a second hosting service.
