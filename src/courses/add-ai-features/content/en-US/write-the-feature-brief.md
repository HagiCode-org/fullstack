---
minutes: 25
outcome: "You will write a feature brief and a first set of test inputs that your AI assistant builds from and you check the result against."
terms: []
---

A feature brief is a short written description of what the feature must do and must not do. Your AI assistant builds from it, and you check the finished feature against it. In this lesson you write the brief for your AI feature, together with the test inputs you will use later. You finish with one page that you can give to your assistant.

Writing the brief first matters because an AI feature can be given almost any text. Anthropic's guide to [building evaluations](https://platform.claude.com/docs/en/test-and-evaluate/develop-tests) says to design tests that mirror your real-world task and to include edge cases. Its examples of edge cases are irrelevant or nonexistent input data, overly long input data or user input, and poor, harmful or irrelevant user input. A good brief says in advance what the feature does with each of these.

## What you will do

1. Create a new file in your project and name it `feature-brief`.
2. Write **Who uses it**: one sentence about the person who will use the feature.
3. Write **What it does**: the input the person gives and the output they should get. Give one real example of each.
4. Write **What it must never do**. This part matters most for an AI feature. Examples are: never present a made-up fact as true, never send text to any service other than the one you chose, and never keep retrying after repeated failures. Write at least three rules for your own feature.
5. Write **Edge cases**: what the feature does with an empty text, a very long text and text in a language you did not expect.
6. Write **What happens on failure**: the exact message the person sees when no answer comes back or the service cannot be reached.
7. Write **How we will know it works**: at least three test inputs, each with the answer you would accept. Write them now, before you build anything.
8. Ask your AI assistant: "Read my feature brief. List anything unclear, missing or in conflict." Fix the points that are fair.
9. Save a checkpoint of the brief in your project, as you learned in the earlier courses.

## A short template

You can copy this template into your file and fill in each line.

```text
Feature: [one sentence]
Who uses it: [one sentence]
Input: [what the person gives]
Output: [what the person gets], for example: [one real example]
Must never: 1) [rule]  2) [rule]  3) [rule]
Edge cases: empty text / very long text / unexpected language
On failure, show: [the exact plain message]
Tests: [input] -> [answer you accept]  (at least three)
```

## Writing good test inputs

A test input is a sample the feature will receive, paired with the answer you accept. Keep each answer checkable. For a summary, the accepted answer lists the facts that must appear in it. For a classification, the accepted answer is the correct group. For a question about a document, the accepted answer is the fact from the document that the reply must contain.

Include easy inputs, hard inputs and a few odd ones. Odd inputs are the ones that show what the feature does at its limits, and they are the ones people forget. Anthropic's guide recommends mirroring the real task, so choose inputs that look like the text your future users will really paste.

## Check yourself

- The brief names the person, the input, the output and one real example.
- The brief lists at least three things the feature must never do.
- The brief says what the person sees when something fails.
- The brief says what happens with an empty text, a very long text and an unexpected language.
- You have at least three test inputs, each with the answer you would accept.

## What comes next

Go on to **Get the first version working**. There you choose a model service, set a spending limit, create a key that stays out of your project files, and make the first AI feature run on your own computer.
