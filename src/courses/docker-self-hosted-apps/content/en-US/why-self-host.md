---
minutes: 15
outcome: "You will know what self-hosting gives you and what it costs you, and you will have a short list of apps to try."
terms: [self-hosting, open-source]
---

Many useful programs can run on a computer you control, instead of being used through a website that someone else runs for you. Running a program yourself, on your own computer or on a server you rent, is called [self-hosting](../../../glossary/#docker-self-hosted-apps-self-hosting). Docker makes this much easier, because a ready-made app arrives as a package that starts the same way on many different machines. In this course you will use Docker, which you already met in Docker for Beginners, to run apps like this.

This lesson does not install anything. It helps you decide whether self-hosting is worth it for you, and which app you would try first.

## What you will do

1. Pick one online service you use today, such as a notes tool, a resume builder or a status page. Write down what it does for you.
2. Look for an app that does the same job and can be run by you. The three examples used in this course are good starting points:
   - [Reactive Resume](https://docs.rxresu.me/getting-started) describes itself as a free, open-source resume builder. Its self-hosting guide shows how to run it on your own server with Docker.
   - [Memos](https://usememos.com/) describes itself as an open-source, self-hosted note-taking app, and says your data stays yours.
   - [Uptime Kuma](https://github.com/louislam/uptime-kuma) is described on its GitHub repository as a self-hosted monitoring tool. It watches whether your websites are up.
3. Ask your AI helper to suggest two or three apps for your service. Treat its answer as a list of names to check, not as facts. Open each project's own website or repository and confirm what it says.
4. Write down one to three candidates, the official page you used for each, and one sentence on which you would try first and why.

## The benefits

Self-hosting gives you control. The app runs where you choose, and you decide who can sign in. Reactive Resume's own documentation lists running it on your own server as one of its options, next to Kubernetes and Vercel, so the choice of where it runs stays with you. Memos says the same in plain words: your data stays yours, and you choose what to keep private or share.

Most of these projects are also [open-source](../../../glossary/#docker-self-hosted-apps-open-source), which means the source code is published for anyone to read. Memos is open-source software under the MIT license, and Reactive Resume is open-source under the same license. A license tells you what you may do with the software, so read it before you rely on an app for work.

## The costs

Self-hosting also gives you work. You must install updates, keep your data safe and fix things when they break. The Memos upgrade guide says that before every upgrade you should back up the database and attachments. That is not optional housekeeping; it is the only way back if an upgrade goes wrong.

Free software can still cost money to run. Memos says that hosting may still cost money, depending on the hardware or provider you choose. A computer you already own may cost nothing extra, while a rented server has a monthly price. Compare the price of the machine with the price of the service you would replace before you decide.

**Safety note:** an app that holds personal information, such as a resume, needs a backup and a strong password. You will set both up in the later lessons, so do not put real personal details into any app until you have finished them.

## Check yourself

- You can explain self-hosting in one sentence to a friend.
- You can name two benefits and two costs, and say which official page supports each one.
- You have a written shortlist of one to three apps, and you can say which one you would try first.

## What comes next

Go on to **Understand an app’s compose file with AI**. There you will read the file that tells Docker which containers an app needs and how they connect.
