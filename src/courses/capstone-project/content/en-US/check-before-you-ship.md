> **Draft:** this lesson is an outline and will be expanded.

Before other people can use your app, you check it once more. Passing your own happy-path tests is not enough: you also look for secrets, data loss and surprise costs. You finish with a short report that says the app is ready, or says what must be fixed first.

## What you will do

1. Run the whole done-checklist from top to bottom, in a fresh browser window, as if you were a new visitor. Note every line that fails.
2. Look for **secrets**: keys, passwords and private addresses. Ask your assistant: "Search my project, including its saved history, for anything that looks like a key, password or private setting. Show me the places." If you find a real secret, treat it as leaked: turn it off at the service that issued it and make a new one.
3. Check that the front part of your app, the part that visitors can read, holds no secret. Settings used there are public.
4. Check **data deletion**. Try to delete something and confirm the app asks first. Ask yourself whether a person could lose their data by a wrong click, and add a confirmation or an undo if so.
5. Check **costs**. List every service your app uses that can charge money, such as a model service. Confirm a spending limit and an alert are set, and that the app limits how much one visitor can use.
6. Try three bad inputs: nothing, a very long text and odd characters. The app should show a plain message, not break.
7. Ask your assistant to review the project one last time and list risks. Decide for each one: fix now, or accept and write it down.
8. Write the short report in your project and save it.

## Check yourself

- Every line of the done-checklist passes, or is written down as a known gap.
- No secret appears in the project, its history or the public part of the app.
- A wrong click cannot delete data without a question first.
- Every paid service has a spending limit and an alert.
