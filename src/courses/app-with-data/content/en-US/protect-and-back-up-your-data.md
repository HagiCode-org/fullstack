> **Draft:** this lesson is an outline and will be expanded.

An app with a database holds something that is hard to get back: the data. In this lesson you make sure three things cannot hurt you: a secret ending up in your repository, a risky change destroying your entries, and a command that deletes data without you noticing.

## Words you will meet

**Secret.** A password or key that gives access to something, such as the database password. Anyone who sees it can use it.

**Volume.** The storage Docker keeps for a container outside the container. Your database entries live in a volume, so removing the volume removes the data for good.

**Backup.** A copy of your data stored somewhere else, so that you can restore it if the original is damaged.

## What you will do

1. Ask the AI: "Show me where the database password is stored in this project and make sure it is kept in a settings file that is not saved to GitHub." Then check, in GitHub Desktop, that this file does not appear among the changes to save.
2. Ask the AI for a safe example settings file that has placeholders instead of real values.
3. Ask the AI how to make a backup of the database volume and how to restore it. Run the backup once and keep the file outside the project folder.
4. Practise a restore: add a test entry, make a backup, delete the test entry, restore the backup and see the entry return.
5. Make a rule for yourself: before any risky change, make a backup first.
6. Whenever the AI gives you a command containing words such as delete, remove, drop, reset or prune, stop. Ask the AI to explain exactly what it will remove, and run it only when you agree.

## Check yourself

- The settings file with the secret is not among the changes saved to GitHub.
- You made a backup and restored an entry from it.
- You can name the commands that you will always read before running.
