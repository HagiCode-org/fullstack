---
minutes: 35
outcome: "You will keep a secret out of GitHub, make a backup of your database and restore an entry from it, and recognise the commands that delete data."
terms: [secret, backup]
---

An app with a database holds something that is hard to get back: the data. In this lesson you make sure three things cannot hurt you: a secret ending up in your GitHub repository, a risky change destroying your entries, and a command that deletes data without you noticing.

## Words you will meet

A [secret](../../../glossary/#app-with-data-secret) is a password or key that gives access to something, such as the database password. [Docker's guide to secrets](https://docs.docker.com/compose/how-tos/use-secrets/) describes a secret as any piece of data, such as a password, certificate or API key, that should not be sent over a network or stored unencrypted in source code. Anyone who sees a secret can use it, so it must stay in one place only: your settings file on your computer.

A [backup](../../../glossary/#app-with-data-backup) is a copy of your data, kept somewhere else, so that you can restore it if the original is damaged or deleted. A backup you have never restored is only a hope, so this lesson includes a practice restore.

## Where your data lives

In this course the database keeps its files in a volume, which is storage that Docker keeps outside the container. Docker's [volume guide](https://docs.docker.com/storage/volumes/) says that the data in a volume is persisted even if the container using it is removed. That is why the entries survive a restart, and also why deleting the volume deletes them.

The path where the volume must be attached depends on the PostgreSQL version. The [official PostgreSQL image page on Docker Hub](https://hub.docker.com/_/postgres) says that for PostgreSQL 18 and later, the volume belongs at `/var/lib/postgresql`. For PostgreSQL 17 and earlier, it belongs at `/var/lib/postgresql/data`, and a volume mounted at the other path will not keep the data when the container is recreated. Ask the AI which version it uses and where the volume is mounted, and check that the two answers match.

## What you will do

1. **Keep the secret out of GitHub.** Ask the AI: "Show me where the database password is kept, and make sure it is only in the `.env` file." Then ask it to add the `.env` file to a `.gitignore` file. [GitHub's guide to ignoring files](https://docs.github.com/en/get-started/git-basics/ignoring-files) says that a `.gitignore` file in the repository's root directory tells Git which files and directories to ignore when you make a commit. In GitHub Desktop, check that the `.env` file does not appear among the changes you are about to save.
2. **Make a safe example settings file.** Ask the AI for a second file with the same settings, using placeholders instead of real values. Save only that example file to GitHub, never the real one.
3. **Make a backup.** Create a folder for backups outside the project folder. Ask the AI for the backup command for your system. The [PostgreSQL manual](https://www.postgresql.org/docs/current/app-pgdump.html) says that `pg_dump` writes its result to standard output, and that a plain-text dump is a script of SQL commands that can rebuild the database. Saving that output into a file needs the output redirection of your own terminal, so ask the AI to show you the Windows version and the Mac version separately. Read both before you run either.
4. **Practise a restore.** Add a test entry. Make a backup. Delete the test entry. Restore the backup and check that the entry comes back. The [PostgreSQL backup chapter](https://www.postgresql.org/docs/current/backup-dump.html) says that text dumps are meant to be read by `psql`. It also says that `psql` keeps running after an SQL error unless you set `ON_ERROR_STOP`, so ask the AI to restore into an empty test database and to stop at the first error.
5. **Make a rule for yourself.** Before any risky change, such as the feature from the previous lesson, make a backup first and keep it outside the project folder.
6. **Stop before the dangerous words.** Whenever the AI gives you a command containing words such as delete, remove, drop, reset or prune, stop and ask the AI to explain exactly what it will remove. Run the command only when you agree with that explanation.

## Commands that can delete data

The Compose command `docker compose down` stops and removes the containers and the networks. [Its reference](https://docs.docker.com/reference/cli/docker/compose/down/) says that by default it keeps the named volumes. Adding `-v` changes that: the option removes the named volumes declared in the Compose file, and the anonymous volumes attached to containers. So `docker compose down -v` can delete the database data that you wanted to keep.

The command `docker volume rm` removes one volume by name. [Docker's reference](https://docs.docker.com/reference/cli/docker/volume/rm/) says that you cannot remove a volume that a container is using. Stopping the containers makes the removal possible, but it does not make it safe, because removing a volume removes its data.

The command `docker volume prune` removes the volumes that no container is using, as the volume guide describes. Read what it lists before you accept it, and ask the AI which volumes it will remove.

On Windows and on a Mac these commands are typed the same way. Only the folder path in the terminal may differ.

## Check yourself

- The `.env` file with the secret is not among the changes saved to GitHub.
- You made a backup and restored an entry from it.
- You know which path the database volume belongs at for the PostgreSQL version your app uses.
- You can name the commands you always read before you run them, and you know which option of `docker compose down` removes the data.

## What comes next

Go on to **Challenge: build a different data app on your own**, where you use the same method for an app that has no example to copy.
