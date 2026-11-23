---
minutes: 35
outcome: "You will make a backup of an app's database and uploads, restore it into a test copy, and upgrade the app with a plan to go back."
terms: [backup, migration]
---

A copy of an app that holds real data is only safe if you can get the data back. A [backup](../../../glossary/#docker-self-hosted-apps-backup) is a copy of that data, stored somewhere else, so that you can recover after a mistake, a broken disk or a failed update. In this lesson you will make a backup of Reactive Resume, prove that it works by restoring it into a test copy, and then update the app to a newer version.

The most important habit here is simple: make the backup before you change anything, and check that it can be restored before you rely on it.

## What you will do

1. Find out where the data lives.
2. Back up the database.
3. Back up the uploaded files.
4. Copy the `.env` file, because the backup is useless without the secrets.
5. Restore the backup into a separate test copy.
6. Pin the version, update the app and keep a way back.

## Step 1: Know where the data lives

The Reactive Resume guide says your data is in two places: the PostgreSQL database, which holds accounts, resumes and applications, and the uploads, which are pictures and files. You learned in Docker for Beginners that a volume keeps data outside a container. Docker's volume guide says that a volume persists after you delete the container that used it, and that volumes are easier to back up or migrate than bind mounts. In your Compose file, the database uses `postgres_data` and the uploads use `reactive_resume_data`.

## Step 2: Back up the database

The guide uses `pg_dump`, a PostgreSQL tool, run inside the database container. Run this command in the `reactive-resume` folder. It is the same command on a Mac and on Windows:

```
docker compose exec -T postgres pg_dump -U postgres -d postgres --format=custom > reactive-resume.dump
```

The `--format=custom` option writes a custom-format archive. The PostgreSQL manual says that this format is suitable for input into `pg_restore`, which is the tool you use to restore it. The `> reactive-resume.dump` part saves the output in a file in your folder.

After the command finishes, check that the file exists and is not empty. An empty backup is a backup that cannot help you.

## Step 3: Back up the uploads

The guide says that with local storage, you copy the contents of the `reactive_resume_data` volume, or the folder you mounted yourself. Docker keeps the files of a volume in its own storage area, so you copy them through a temporary container. The Docker volume guide shows this pattern: a short-lived container reads the volume with `--volumes-from`, and writes a tar archive into a folder on your computer that is mounted at `/backup`. The app container mounts `reactive_resume_data` at `/app/data`, so the command below archives that folder.

On a Mac, run this command in the `reactive-resume` folder:

```
docker run --rm --volumes-from $(docker compose ps -q reactive-resume) -v "$(pwd):/backup" ubuntu tar cvf /backup/uploads.tar /app/data
```

On Windows, run this command in PowerShell from the same folder:

```
docker run --rm --volumes-from (docker compose ps -q reactive-resume) -v "${PWD}:/backup" ubuntu tar cvf /backup/uploads.tar /app/data
```

Then move `uploads.tar` to the same safe place as the database dump, such as an external drive or a folder in your cloud storage. Check that the archive is not empty. To restore it later, the Docker volume guide shows the reverse command, which unpacks the archive into a volume.

## Step 4: Copy the .env file

Copy your `.env` file to the same safe place as the backup. The guide warns that without the same `AUTH_SECRET` and `ENCRYPTION_SECRET`, a restored instance signs everyone out, breaks two-factor authentication and loses the saved AI and Firecrawl keys. The database and the settings must be kept together.

## Step 5: Restore into a test copy

A backup is only proven when you have restored it. Never restore over your working app for a test. Make a second folder, copy your compose file and `.env` into it, start only the database and restore the dump into it.

The PostgreSQL manual says that `pg_restore` restores a database from an archive created by `pg_dump` in one of the non-plain-text formats. The guide's command for the restore is:

```
docker compose exec -T postgres pg_restore -U postgres -d postgres --clean --if-exists < reactive-resume.dump
```

After the restore, start the app in the test folder, open it in your browser and check that your test resume is there. If it is not, the backup is not good enough, and you should find out why before you go on.

## Step 6: Pin the version and update

Reactive Resume publishes several image tags. The guide lists `latest`, which is the newest release, and `v6`, which pins to the current major version and receives fixes without jumping to the next major version. For a stable copy, change the image line in `compose.yml` from `amruthpillai/reactive-resume:latest` to `amruthpillai/reactive-resume:v6`. The image part is the name of the program, and the part after the colon is its tag, which names the version.

Before every update, back up again. Then run these two commands, the same on a Mac and on Windows:

```
docker compose pull reactive-resume
docker compose up -d reactive-resume
```

The `pull` command downloads the new image without starting the containers, and the `up -d` command recreates the app container. The guide says that the new version applies its [migrations](../../../glossary/#docker-self-hosted-apps-migration) on startup, which means it changes the database layout to match the new version. Follow the app's logs with `docker compose logs -f reactive-resume` while it starts. The guide also says that PostgreSQL is updated separately, so pulling a new app image does not change the database server.

## Step 7: Keep a way back

The Memos upgrade guide says that it applies database migrations automatically on startup, and that downgrading after a migration has run is not supported. Its advice is that your backup is the rollback path. Reactive Resume's guide does not describe a downgrade either, so treat the backup you made and tested before the update as your way back.

Uptime Kuma, the monitoring app in the next lesson, updates in a similar way. Its update guide pulls the new image, stops the container, removes it and starts a new one with the same volume. Its tag page recommends the tag `2` for the latest version 2 release, and says that the `latest` tag is deprecated and points to version 1.

**Safety note:** never delete a volume to fix a problem unless you have restored a backup of it at least once. A volume holds the only copy of its data unless you made another.

## Check yourself

- You have a backup file and a copy of the uploads outside Docker, and neither is empty.
- You have restored the backup at least once in a separate test folder, and found your test resume there.
- You know which image tag your app runs and where to change it in `compose.yml`.

## What comes next

Go on to **Try more apps**, where you will use the same routine on two other apps, Memos and Uptime Kuma, and learn how to check an app before you install it.
