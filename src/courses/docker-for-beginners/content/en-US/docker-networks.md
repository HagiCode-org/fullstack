In this lesson you connect containers to each other. A **network** lets containers find one another by name, and you prove it by running a command in one container that reaches a database in another. You also see why a container on the default network cannot do the same thing.

Two ways of reaching a container are easy to mix up:

- **A published port** connects your computer to a container. Your browser uses a published port such as `8080` to reach Nginx.
- **A network path** connects one container to another. A container reaches a second container by the second container's name and its own port, such as `db:5432`. No port of your computer is involved.

## Step 1: Create a network

Type this command and press Enter:

```
docker network create course-net
```

Docker prints a long identifier. The network is called `course-net`, and every container you attach to it can find the others by name.

## Step 2: Start a database on the network

Type this command and press Enter:

```
docker run -d --name db --network course-net -e POSTGRES_PASSWORD=learner-only-change-me postgres:17
```

The new part is `--network course-net`, which attaches the container to your network. The container is named `db`. This lesson uses the tag `17` for PostgreSQL, as in the **Run PostgreSQL** lesson. Wait about 10 seconds for the database to start before the next step.

## Step 3: Reach the database by name from a second container

Type this command and press Enter. It starts a second, short-lived container on the same network. That container runs the `psql` command line and asks the database `db` for one line of text:

```
docker run --rm --network course-net -e PGPASSWORD=learner-only-change-me postgres:17 psql -h db -U postgres -c "SELECT 'reached db by name' AS result;"
```

The parts of the command are:

- `--rm` removes the container as soon as its command finishes.
- `-e PGPASSWORD=...` gives `psql` the password, so it does not stop to ask for one.
- `psql -h db` means "connect to the host named `db`". The name is resolved to the database container's address because both containers are on `course-net`.

The result is:

```
        result
----------------------
 reached db by name
(1 row)
```

The second container reached the first one by its name, with no published port in between.

## Step 4: Try the same thing on the default network

Docker also has a default network that every container joins when you do not choose one. Run the same kind of command without `--network course-net`:

```
docker run --rm -e PGPASSWORD=learner-only-change-me postgres:17 psql -h db -U postgres -c "SELECT 1;"
```

This time the command fails. `psql` reports that it cannot translate the host name `db`:

```
psql: error: could not translate host name "db" to address: Name or service not known
```

The database is still running, but this container is on the default network, and the default network does not let containers find one another by name. Only a network you create yourself, like `course-net`, provides that. The wording after the host name can differ a little between systems, but the message always names `db`.

## Step 5: Know which path is which

Your browser reaches a container through a published port. The database in this lesson publishes no port, so nothing on your computer can connect to it, and only containers on `course-net` can reach it. Publishing a database port, such as `-p 5432:5432`, would let programs on your computer connect as well. Do that only when you need it, and set a strong password when you do.

Containers on the same network use the name and the port inside the container. Inside `course-net`, the name `db` and the port `5432` are the address of the database.

## Step 6: Clean up

Stop and remove the database, then remove the network. A network can only be removed when no containers are attached to it:

```
docker stop db
docker rm db
docker network rm course-net
```

## What you learned

- A user-defined network, such as `course-net`, lets containers find each other by name.
- The default network does not provide name lookups between containers.
- A published port connects your computer to a container. A network connects one container to another.

## What comes next

Go on to **Docker Compose**, which creates a network for you and starts several services together.
