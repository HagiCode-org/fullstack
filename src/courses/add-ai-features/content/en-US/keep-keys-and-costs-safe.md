---
minutes: 25
outcome: "You will keep your API key out of places it can leak, set a spending limit and an alert, and write a plan for a leaked key."
terms: [spend-limit, spend-alert]
---

An [API key](../../../glossary/#add-ai-features-api-key) identifies your account to the model service. Treat it like the number on a bank card: anyone who has it may be able to use your account, and the use is billed to you. In this lesson you keep the key out of the places where it can leak, set a [spending limit](../../../glossary/#add-ai-features-spend-limit) and an alert, limit how much text the feature accepts, and write a short plan for what to do if the key is exposed. You finish with a setup you can explain to someone else.

## Where the key must never appear

Keep the key in one place only: the environment variable you set in the lesson "Get the first version working". Check these places before you save or share anything.

- **Project files.** The key must not appear in any file in your project folder, including settings files, notes and test files. Ask your assistant to search the project for the key's first few characters and show you the result.
- **GitHub and websites.** Nothing that is saved to GitHub or shown on a website may contain the key. Keep the key out of code that a visitor's browser runs. If your app is a website, let the page ask a server you control, and let only that server call the model service.
- **Chats and screenshots.** Do not paste the key into a chat with your assistant, and do not show it in a screenshot.

OpenAI's [quickstart](https://developers.openai.com/api/docs/quickstart) tells you to store the key in a safe location and to export it as an environment variable, which is the approach this course uses.

## Set a spending limit and an alert

Set the controls before you run the feature for other people. The four services in the lesson "Get the first version working" offer different controls, so read the page for the service you chose.

- **Anthropic** lets you set your own monthly spend limit, below your tier's cap, on the Console's [spend limits page](https://platform.claude.com/settings/spend-limits). When usage reaches a limit you set, requests return HTTP 400 with a message that says you have reached your specified API usage limits.
- **OpenAI** separates a spend alert from a hard spend limit. A [spend alert](../../../glossary/#add-ai-features-spend-alert) sends a notification and does not stop traffic. A hard spend limit makes affected API requests return a 429 error. Turn on the alert first, so you hear about rising costs before the limit stops your feature.
- **Z.AI** tells you to visit its [billing page](https://z.ai/manage-apikey/billing) to top up when needed, so check your balance there before you test.
- **MiniMax** keeps pay-as-you-go keys separate from the subscription key used for its M Plan, so make sure you are looking at the billing for the key your app uses.

Write down the limit you chose and the alert threshold. A limit you have not written down is easy to forget.

## Limit how much text the feature accepts

Long input costs more and can fail in ways you did not plan for. Anthropic's guide to [building evaluations](https://platform.claude.com/docs/en/test-and-evaluate/develop-tests) lists overly long input data or user input as an edge case that tests should cover. Put a maximum length in your feature brief, for example 2,000 characters, and make the app refuse a longer text with the plain message from the brief. The refused text should never reach the model service.

Ask your assistant: "Add a length check before the request is sent. If the text is longer than the limit in the brief, show the plain message and send nothing." Then test it with one text just over the limit and one text just under it.

## Write a three-line leak plan

A leak plan is a short written list you can follow when you are in a hurry. Write it on paper or in a note outside the project folder.

1. Find the step on the service's key page that removes or replaces a key, and write down where it is before you need it.
2. Create a new key, and set it as your environment variable instead of the old one. Do not paste it anywhere.
3. Check the billing page for usage you do not recognise, and lower your spending limit if you need to.

Do these steps at once if the key was ever pasted in a public place, even for a moment.

## Check yourself

- The key is not in any project file that is saved to GitHub or shown on a website.
- You set a spending limit and an alert at the service, and you wrote down both values.
- The feature refuses a very long text instead of sending it.
- You have your three-line leak plan written down, with the key page step located.

## What comes next

Go on to **Judge the output**. There you learn to test whether the feature's answers are good, and not only whether it answers at all.
