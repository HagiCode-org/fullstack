---
minutes: 15
outcome: "You will remove the containers, network and volumes this course created, check that nothing is left, and know where to read next."
terms: [prune]
---

In this lesson you remove everything the course created: its containers, its network and its volumes. You also find the official pages for your next steps. Run the commands in the order given, and check the results at the end.

**Warning:** some of these commands delete data. A volume keeps a database's or a tool's files, so removing a volume deletes that data for good. The volumes are named in Step 4, so decide before you run that step. Do not run a [prune](../../../glossary/#docker-for-beginners-prune) command, such as the one described in the [`docker system prune` reference](https://docs.docker.com/reference/cli/docker/system/prune/), on your whole computer unless you know what it removes, because it removes unused containers, networks and images that belong to other projects too.

## Step 1: Remove the Compose services and their data

If you still have the `docker-course` folder from **Docker Compose**, open a terminal in that folder and run this command. It stops and removes the services and the network Compose created, and it removes the named volume `docker-course_pgdata` that holds the database data:

```
docker compose down -v
```

If you added the Adminer service to `compose.yaml`, this command removes it too, because it is part of the same file. If you started Nginx Proxy Manager from its own `npm` folder, run `docker compose down` in that folder as well. Its data is in the `data` and `letsencrypt` folders, which you delete yourself when you no longer need them.

## Step 2: Remove the containers the course started by name

Run `docker ps -a` to see every container on your computer. Find the rows for the containers you started in this course, which have names such as `my-nginx`, `my-postgres`, `db`, `my-node`, `portainer`, `dozzle`, `uptime-kuma` or `npm`. For each one, stop it if it is still running and then remove it. For example:

```
docker stop my-nginx
docker rm my-nginx
```

If `docker rm` reports that a name does not exist, it was never started on your computer, so skip it. Leave every container you do not recognize alone, because another program may have started it.

## Step 3: Remove the network the course created

Remove the network from **Docker networks**. Docker removes a network only when no container is attached to it, so run this after Step 2:

```
docker network rm course-net
```

## Step 4: Remove the volumes the course created

**This step deletes data.** Each volume below stores something you may want to keep, such as a database, the Portainer administrator account, the Dozzle settings or the Uptime Kuma history. Remove only the volumes you no longer need, and leave out any name you want to keep:

```
docker volume rm pgdata portainer_data dozzle_data uptime-kuma npm_data npm_letsencrypt
```

Volume names that are long codes instead of words were created by other programs. Do not remove them.

## Step 5: Check that nothing is left

Run each command below. A list that shows none of the course's names means the cleanup worked. Other programs' containers, networks and volumes can still appear, and you should leave them alone.

```
docker ps -a
docker network ls
docker volume ls
```

In `docker ps -a`, none of the rows should be named `my-nginx`, `my-postgres`, `db`, `my-node`, `portainer`, `dozzle` or `uptime-kuma`. In `docker network ls`, `course-net` and `docker-course_default` should be missing. In `docker volume ls`, `pgdata`, `portainer_data`, `dozzle_data`, `uptime-kuma`, `npm_data`, `npm_letsencrypt` and `docker-course_pgdata` should be missing.

Images, the packages Docker downloaded, stay on your computer. They take disk space but do not run. To remove one, use `docker image rm` followed by its name, such as `docker image rm nginx:stable`. Only remove an image when you are sure no other project uses it.

## What you learned

- Remove the Compose services and volumes first, then the containers and the network by name.
- A volume holds data, so removing it is permanent, and you should check each name before you remove it.
- `docker ps -a`, `docker network ls` and `docker volume ls` show whether anything the course created is still there.

## Where to learn next

The official documentation is the best place to continue. Each link below is maintained by the project itself:

- [Docker concepts: what is a container](https://docs.docker.com/get-started/docker-concepts/the-basics/what-is-a-container/) for the ideas behind the commands you used.
- [Docker Compose documentation](https://docs.docker.com/compose/) for more services, environment files and profiles.
- [Nginx documentation](https://nginx.org/en/docs/) for configuring web servers and proxies.
- [PostgreSQL documentation](https://www.postgresql.org/docs/) for SQL, tables and administration.
- [Node.js documentation](https://nodejs.org/en/docs) for writing the programs that run in your containers.

Congratulations. You installed Docker, ran a web server, a database and a Node.js program, connected them by name, and managed them in a browser.
