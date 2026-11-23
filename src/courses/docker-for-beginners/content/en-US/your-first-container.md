---
minutes: 15
outcome: "You will run a test container, list running and stopped containers, and remove a stopped container by name."
terms: [tag, exit-code]
---

In this lesson you start your first [container](../../../glossary/#docker-for-beginners-container), look at it, and remove it. The container runs `hello-world`, a small test image whose only job is to print a message and stop. Every command below is typed into the terminal you learned to open in **Your first look at the terminal**.

The `docker run` command creates a container from an image and starts it. If the image is not on your computer yet, Docker pulls it first. The image name `hello-world` has no [tag](../../../glossary/#docker-for-beginners-tag) after it, so Docker uses the default tag, `latest`. Docker's [`docker run` reference](https://docs.docker.com/reference/cli/docker/container/run/) lists every option, and this lesson uses only a few.

## Step 1: Check that Docker answers

Type this command and press Enter:

```
docker version
```

You should see a **Client** part and a **Server** part, as in **Install Docker**. If the **Server** part is missing or an error appears, start Docker Desktop or the Docker service, then try again.

## Step 2: Run the test container

Type this command and press Enter:

```
docker run hello-world
```

The first time, Docker downloads the image before it starts the container, because the image is not on your computer yet. The container starts, prints its message and stops. The container has finished its work, but it still exists on your computer, and the next steps show you where.

## Step 3: List the running containers

Type this command and press Enter:

```
docker ps
```

`docker ps` lists only containers that are running right now. Because `hello-world` has already stopped, it does not appear here. If Docker has never run a container on your computer, the list shows only its header line:

```
CONTAINER ID   IMAGE     COMMAND   CREATED   STATUS    PORTS     NAMES
```

If other containers appear, they were started earlier by you or by another program. That is normal.

## Step 4: List all containers, including stopped ones

Type this command and press Enter:

```
docker ps -a
```

The `-a` option means **all**. The list now includes your stopped `hello-world` container. Find the row whose **IMAGE** is `hello-world`, and read its **NAMES** value. It is a random name, such as `happy_turing`, and yours will be different.

The **STATUS** column shows `Exited (0)` for a container that finished without an error. The number in brackets is the [exit code](../../../glossary/#docker-for-beginners-exit-code). The [`docker ps` reference](https://docs.docker.com/reference/cli/docker/container/ps/) describes it as the container's exit code, and any number other than 0 means the program ended with a problem.

## Step 5: Remove the container

Use the name from the **NAMES** column of your own row. Type `docker rm` followed by that name. For example:

```
docker rm happy_turing
```

Docker prints the name again, which confirms the removal. The [`docker rm` reference](https://docs.docker.com/reference/cli/docker/container/rm/) describes this command. Run `docker ps -a` once more and check that your `hello-world` row has gone. Removing a container does not remove its image, so the next time you run `hello-world`, Docker can start it without downloading it again.

## What the three commands do

- `docker run` creates a container from an image and starts it.
- `docker ps` shows running containers, and `docker ps -a` shows all of them.
- `docker rm` removes a stopped container, which you name after `docker rm`.

If you mix up the commands, remember that only `docker ps -a` shows the stopped container. The container is not lost; it is simply not running.

## Before you go on

Run `docker ps -a` once more, after you remove the container, and look for any `hello-world` row. If you see one, remove it with `docker rm` and its name before you go on. Leaving stopped test containers around is harmless, but it makes later lists harder to read.

## What comes next

Go on to **Read an error and ask for help**, where you learn to read a message that Docker or a program prints when something goes wrong.

## What you learned

- `docker run` creates a container from an image and starts it.
- A stopped container still exists until you remove it.
- `docker ps -a` lists every container, and `docker rm` removes one by its name.
- An exit code of 0 means the container finished without an error.
