---
minutes: 25
outcome: "You will run a PostgreSQL database container, write and read a row, and keep the data after the container is replaced."
terms: [named-volume, environment-variable]
---

In this lesson you run a [PostgreSQL](https://www.postgresql.org/docs/) database in a container. You write a row of data, read it back, and then see the difference between a container that loses its data and one that keeps it in a [named volume](../../../glossary/#docker-for-beginners-named-volume).

PostgreSQL is an official image on Docker Hub. This lesson uses the tag `17`. PostgreSQL's [versioning page](https://www.postgresql.org/support/versioning/) lists 17 as a supported release, with end of life on November 8, 2029. The tags are listed on the [official PostgreSQL image page](https://hub.docker.com/_/postgres/tags).

**Warning:** the password in this lesson, `learner-only-change-me`, is for practice on your own computer. Choose your own password if you like, and never reuse a password that you use for anything else.

## Step 1: Start the database

Type this command and press Enter:

```
docker run -d --name my-postgres -e POSTGRES_PASSWORD=learner-only-change-me postgres:17
```

The new parts of the command are:

- `-e POSTGRES_PASSWORD=...` sets an [environment variable](../../../glossary/#docker-for-beginners-environment-variable). The PostgreSQL image reads it to set the password of the database administrator, whose name is `postgres`. The official image page says this is the only variable the image requires.
- The database does not get a published port in this lesson. Only containers on the same network can reach it, and you reach it from inside the container instead.

Wait about 10 seconds, then type this command:

```
docker logs my-postgres
```

When the logs show that the server is running and ready for connections, the database has started. If the logs do not show that yet, wait a few seconds and run the command again.

## Step 2: Write a row and read it back

Open the PostgreSQL command line inside the container. Type this and press Enter:

```
docker exec -it my-postgres psql -U postgres
```

The prompt changes to `postgres=#`. This is `psql`, the PostgreSQL command line. It does not ask for a password here, because you are already inside the container. Type each line below, press Enter, and finish each SQL statement with a semicolon.

```
CREATE TABLE notes (id serial PRIMARY KEY, message text);
INSERT INTO notes (message) VALUES ('hello from a container');
SELECT * FROM notes;
```

- `CREATE TABLE` makes a table called `notes` with two columns.
- `INSERT` writes one row into the table.
- `SELECT * FROM notes;` reads every row back. The result looks like this:

```
 id |        message
----+------------------------
  1 | hello from a container
(1 row)
```

Type `\q` and press Enter to leave `psql`. You are back at your normal terminal prompt, and the database keeps running in the background.

## Step 3: Remove the container and see what is lost

Type these two commands, one after the other:

```
docker stop my-postgres
docker rm my-postgres
```

Now start a new container from the same image, with no volume:

```
docker run -d --name my-postgres -e POSTGRES_PASSWORD=learner-only-change-me postgres:17
```

Wait about 10 seconds, then ask the new database for the row:

```
docker exec -it my-postgres psql -U postgres -c "SELECT * FROM notes;"
```

The answer is an error that says the relation `notes` does not exist. The table was stored inside the first container. When you removed that container, its data went with it. Stop and remove this container before you continue:

```
docker stop my-postgres
docker rm my-postgres
```

## Step 4: Keep the data in a named volume

A volume is storage that Docker keeps outside any container. The `-v` option attaches a volume to a folder inside the container. In this lesson the volume is called `pgdata`, and it is attached to the folder where PostgreSQL 17 stores its data:

```
docker run -d --name my-postgres -e POSTGRES_PASSWORD=learner-only-change-me -v pgdata:/var/lib/postgresql/data postgres:17
```

Wait about 10 seconds, then create the table and the row again, as in Step 2. Run the same `docker exec -it my-postgres psql -U postgres` command, then the three SQL lines, then `\q`.

Now remove the container, exactly as before:

```
docker stop my-postgres
docker rm my-postgres
```

Start a new container with the same volume:

```
docker run -d --name my-postgres -e POSTGRES_PASSWORD=learner-only-change-me -v pgdata:/var/lib/postgresql/data postgres:17
```

Wait about 10 seconds, then read the row again:

```
docker exec -it my-postgres psql -U postgres -c "SELECT * FROM notes;"
```

The row is still there, with the same message. The data survived because the new container used the same volume.

**Note for later:** the data folder changed in PostgreSQL 18. The official image page says the data path is version-specific from version 18 on, so the path `/var/lib/postgresql/data` in this lesson is for version 17. Do not copy it into a command that uses the 18 image.

## Step 5: Clean up the container

Stop and remove the container. Keep the volume, because the later lessons do not need it, but you may want to read the data again.

```
docker stop my-postgres
docker rm my-postgres
```

The volume `pgdata` stays on your computer until you delete it. The **Clean up and next steps** lesson shows how to remove it, and it warns that deleting a volume deletes the data inside it.

## What you learned

- A container's own files disappear when the container is removed.
- A named volume keeps data after the container is removed.
- `docker exec` runs a command inside a running container.
- `psql` is the PostgreSQL command line, and `\q` quits it.

## What comes next

Go on to **Run Node.js**, where a small program runs in a container without Node.js installed on your computer.
