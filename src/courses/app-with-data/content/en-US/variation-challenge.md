---
minutes: 40
outcome: "You will build a different small data app on your own, from your own brief, and check it against your own finish checklist."
terms: []
---

You have built, extended, fixed and protected one data app. Now you build a different one on your own, with no example to copy. The goal is to show yourself that the method works for any small app, not only for the guestbook or the bookmark manager in this course.

The app still runs on your own computer. The method has the same parts you already used: a brief, a first version started with Docker Compose, one feature at a time, a check on old data, and a backup before any risky change.

## What the method looks like

The [Compose overview](https://docs.docker.com/compose/) describes the tool that starts your app: it manages services, networks and volumes in a single YAML configuration file, and starts all the services with one command. Your app's database keeps its entries in a volume, so the data survives when the containers are stopped and started again.

The app's back end is the part that reads and writes the database. [MDN's guide to server-side programming](https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Server-side/First_steps/Introduction) notes that most of the code that supports a dynamic website runs on the server, and that the data is generally pulled out of a database stored on a server. That is the same arrangement you saw in the earlier lessons, and it is the arrangement you will check for in your new app.

## What you will do

1. Pick one of these ideas, or one of your own:
   - a reading list with a status for each book
   - a habit tracker that counts the days
   - a recipe box with its ingredients
   - a small expense log
2. Write the brief as you did before: the purpose, what is stored, what a person can do, who may see or change what, and a finish checklist. Keep every password and key out of the brief.
3. Ask the AI to list its questions about the brief, and answer every one of them in the brief.
4. Save a checkpoint. Then ask for the first version, with the database in a container and the app started by Docker Compose.
5. Run it. Add an entry, stop the app with `docker compose down`, start it again with `docker compose up --detach`, and check that the entry is still there.
6. Add one feature that changes what the app stores. Then check the old entries and the new ones.
7. Make a backup before the feature, and keep it outside the project folder. Check that you know where the backup is.
8. Review your work against your finish checklist. Write down which part of the method helped you most, and which part you would do differently next time.

Every command in this challenge works the same on Windows and on a Mac, except for the folder path you open in the terminal. If the AI gives you a command that deletes data, read it first and ask what it removes, as you learned in the previous lesson.

## Judging your own result

Your finish checklist is the judge, not the AI's summary. An AI can say that the app is finished when it is not. Test each item on the checklist yourself, in the browser, and write the result next to it. If an item fails, go back to the brief and change the brief first, then ask the AI again.

Write one short paragraph about what you built, which part of the method you relied on most, and what you would do differently. Keep that paragraph with the brief, so that the next app starts from what you learned.

## Check yourself

- The app runs from one start command and keeps its entries after a restart.
- No secret was saved to GitHub, and the brief contains no real password or key.
- You made a backup before changing what the app stores.
- You finished without copying an example from the course, and you can explain each step of your method.

## Where to learn next

Go on to **See the finished feature** in the course **Add AI Features to Your App**. It shows what an app looks like once it can use an AI model to do something new.
