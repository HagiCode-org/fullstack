---
minutes: 30
outcome: "You will add one feature that changes what the app stores, and confirm that the entries saved before the change still appear."
terms: [column]
---

Your first version works, so now you improve it one step at a time. In this lesson you add one feature that changes what the app stores, such as a tag on each bookmark or a reply on each guestbook message. A change to what is stored is the kind of change that most often goes wrong, so you will take it slowly.

The rule of the whole course applies here: ask for one change, check it, then save a checkpoint.

## What a change to storage means

The app's database keeps its data in tables. Each [column](../../../glossary/#app-with-data-column) of a table holds one part of each row, and each column has a data type. The PostgreSQL manual says that the data type limits which values can be stored in the column. So a tag or a reply is a new column, or a new table, and the database must know about it before the app can save anything there.

PostgreSQL's [ALTER TABLE page](https://www.postgresql.org/docs/current/ddl-alter.html) shows how a column is added to a table that already exists. The command is `ALTER TABLE`, followed by `ADD COLUMN`. The manual also says that the new column is first filled with its default value, or with null if you do not give a default. So the entries you saved before the change stay in the table, but they may show an empty value in the new column. You must check that the old entries still look right.

## What you will do

1. Choose one small feature from your brief, or invent one. Write it in one sentence, including what the reader will see on the page.
2. Before you ask for the feature, save a checkpoint, so that you can go back.
3. Tell the AI the feature and add: "The app already has entries saved. Do not lose them. Tell me which column or table this change adds, its data type, and what old entries will show in it."
4. Read the AI's answer. If it says that existing data must be changed or deleted, stop and ask it to explain what will happen to your entries before you go on.
5. Restart the app with the commands from the previous lesson. Stop it with `docker compose down`, then start it again with `docker compose up --detach`.
6. Test the new feature by using it. Then open an old entry and check that it still shows up.
7. If an old entry is damaged or missing, do not continue. Go back to the checkpoint and ask the AI again, this time giving the exact description of what went wrong.
8. When both the old and the new entries work, save a checkpoint with a message that names the feature.

## The safety note

If the AI suggests a command that deletes or resets the database, do not run it until you have read it and understood what it removes. The next lesson, on protecting and backing up your data, lists the words that should make you stop and ask first. A feature that adds a column does not need any of those commands, so if the AI proposes one, ask why.

The commands on Windows and on a Mac are the same in this lesson. Only the folder path in the terminal may differ, as in the previous lesson.

## Why you check the old entries

It is easy to test only the new feature. The new feature may work while the old data is broken, and you would not notice until a user did. That is why this lesson asks you to open an entry you made before the change. If the old entry looks right, the change has not damaged what was already there.

## Check yourself

- The new feature works when you use it.
- Entries that existed before the change still appear, and their new column shows a sensible value.
- You saved a checkpoint before and after the change.
- You can say which column or table the change added, and what its data type is.

## What comes next

Go on to **Fix a planted problem**, where a problem is hidden in a copy of the app and you practise finding it with the evidence from the logs.
