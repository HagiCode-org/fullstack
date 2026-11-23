---
minutes: 15
outcome: "You will know four community tools, when each one is worth running, and how to start each one safely from its official documentation."
terms: [reverse-proxy]
---

Docker has a large community of people who package useful programs as images. This lesson gives you a short list of community containers for the steps after this course, with a card for each one. Each card says what the tool is for, whether you need it yet, the image to use, the command or Compose file that starts it, the port it uses and the project's own documentation.

You do not need to run any of these tools to finish the course. Read the criteria, then try one card when a problem in your own work calls for it. Each card's image and command come from the tool's official documentation at the time of writing. Check the documentation again before you run one, because versions change.

## Security note: tools that use the Docker socket

Some tools in this lesson need the Docker socket, the connection that lets a program control Docker. A tool with the socket can start, stop and read every container on your computer, as an administrator. Treat such a tool like Portainer in the previous lesson:

- Keep its page on your own computer, and do not publish its port to the internet.
- Set a strong administrator password straight away, if the tool asks for one.
- Start it only when you need it, and stop it when you have finished.

Cards that need the socket say so. Read this note before you run any of them.

## How these tools were chosen

A tool appears here only if it meets all of these criteria:

- The project has its own documentation site, which the card links.
- The project publishes an image that you can look up on a public registry.
- The tool runs from one container or a short Compose file, so it fits the commands you already know.
- It solves a problem that a beginner meets soon after this course.

Look up the image on its registry page before you use it, and check the project's documentation for the current start-up steps.

## Card: Dozzle

- **Purpose:** a live log viewer. Dozzle shows the logs of your containers in a web page, and updates as they print new lines.
- **Do you need it yet?** Not for this course. It helps once you run several containers and want to read their logs without typing commands.
- **Image:** `amir20/dozzle:latest`, on [Docker Hub](https://hub.docker.com/r/amir20/dozzle/tags). Dozzle's guide says it needs Docker Engine 19.03 or newer.
- **Security:** Dozzle mounts the Docker socket. Read the security note above before you run it.
- **Start command:**

```
docker run -d --name dozzle -v /var/run/docker.sock:/var/run/docker.sock -v dozzle_data:/data -p 8080:8080 amir20/dozzle:latest
```

- **Port:** 8080 on your computer leads to port 8080 inside the container. Open **http://localhost:8080**. If port 8080 is already used, for example by the Nginx lesson's container, change the left number to `9999` and open **http://localhost:9999**.
- **Official link:** [Dozzle getting started](https://dozzle.dev/guide/getting-started)

## Card: Uptime Kuma

- **Purpose:** a status monitor. Uptime Kuma checks a website or service on a schedule and shows whether it is up, with a history of its response times.
- **Do you need it yet?** Not until you run a website that other people depend on. It is useful as soon as you want to know about a failure before a visitor tells you.
- **Image:** `louislam/uptime-kuma:2`, on [Docker Hub](https://hub.docker.com/r/louislam/uptime-kuma/tags). The tag `2` is the one shown in the project's own run command.
- **Security:** Uptime Kuma does not need the Docker socket.
- **Start command:**

```
docker run -d --restart=always -p 3001:3001 -v uptime-kuma:/app/data --name uptime-kuma louislam/uptime-kuma:2
```

- **Port:** 3001 on your computer leads to port 3001 inside the container. Open **http://localhost:3001**, and follow the first-time setup pages to create the administrator account.
- **Official link:** [Uptime Kuma](https://uptime.kuma.pet/)

## Card: Adminer

- **Purpose:** a web page for a database. Adminer lets you browse tables, run SQL and edit rows, without the `psql` command line. Adminer says it supports PostgreSQL among other databases.
- **Do you need it yet?** Useful as soon as you want to look at the data in the PostgreSQL database from **Run PostgreSQL**.
- **Image:** `adminer`, on [Docker Hub](https://hub.docker.com/_/adminer/tags). Adminer's own page gives the command `docker run -p 8080:8080 adminer`.
- **Security:** Adminer does not need the Docker socket, but it can change any row in your database. Keep its page on your own computer. Adminer's own page says it refuses connections without a password and limits repeated login attempts, and it still advises keeping the page away from the internet.
- **Compose snippet:** add this under `services:` in the `compose.yaml` file from **Docker Compose**. Keep the indentation, which is two spaces for each level.

```yaml
  adminer:
    image: adminer
    ports:
      - "8081:8080"
```

Then run `docker compose up -d` in the `docker-course` folder. Adminer joins the same network as the `db` service, so it can reach it by the name `db`.

- **Port:** 8081 on your computer leads to port 8080 inside the container. Open **http://localhost:8081**.
- **Connecting:** choose PostgreSQL as the system, enter `db` as the server, `postgres` as the username and the password from your `compose.yaml` file, then log in.
- **Official link:** [Adminer](https://www.adminer.org/en/)

## Card: Nginx Proxy Manager

- **Purpose:** a web page for pointing addresses at your services. It is a [reverse proxy](../../../glossary/#docker-for-beginners-reverse-proxy), which means it receives visits and passes each one to the right service. It runs Nginx for you, and its guide says it can provide free SSL certificates. You fill in forms rather than writing configuration files.
- **Do you need it yet?** Not until you run several web services that you want to reach by their own names on a real domain. The course's own Nginx lesson already covers the basics.
- **Image:** `jc21/nginx-proxy-manager:2.17.1`, on [Docker Hub](https://hub.docker.com/r/jc21/nginx-proxy-manager/tags). This is the version in the project's own Compose example. Check the guide for a newer tag before you use it.
- **Security:** this tool does not need the Docker socket. It listens on ports 80 and 443 for visitors, so it is the one tool here that you might later expose to the internet. Read its guide on securing the admin page before you do.
- **Compose file:** the project's guide starts it with Docker Compose. Create a folder named `npm`, and inside it create a file named `compose.yaml` with this content:

```yaml
services:
  app:
    image: 'jc21/nginx-proxy-manager:2.17.1'
    restart: unless-stopped
    ports:
      - '80:80'
      - '81:81'
      - '443:443'
    volumes:
      - ./data:/data
      - ./letsencrypt:/etc/letsencrypt
```

Run `docker compose up -d` in the `npm` folder.

- **Port:** port 81 on your computer leads to the admin page, at **http://localhost:81**. The first visit asks you to create the admin account, so use a strong password that you do not use anywhere else. Ports 80 and 443 carry the visits to your services. If another program already uses port 80 or 443, the **Troubleshooting** lesson explains what to do.
- **Official link:** [Nginx Proxy Manager guide](https://nginxproxymanager.com/guide/)

## Card: pgAdmin (for later)

pgAdmin is another web page for PostgreSQL. Its own documentation has a [container deployment guide](https://www.pgadmin.org/docs/pgadmin4/latest/container_deployment.html), which asks you to set its login details when the container starts. Read that guide before you run it, because the settings differ from Adminer's.

## After you try a card

Stop and remove any container you started and no longer need. The **Clean up and next steps** lesson lists every container, network and volume the course created, including the ones in this lesson.

## What you learned

- Community tools come from their own projects, so read each card's documentation link before you run one.
- Any tool that mounts the Docker socket can control every container, so keep its page on your computer and stop it when you finish.
- Each card gives an image, a start command or Compose file, and the port to open in your browser.

## What comes next

Go on to **Troubleshooting**, which lists the problems you are most likely to meet, with their causes and fixes.
