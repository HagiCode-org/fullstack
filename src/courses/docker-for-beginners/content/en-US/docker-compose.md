In this lesson you start three services together: Nginx as a web server, a Node.js program, and a PostgreSQL database. You describe them once in a file called `compose.yaml`, and Docker Compose starts, lists, reads and stops all of them with one command. Compose also creates a network for the services, so Nginx reaches the Node.js program by its name.

Compose is part of Docker. Use the current command, `docker compose` with a space. The older `docker-compose` command is no longer used in this course.

## Step 1: Create the project folder and its files

Create a folder named `docker-course`. Inside it, create the files below. Each file is plain text, and each one is shown with its exact name and location. Use any plain-text editor, and do not add formatting. The Windows Notepad editor and macOS TextEdit both work if you choose plain text.

Your folder will look like this when you finish:

```
docker-course/
├── compose.yaml
├── nginx.conf
└── app/
    └── server.js
```

### compose.yaml

This file lists the three services and the storage they use.

```yaml
services:
  web:
    image: nginx:stable
    ports:
      - "8080:80"
    volumes:
      - ./nginx.conf:/etc/nginx/conf.d/default.conf:ro
    depends_on:
      - app

  app:
    image: node:24
    working_dir: /app
    command: node server.js
    volumes:
      - ./app:/app:ro

  db:
    image: postgres:17
    environment:
      POSTGRES_PASSWORD: learner-only-change-me
    volumes:
      - pgdata:/var/lib/postgresql/data

volumes:
  pgdata:
```

Here is what each key does:

- `services:` starts the list of containers. Each name under it, `web`, `app` and `db`, is the service name. Other services use that name to reach it.
- `image:` is the image and tag to start, the same idea as in the earlier lessons. This file uses `nginx:stable`, `node:24` and `postgres:17`.
- `ports:` publishes a port. `"8080:80"` connects port 8080 on your computer to port 80 inside the `web` container. The quotes keep the value as text.
- `volumes:` attaches storage. `./nginx.conf:/etc/nginx/conf.d/default.conf:ro` copies the path of your file into the container, read-only (`ro`). `./app:/app:ro` attaches your `app` folder the same way. A path starting with `./` means "in the same folder as this file", on every operating system.
- `depends_on:` tells Compose to start `app` before `web`.
- `working_dir:` sets the folder where `command` runs.
- `command:` is the program the container runs. Here it runs `server.js` with Node.js.
- `environment:` sets environment variables. `POSTGRES_PASSWORD` sets the password for the database administrator. Use it only for this practice, and never reuse it.
- `pgdata:/var/lib/postgresql/data` attaches a named volume called `pgdata` to the folder where PostgreSQL stores its data.
- `volumes:` at the bottom declares the named volume `pgdata`, so Docker creates it and keeps it between runs.

### nginx.conf

This file tells Nginx what to do with a visit. It replaces the welcome page you saw in the **Run Nginx** lesson.

```nginx
server {
    listen 80;

    location / {
        proxy_pass http://app:3000;
    }
}
```

- `listen 80;` makes Nginx accept visits on port 80 inside its container.
- `location / { ... }` applies to every address on the site.
- `proxy_pass http://app:3000;` sends each visit to the service named `app` on port 3000. Nginx does not know an address for `app`; Compose's network answers the name `app` with the address of the Node.js container.

### app/server.js

This is the small Node.js program that answers the visits. Create the `app` folder inside `docker-course`, and put this file in it.

```javascript
const http = require('node:http');

const port = 3000;

// Listens on every network interface so the other containers can reach it.
http.createServer((request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
  response.end('Hello from Node.js running in a container\n');
}).listen(port, () => {
  console.log(`Listening on port ${port}`);
});
```

Node.js is not installed on your computer for this lesson. The `node:24` image provides it inside the `app` container.

## Step 2: Start all the services

Open your terminal in the `docker-course` folder. Use `cd` followed by the folder path, for example `cd Documents/docker-course`. Then type this command and press Enter:

```
docker compose up -d
```

Compose creates a network, downloads any missing images, and starts the three containers. Lines such as `Container docker-course-web-1 Started` show each step. The name of each container is the project name, which comes from the folder name, followed by the service name and a number.

## Step 3: Check that everything is running

Type this command and press Enter:

```
docker compose ps
```

You should see three rows, one for each service, with `running` or `Up` in the status column. The `web` row shows `0.0.0.0:8080->80/tcp`, which means port 8080 is published.

Open a browser and go to **http://localhost:8080**. You should see:

```
Hello from Node.js running in a container
```

The browser asked Nginx. Nginx passed the visit to the `app` service by its name, and the Node.js program answered through Nginx.

Now check the database. Type this command and press Enter:

```
docker compose exec db psql -U postgres -c "SELECT 1 AS ok;"
```

It prints a table with one row, `ok` and `1`. The database accepts queries from inside its own container, and no other program on your computer can reach it, because the `db` service publishes no port.

## Step 4: Read the logs

Type this command and press Enter:

```
docker compose logs
```

Compose prints the output of all three services, each line marked with its service name. Look for `app-1  | Listening on port 3000` and for lines from `web-1` that show `GET /` answered with `200`. To see the logs of one service, add its name at the end, for example `docker compose logs app`.

## Step 5: Stop the services, keeping the data

Type this command and press Enter:

```
docker compose down
```

Compose stops and removes the three containers and the network. The named volume `pgdata` is kept, so the database data survives.

## Step 6: Remove the services and the data

Compose removes the volume only when you ask it to. Type this command and press Enter:

```
docker compose down -v
```

**Warning:** `-v` deletes the named volume `pgdata`, so every table and row in the database is deleted for good. Use it only when you no longer need the data. After this command, `docker compose ps` lists no services, and `docker volume ls` no longer lists `docker-course_pgdata`.

## What you learned

- One file describes several services, and `docker compose` starts, shows, reads, stops and removes them together.
- Compose creates a network for the services, so each service reaches the others by its service name.
- `down` removes containers and networks and keeps volumes. `down -v` also removes volumes and their data.

## What comes next

Go on to **Manage containers with Portainer**, where a web page shows the containers, networks and volumes you have made so far.
