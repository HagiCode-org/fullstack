In this lesson you start your first container, look at it, and remove it. The container runs `hello-world`, a tiny official test image whose only job is to print a message and stop. Every command below is typed in the terminal you opened in the **What is Docker?** lesson.

The image tag is `latest`, the default for `hello-world`. It is the only image in this course that uses that tag, because its output never changes. The options of the `docker run` command are described in the [docker run reference](https://docs.docker.com/reference/cli/docker/container/run/).

## Step 1: Check that Docker answers

Type this command and press Enter:

```
docker version
```

You should see a **Client** part and a **Server** part, as in the **Install Docker** lesson. If the **Server** part is missing or an error appears, start Docker Desktop or the Docker service, then try again.

## Step 2: Run the test container

Type this command and press Enter:

```
docker run hello-world
```

The first time, Docker first prints `Unable to find image 'hello-world:latest' locally` and downloads the image. Then the container starts, prints a message and stops. The message starts with:

```
Hello from Docker!
This message shows that your installation appears to be working correctly.
```

The container has finished its work and is stopped. It still exists on your computer, which you will see in the next steps.

## Step 3: List the running containers

Type this command and press Enter:

```
docker ps
```

`docker ps` lists only containers that are running right now. Because `hello-world` has already stopped, you do not see it here. If you have never started a container before, the list shows only the header line:

```
CONTAINER ID   IMAGE     COMMAND   CREATED   STATUS    PORTS     NAMES
```

If Docker has been used on your computer before, other containers may appear in this list. That is normal.

## Step 4: List all containers, including stopped ones

Type this command and press Enter:

```
docker ps -a
```

The `-a` option means **all**. The list now includes your stopped `hello-world` container. Its row looks similar to this:

```
CONTAINER ID   IMAGE         COMMAND   CREATED         STATUS                     PORTS     NAMES
3c1f0a9e2b7d   hello-world   "/hello"  2 minutes ago   Exited (0) 2 minutes ago             happy_turing
```

Find the row whose **IMAGE** is `hello-world`. Read its **NAMES** value, which is a random name such as `happy_turing`. Your name will be different. The **STATUS** `Exited (0)` means the container finished with no error. A number other than 0 would mean it failed.

## Step 5: Remove the container

Use the name from the **NAMES** column of your own row. Type `docker rm` followed by that name, for example:

```
docker rm happy_turing
```

Docker prints the name again, which confirms the container was removed. Run `docker ps -a` once more and check that your `hello-world` row has gone. Removing a container does not remove the image, so the next run starts faster.

## What you learned

- `docker run` creates a container from an image and starts it.
- A container stops when its program finishes, but it stays on your computer until you remove it.
- `docker ps` shows running containers, and `docker ps -a` shows all of them.
- `docker rm` removes a stopped container by its name.

## What comes next

Go on to **Run Nginx**, where a container serves a web page to your browser.
