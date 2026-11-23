---
minutes: 30
outcome: "You will describe three services in one compose.yaml file, start them with one command and reach each one through its service name."
terms: [compose-file, service]
---

In this lesson you start three [services](../../../glossary/#docker-for-beginners-service) together: Nginx as a web server, a Node.js program, and a PostgreSQL database. You describe them once in a [Compose file](../../../glossary/#docker-for-beginners-compose-file) called `compose.yaml`. Then `docker compose` starts, shows, reads and stops all of them with one command.

Docker's [Compose application model](https://docs.docker.com/compose/intro/compose-application-model/) says the default file name is `compose.yaml`, and that Compose prefers it when another file with a similar name is present. Compose also creates a network for the services in the file. Each service joins that network and can be reached by its service name, so Nginx can reach the Node.js program by the name `app`. The [Compose networking guide](https://docs.docker.com/compose/how-tos/networking/) describes this default network.

Use the current command, `docker compose` with a space. The older `docker-compose` command is not used in this course.

## Step 1: Create the project folder and its files

Create a folder named `docker-course`. Inside it, create the files below. Each file is plain text, and each one is shown with its exact name and location. Use any plain-text editor, and do not add formatting.

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
- `image:` is the image and tag to start, the same idea as in the earlier lessons.
- `ports:` publishes a port. `"8080:80"` connects port 8080 on your computer to port 80 inside the `web` container. The quotes keep the value as text.
- `volumes:` attaches storage. `./nginx.conf:/etc/nginx/conf.d/default.conf:ro` copies your file into the container, read-only. `./app:/app:ro` attaches your `app` folder the same way. A path that starts with `./` means "in the same folder as this file".
- `depends_on:` tells Compose to start `app` before `web`.
- `working_dir:` sets the folder where `command` runs.
- `command:` is the program the container runs. Here it runs `server.js` with Node.js.
- `environment:` sets environment variables. `POSTGRES_PASSWORD` sets the password for the database administrator. Use it only for this practice, and never reuse it.
- `pgdata:/var/lib/postgresql/data` attaches the named volume `pgdata` to the folder where PostgreSQL 17 stores its data.
- `volumes:` at the bottom declares the named volume `pgdata`, so Docker creates it and keeps it between runs.

### nginx.conf

This file tells Nginx what to do with a visit. It replaces the welcome page you saw in **Run Nginx**.

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
- `proxy_pass http://app:3000;` sends each visit to the service named `app` on port 3000. Nginx does not need an address for `app`, because Compose's network answers the name with the address of the Node.js container.

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

The `-d` option starts the services in the background. Compose creates the network, downloads any missing images and starts the containers. The network is named after the folder, followed by `_default`, and each container name combines the folder name, the service name and a number.

## Step 3: Check that everything is running

Type this command and press Enter:

```
docker compose ps
```

You should see three rows, one for each service. The `web` row shows the published port `8080`.

Open a browser and go to **http://localhost:8080**. You should see:

```
Hello from Node.js running in a container
```

The browser asked Nginx. Nginx passed the visit to the `app` service by its name, and the Node.js program answered through Nginx.

Now check the database. Type this command and press Enter:

```
docker compose exec db psql -U postgres -c "SELECT 1 AS ok;"
```

It prints a table with one row, `ok` and `1`. The database accepts queries from inside its own container, and no program on your computer can reach it directly, because the `db` service publishes no port.

## Step 4: Read the logs

Type this command and press Enter:

```
docker compose logs
```

Compose prints the output of all three services, and each line shows the service that wrote it. To read the logs of one service, add its name at the end, for example `docker compose logs app`.

## Step 5: Stop the services and keep the data

Type this command and press Enter:

```
docker compose down
```

`down` stops and removes the containers and the network that Compose created. It does not remove named volumes, so the database data survives.

## Step 6: Remove the services and the data

Type this command only when you no longer need the data:

```
docker compose down -v
```

**Warning:** the `-v` option also removes the named volumes that the file declares, including `pgdata`. Every table and row in the database is deleted for good. The [`docker compose down` reference](https://docs.docker.com/reference/cli/docker/compose/down/) says the same thing: it removes named volumes declared in the file.

## What you learned

- One file describes several services, and `docker compose` starts, shows, reads, stops and removes them together.
- Compose creates a network for the services, so each service reaches the others by its service name.
- `down` removes containers and networks and keeps volumes, and `down -v` also removes the named volumes.

## What comes next

Go on to **Manage containers with Portainer**, where a web page shows the containers, networks and volumes you have made so far.
