---
minutes: 25
outcome: "You will connect a GitHub repository to Cloudflare Pages, open a preview of a branch before it goes live, and roll back to an earlier production version."
terms: [preview-deployment, rollback]
---

This is an optional lesson, Path A, for readers who can reach Cloudflare's dashboard without trouble. Cloudflare Pages is a hosting service from Cloudflare, a company that runs a large network of servers. Once you connect a repository, Cloudflare builds your site and serves it from servers close to each visitor. Every change to a branch can also get its own test address.

Read this first. Cloudflare's Pages documentation now asks people to consider Cloudflare Workers for new projects, because Workers supports most Pages use cases and is the platform Cloudflare recommends. This lesson still covers Pages, because the steps below are Pages steps. Before you start, open Cloudflare's overview page and read the notice, and ask your AI assistant to explain the difference in your own words.

## What you will do

**Windows and Mac:** all steps happen in your browser, so they are the same on both systems.

1. Create a Cloudflare account and sign in to the dashboard. Keep the password in a password manager, and never paste it into a chat with an AI assistant.
2. Ask your AI assistant: "I want to host a static site from my GitHub repository on Cloudflare Pages. Which two values will the setup ask for, and what do I enter if my site has no build step?" Check the answer against Cloudflare's build configuration page.
3. In the dashboard, create a Pages project and connect your GitHub account. Choose your repository and the production branch, which is usually `main`. Cloudflare reads your code every time you push a change to a connected branch.
4. Enter the build command and the build output directory. The build command is the command that creates the finished files, and the output directory is the folder that holds them. If your site has no build step, Cloudflare's documentation says to leave the build command blank or use `exit 0`, and to name the folder that holds your `index.html`.
5. Start the first deployment, wait for it to finish, and open the address Cloudflare shows for the project.
6. Create a new branch, push a change to it, and open the preview address that Cloudflare creates for that branch. Check the change there before you merge it into `main`.
7. Open the project's deployments list, find an earlier production deployment, and roll back to it. Then roll forward again to the newest one.

## Preview deployments

A [preview deployment](../../../glossary/#publish-your-website-preview-deployment) is a test copy of a branch's changes at its own address. Cloudflare's documentation says a preview does not affect your production site or any custom domain attached to it. The production site changes only when the production branch changes. Preview links are useful for checking a change with a friend before it reaches the public address.

Cloudflare can also restrict preview deployments to the people you choose, using its Access feature. By default, preview addresses are public, so treat them the way you treat the live site.

## Rollbacks

A [rollback](../../../glossary/#publish-your-website-rollback) makes an earlier production deployment live again. Cloudflare's documentation says a rollback changes the production deployment instantly. Only production deployments are valid targets, so a preview cannot be used for a rollback. Deployments older than a certain age are deleted, so do not count on very old versions still being there.

## Limits and prices

Cloudflare documents its limits by plan, including how many builds a project can run and how many custom domains it can have. The numbers differ between the Free and Pro plans, and Cloudflare changes them from time to time. Before you enable anything that might cost money, read the current limits page and the pricing page for Functions. Do not decide on a plan from memory.

## Check yourself

- Your site opens at an address on a Cloudflare domain.
- A change on a branch has its own preview address, and production stays the same until you merge.
- You rolled back to an earlier production deployment once, and then rolled forward again.

## What comes next

The next lesson is **Path B (mainland China): Publish with Alibaba Cloud ESA**. It is also optional and shows a service built for visitors in mainland China, with its own account and its own rules.
