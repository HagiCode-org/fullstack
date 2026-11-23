---
minutes: 20
outcome: "You will compare GitHub Pages, Cloudflare Pages and Alibaba Cloud ESA, and write down which one you would choose for your next project and why."
terms: []
---

You have now seen three places to publish a website. Each one can serve the same kind of static site, but they differ in what you need to sign up for, how they connect to your code, how they handle custom domains and preview addresses, and which visitors they are built for. There is no single best choice. The right one depends on where your visitors are and on how much setup you are willing to do.

This lesson gives you a comparison built only from the official pages you read in the previous lessons. Where a service's documentation does not answer a question, the table says so instead of guessing. Services change their pages, so confirm each answer on the official site before you rely on it.

## A short comparison

| | GitHub Pages | Cloudflare Pages | Alibaba Cloud ESA Pages |
| --- | --- | --- | --- |
| What you need first | A GitHub account. On a Free account the repository must be public | A Cloudflare account, connected to GitHub | An Alibaba Cloud account, with individual identity verification before you buy |
| How the site is built | Publish a branch as it is, or run a workflow that builds it | Cloudflare builds on each push, using the build command you enter | ESA builds on each push to the production branch, which defaults to `main` |
| Preview of a branch | Not described in the sources this course uses. Check GitHub's current documentation | Each branch gets a preview address, and production stays the same until you merge | One preview domain for testing, opened with a token that lasts 60 minutes |
| Custom domain | Add it in Settings, then create DNS records. HTTPS can be enforced | Add it to the project in the dashboard. Limits depend on the plan | Bind it after deployment. Global and Chinese Mainland regions need an ICP filing |
| Visitors in mainland China | Not stated in the sources this course uses. Check before you rely on it | Not stated in the sources this course uses. Check before you rely on it | Built for users in the Chinese Mainland region, with the ICP filing rule |
| Cost | Check GitHub's plans and billing pages | Limits and pricing depend on the plan | A plan fee, plus pay-as-you-go charges for overage |

## What you will do

**Windows and Mac:** this lesson uses only the browser and a notebook or a text file, so it is the same on both systems.

1. Write down where most of your visitors will be, and whether they need to reach the site from mainland China.
2. Ask your AI assistant: "My visitors are in this region, and my site is a static site with no server code. Compare GitHub Pages, Cloudflare Pages and Alibaba Cloud ESA for me, and say which fact in your answer you have not checked against the official page." Treat the answer as advice. Check each fact it gives against the table above, and against the official page.
3. Pick one service for your next project, and write one sentence that gives the reason.
4. Before you pay for anything or add a custom domain, write down the one thing you will check on the official page. For example, a limit, a price or a region rule.

## Check yourself

- You can name one strength and one limit of each service, using the official pages.
- You can say which table cells this course could not confirm, and why it left them open.
- You chose a service for your next project and wrote down the reason in one sentence.

## Where to learn next

The next course is **Your First Web App**. It uses the publishing skills from this course to build a small application in the browser, and then puts that application online.
