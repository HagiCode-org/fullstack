---
minutes: 25
outcome: "You will know how to check your app for leaked secrets, accidental data loss and surprise costs before other people use it."
terms: [secret, spending-limit]
---

Before other people can use your app, you check it once more. Passing your own happy-path tests is not enough. You also look for [secrets](../../../glossary/#capstone-project-secret), for ways a wrong click could delete data, and for costs that could grow without anyone noticing. You finish with a short report that says the app is ready, or lists what must be fixed first.

## What you will do

1. Run the whole done-checklist from top to bottom, in a new browser window, as if you were a new visitor. Write down every line that fails.
2. Search for secrets. A secret is a key, password or token that gives access to a service, and it must never appear in a public file. Ask your assistant: "Search my project, including its saved history, for anything that looks like a key, password or private setting. Show me where each one is." Check the results yourself. Do not paste a real secret into the chat while you do this.
3. If you find a real secret, treat it as leaked, even if you have already deleted it from the newest file. [GitHub's guide to removing sensitive data](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/removing-sensitive-data-from-a-repository) says that sensitive data can be removed from the history of a repository, but only after you coordinate with everyone who has cloned it. It also says that for a password, token or credential, the first step is to revoke or rotate it. Create a new secret at the service that issued the old one, and update your app's settings to use the new one.
4. Check that the part of the app that runs in the visitor's browser holds no secret. Anything the browser downloads can be read by the visitor, so treat it as public.
5. Check data deletion. Try to delete something and confirm that the app asks first. Ask yourself whether a person could lose their data by one wrong click, and add a confirmation or an undo if they could.
6. Check costs. List every service your app uses that can charge money, such as a model service. For each one, find its [spending limit](../../../glossary/#capstone-project-spending-limit) and set an alert. Read the page for each service you use, because the rules differ. [Anthropic's rate-limit guide](https://platform.claude.com/docs/en/api/rate-limits) says you can set your own monthly spend limit below your tier's cap, and that requests return HTTP 400 once a spend limit you set is reached. [OpenAI's spend-limits guide](https://developers.openai.com/api/docs/guides/spend-limits) says a spend alert sends a notification and does not stop traffic, while a hard spend limit makes affected API requests return a 429 error.
7. Try three bad inputs: an empty form, a very long text and odd characters such as quotation marks and emoji. The app should show a plain message, not break.
8. Write a short report with two headings: **Ready** and **Known gaps**. Put every failing line under Known gaps, with a note on whether it blocks the launch.

## Why this check matters

Most of these problems are invisible while the app works. A leaked key does not stop the app from running, and a missing spending limit does not show up until the bill arrives. This check is the only time you look at those things on purpose, so do it before you share the link.

## Check yourself

- Every line of the done-checklist passes, or is written in your report as a known gap.
- No secret appears in the project, in its saved history or in the part of the app that visitors can read.
- A wrong click cannot delete data without a question first.
- Every paid service has a spending limit and an alert, and you wrote down what each one does.

## What comes next

The next lesson is **Launch it**. There you publish the checked app so that other people can open it at an address.
