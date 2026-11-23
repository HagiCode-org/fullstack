---
minutes: 25
outcome: "You will test two versions of the same job with the same three inputs, and say what you could and could not judge without reading the code."
terms: [test-case]
---

You now have two versions of the same job. One is the version you built earlier with **Get the first version** in *Your First Web App*. The other is the Python version you built in this course. In this lesson you compare them. You do not read either program. You give both the same inputs and compare what they show.

Comparing results without reading the code is a skill of its own. It works because a program is judged by what it does for the person using it. It has limits, and part of this lesson is to name them honestly.

## The method

Every comparison in this lesson uses a **[test case](../../../glossary/#another-language-test-case)**: one fixed input and the result you expect from it. Using the same test cases for both versions is what makes the comparison fair.

## What you will do

1. Write three test cases on paper. Each one has an input, which is what you type or click, and an expected result, which is what you should see. Make one case ordinary, one unusual, such as an empty field or a very large number, and one that should show nothing.
2. Run the earlier app, using the steps you saved in *Your First Web App*. Enter each test case and write down what it showed.
3. Run the Python version with the commands below, enter the same three test cases, and write down what it showed.
4. For each case, mark the results as the same or different. If they differ, write a short reason in your own words.
5. Name at least one thing that is the same in both versions, and at least one thing that differs. The difference might be how the page looks, how long the app takes to start, or the wording of a message.
6. Write two short lists: what you could judge by running the programs, and what you could not judge without reading the code.

## Run the Python version

Use the commands for your system. Keep the Python version running in its own terminal while you test it, and stop it with Ctrl+C when you finish.

### Windows

```
.venv\Scripts\activate
fastapi dev main.py
```

### Mac

```
source .venv/bin/activate
fastapi dev main.py
```

When the server is running, open the address shown in the output, usually `http://127.0.0.1:8000`, in your browser. The address `127.0.0.1` means your own computer, so the app you are testing is running on your machine.

## What you can judge without reading code

Running the two versions tells you a lot. You can judge whether each result matches your expected result, whether the page loads, whether errors appear and whether the new version keeps the items after a refresh if the earlier version did. You can also judge whether the Python version is easier or harder to use for you.

## What you cannot judge without reading code

Some things need more than a run. You cannot tell from the screen whether the data is stored safely, whether the code is easy to change, or whether the app will still work with a thousand items. Write these down as open questions. An open question is an honest result. It is better than a guess presented as a fact.

## Check yourself

- Both versions were tested with the same three inputs.
- You can name at least one thing that is the same and one that differs.
- You wrote down what you could and could not judge without reading the code.

## What comes next

Go on to **Fix a planted problem**, where you repair a fault that someone planted in a copy of the program.
