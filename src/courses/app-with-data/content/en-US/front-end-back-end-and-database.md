> **Draft:** this lesson is an outline and will be expanded.

An app that keeps data is made of three parts, and an AI will build all of them. You do not need to know how they work inside. You only need the words, so that you can tell the AI which part to change and understand it when it tells you what went wrong. This is a one-page card to come back to.

## Words you will meet

**Front end.** The part you see and click in the browser: the page, the form and the buttons. It shows information and collects what you type.

**Back end.** A program that runs out of sight. It receives requests from the front end, decides what to do, and talks to the database. Rules such as "only the owner can delete an entry" live here.

**Database.** A program that stores data in organized tables and keeps it when everything else is switched off. In your project it runs as a container, like the database in the Docker course.

**API.** The agreed way the front end and the back end talk to each other. The front end asks, for example, for "all messages", and the back end answers with a list.

**Port.** A numbered entrance on your computer, such as 3000. The front end and the back end each listen on their own port, and your browser uses the number to reach the right one.

## What you will do

1. Read the five words above once.
2. Look at the finished app from the previous lesson and point to what you think is the front end, and what must be happening in the back end when you add an entry.
3. Ask the AI: "Explain in plain words which part of my app is the front end, which is the back end and where the data is stored." Compare its answer with the card.
4. Keep this card open. You will use these words when you write your brief and when you ask for fixes.

## Check yourself

- You can say which part you see and which part stores the data.
- You can explain why the same page still shows your entries after a reload.
- You can say what a port number is for.
