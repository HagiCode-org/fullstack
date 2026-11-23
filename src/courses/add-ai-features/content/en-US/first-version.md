---
minutes: 40
outcome: "You will have the first AI feature of your app running on your own computer, with a spending limit set and the key kept out of your project files."
terms: [api, api-key, environment-variable]
---

Now your app gets its first working AI feature. An [API](../../../glossary/#add-ai-features-api) is a set of rules that lets one program send a request to another program and receive a reply. OpenAI's [quickstart](https://developers.openai.com/api/docs/quickstart) describes its API as a consistent interface to its AI models. In your app, the API is how the program sends your prompt and receives the model's answer. To make the request, the service asks you to identify your account with an [API key](../../../glossary/#add-ai-features-api-key), which is a secret code.

In this lesson you choose a service, set a spending limit, create a key, keep the key out of your project files, and get the feature working on your own computer. Do the steps in this order. The spending limit comes before the key on purpose.

## Choose a model service

The course names four services. Each name is only a pointer to that service's official pages. The course does not compare them, and you may use any one that you can reach and are allowed to use. The model names below are copied from each service's own list.

| Service | Model names on its official list | Create a key | Billing and limits |
| :- | :- | :- | :- |
| Anthropic (Claude) | Claude Haiku 5.5 (`claude-haiku-5-5`), Claude Sonnet 5.5 (`claude-sonnet-5-5`) | [Claude Console keys](https://platform.claude.com/settings/keys) | [Pricing](https://platform.claude.com/docs/en/about-claude/pricing), [rate and spend limits](https://platform.claude.com/docs/en/api/rate-limits) |
| OpenAI (GPT) | GPT-6.2 Sol (`gpt-6.2-sol`), GPT-6 Luna (`gpt-6-luna`) | [API keys](https://platform.openai.com/api-keys) | [Billing](https://platform.openai.com/account/billing/overview), [spend limits](https://developers.openai.com/api/docs/guides/spend-limits) |
| Z.AI (GLM) | GLM-5.3-Flash | [API keys](https://z.ai/manage-apikey/apikey-list) | [Billing and top-up](https://z.ai/manage-apikey/billing), [pricing](https://docs.z.ai/guides/overview/pricing) |
| MiniMax | MiniMax-M3.1-Flash, MiniMax-M3 | [Pay-as-you-go keys](https://platform.minimax.io/user-center/basic-information/interface-key) | [API overview](https://platform.minimax.io/docs/api-reference/api-overview) |

This course asks for sub-flagship models rather than the most expensive flagship, to keep the cost of your practice low. You may pick any name in the table, but before you switch to a larger model, check its pricing on the service's billing page. Copy the model name exactly as the list shows it, because the names change over time. Look at the list again on the day you build, not only on the day you read this lesson. Anthropic's [models overview](https://platform.claude.com/docs/en/about-claude/models/overview) and the [OpenAI model list](https://developers.openai.com/api/docs/models) both show the current names.

## Set a spending limit before you create a key

Set the limit first, so that one mistake cannot produce an unlimited bill. Open the spending page of the service you chose and set a monthly limit that you are happy to lose.

- **Anthropic** lets you set your own monthly spend limit below your tier's cap in the Console's [spend limits page](https://platform.claude.com/settings/spend-limits). When usage reaches the limit you set, requests return HTTP 400 with a message that says you have reached your specified API usage limits.
- **OpenAI** offers two controls. A spend alert sends a notification and does not stop traffic. A hard spend limit makes affected API requests return a 429 error. Read the [spend limits guide](https://developers.openai.com/api/docs/guides/spend-limits) and choose the control you want.
- **Z.AI** tells you to visit its billing page to top up when needed, so check that page before you start.
- **MiniMax** has pay-as-you-go keys and a separate subscription key for its M Plan. The two are separate, so check which kind you are creating.

Write down which controls you set. You will need them in the lesson "Keep keys and costs safe".

## Create the key

1. Sign in to the key page of the service you chose, using the link in the table.
2. Create a new API key. Give it a name you will recognise, such as `feature-test`.
3. Copy the key. OpenAI's quickstart says to store the key in a safe location and then export it as an environment variable, as the next section shows.
4. Do not paste the key into a chat with your assistant, a file in your project, a web page or a screenshot.

## Put the key in an environment variable

An [environment variable](../../../glossary/#add-ai-features-environment-variable) is a named setting that your terminal gives to the programs it starts. The app reads three values from environment variables: `AI_SERVICE_URL` for the service's address from its API documentation, `AI_API_KEY` for your key, and `AI_MODEL_NAME` for the model from the table. Your feature brief decides the names, so use the exact names your app reads.

On macOS or Linux, type this in the terminal, with your own key in place of the placeholder:

```bash
export AI_API_KEY="your-key-here"
```

On Windows, type this in Windows PowerShell:

```powershell
setx AI_API_KEY "your-key-here"
```

These two commands follow the forms in OpenAI's quickstart. Keep the quotation marks and replace only `your-key-here`. Run the command in the same terminal window where you start the app on macOS or Linux. On Windows, open a new PowerShell window before you start the app. Never type the key into the code of your app or into a file inside the project folder.

## Ask your assistant to build the first version

Give your assistant the feature brief and say: "Add this feature to my app. Call the model service through its API. Read the service address, the key and the model name from environment variables named AI_SERVICE_URL, AI_API_KEY and AI_MODEL_NAME. Do not write the key into any file. Keep the first version as small as possible."

Tell the assistant which service you chose. Do not ask it to remember a price or a model name. Read the names from the service's own list, and give those names to the assistant.

Let the assistant make the change, then run the app the way you did in the earlier courses. Try your first test input from the brief and compare the answer with the one you wrote down.

## Test the failure case

Turn off your internet connection for a moment, then send the feature a test input. The person should see the plain message from your brief, not a crash or a blank screen. Turn the connection back on and check that the feature works again. If the message is not the one in your brief, ask the assistant to fix it.

If you see an error that is not a failure of your internet, copy the exact message and give it to the assistant. If three tries do not fix it, go back to your last checkpoint and describe the goal again in different words.

## Check yourself

- Your app shows an answer from the model for your first test input.
- The key is not written in any project file you can see.
- You set a spending limit at the service before you created the key.
- A failure, such as turning off your internet, shows the plain message from your brief.
- You saved a checkpoint after it worked.

## What comes next

Go on to **Add a second ability**. You will add a second feature beside the first one and check that the first one still gives the answers you accepted.
