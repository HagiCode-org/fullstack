---
minutes: 40
outcome: "You will start the first working version of your app with one Docker Compose command, open it in your browser, and keep an entry after a restart."
terms: [env-file]
---

Now the AI builds the first version of your app from your brief, and you run it. You use Docker Compose, the tool from the Docker course. Compose reads one file, named [`compose.yaml`](https://docs.docker.com/compose/intro/compose-application-model/), that lists the services of your app, and it starts them together. Here that means the app and its database start at the same time. [Docker's Compose overview](https://docs.docker.com/compose/) describes this as managing services, networks and volumes in a single YAML configuration file, and starting all the services with a single command.

The AI chooses the tools. The examples in this course use Node.js for the back end and PostgreSQL for the database. Either choice is fine, and you do not need to learn them now. If the AI proposes something unusual, ask it to explain the choice in plain words before you accept it.

By the end of this lesson the app opens in your browser, and an entry you added is still there after you stop and start the app.

## Before you start

Start Docker Desktop, or the Docker service, and check that it answers. Use the `docker version` command you learned in **Your first container**, and look for the **Server** part in its output. If Docker does not answer, the commands below will fail, so fix that first.

Create a new empty folder for the project. Save a checkpoint of it in GitHub Desktop, as you learned in the GitHub course, so that you have a starting point.

## Set the database password in a settings file

The official [PostgreSQL image on Docker Hub](https://hub.docker.com/_/postgres) says that `POSTGRES_PASSWORD` is the only environment variable it requires. The password is set through an [env file](../../../glossary/#app-with-data-env-file): a plain text file named `.env`. [Docker's variable interpolation guide](https://docs.docker.com/compose/how-tos/environment-variables/variable-interpolation/) says the `.env` file belongs at the root of the project folder, next to `compose.yaml`.

Ask the AI to keep the password in a `.env` file and to show you the line it uses. The line must look like this, with a placeholder and never a real password:

```
POSTGRES_PASSWORD=change-me-to-a-long-random-text
```

Replace the placeholder with your own long text only on your computer, and never paste the real value into the brief, the course or GitHub. The lesson **Protect and back up your data** later in this course explains why.

## What you will do

1. Open the terminal in the project folder. The steps are shown separately for Windows and Mac below.
2. Paste your brief into the AI assistant and add: "Run the database in a container, start everything with Docker Compose, keep the password in a .env file, and tell me the exact command to start the app and the address to open."
3. Let the AI create the files. Read the short summary it gives you of what it made, and check that a `compose.yaml` file and a `.env` file exist.
4. Run the start command the AI gave you. If Docker Desktop is not running, start it first.
5. Open the address in your browser. Add an entry, then reload the page.
6. Stop the app, then start it again with the commands the AI gave you. Check that your entry is still there.
7. If something fails, copy the full error text back to the AI and ask it to fix it. If three attempts do not work, go back to your last checkpoint and describe the problem in different words.
8. When it works, save a checkpoint with a message such as "First working version".

## Start and stop on Windows

Open PowerShell and go to your project folder. The path below is an example, so use your own folder:

```
cd C:\Users\you\projects\my-guestbook
```

Start the app in the background:

```
docker compose up --detach
```

Stop the app when you are done. This command stops and removes the containers and networks. By default it keeps the named volumes, so your data is not removed, as [the `down` reference](https://docs.docker.com/reference/cli/docker/compose/down/) explains:

```
docker compose down
```

## Start and stop on a Mac

Open Terminal and go to your project folder. The path below is an example, so use your own folder:

```
cd ~/projects/my-guestbook
```

Start the app in the background:

```
docker compose up --detach
```

Stop the app when you are done:

```
docker compose down
```

The two systems differ only in the folder path. The Compose commands are the same on Windows and on a Mac.

## Why you stop and start the app

Stopping and starting the app is the test that matters most in this lesson. The entry you added must still be listed after the restart. If it is not, the entry was never saved to the database, and you must say so to the AI before you go on.

The command `docker compose up --detach` starts the containers in the background and leaves them running, as [the `up` reference](https://docs.docker.com/reference/cli/docker/compose/up/) describes. The same reference also lists a `--build` option, which builds the images before the containers start. Ask the AI when you need it, so that you do not add it by accident.

## When something goes wrong

Use the logs of the services, which show what each part printed while it was running. The command `docker compose logs` displays the log output from the services, and adding `-f` keeps the output on the screen as new lines arrive. Run it in the project folder on either system. Copy the lines that contain the error, and do not paraphrase them.

## Check yourself

- The app opens in your browser at an address with a port number.
- An entry you added is still there after you stop and start the app.
- The password is kept in the `.env` file and is not written into any other file.
- You saved a checkpoint of the working version.

## What comes next

Go on to **Add a feature**, where you change what the app stores, one small step at a time.
