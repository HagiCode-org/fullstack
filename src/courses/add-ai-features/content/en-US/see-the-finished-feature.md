---
minutes: 15
outcome: "You will describe the AI feature you want to add in one sentence and choose the earlier app that will receive it."
terms: [prompt, model]
---

In this course you add one AI feature to a small app that already works. An AI feature is a part of your app where a program called a [model](../../../glossary/#add-ai-features-model) reads some text and writes a useful answer. The model is not part of your app's own code. Your app sends it text over the internet and shows the reply to the person who uses the app.

In this first lesson you do not build anything yet. You look at a finished example, watch how it behaves, and decide what your own feature will do. Careful looking now saves a lot of rework later, because every later lesson depends on the choice you make here.

## What a model does with your text

Anthropic's [glossary](https://platform.claude.com/docs/en/about-claude/glossary) describes large language models as programs trained on very large amounts of text, which can answer questions, summarise information and generate human-like text. A model of this kind does not look things up in your files by itself. It reads the text you give it and writes a reply from that text and what it learned in training.

Your app sends the model a [prompt](../../../glossary/#add-ai-features-prompt). A prompt is the text the model reads before it writes, and it usually holds your instructions together with the material to work on, such as a note or a paragraph. The model's reply is the answer your app shows. Anthropic's [models overview](https://platform.claude.com/docs/en/about-claude/models/overview) states that its current models accept text and image input and produce text output. This course works with text, so you only need the text side.

## Three common kinds of feature

Three kinds of feature are common in small apps.

- **Summarising** turns a long text into a few lines.
- **Answering questions** lets a person ask something about their own notes or documents.
- **Classifying** sorts an item into a group, such as marking a message as urgent or not urgent.

Pick one kind for your feature. Simple features are easier to test, and every feature in this course is tested before you trust it.

## What you will do

1. Open a finished example app that has one AI feature inside it.
2. Use the feature at least three times with different text. Write down what you typed and what came back.
3. Note one answer that was good and one that was weak or wrong. Most AI features produce both. You will measure this properly in the lesson "Judge the output".
4. Choose one of the three kinds of feature above.
5. Choose the earlier app that will receive the feature. A small app that already works is the best choice, because you can see the change clearly.
6. Write your feature in one sentence, such as "Summarise each note in two lines."
7. Ask your AI assistant: "In plain words, how does this example send text to the model and show the answer?" Read the reply. You only need the idea: the app sends text, the model writes an answer, and the app shows it.

## Cost and access

Using a model service usually costs money, and the amount depends on how much text you send and receive. Anthropic's [pricing page](https://platform.claude.com/docs/en/about-claude/pricing) says its billing is based on actual monthly usage. So a short test costs little, and a feature that runs many times costs more. You will set a spending limit before you create any key, so you know the largest amount you can spend.

Before you go on, check that you can reach a model service you are allowed to use. Open the service's own pages from your computer and confirm that they load. If one service does not work where you live, choose another one in the lesson "Get the first version working". Do not rely on a friend's account or a shared key.

## Check yourself

- You used the finished example and wrote down at least one good answer and one weak answer.
- You can state your feature in one sentence.
- You know which earlier app will receive the feature.
- You know that a model service bills by usage, so you will set a spending limit before you create a key.

## What comes next

Go on to **What builders need to know about models**. There you learn the few words that every AI feature builder uses, such as token, context window and hallucination, and you decide what each one means for your feature.
