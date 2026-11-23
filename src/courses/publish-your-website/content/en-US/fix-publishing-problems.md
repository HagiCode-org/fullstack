---
minutes: 25
outcome: "You will be able to recognise six common publishing problems, check the first thing that matters for each one, and ask your AI assistant for a fix using the exact error text."
terms: [log, cache, not-found]
---

Publishing can go wrong in a few typical ways. Most of them come from something small: a file in the wrong folder, a setting that points at the wrong branch, or a page that your browser has saved and not yet refreshed. In this lesson you learn to recognise six common problems, the first thing to check for each one, and how to describe the problem so that your AI assistant can help you fix it. The pattern is the same every time: look at what you see, copy the exact message, and say what you expected.

## Before you ask for help

Collect three things. Write down the address you opened, what you saw on the screen, and what you expected to see. If a workflow run failed, open its [log](../../../glossary/#publish-your-website-log), which is the record of every step's output, and copy the first error line exactly. A paraphrase often hides the detail that matters.

## Six problems and the first check for each

1. **The address shows a "not found" page.** The server answered with a [not-found](../../../glossary/#publish-your-website-not-found) reply, which means it has no file at that address. For GitHub Pages, the first thing to check is the entry file. GitHub looks for `index.html` at the top level of the publishing source, and the name is case sensitive. If you publish from a branch and folder, the file must be inside the folder you chose.
2. **The home page works, but another page gives "not found".** Check how the link is written. A project site lives under its repository name, at an address such as `your-name.github.io/repository-name`, so a link that starts with a single slash may point to the wrong place. Ask your AI assistant to show you every link that starts with a slash.
3. **You changed the site, but the old version still shows.** Your browser may keep a [cache](../../../glossary/#publish-your-website-cache), which is a stored copy that it reuses instead of asking again. Reload the page without the cache, then check that the latest run has finished, because the new version appears only after the run completes.
4. **The workflow run failed.** Open the failed step, copy the first error line from its log, and give it to your AI assistant. Do not guess at a fix. Apply the fix, push again and read the new run.
5. **The site does not update at all.** Check the publishing source. For a branch, the branch must be the one you chose, and it must have a commit pushed to it. For a workflow, the run must be on the default branch, because GitHub deploys only from there. GitHub also notes that a push made by a workflow with the default token does not trigger a Pages build.
6. **Images or styles are missing.** Their paths may be wrong for the published address. The browser looks for the file at the address written in the page, and if that address does not exist on the server, the image is missing. Check each path against the files in the published folder.

## Two traps that cause broken links

Changing a repository between public and private changes the site's URL, and links break until the site is rebuilt. Also, removing or adding a custom domain does not always rebuild the site, so old links can break. If you change either setting, plan to check the site afterwards.

## Keep secrets out of the website

Everything you publish is public. GitHub says Pages sites are publicly available on the internet, and the browser must download every page, style and script it uses, so a visitor can read all of them. If you find a password, a key or a private note in the published files, remove it at once and change the secret, because anyone could have copied it before you noticed. Never put secrets in a website, even in a file that seems hidden.

## What you will do

1. Pick a problem you have seen, or imagine one from the list above.
2. Write the address, the symptom and the expected result on a piece of paper.
3. Ask your AI assistant: "My site shows this message at this address. Tell me the first thing to check, and what you need from me to confirm it." Compare the answer with the first check listed above.
4. Make one change at a time, push it, wait for the run, and reload the page.

**Windows and Mac:** these checks happen in the browser and on GitHub's website, so they are the same on both systems.

## Check yourself

- You know the first thing to check for each of the six problems.
- You can copy an error message exactly, instead of describing it from memory.
- You know that nothing secret belongs in a website, because everything published is public.

## What comes next

The next lesson is **Use a gh-pages branch**. It is an optional lesson that shows another way to keep the finished site on its own branch.
