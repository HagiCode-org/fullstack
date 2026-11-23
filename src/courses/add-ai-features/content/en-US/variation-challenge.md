---
minutes: 40
outcome: "You will add a different AI feature to a different earlier app on your own, with a brief, a test set and a spending limit written before you build."
terms: []
---

You now repeat the whole course on your own, with a different app and a different feature. No example is given this time. You finish with a second app that has an AI feature you have tested, built from a brief that you wrote yourself.

The aim is not speed. The aim is to show that you can follow the same safe order without looking up each step: the brief and the test set come before the code, the spending limit comes before the key, and the key stays out of your project files.

## Choose your app and your feature

Choose an earlier app from this series that you have not used for an AI feature yet. Then choose a kind of feature you did not use in your first run: summarising, answering questions or classifying. A different kind of feature shows you whether you understood the method or only the example.

Write the one-sentence description of the feature, the same way you did in the first lesson.

## Write before you build

Anthropic's guide to [building evaluations](https://platform.claude.com/docs/en/test-and-evaluate/develop-tests) advises designing tests that mirror the real task and cover the edge cases. For this challenge, that means writing the brief and the test set before you ask anyone to build anything. A feature built first and tested afterwards tends to be judged by whatever it happens to answer.

## What you will do

1. Choose the earlier app and the kind of feature, and write the one-sentence description.
2. Write the feature brief. Include at least three things the feature must never do, the edge cases, and the exact message shown on failure.
3. Write at least ten test inputs, each with the answer you accept. Do this before you build.
4. Pick a model service you can reach and are allowed to use. Set a spending limit at that service, and write down the value.
5. Create a key, and set it as an environment variable named `AI_API_KEY`. On macOS or Linux, use `export AI_API_KEY="your-key-here"`. On Windows, use `setx AI_API_KEY "your-key-here"` in PowerShell, then open a new window. Keep the key out of every project file.
6. Ask your assistant to add the first version in small steps. Run each step, test it and save a checkpoint after each step that works.
7. Run your whole test set. Improve the feature until you are happy with the score, and keep only the changes that do not make the score worse.
8. Add one test input that tries a prompt injection, and confirm the feature does not obey it.
9. Test the failure case by turning off your internet, and confirm that the plain message from your brief appears.
10. Write down three lines: what you would do differently next time, and why.

Model names and billing pages change over time. Read them from the service's own pages on the day you build, and do not rely on what you remember from this course.

## Check yourself

- The second app has a working AI feature of a different kind from your first.
- The brief and the test set were written before the feature was built.
- The key, the spending limit and the input length limit are all in place, and the key is in no project file.
- You finished without copying the steps of an earlier lesson line by line.

## Where to learn next

You have finished the AI features course. The next course is **GitHub: Branches and Pull Requests**, and its first lesson is **Work on a branch**. There you learn to keep each change on its own branch, so that a change that does not work can be set aside without losing the rest of your project.
