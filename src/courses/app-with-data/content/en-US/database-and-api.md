---
minutes: 25
outcome: "You will explain where the entries are kept, what an API is, and why an entry is still there after you reload the page."
terms: [table, api]
---

A database keeps data after the program that uses it has stopped. In this course the database is PostgreSQL. It is a separate program from your app, and it holds the entries that the app shows. When you restart the app, the entries are still there because they were never kept only in the app's memory. They are kept in the database.

This lesson explains where the entries live, how the front end asks the back end for them, and what the database port is for. You will not write any SQL yourself. The AI does that, and you only need to recognise what it has made.

## Why an entry is still there after a reload

Reloading the page asks the back end for the list of entries again. The back end asks the database for the rows it holds and sends them back. The page is only a view of that list. If the database still holds the entries, the page shows them again, even after you close the browser.

This is the test you will use in the next lessons. Add an entry, reload the page, and check that it is still listed. If it is missing, the entry was probably never saved to the database. That is a problem to report, not a detail to ignore.

## Tables and rows

A [table](../../../glossary/#app-with-data-table) is where a database keeps one kind of thing. PostgreSQL's manual explains that a table in a relational database is much like a table on paper: it consists of rows and columns. Each row holds one item, such as one guestbook message. Each column holds one part of that item, such as the name, the message or the time it was left.

The manual also says that each column has a data type. A column with a numeric type will not accept arbitrary text, and a column with a text type will accept almost anything. This is why the AI will ask you what kind of information each part of an entry is. The answer decides what the database will accept.

For a guestbook, one table might have a row for each message. The columns could be the visitor's name, the message text and the time. This is only an example of the shape. Your AI will choose the real names when it builds the app.

## What an API is

An [API](../../../glossary/#app-with-data-api) is the set of features and rules that lets one piece of software talk to another. MDN's glossary calls it a contract between the application that offers it and whatever uses it. The front end uses the API of the back end. You can think of it as a menu in a restaurant: the menu lists what you may order, and the kitchen does the work behind a door you cannot see.

In this app, the API is the list of addresses the back end offers. One address might return all the entries, and another might save a new one. The AI will tell you the exact addresses. They often start with the same address as your app and continue with a path, such as `/api/entries`. That path is an example, not a fixed rule.

When the front end wants the list, its code calls `fetch()`. MDN's guide to the Fetch API explains that you make a request by calling `fetch()` with a URL, and that the call returns a response from the server. You do not need to write `fetch()` yourself in this course. Knowing that it exists helps you read the code the AI shows you.

## The database port and the service name

Inside Docker Compose, each service has a name, and the other services can reach it by that name. Docker's networking guide gives the example that the web service can connect to the database at `postgres://db:5432`. Here `db` is the service name, and `5432` is the port. The PostgreSQL manual says that 5432 is the default port the server listens on.

This is why the back end uses a name rather than an address. Docker gives containers new addresses when they are recreated, but the service name stays the same.

## Do not publish the database port

There is one safety rule in this lesson. Do not add a setting that publishes the database port to your computer or to the network unless you know why you need it. Docker's port publishing guide says that publishing a container's ports is insecure by default, because a published port becomes available to the outside world as well as to the Docker host. The PostgreSQL manual also says that its server listens only on `localhost` by default, which allows only local connections.

The back end needs the database, but your browser does not. Keep the database port inside the Compose network, and let only the back end use it.

## What you will do

1. Write down the name of the database's job in one sentence: it keeps the entries after the app stops.
2. Draw a small table on paper with the columns for your app. For a guestbook, use name, message and time. For a bookmark manager, use title, link and note.
3. Add one entry to the example app, reload the page and check that it is still there. Write down the rule you just tested.
4. Ask the AI to list the addresses its API offers. Write down the names only, and say in one sentence what each address does.
5. Ask the AI to confirm that the database port is not published to your computer. Read its answer and write the reason in your own words.

On Windows and on a Mac, the browser steps are the same. If you use the terminal to look at the list of running services, the command comes from the previous lessons and works the same on both systems.

## Check yourself

- You can say which part keeps the data after the app restarts: the database.
- You can explain why an entry is still there after you reload the page.
- You can say what an API is in one sentence.
- You know why the database port should not be published to your computer.

## What comes next

Go on to **Write the app brief**, where you write the plain description of your app that the AI will read first.
