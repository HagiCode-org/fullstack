---
minutes: 25
outcome: "You will read an app's Compose file and answer four questions about it: which ports it opens, where it keeps data, which secrets it uses and how to back it up."
terms: [database, port-mapping]
---

Most apps you can run with Docker come with a Compose file, a text file that lists the containers an app needs and how they connect. The official file name is `compose.yaml`, and `compose.yml` is also accepted. In Docker for Beginners you wrote one yourself. This lesson teaches you to read one that someone else wrote, so that you understand an app before you start it.

You will use the Reactive Resume guide as the example, because it is an official page that shows the complete file. Your AI helper can explain a line you do not understand, but every answer in your note must be something you found in the file or on the official page.

## What you will do

1. Open the official self-hosting guide for the app you chose in the last lesson. For Reactive Resume, the Docker guide is at [docs.rxresu.me/self-hosting/docker](https://docs.rxresu.me/self-hosting/docker). Copy the file it shows into a new file called `compose.yml`, or read it on the page.
2. Find the list of services. Each service names one container. The Reactive Resume file has two: `postgres` and `reactive-resume`. The first one stores data, and the second one is the app you see in the browser.
3. Answer the first question, *which ports does this open on my computer?* Look for the word `ports:`. In Reactive Resume the app line is `"3000:3000"`. The left number is the port on your computer, and the right number is the port inside the container. This pair is a [port mapping](../../../glossary/#docker-self-hosted-apps-port-mapping). The Compose services reference uses the same pattern in its example, `"8080:80"`.
4. Answer the second question, *where does the app store its data?* Look for `volumes:`. The file names two volumes, `postgres_data` and `reactive_resume_data`, and the top-level `volumes:` block declares them so that services can use them. The guide says uploaded pictures live in `reactive_resume_data`, mounted at `/app/data` inside the app container.
5. Answer the third question, *which passwords or secrets does it use?* Look for `${...}` and `env_file: .env`. Compose reads the `.env` file that sits next to the compose file and fills in the values. The environment variable `POSTGRES_PASSWORD` is one example. Reactive Resume needs three settings to start: `APP_URL`, `DATABASE_URL` and `AUTH_SECRET`.
6. Answer the fourth question, *how would I back it up?* The guide has a section called Back up your data. It names two places to back up: the database, which it dumps with `pg_dump`, and the uploads folder. You will practise this in a later lesson, so for now write down where the guide says to look.
7. Write the four answers in a short note and keep it. You will use the note again when you deploy, configure and back up the app.

## Find the database and the app

A [database](../../../glossary/#docker-self-hosted-apps-database) is a program that keeps organised records, such as accounts and resumes, so that another program can save, search and change them. In the Reactive Resume file, the `postgres` service is the database. It runs PostgreSQL, and the guide says it is reachable only from the app container, never from outside. The `reactive-resume` service is the app. The app reaches the database by its service name, which is why the `DATABASE_URL` setting uses the host name `postgres`.

If you can say which service is the database and which is the app, you have understood how the two containers depend on each other. The app waits for the database to be healthy before it starts. You will see that rule again in the deployment lesson.

## What the ports mean for safety

Publishing a port makes it reachable from outside the container. The Docker networking guide says the `-p` or `--publish` flag makes a port available outside the host. This is why you should read the `ports:` section first. If a line publishes a port you did not expect, or publishes a database, stop and ask why before you start the app.

The Reactive Resume guide also says to keep port `3000` private when you put a reverse proxy in front of the app, and to keep the database off the public internet. Those are the same questions you are answering in your note.

**Safety note:** do not start a compose file that you have not read and understood. A compose file can start containers, open ports and mount folders from your computer. Read it first, then run it.

## A small example

Here is the part of the Reactive Resume file that matters for your four answers. The rest of the file sets up the database container and its health check.

```yaml
  reactive-resume:
    image: amruthpillai/reactive-resume:latest
    ports:
      - "3000:3000"
    env_file: .env
    volumes:
      - reactive_resume_data:/app/data
```

Read each line and match it to one of your four questions. The `image` line tells you which program runs. The `ports` line answers the first question. The `volumes` line answers the second. The `env_file` line tells you where the secrets come from, which answers the third.

## Check yourself

- Your note answers all four questions: ports, where data lives, passwords and how to back up.
- You found each answer in the file or on the official page, not only in your AI helper's reply.
- You can say which service is the database and which one is the app, and why the app uses the name `postgres`.

## What comes next

Go on to **Deploy Reactive Resume**, where you will create the folder, the `.env` file and the compose file on your own computer and start the app.
