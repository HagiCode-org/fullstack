---
minutes: 20
outcome: "You will find a problem in an app yourself, describe it clearly to the AI assistant, and check that the fix works without breaking anything else."
terms: []
---

Real projects always have problems. In this lesson the course gives you an app with a problem planted in it, and you practise the most useful skill of this course: noticing a problem, describing it to the AI assistant, and checking that the fix really works.

## Why this skill matters

An AI assistant can make a change that looks right and is wrong. It can also fix one thing and break another. Only you can notice this, because you know what the app is supposed to do. That is why your done checklist is the tool you use here, and not the assistant's summary of what it changed.

## What you will do

1. Open the app that the course provides for this lesson, and run it the way you ran your own app in the first-version lesson.
2. Use it until you find the problem. Use your done checklist: which "I can" sentence fails?
3. Describe the problem to your AI assistant in three parts: what you did, what you expected, and what happened. If an error message appears, copy it exactly.
4. Read the fix that the AI proposes. Ask: "What did you change, and why?" Do not accept a fix you cannot explain in one sentence.
5. Run the app again and repeat the steps that showed the problem. It must be gone.
6. Check that nothing else broke, by going through the whole checklist again.
7. If the same problem is still there after three tries, stop. Go back to your last good commit and describe the problem in a different way. Before you do that, read [GitHub's guide to resetting to a commit](https://docs.github.com/en/desktop/managing-commits/resetting-to-a-commit-in-github-desktop). It says that resetting to a commit resets the branch to the commit you choose and restores the changes made in the later commits to your working folder. Nothing is thrown away at once, but you must decide what to keep.

## How to describe a problem well

A useful description is short and specific. For example: "I added two expenses. I expected the total to show their sum. The total showed only the first expense, and no error appeared." A poor description is "It does not work." The three parts give the assistant what it needs to look for the cause. If you also name the item in your checklist that fails, the assistant knows which behaviour to protect while it fixes the problem.

Never run a command you do not understand just because an AI suggested it, especially one that deletes files or changes system settings.

## Check yourself

- You found the problem yourself, from the checklist.
- The problem is gone after the fix, and the rest of the checklist still passes.
- You know what to do when three tries do not work: go back to the last good commit, and read the reset guide first.

## What comes next

The next lesson is Check the app and publish it. There you check the whole app one last time and publish it at an address that others can open.
