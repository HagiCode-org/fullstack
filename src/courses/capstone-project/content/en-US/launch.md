---
minutes: 30
outcome: "You will put your app online at an address that other people can open, and check it there before you share the link."
terms: [deployment]
---

Launching means other people can open your app at an address. The step that puts a finished version on a server that visitors can reach is called [deployment](../../../glossary/#capstone-project-deployment). In this lesson you publish your app with the methods you learned in Publish Your Website. You finish with a link you can send to a friend.

## Find out what kind of project you have

If your app is only a set of web pages that run in the browser, and it needs no database and no server of its own, it is a front-end project. If it stores data or runs a program on a server, it also has a back end. The difference is explained in An App with a Database, in the lesson Front end and back end.

## Publish a front-end project

1. Return to Publish Your Website and use the option you chose in Choose where to publish. If you chose GitHub Pages, follow Publish with GitHub Pages again. If you chose Cloudflare, follow Path A: Publish with Cloudflare. If you are in mainland China and chose Alibaba Cloud, follow Path B (mainland China): Publish with Alibaba Cloud ESA.
2. Let your assistant prepare the publishing settings, and tell it to change nothing else in the project.
3. Merge the finished version into the main branch through a pull request, as in Build in small steps. Then wait for the site to update. [GitHub's guide to GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site) says that after a push, it can take up to 10 minutes for changes to a GitHub Pages site to publish.
4. Open the address in a fresh browser window, not the one where you have been working. Run the done-checklist against the live address. Things such as picture paths and page addresses can behave differently after publishing, so test them there.
5. If you use Cloudflare, every new branch gets a preview deployment with its own address. Use it to check a change before you merge it. [Cloudflare's preview deployment guide](https://developers.cloudflare.com/pages/configuration/preview-deployments/) says preview deployments do not affect custom domains or the production site.
6. Send the link to one person, then watch them use it without helping. Write down where they hesitate. Those hesitations are your next list of fixes.

## If the live address breaks

Go back to Fix publishing problems and work through its checks in order. If you use Cloudflare, you can also roll back. [Cloudflare's rollback guide](https://developers.cloudflare.com/pages/configuration/rollbacks/) says a rollback instantly reverts a Pages project to a previous production deployment. Use it to get the last working version back while you fix the problem on a branch.

## Back-end projects

If your project has a back end, this series does not teach you to put a back end on a public server. Keep it running on your own computer for the demonstration. Do not open your computer to the internet unless you know exactly what you are doing, and do not paste a secret into any publishing setting that you have not checked.

## Check yourself

- A person who is not you can open your app from a link.
- The done-checklist passes on the live address, not only on your own computer.
- You watched someone use the app and wrote down what you saw.
- If your project has a back end, you know it is not on a public server, and you did not expose your computer.

## What comes next

The next lesson is **Show your work**. There you write a README, plan a short demo and add the project to your portfolio, so that other people can understand what you built.
