---
minutes: 30
outcome: "You will run two more ready-made apps, Memos and Uptime Kuma, and check each app against four questions before you install it."
terms: [license]
---

You now have a routine that works for many ready-made apps. Find the official instructions, read the compose file, answer the four questions, replace the secrets and make a backup. In this lesson you will use that routine on two more apps, Memos and Uptime Kuma. You will also learn to check an app before you install it, so you do not depend on an app that is abandoned or that you are not allowed to use.

Each app gets its own folder, so that its files, data and settings stay separate from Reactive Resume.

## What you will do

1. Start Memos, a note-taking app, from its official Docker Compose example.
2. Start Uptime Kuma, a monitoring app, from its official Docker command.
3. Check each app with the four questions.
4. Keep a list of the apps you have tried.

## Step 1: Run Memos

Memos describes itself as an open-source, self-hosted note-taking app. Its Docker Compose guide shows a file that uses the image `neosmemo/memos:stable`, publishes port `5230` and keeps its data in a folder you choose, mapped to `/var/opt/memos` inside the container.

Make a folder called `memos` next to your `reactive-resume` folder. Inside it, create a file called `compose.yml` with this content:

```yaml
services:
  memos:
    image: neosmemo/memos:stable
    container_name: memos
    restart: unless-stopped
    ports:
      - "5230:5230"
    volumes:
      - ./data:/var/opt/memos
```

The official example also sets environment variables, including `MEMOS_INSTANCE_URL`. Leave that one out for a test on your own computer. The Memos Docker guide says that a fresh instance started without `MEMOS_INSTANCE_URL` starts with private access, which is the safer choice while you learn. The default database driver is SQLite, so you need no separate database container.

Start it with the same command on a Mac and on Windows, from inside the `memos` folder:

```
docker compose up -d
```

Open `http://localhost:5230` in your browser. Create the first account and write a test note. Then stop the stack with `docker compose down`, start it again with `docker compose up -d`, and check that the note is still there. The note is kept in the `data` folder next to your compose file.

## Step 2: Run Uptime Kuma

Uptime Kuma is described on its GitHub repository as a self-hosted monitoring tool. Its official install page gives one Docker command. Run it as a single line. The command is the same on a Mac and on Windows:

```
docker run -d --restart=unless-stopped -p 3001:3001 -v uptime-kuma:/app/data --name uptime-kuma louislam/uptime-kuma:2
```

The command publishes port `3001` and stores its data in a volume named `uptime-kuma`, mounted at `/app/data`. The install page warns that file locking support is needed to avoid SQLite database corruption, so the data folder should be a local directory or a volume. Open `http://localhost:3001` after the container starts, and finish the setup page.

The tag `2` is the recommended tag in Uptime Kuma's tag list. The same page says the `latest` tag is deprecated and points to version 1, so do not use it for a new install.

## Step 3: Check each app with four questions

Before you keep an app, answer these four questions from the official pages, not from a blog or a video. Write each answer next to the app's name.

1. **Is the project still active?** Look at the date of its latest release on the project page. A project with no recent release may still work, but you will have to maintain it yourself.
2. **What license does it use, and does that allow your use?** A [license](../../../glossary/#docker-self-hosted-apps-license) is the set of legal terms that says what you may do with the software. Reactive Resume is open-source under the MIT license. Memos is open-source software under the MIT license too. For Uptime Kuma, open its repository and read the license file yourself before you rely on it for work.
3. **Where does it keep its data, and can you get it out?** Reactive Resume keeps its uploads in a volume and its data in PostgreSQL. Memos keeps its SQLite database and assets in the folder you map to `/var/opt/memos`. Uptime Kuma keeps its data in the volume you map to `/app/data`.
4. **Does it need extra programs, such as a database?** Reactive Resume needs a PostgreSQL container. Memos uses SQLite by default, so it needs no extra container. Uptime Kuma also uses SQLite in this setup. Count the containers each app starts before you decide.

## Step 4: Handle keys for paid services

Some apps can also connect to outside services that charge for use, such as an AI model. This course does not ask you to enter a key for a paid service. If an app asks for one, open that service's own official pricing page first, and enter a key only when you understand how it is billed. Keep the key in the app's `.env` file, never in a shared file or a chat.

**Safety note:** an app that can call outside services can also send your data to them. Give each app only the access it needs, and do not expose an app to the internet until you have read its security settings.

## Step 5: Keep your list

Make a list with one line per app. Write the name, the date you tried it, the image tag you ran, the folder it lives in and your answers to the four questions. Keep the list next to your notes from the last lessons. When you add an app later, you will fill in the same lines.

## Check yourself

- Memos runs at `http://localhost:5230`, and your test note is still there after you stop and start it.
- Uptime Kuma runs at `http://localhost:3001`, and you can say which folder holds its data.
- You can name the four questions and you have answered them for each of the three apps.

## What comes next

Go on to **Troubleshoot an app**, where you will read a container's log, find a port conflict and fix a broken setup step by step.
