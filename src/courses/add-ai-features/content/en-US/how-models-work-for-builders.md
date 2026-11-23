---
minutes: 15
outcome: "You will explain the words every AI feature builder needs and decide what each one means for your own feature."
terms: [token, context-window, hallucination]
---

This lesson is a one-page card of the words you need before you build. You do not need to know how a model works inside. You need to know what you send it, how much text it can read at once, what its use costs, and how it can fail. You finish with a short list in your own words and one rule for what the app shows when the model fails.

The card has five words. Two of them, prompt and cost, you already met. The others are token, context window and hallucination, and each one has its own short entry below.

## The five words

**Prompt.** The text you send to the model. It holds your instructions and the material to work on. In the next lesson, your feature brief becomes the instructions part of every prompt, so write it clearly.

**Token.** A [token](../../../glossary/#add-ai-features-token) is the smallest unit a model reads and counts. Anthropic's [glossary](https://platform.claude.com/docs/en/about-claude/glossary) says tokens can correspond to words, subwords, characters, or even bytes, and that the number of characters one token represents depends on the model and the language. Services measure your usage in tokens, and Anthropic's [models overview](https://platform.claude.com/docs/en/about-claude/models/overview) lists its prices per million tokens. For an exact count, the glossary points to token counting with the model you plan to use.

**Context window.** The [context window](../../../glossary/#add-ai-features-context-window) is the amount of text a model can look at in one request. Anthropic's glossary calls it a working memory for the model. Anthropic's models overview lists a 1M-token context window for Claude Sonnet 5.5 and Claude Haiku 5.5. OpenAI's [GPT-6.2 Sol page](https://developers.openai.com/api/docs/models/gpt-6.2-sol) lists a 1,050,000-token context window and a maximum input of 922,000 tokens. Each model's own page gives its limits, so check the page for the model you choose.

**Usage cost.** Anthropic's [pricing page](https://platform.claude.com/docs/en/about-claude/pricing) says its billing is based on actual monthly usage, so the amount you pay follows the text you send and receive. A long note costs more than a short one, and a feature that runs many times costs more than one that runs once. Your spending limit in the lesson "Keep keys and costs safe" protects you from surprises.

**Hallucination.** A [hallucination](../../../glossary/#add-ai-features-hallucination) is an answer that sounds confident but is factually incorrect or does not match the text it was given. Anthropic's [guide to reducing hallucinations](https://platform.claude.com/docs/en/test-and-evaluate/strengthen-guardrails/reduce-hallucinations) says even the most advanced models can produce such text, and that techniques reduce hallucinations without eliminating them. So you must check important answers yourself.

## Knowledge has a cut-off date

A model learned from text up to a date called its knowledge cutoff. Anthropic's models overview lists a reliable knowledge cutoff of June 2026 for Claude Sonnet 5.5 and Claude Haiku 5.5, and OpenAI's GPT-6.2 Sol page lists a June 1, 2026 knowledge cutoff. If your feature needs facts from after that date, the model may not know them, and the brief should say where those facts must come from.

## What each word means for your feature

Take the feature you chose in the first lesson and answer four questions about it. For a summary feature, a very long note may exceed what the model can read at once, and it may cost more than you planned. For a question feature, the model may invent an answer about a document it does not contain. For a classification feature, a wrong label is a hallucination in its simplest form. Write one sentence for each word that names a concrete risk for your feature.

## What the app shows when the model fails

Decide what the person sees when the model gives no answer, or an answer that is obviously wrong. A plain message such as "No answer right now. Please try again." is better than a blank screen, because the person knows what happened. The exact text belongs in your feature brief, and you will test it in the lesson "Get the first version working" by turning off your internet.

## What you will do

1. Read each word on the card and write one sentence about it in your own words.
2. Ask your AI assistant: "Explain prompt, token, context window, usage cost and hallucination, with one everyday example each." Compare its examples with your sentences, and correct any that do not match the definitions above.
3. Write down your feature from the first lesson. For each word, note what it means for that feature.
4. Decide one rule for the failure case: what the app shows when the model gives no answer or an obviously bad one.

## Check yourself

- You can explain all five words without looking at the card.
- You know that a model can be wrong while sounding sure.
- You wrote one thing each word means for your own feature.
- You decided what the app shows when the model fails.

## What comes next

Go on to **Write the feature brief**, where you turn your feature into a written description. Your assistant builds from the brief, and you check the finished feature against it.
