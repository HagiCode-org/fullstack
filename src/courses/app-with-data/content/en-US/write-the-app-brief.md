---
minutes: 25
outcome: "You will write a one-page brief that gives the AI your app's purpose, stored items, actions, access rules and finish checklist."
terms: [brief]
---

A [brief](../../../glossary/#app-with-data-brief) is a short written description of what you want built. The AI cannot see the picture in your head, so the brief is the most important thing you give it. A vague brief produces an app that looks finished but does something you did not ask for. A clear brief lets the AI ask the right questions before it writes any code.

In this lesson you write the brief for your guestbook or bookmark manager. You include one thing that beginners often forget: who is allowed to see and change what. By the end you will have one page of text that you can paste to the AI in the next lesson.

## Why the brief stores items

[MDN's guide to server-side programming](https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Server-side/First_steps/Introduction) says that large-scale websites use server-side code to show different data when it is needed, and that this data is generally pulled out of a database stored on a server. Your app keeps its entries in a database in the same way, on a small scale. The AI has to decide how each kind of thing is stored, and it can only do that well if the brief names those things. So list them clearly.

## What you will do

1. Create a new folder for your project, and save the brief inside it as a plain text file named `brief.md`. Any plain text editor will do.
2. Write the purpose in two sentences: who uses the app and what for. For example, "Visitors leave a short message on my page. I read all the messages in one list."
3. List what the app stores. For a guestbook this is the visitor's name, the message and the time. For a bookmark manager it is the title, the link and a note.
4. List what a person can do: add, read, change and delete. Mark each action as needed or optional.
5. Write the access rules in plain words. Answer these questions:
   - Can everyone read all entries, or only the person who made them?
   - Can everyone delete an entry, or only its owner?
   - Does the app need a login at all in this first version?
6. Write what the app must not do, such as "no accounts" or "no emails". Limits help the AI as much as goals do.
7. Write how you will know the app is finished. Use a short checklist, for example "I can add an entry and it is still there after I restart the app."
8. Ask the AI to read your brief and list every question it still has. Answer each question inside the brief, then ask again until the AI has no open questions.

## Safety note: never write a secret in the brief

A brief is text that you will paste into a tool, so it must never hold a real password, a key or any private data. A secret is any piece of data, such as a password, certificate or API key, that should not be sent over a network or stored unencrypted in source code. [Docker's guide to secrets](https://docs.docker.com/compose/how-tos/use-secrets/) gives this definition. If the app will need a secret later, write only that it needs one, for example "the database needs a password, which is kept in a settings file outside GitHub". You will handle secrets properly in the last lessons of this course.

This lesson has no commands. Windows and Mac users write the brief in the same way; only the name of the editor app differs.

## Check yourself

- Your brief has a purpose, a list of stored items, the actions and the access rules.
- Your brief has a finish checklist you could tick off.
- The AI had no unanswered questions left after you updated the brief.
- Your brief contains no real password, key or personal data.

## What comes next

Go on to **Get the first version running with Docker Compose**, where the AI builds the first version from your brief and you start it on your own computer.
