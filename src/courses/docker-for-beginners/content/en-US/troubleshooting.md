Most problems in this course show a message on your screen. Find the message here, read its cause and try its fix. If your message is not listed, copy its most distinctive words and search the official documentation for them, or search this page with your browser's find command (Ctrl+F on Windows and Linux, Command+F on macOS).

Each entry gives the message you see, the cause in plain words, and the fix. Work through the steps in order, and run the command again after each one.

## Docker is not running or cannot be reached

**What you see:** a message that the Docker engine cannot be reached. Its wording depends on the version of Docker. For example:

```
failed to connect to the docker API at unix:///var/run/docker.sock; check if the path is correct and if the daemon is running
```

Older versions say `Cannot connect to the Docker daemon ... Is the docker daemon running?`

**Cause:** the program that runs Docker in the background is not running. Docker Desktop is closed, or still starting, or on Linux the Docker service is stopped.

**Fix:** on Windows and macOS, open Docker Desktop and wait until it shows that it is running. On Linux, start the service with `sudo systemctl start docker`, then run your command again.

## Port is already in use

**What you see:** when you start a container, Docker stops with a message such as:

```
failed to bind host port 0.0.0.0:8080/tcp: address already in use
```

Some older versions of Docker say `Bind for 0.0.0.0:8080 failed: port is already allocated` instead.

**Cause:** another program or another container already uses that port on your computer. Port 8080 is a common choice, so it is often taken.

**Fix:** choose a different number on the left of the colon in `-p`. For example, `-p 8090:80` publishes the container on **http://localhost:8090**. To find the container that holds a port, run `docker ps` and read the **PORTS** column.

## Permission denied on Linux

**What you see:** a message that starts with `permission denied while trying to connect to the docker API at unix:///var/run/docker.sock`. Docker's guide for the related case of files left by `sudo` also shows messages like:

```
stat /home/<your-name>/.docker/config.json: permission denied
```

**Cause:** your user is not in the `docker` group, so you have to use `sudo` to reach Docker. Or you used `sudo docker` before, which left files in your `.docker` folder that belong to the administrator user.

**Fix:** add your user to the `docker` group, as described in the **Install Docker** lesson, then log out and log back in. If the message names your `.docker` folder, run `sudo chown "$USER":"$USER" /home/"$USER"/.docker -R` and `sudo chmod g+rwx "$HOME/.docker" -R`. These two commands are the ones from Docker's post-installation guide.

## WSL 2 or virtualization is not available on Windows

**What you see:** Docker Desktop does not start, or it reports a problem with WSL 2 or with virtualization. The exact words depend on the Docker Desktop version.

This entry comes from Docker's official documentation for Windows, not from a test on a Windows computer.

**Cause:** hardware virtualization is turned off in your computer's BIOS or UEFI settings, or the WSL 2 feature is not installed in Windows.

**Fix:** restart your computer, open the BIOS or UEFI settings, and turn on hardware virtualization. The option is often called Intel VT-x, AMD-V or SVM Mode. Then open PowerShell as administrator, run `wsl --install`, restart when Windows asks, and start Docker Desktop again.

## Container exits immediately

**What you see:** `docker ps` does not list the container, but `docker ps -a` lists it with a status such as `Exited (1) 3 seconds ago`. The container printed an error when it stopped.

**Cause:** the program inside the container finished or failed right after it started. Its error is saved in the container's logs.

**Fix:** read the logs with the container's name, for example:

```
docker logs my-node-app
```

For a container that stopped with an error like this one, the logs show the reason:

```
Error: Cannot find module '/app/missing.js'
```

That means the file `missing.js` is not in the folder that the container mounts. Correct the file or the folder, then remove the broken container with `docker rm <name>` and start it again.

## Name already in use

**What you see:**

```
Conflict. The container name "/my-nginx" is already in use by container "...". You have to remove (or rename) that container to be able to reuse that name.
```

**Cause:** a container with that name exists. It may be stopped, and `docker run` does not reuse names, even for stopped containers.

**Fix:** if you no longer need the old container, stop it and remove it with `docker stop my-nginx` and `docker rm my-nginx`, then run your command again. To keep both, start the new container with another name, such as `--name my-nginx-2`.

## A service cannot be reached by name

**What you see:** a container that should reach another service by its name fails with a message like:

```
psql: error: could not translate host name "db" to address: Name or service not known
```

**Cause:** the two containers are not on the same user-defined network. Containers on the default network cannot find each other by name.

**Fix:** start both containers on the same network with `--network course-net`, as in the **Docker networks** lesson. With Docker Compose, all services in one `compose.yaml` file share a network already, so use the service name, for example `db`, and check the names with `docker compose ps`.

## Portainer cannot reach Docker

**What you see:** the Portainer environment wizard says that it could not connect the local environment:

```
We could not connect your local environment to Portainer. Please ensure your environment is correctly exposed.
```

**Cause:** Portainer started without the connection to the Docker engine. The connection is the mount of the Docker socket in the `docker run` command, or the matching `volumes:` line in a Compose file. A command that leaves it out, or a copy of the command with the path mistyped, produces this message.

**Fix:** remove the Portainer container with `docker stop portainer` and `docker rm portainer`, then run the full command from the **Manage containers with Portainer** lesson again. Keep the volume `portainer_data`, so the administrator account is kept too.

## Still stuck?

Note the exact message, the command you typed and the system you use. Then read the official documentation for the product in question. For Docker Desktop, start with Docker's [troubleshooting guide](https://docs.docker.com/desktop/troubleshoot-and-support/troubleshoot/). For Portainer, use the documentation linked in the **Manage containers with Portainer** lesson.

## What comes next

Go back to the lesson you were following and run its command again. When everything works, go on to **Clean up and next steps**, which removes what the course created.
