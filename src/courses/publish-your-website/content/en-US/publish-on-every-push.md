> **Draft:** this lesson is an outline and will be expanded.

So far you turned publishing on once. In this lesson you make it automatic: every time you push a change to the main branch, the site builds and publishes itself. At the end you can change your site and see it update without touching any setting.

Some words first. A **push** sends your saved changes from your computer to GitHub. A **workflow** is a list of steps that GitHub runs for you in the cloud. GitHub calls the feature that runs workflows GitHub Actions. A **run** is one execution of a workflow.

## What you will do

1. Tell your AI assistant: "Add a GitHub Actions workflow that builds this site and publishes it to GitHub Pages every time I push to the main branch." Let it create the workflow file.
2. Read the file together with the AI. Ask it to explain, line by line, what will run and when. You do not need to write it yourself.
3. Commit the new file and push it with GitHub Desktop.
4. Open the Actions list of your repository on GitHub and find the run that started. Wait until it finishes.
5. If the run fails, open its log, copy the error text exactly, and give it to your AI assistant. Apply the fix, push again and read the new run.
6. If your site lives at `your-name.github.io/repository-name/`, the images or links may break, because the page looks for them at the wrong place. Tell your AI assistant exactly what is broken and that the site is published under a repository name.

## Check yourself

- A push to the main branch starts a run by itself.
- A finished run shows a working site at your address.
- You can find the error text in a failed run and give it to your AI assistant.
- Images and links work at the published address, not only on your computer.
