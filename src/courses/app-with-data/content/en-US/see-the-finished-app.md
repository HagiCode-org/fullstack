---
minutes: 15
outcome: "You will know what the finished app does, what it remembers, and why it runs only on your own computer in this course."
terms: [database]
---

In this course you build a small app that remembers things. It is either a guestbook, where visitors leave a short message, or a bookmark manager, where you save links. The part that makes it different from your earlier projects is that it keeps its information in a [database](../../../glossary/#app-with-data-database). A database is a program that stores data in an organized form, so the data is still there after the app restarts. [MDN's glossary](https://developer.mozilla.org/en-US/docs/Glossary/Database) describes a database as a storage system that collects organized data, which makes the data easier to search, structure and extend.

The database in this course is PostgreSQL. The [PostgreSQL manual](https://www.postgresql.org/docs/current/intro-whatis.html) describes it as an object-relational database management system. You do not need to learn that phrase now. It is enough to know that PostgreSQL is the program that will hold your entries.

An AI writes most of the code for the app. You decide what the app should do, and you check that it works. That split of work is the whole method of this course: you describe, the AI builds, and you test what it made.

This lesson only looks at a finished example, so that you know where you are heading. You do not build anything yet.

## Where the app runs

Everything in this course runs on your own computer, started with Docker. Putting the app on a public server, where other people can reach it, is not covered here.

Docker's [port publishing guide](https://docs.docker.com/engine/network/port-publishing/) explains why this matters. When you publish a container's port on the address `127.0.0.1`, only the Docker host, which is your own computer, can reach that port. So the app you build here is visible only to you.

## What you will do

1. Open the finished example that the course page links to. Click through it and add two entries. Reload the page and check that both entries are still there.
2. Write down, in your own words, what a person can do in the app. For a guestbook this might be "leave a message" and "read all messages".
3. Write down what the app remembers. For a guestbook that could be the name, the message and the time it was left. For a bookmark manager it could be the title, the link and a short note.
4. Choose the app you will build: the guestbook or the bookmark manager. Both follow the same steps, so the choice only changes the words in the brief.
5. Decide one thing that will be different in your version. A different look, an extra field or a different purpose are all good ideas.

This lesson has no commands, so there is nothing to type on Windows or on a Mac. Opening the example in a browser and reloading the page work the same way on both.

## Why this order matters

The rest of the course follows the same order. You learn what the parts are, you write what you want, the AI builds a first version, and then you change and protect it one step at a time. If you skip this lesson, you will not know whether the finished app behaves the way you expect. Looking at a working example first gives you a standard to compare with.

## Check yourself

- You saw an entry stay in the app after you reloaded the page.
- You can say in one sentence what your app lets a person do.
- You can name at least two things the app remembers.
- You know that the app runs only on your computer in this course.

## What comes next

Go on to **Front end and back end**, where you learn which part of the app you see in the browser and which part works behind the scenes.
