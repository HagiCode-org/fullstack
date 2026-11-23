---
minutes: 25
outcome: "You will turn on GitHub Pages for a repository, open your site at its public address, and publish a small change by pushing it."
terms: [static-site, build]
---

[GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages) is a service that takes the files of a repository and publishes them as a website. If your site is a [static site](../../../glossary/#publish-your-website-static-site), made only of HTML, CSS and JavaScript files that the browser can read as they are, GitHub Pages can serve it with no server program of your own. By the end of this lesson your site has a public address and you can open it from another device.

Before you start, check two things. First, the entry file of your site must be called `index.html` and sit at the top level of the folder GitHub will read. GitHub looks for `index.html`, `index.md` or `README.md` as the entry file, and the name is case sensitive, so `Index.html` will not work. Second, if your GitHub account is on the Free plan, the repository must be public. Pages sites are publicly available on the internet even when the repository is private on a plan that allows it, so check that nothing private is in it.

## Two addresses you can get

GitHub gives every site a default address, and the address depends on the kind of site. A repository named exactly after your account, such as `your-name.github.io`, becomes the address `your-name.github.io`. Any other repository becomes a project site at `your-name.github.io/repository-name`. Most students create a project site, so expect an address with the repository name at the end. Keep this in mind for the troubleshooting lesson later.

## What you will do

**Windows and Mac:** the steps below happen in your browser on GitHub, so they are the same on both systems. Use GitHub Desktop to push your changes, as you did in the GitHub course.

1. Make sure your site project is in a repository on GitHub, and that the latest changes are pushed. Confirm that `index.html` is at the top level of the repository.
2. Ask your AI assistant: "I want to publish this site with GitHub Pages from the main branch. Which settings do I choose, and what does GitHub show after I save them?" Read the answer, then compare it with the settings page you see.
3. On GitHub, open your repository, click **Settings**, and find **Build and deployment**. Under **Source**, choose **Deploy from a branch**. Select the branch **main** and the folder **/ (root)**, then save. GitHub's own instructions use these names, and they can change, so follow the page in front of you if the labels differ.
4. Wait up to ten minutes. GitHub says changes can take that long to appear after a push. Then open the address shown on the Pages section of the settings page.
5. Open the same address on your phone. A site that works only on the computer where you made it is not yet published.
6. Change one word in `index.html`, commit it, push it with GitHub Desktop, wait, and reload the address to see the change online.

A note about the default setting: when a site is published from a branch, GitHub runs its own Jekyll build on the files unless the publishing folder contains an empty file named `.nojekyll`. For a plain HTML site this is usually harmless. If a file or folder in your site does not appear, that setting is the first thing to read about.

## Build is not needed for this site

A plain site like this has no **build**, which means no step that turns source files into the final files. If your project uses a framework, such as one that writes pages from templates, the files in your repository are not the same as the files a visitor needs. Lesson 4 shows how to add a build step with GitHub Actions. For now, if you wrote the site by hand, the files are already ready.

## Check yourself

- Your site opens at a `github.io` address from a different device.
- A small change you push appears online after a short wait.
- You checked that the repository contains nothing private, because the published site is public.

## What comes next

The next lesson is **Publish on every push**. It explains GitHub Actions and turns on automatic builds for sites that need a build step.
