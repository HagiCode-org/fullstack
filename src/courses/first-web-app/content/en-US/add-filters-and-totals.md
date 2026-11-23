---
minutes: 20
outcome: "You will have a filter and a total in your app, and you will know how to check that each one gives the right answer."
terms: [filter, total]
---

A list becomes useful when you can narrow it down and add it up. In this lesson you ask your AI assistant for two features: a [filter](../../../glossary/#first-web-app-filter), which shows only the items that match what you chose, and a [total](../../../glossary/#first-web-app-total), which adds up the numbers. For a to-do list, use "done and not done" and "how many are left".

## How the code works, in short

You do not need to write this code, but it helps to know the names the assistant may use. In JavaScript, one common way to build a filter is the method called `filter`. [MDN's page on the filter method](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter) says that it calls a function once for each element in a list, and builds a new list of the values for which that function returns a value that counts as true. Your filter rule is that function.

A total is often written with a method called `reduce`. [MDN's page on reduce](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce) explains that the value returned by each call becomes the accumulator, the running total, for the next call. Each step carries the running sum forward until every number has been added.

## What you will do

1. Write each feature as a sentence that starts with "I can". Example: "I can show only this week's expenses." Example: "I can see the total of what is on the screen."
2. Add the sentences to your done checklist.
3. Ask the AI to add the filter first. Run the app and try it with enough items to see a difference.
4. Check the filter on purpose with awkward cases: an empty list, an item that matches nothing, and an item right at the edge of the filter.
5. Ask the AI to add the total. Work out the correct total yourself with a calculator for three items, and compare it with the app. Do not trust the AI's arithmetic without checking it.
6. Check that the total follows the filter, as your sentence says.
7. Commit after each feature in GitHub Desktop. [GitHub's guide to committing](https://docs.github.com/en/desktop/making-changes-in-a-branch/committing-and-reviewing-changes-to-your-project-in-github-desktop) says a commit must include a message that briefly describes the changes, so name the feature in that message.

Do one feature at a time. If you ask for both together and something breaks, you will not know which request caused it.

## Why the order matters

The filter and the total depend on each other. The total should add up only the items that the filter lets through, so the filter comes first and the total second. If you change the filter and the total does not change with it, something is wrong with how the total is built. Ask the assistant which list the total is calculated from, and check its answer against your own example. A total that ignores the filter is one of the most common mistakes in a small app like this.

## Check yourself

- The filter shows exactly the items it should.
- The total matches your own calculation.
- You made two commits, one per feature.

## What comes next

The next lesson is Fix a planted problem. There you find a problem in an app that the course has prepared for you, and you practise describing it to the assistant.
