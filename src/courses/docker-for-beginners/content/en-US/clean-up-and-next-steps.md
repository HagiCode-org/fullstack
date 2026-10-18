In this lesson you remove everything the course created: the containers, the network and the volumes. You also find the official pages for your next steps. Run the commands in the order given, and check the results at the end.

**Warning:** some of these commands delete data. A **volume** keeps a database's or a tool's files, so removing a volume deletes that data for good. The volumes are named in Step 3, and the warning is there so that you decide before you run them. Do not run `docker system prune`, which removes every unused container, network and image on your computer, including the ones from other projects.

## Step 1: Remove the Compose services and their data

If you still have the `docker-course` folder from the **Docker Compose** lesson, open a terminal in that folder and run this command. It removes the three services, the network Compose created, and the `docker-course_pgdata` volume that holds the database data:

```
docker compose down -v
```

If you added the Adminer service to `compose.yaml`, this command removes it too, because it is part of the same file. If the folder is gone, skip this step. The next step covers the same containers by name.

## Step 2: Remove every container the course started

This command stops and removes each container by its name. The `-f` option stops a container that is still running before it removes it, and it ignores a name that does not exist, so the command succeeds even when some of these containers were never started on your computer.

```
docker rm -f my-nginx my-postgres db my-node portainer dozzle uptime-kuma npm
```

Some names may not be used on your computer. That is fine. The list covers the containers from the Nginx, PostgreSQL, Node.js, networks, Portainer and community-tools lessons. If you started a container with another name, add that name to the list.

## Step 3: Remove the network the course created

Remove the network from the **Docker networks** lesson. The network is removed only when no container is attached to it, so run this after Step 2. If Docker reports that `course-net` is not found, you already removed it, and you can go on:

```
docker network rm course-net
```

## Step 4: Remove the volumes the course created

**This step deletes data.** Each volume below stores something you may want to keep, such as a database, the Portainer administrator account, the Dozzle settings, the Uptime Kuma history or the Nginx Proxy Manager settings. Remove only the volumes you no longer need, and leave out any name you want to keep:

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

In `docker ps -a`, none of the rows should be named `my-nginx`, `my-postgres`, `db`, `my-node`, `portainer`, `dozzle`, `uptime-kuma`, `npm` or start with `docker-course`. In `docker network ls`, `course-net` and `docker-course_default` should be missing. In `docker volume ls`, `pgdata`, `portainer_data`, `dozzle_data`, `uptime-kuma`, `npm_data`, `npm_letsencrypt` and `docker-course_pgdata` should be missing.

Images, the packages Docker downloaded, stay on your computer. They take disk space but do not run. To remove one, use `docker image rm` followed by its name, such as `docker image rm nginx:stable`. Only remove an image when you are sure no other project uses it.

## Where to learn next

The official documentation is the best place to continue. Each link below is maintained by the project itself:

- [Docker get started guide](https://docs.docker.com/get-started/) for the next steps with Docker.
- [Docker Compose documentation](https://docs.docker.com/compose/) for more services, environment files and profiles.
- [Nginx documentation](https://nginx.org/en/docs/) for configuring web servers and proxies.
- [PostgreSQL documentation](https://www.postgresql.org/docs/) for SQL, tables and administration.
- [Node.js documentation](https://nodejs.org/en/docs) for writing the programs that run in your containers.

Congratulations. You installed Docker, ran a web server, a database and a Node.js program, connected them by name, and managed them in a browser.
