---
minutes: 30
outcome: "You will find the cause of a failing app from its status and log, fix a port conflict and change one setting at a time until the app works."
terms: [log, port-conflict]
---

Sooner or later an app will not start, or its page will not open. This is normal, and the cause is usually one of a few common ones. The app keeps a written record of what it did, which is its [log](../../../glossary/#docker-self-hosted-apps-log). The log usually names the problem, so your first job is to read it instead of guessing.

This lesson uses the Reactive Resume setup from the earlier lessons. The same steps work for Memos and Uptime Kuma, because they use the same Docker commands.

## What you will do

1. Check the status of every container.
2. Read the log of the container that fails.
3. Match the message to a known cause.
4. Fix a [port conflict](../../../glossary/#docker-self-hosted-apps-port-conflict) by changing one number.
5. Test the health endpoint.
6. Change one thing at a time and keep notes.

## Step 1: Check the status

Open a terminal in the `reactive-resume` folder. The command is the same on a Mac and on Windows:

```
docker compose ps
```

The Docker guide says that this command lists the containers of a Compose project with their current status and exposed ports. Look for a container that is restarting, has exited or is not healthy. A container that keeps restarting needs its log read first.

## Step 2: Read the log

Show the last 50 lines of the app's log:

```
docker compose logs --tail=50 reactive-resume
```

The Docker guide says that `--tail` sets how many lines are shown from the end of each container's log. To watch new lines as they appear, add `-f` after `logs`, and stop watching with Control and C. Copy the exact error text, not a summary, because the exact words are what you search for.

## Step 3: Match the message to a cause

The Reactive Resume guide lists the errors you are most likely to see. Use the list to find your cause:

- **`Invalid environment variables`**: a required setting is missing or has the wrong form. The message names the variable. Check `APP_URL`, `DATABASE_URL` and `AUTH_SECRET` in `.env`.
- **`Database migrations failed` or `ECONNREFUSED`**: the `DATABASE_URL` is wrong, or PostgreSQL is not reachable. Check the host name, which must be `postgres` in this setup, and check that the password matches `POSTGRES_PASSWORD`. The guide says that a password with special characters must be URL-encoded.
- **`Local storage path is not writable`**: the folder mounted at `/app/data` cannot be written by the app. The guide says the app runs as the user with UID 1000, so that user must be able to write to the folder, or you should use a named volume.
- **Sign-in loops back to the sign-in page**: `APP_URL` does not match the address in your browser. The guide says it must match exactly, including `https://` when you use it.

If the log shows none of these, search the official troubleshooting section of the app's documentation with the exact message.

## Step 4: Fix a port conflict

A port conflict happens when a program on your computer already uses the port number you asked Docker to publish. Two programs cannot listen on the same port number at the same time, so the container cannot start with that mapping. The `-p` flag makes a container port available outside the host, so the number on the left of the colon is the one that clashes.

The Reactive Resume guide says you can map the app's container port `3000` to any free host port. To use `3100` instead, change the `ports` line in `compose.yml` from `"3000:3000"` to `"3100:3000"`. Then change `APP_URL` in `.env` to `http://localhost:3100`, because `APP_URL` must match the address in your browser exactly. Run `docker compose up -d` to apply the change, and open `http://localhost:3100`.

Uptime Kuma has the same idea in its own guide. Its install page shows how to change the port with `-p <YOUR_PORT>:3001`, where the left number is your choice.

## Step 5: Test the health endpoint

Reactive Resume has a health endpoint at `/api/health`. The guide says it answers `200` when everything is healthy and `503` when any check fails. Open `http://localhost:3000/api/health` in your browser. The page shows JSON with one entry for the database, one for storage and one for Redis if it is configured. Find the entry that says `unhealthy`, and read the log for that check.

Use the health endpoint to see which part of the app is broken, not to restart the app over and over. The guide says that restarting the app does not fix a database or storage outage.

## Step 6: Change one thing at a time

After each change, run `docker compose up -d` and check the log again. The Reactive Resume settings reference says that changes take effect after a restart, and that `docker compose up -d` recreates the container with the new environment. If you change three things at once and the app starts, you will not know which change fixed it.

Keep a short record of each change: the line you edited, the old value, the new value and the result. If three attempts fail, undo your changes, return to the official instructions and start again from the first step.

**Safety note:** do not delete a volume to fix an error. The Docker volume guide says a volume keeps its data after you delete the container that used it, and the uploads and database of your app live in volumes. Restore a backup first, as you learned in the backup lesson.

## Check yourself

- You can find the status of each container and read the log of the one that failed.
- You can say what a port conflict is, and how to fix it by changing the number on the left of the colon.
- You solved one deliberately broken setup, such as a wrong port, by reading the log and making one change at a time.

## Where to learn next

This is the last lesson of the course. Go on to the elective course **The Same App in Another Language**, whose first lesson is See the goal. It uses the same kind of routine, but with a program written in a different language.
