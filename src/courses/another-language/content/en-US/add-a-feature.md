---
minutes: 25
outcome: "You will ask for one change in the Python version, check that the new feature works, and confirm that the old behaviour still works."
terms: [regression]
---

In this lesson you ask for one change to the Python version. You will not read the code to judge it. You will judge it the same way you judged the earlier app: by what it does when you use it. The skill to practise is asking for a change in a language you cannot read, and then checking the result carefully.

A change can break something that used to work. Checking for that is as important as checking the new feature. When an old behaviour stops working after a change, that is a **[regression](../../../glossary/#another-language-regression)**.

## What you will do

1. Pick one feature from **Add filters and totals** in *Your First Web App* that the Python version does not have yet, such as a filter or a total.
2. Write the request as one plain sentence. For example: "When I choose a month, show only the items from that month and show their total."
3. Ask the AI to list the files it will change before it edits anything. Read the list. If it wants to change a file you did not expect, ask why before you agree.
4. Let the AI make the change, and ask for the commands to restart the app.
5. Stop the running app, then restart it with the commands for your system, shown below.
6. Test the new feature with three inputs. Write down each input and what the app showed.
7. Check one thing that worked before the change. This is your regression check.
8. Ask the AI which files it changed, then save a checkpoint with a message that names the feature.

## Restart the app

The app is still running in the terminal from the last lesson. Stop it first by pressing Ctrl+C in that terminal. The output says "Press CTRL+C to quit". Then start it again with these commands, from the project folder.

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

The development command reloads the server when the code changes. The [FastAPI command line documentation](https://fastapi.tiangolo.com/fastapi-cli/) says auto-reload is enabled by default with `fastapi dev`. However, if the AI added a package, you must install it first, inside the activated environment, using the command the AI gives you. The reload does not install anything.

## Test the change

Use the same method for every test. Choose three inputs: one ordinary case, one case at the edge, such as an empty month or a value of zero, and one case that should show nothing. Write down what you expect before you test, so that you cannot talk yourself into a result.

If the app has an API, the FastAPI documentation at `/docs` lists its operations, and you can try one from the page. The [FastAPI home page](https://fastapi.tiangolo.com/) describes that page as an automatic interactive documentation provided by Swagger UI.

Then do the regression check. Pick one behaviour from your finish checklist that has nothing to do with the new feature, such as adding an item or removing one. Run it and confirm it still works. If it does not, that is a regression, and you go back to the checkpoint from **Get the first version running** before you ask the AI to fix it.

## Judge the result

Ask three questions. Does the new feature do what your sentence said? Does one thing that worked before still work? Do you know which files changed? If you cannot answer the last question, ask the AI for a list and read it before you save.

## Mistakes to avoid

- Asking for three changes in one sentence. Ask for one change, test it, and then ask for the next.
- Testing only the new feature. A regression is found by checking old behaviour, not new behaviour.
- Saving a checkpoint before the test. Save only after the new feature and the regression check both pass.

## Check yourself

- The new feature does what your sentence said.
- One thing that worked before still works.
- You know which files the AI changed and saved a checkpoint.

## What comes next

Go on to **Compare with the first version**, where you put the two versions side by side with the same inputs.
