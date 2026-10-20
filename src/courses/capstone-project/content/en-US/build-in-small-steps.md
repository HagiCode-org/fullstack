> **Draft:** this lesson is an outline and will be expanded.

Now you build. The rule is simple: every change is small, lives on its own **branch**, is saved at a **save point** and is reviewed in a **pull request**. A branch is a separate line of work, so the main version of your project stays safe. A pull request is a request to bring the branch's changes into the main version after you have looked at them. You finish with the first working version of your app.

## What you will do

1. Choose the first item from your done-checklist. Pick the one the others depend on.
2. Create a branch for it with a short name that says what it does.
3. Tell your assistant exactly one thing to build. Paste the part of the spec that describes it. Say: "Do only this. Do not change anything else."
4. Run the app and try the item as written in the checklist. If you see an error, copy the exact message to the assistant.
5. If three tries do not fix a problem, go back to your last save point and say the goal again in different words.
6. When the item works, save a save point with a short message, push the branch to GitHub and open a pull request.
7. Read the pull request's list of changes before you accept it. Ask your assistant to explain any change you do not understand. Look for files you did not expect, and for anything that looks like a secret.
8. Merge the pull request, tick the item on your checklist and repeat with the next item.

## Check yourself

- Each checklist item was built on its own branch and merged by a pull request.
- You read the changes of every pull request before accepting it.
- Every ticked item passes when you try it yourself.
- Your main version always runs, even if it does not do everything yet.
