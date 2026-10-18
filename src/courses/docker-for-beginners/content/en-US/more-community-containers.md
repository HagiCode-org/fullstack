Docker has a large community of people who package useful programs as images. This lesson gives you a short list of community containers for the next steps after this course, with a card for each one. Each card says what the tool is for, whether you need it yet, the image and tag to use, the command or Compose snippet that starts it, the port it uses and the project's own documentation.

You do not need to run any of these tools to finish the course. Read the criteria, then try one card when a problem in your own work calls for it.

## Security note: tools that use the Docker socket

Some tools in this lesson need the Docker socket, the connection that lets a program control Docker. A tool with the socket can start, stop and read every container on your computer, as an administrator. Treat such a tool like Portainer in the previous lesson:

- Keep its page on your own computer, and do not publish its port to the internet.
- Set a strong administrator password straight away, if the tool asks for one.
- Start it only when you need it, and stop it when you have finished.

Cards that need the socket say so. Read this note before you run any of them.

## How these tools were chosen

A tool appears here only if it meets all of these criteria:

- The project is actively maintained, with recent releases.
- The project has its own documentation site, which the card links.
- The project publishes an image to a public registry, so the tag can be checked on the registry page.
- The tool runs from one container, so it fits the commands you already know.
- It solves a problem that a beginner meets soon after this course.

Each tag in the cards names a major release line, so you get bug fixes but not surprise changes. Look up the tag on the registry page before you use it, and check the project's documentation for the current start-up steps.

## Card: Dozzle

- **Purpose:** a live log viewer. Dozzle shows the logs of all your containers in a web page, and updates as they print new lines.
- **Do you need it yet?** Not for this course. It helps once you run several containers and want to read their logs without typing commands.
- **Image and tag:** `amir20/dozzle:v11`, on [Docker Hub](https://hub.docker.com/r/amir20/dozzle/tags).
- **Security:** Dozzle uses the Docker socket. Read the security note above before you run it.
- **Start command:**

```
docker run -d --name dozzle -p 9999:8080 -v dozzle_data:/data -v /var/run/docker.sock:/var/run/docker.sock amir20/dozzle:v11
```

- **Port:** 9999 on your computer leads to port 8080 inside the container. Open **http://localhost:9999**.
- **Official link:** [Dozzle getting started](https://dozzle.dev/guide/getting-started)

## Card: Uptime Kuma

- **Purpose:** a status monitor. Uptime Kuma checks a website or service on a schedule and shows whether it is up, with a history of its response times.
- **Do you need it yet?** Not until you run a website that other people depend on. It is useful as soon as you want to know about a failure before a visitor tells you.
- **Image and tag:** `louislam/uptime-kuma:2`, on [Docker Hub](https://hub.docker.com/r/louislam/uptime-kuma/tags).
- **Security:** Uptime Kuma does not need the Docker socket.
- **Start command:**

```
docker run -d --name uptime-kuma -p 3001:3001 -v uptime-kuma:/app/data --restart=always louislam/uptime-kuma:2
```

- **Port:** 3001 on your computer leads to port 3001 inside the container. Open **http://localhost:3001**. On the first visit, follow the setup pages to choose the database and create the administrator account.
- **Official link:** [Uptime Kuma documentation](https://uptime.kuma.pet/)

## Card: Adminer

- **Purpose:** a web page for a database. Adminer lets you browse tables, run SQL and edit rows, without the `psql` command line.
- **Why Adminer and not pgAdmin:** both work with PostgreSQL. Adminer starts as a single container with one command and asks for no login of its own, while [pgAdmin's container guide](https://www.pgadmin.org/docs/pgadmin4/latest/container_deployment.html) needs its own login details set when its container starts. For a beginner's next step, Adminer is the simpler start.
- **Do you need it yet?** Useful as soon as you want to look at the data in the PostgreSQL database from the **Run PostgreSQL** lesson.
- **Image and tag:** `adminer:6`, on [Docker Hub](https://hub.docker.com/_/adminer/tags).
- **Security:** Adminer does not need the Docker socket, but it can change any row in your database. Keep its page on your own computer.
- **Compose snippet:** add this under `services:` in the `compose.yaml` file from the **Docker Compose** lesson. Keep the indentation, which is two spaces for each level.

```yaml
  adminer:
    image: adminer:6
    ports:
      - "8081:8080"
```

Then run `docker compose up -d` in the `docker-course` folder. Adminer joins the same network as the `db` service, so it can reach it by the name `db`.

- **Port:** 8081 on your computer leads to port 8080 inside the container. Open **http://localhost:8081**.
- **Connecting:** choose **PostgreSQL** as the system, enter `db` as the server, `postgres` as the username and the password from your `compose.yaml` file, then select **Login**.
- **Official link:** [Adminer](https://www.adminer.org/en/)

## Card: Nginx Proxy Manager

- **Purpose:** a web page for pointing addresses at your services. It runs Nginx for you, and it can request and renew HTTPS certificates. You fill in forms rather than writing configuration files.
- **Do you need it yet?** Not until you run several web services that you want to reach by their own names on a real domain. The course's own Nginx lesson already covers the basics.
- **Image and tag:** `jc21/nginx-proxy-manager:2`, on [Docker Hub](https://hub.docker.com/r/jc21/nginx-proxy-manager/tags).
- **Security:** this tool does not need the Docker socket. It listens on ports 80 and 443 for visitors, so it is the one tool here that you might later expose to the internet. Read its documentation on securing the admin page before you do.
- **Start command:**

```
docker run -d --name npm -p 80:80 -p 81:81 -p 443:443 -v npm_data:/data -v npm_letsencrypt:/etc/letsencrypt jc21/nginx-proxy-manager:2
```

- **Port:** 81 on your computer leads to the admin page, at **http://localhost:81**. On the first visit, the page asks for a full name, an email address and a new password for the admin account. Use a strong password you do not use anywhere else. Ports 80 and 443 carry the visits to your services. Another program may already use port 80 or 443, in which case Docker reports `address already in use`. The **Troubleshooting** lesson explains what to do.
- **Official link:** [Nginx Proxy Manager guide](https://nginxproxymanager.com/guide/)

## After you try a card

Stop and remove any container you started and no longer need. The **Clean up and next steps** lesson lists every container, network and volume the course created, including the ones in this lesson.

## What comes next

Go on to **Troubleshooting**, which lists the messages you are most likely to meet, with their causes and fixes.
