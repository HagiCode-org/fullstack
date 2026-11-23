---
minutes: 25
outcome: "You choose one AI coding assistant on purpose, know what it costs and how you would leave it, and see it create a file on your computer."
terms: [ai-coding-assistant, usage-based-billing, api-key]
---

An [AI coding assistant](../../../glossary/#build-with-ai-ai-coding-assistant) is a program you talk to in plain language. You describe what you want, and it reads your files, changes them, runs commands and reports back. Choosing one is a real decision, because each assistant charges in a different way, may be reachable from different places, and handles your data under different rules. In this lesson you compare six assistants, pick one, install it, and watch it create a file for you. By the end you will know what your choice may cost, whether you can reach it, and how to stop using it later.

This course does not rank the assistants. The six below are the ones this course compares, and every fact in the comparison comes from that assistant's own official pages. Where those pages do not state a fact, the lesson says so instead of guessing.

## What to look for

- **It can work on your files.** It must create and change files in a folder you choose, not only chat about code.
- **It shows what it changed.** You should be able to see which files it touched, so you can check its work.
- **It can run what it builds.** An assistant that can start your site and read the error messages saves you a lot of copying.
- **You know what it costs.** You understand how it is billed before you install anything.
- **You can reach it.** The service works from where you live, on the network you actually use.
- **You know how to leave.** You can uninstall it and stop its stored sign-in.

## Cost and billing

Assistants are usually billed in one of two ways. A **subscription** is a monthly or yearly plan with a usage allowance. [Usage-based billing](../../../glossary/#build-with-ai-usage-based-billing) charges for the text the model reads and writes, counted in tokens. Many tools offer both. Read the official billing page before you start.

- **Claude Code** charges by API token consumption. Subscription plans (Pro, Max, Ultra, Team and Enterprise) are offered separately. Source: [Claude Code costs](https://code.claude.com/docs/en/costs).
- **Codex** is included in several ChatGPT plans, and eligible plans can extend usage with credits or pay-as-you-go. You can also sign in with an [API key](../../../glossary/#build-with-ai-api-key) for usage-based access. Sources: [Codex pricing](https://developers.openai.com/codex/pricing) and [Codex authentication](https://developers.openai.com/codex/auth).
- **Pi** is published under the MIT license. You still need a model: a subscription, an API key, or a local model. Sources: [Pi on GitHub](https://github.com/earendil-works/pi) and [Pi quickstart](https://docs.pi.dev/latest/quickstart).
- **CodeBuddy** has personal Free and Pro plans, each offered as a monthly or annual subscription with monthly credits. Source: [Tencent Cloud CodeBuddy price details](https://intl.cloud.tencent.com/ind/document/product/1256/77270).
- **DeepSeek harness (dsh)** asks for a DeepSeek API key for its official models. DeepSeek lists its model prices per million tokens, and defines a token as the smallest unit of text the model recognises. Sources: [DSH provider settings](https://deepseek-harness.github.io/deepseek-harness/guide/providers) and [DeepSeek models and pricing](https://api-docs.deepseek.com/quick_start/pricing).
- **MiniMax Code** needs a MiniMax account with available credits, or your own compatible model API. Its README says model calls may incur charges. Source: [MiniMax Code on GitHub](https://github.com/MiniMax-AI/minimax-code).

Check the bill after your first session, and set a spending limit if the service offers one.

## Reaching the service

Reliable access depends on where a service is offered. The facts below are the ones the official pages state. Where a page is silent, this lesson does not fill the gap.

- **Claude Code.** Anthropic's Supported Regions Policy lists the countries where its products, including Claude Code, are available. Mainland China is not on that list, and the policy says any country not listed is unsupported. Source: [Anthropic Supported Regions Policy](https://www.anthropic.com/supported-countries).
- **Codex.** OpenAI's supported-countries page for its API does not list mainland China. Source: [OpenAI supported countries](https://platform.openai.com/docs/supported-countries). The pages used here do not say whether signing in with a ChatGPT plan works from mainland China, so test that yourself before you rely on it.
- **MiniMax Code.** Sign-in differs by account. A mainland China account uses `mcode login`, and a Global account uses `mcode login --region global`. Source: [MiniMax Code quick start](https://code.minimax.io/docs/cli/quick-start). The pages used here do not say whether the service is stable from mainland China.
- **Pi, CodeBuddy and DeepSeek harness.** The official pages used for this course do not say whether these can be reached reliably from mainland China. Try the install and the sign-in on your own network before you commit.

## Data and privacy

Before you give an assistant your files, read what it does with your data. These rules come from each vendor's own pages, and they change, so check the current version.

- **Claude Code.** On consumer plans (Free, Pro, Max and Ultra), your data may be used to train new models when that setting is on. Under commercial terms (Team, Enterprise and API), Anthropic does not train on code or prompts sent to Claude Code unless the customer opts in. Transcripts you share through `/feedback` are kept for 5 years. Source: [Claude Code data usage](https://code.claude.com/docs/en/data-usage).
- **Codex.** For Business, Enterprise and Edu accounts, OpenAI does not use inputs or outputs to improve its models by default. Pro and Plus conversations may be used to improve models unless you turn that off in ChatGPT data controls. Source: [Using Codex with your ChatGPT plan](https://help.openai.com/en/articles/11369540-using-codex-with-your-chatgpt-plan).
- **Pi.** A setting controls install and update telemetry and provider attribution headers. Setting `PI_TELEMETRY` to `0` turns them off. `PI_OFFLINE` disables automatic network activity, including model catalog refreshes. Your prompts go to the model provider you connect. Source: [Pi environment variables](https://docs.pi.dev/latest/environment-variables).
- **CodeBuddy.** Tencent's CodeBuddy Enterprise Privacy Policy says inputs and outputs are kept for up to fourteen days. The individual-plan policy was not readable for this course, so treat this as the enterprise rule. Source: [CodeBuddy Enterprise Privacy Policy](https://intl.cloud.tencent.com/document/product/1316/82344).
- **DeepSeek harness (dsh).** For its official models, the agent service collects dialogue logs. Inputs and outputs may be used to optimise models after de-identification, and you can opt out by contacting the company. Personal information is stored within mainland China, and the policy says it is not currently transferred abroad. If you use a custom model, the provider you call runs the model service. Sources: [DSH privacy policy](https://deepseek.com/harness/privacy/) and [DSH user agreement](https://deepseek.com/harness/terms-of-use/).
- **MiniMax Code.** The official docs used for this course do not state how the CLI handles your data. Look for the current privacy terms before you send private files to it.

## How to switch away

Plan your exit before you start. Leaving usually takes three steps: remove the program, remove what it stored, and stop the account or key from being used.

- **Claude Code.** Use the uninstall section of the setup page, and remove its configuration files if you want a clean removal. Session transcripts stay in plain text under `~/.claude/projects/` for 30 days. Sources: [Claude Code setup](https://code.claude.com/docs/en/setup) and [Claude Code data usage](https://code.claude.com/docs/en/data-usage).
- **Codex.** Run `codex logout` to clear the stored credentials. Source: [Codex authentication](https://developers.openai.com/codex/auth).
- **Pi.** If you installed with npm, run `npm uninstall -g @earendil-works/pi-coding-agent`. Inside Pi, `/logout` removes a provider's stored credential, but it does not unset environment variables or revoke the key at the provider. Sources: [Pi quickstart](https://docs.pi.dev/latest/quickstart) and [Pi providers](https://docs.pi.dev/latest/providers).
- **CodeBuddy.** Run `npm uninstall -g @tencent-ai/codebuddy-code`. Its default configuration directory is `~/.codebuddy`, which you can delete for a full removal. Source: [CodeBuddy installation and login](https://intl.cloud.tencent.com/document/product/1316/84415).
- **DeepSeek harness (dsh).** The desktop guide covers removing the app, and clearing local data is optional. The DeepSeek key you enter is stored in `$DSH_HOME/.credentials.yaml`. Sources: [Uninstall DSH desktop](https://deepseek-harness.github.io/deepseek-harness/guide/desktop-uninstall-cleanup) and [DSH providers](https://deepseek-harness.github.io/deepseek-harness/guide/providers).
- **MiniMax Code.** If you installed with npm, run `npm uninstall --global @minimax-ai/code`. Your user data stays in place after this. Source: [MiniMax Code installation](https://github.com/MiniMax-AI/minimax-code/blob/main/docs/installation.md).

Uninstalling does not cancel a subscription, and it does not revoke a key at the provider. Do those in the provider's own account page.

## Comparison table

Use this table to note your choice. Each cell repeats only what the official pages state. "Not stated" means the pages used here are silent, so do not fill the gap from memory.

| Assistant | Cost and billing | Mainland China access (official) | Data and privacy (official) | How to switch away |
| --- | --- | --- | --- | --- |
| Claude Code | API tokens, or Pro, Max, Ultra, Team or Enterprise plans | Mainland China not on Anthropic's supported list | Consumer plans may train if opted in; commercial terms do not train by default | Uninstall; remove configuration files |
| Codex | ChatGPT plans with credits, or an API key | API list excludes mainland China; ChatGPT sign-in not stated | Business, Enterprise and Edu not trained by default; Pro and Plus may be, unless turned off | `codex logout` |
| Pi | MIT license; a subscription, API key or local model is needed | Not stated | `PI_TELEMETRY` and `PI_OFFLINE` settings | `npm uninstall -g`; `/logout` inside Pi |
| CodeBuddy | Free and Pro personal plans, monthly or annual | Not stated | Enterprise policy keeps inputs and outputs up to 14 days | `npm uninstall -g`; delete `~/.codebuddy` |
| DeepSeek harness (dsh) | DeepSeek API key, priced per token | Not stated | Official models: dialogue logs, possible training use unless opted out; stored in mainland China | Uninstall the app; key in `.credentials.yaml` |
| MiniMax Code | Credits or your own model API; model calls may cost money | Separate mainland China and Global sign-in; stability not stated | Not stated | `npm uninstall --global` |

## What you will do

1. Pick one assistant from the table, using the facts that fit your situation. Write one sentence saying why you chose it.
2. Install it and sign in, following that assistant's official install page. Never paste a key or password into a file you might share.
3. Create an empty folder named `my-first-site`.
   - **Windows:** open File Explorer, go to Documents, and create a new folder with that name.
   - **Mac:** open Finder, go to Documents, and create a new folder with that name.
4. Open that folder in your assistant. Follow the assistant's own page for starting it inside a folder.
5. Type this request: `Create a file named hello.txt that contains the words "Hello from my AI partner".`
6. Open the folder yourself and open `hello.txt`. Check the words.
7. Ask the assistant to change the words, then open the file again and check the change.

## Check yourself

- The assistant is installed, you are signed in, and you have written your one-sentence reason.
- A file named `hello.txt` exists in your `my-first-site` folder, and you saw it yourself.
- You know what using this assistant may cost you, and you know how you would switch away.

## What comes next

Go on to **Write a clear brief**, where you learn to describe what you want so the assistant builds the right thing.
