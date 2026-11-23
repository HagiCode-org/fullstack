---
minutes: 15
outcome: "You will find a common Docker problem by its symptom, understand its usual cause and apply its fix."
terms: []
---

Most problems in this course show a message on your screen. Find the symptom here, read its likely cause and try its fix. If your message is not listed, copy its most distinctive words and search the official documentation for them, or search this page with your browser's find command (Ctrl+F on Windows and Linux, Command+F on macOS).

Each entry describes the symptom in plain words, the cause and the fix. Work through the steps in order, and run the command again after each one. The official Docker Desktop troubleshooting guide describes how to find and check the logs, and it is worth reading once you have finished this course.

## Docker is not running or cannot be reached

**What you see:** a command fails with an error saying that it cannot connect to the Docker engine. The wording differs between Docker versions.

**Cause:** the program that runs Docker in the background is not running. Docker Desktop is closed or still starting, or on Linux the Docker service is stopped.

**Fix:** on Windows and macOS, open Docker Desktop and wait until it shows that it is running. On Linux, start the service with `sudo systemctl start docker`, then run your command again.

## Port is already in use

**What you see:** when you start a container, Docker stops with an error that says the host port is already in use.

**Cause:** another program or another container already uses that port on your computer. Port 8080 is a common choice, so it is often taken.

**Fix:** choose a different number on the left of the colon in `-p`. For example, `-p 8090:80` publishes the container on **http://localhost:8090**. To find the container that holds a port, run `docker ps` and read the **PORTS** column.

## Permission denied on Linux

**What you see:** a command fails with a permission error about the Docker socket. Sometimes the error names a file in your `.docker` folder.

**Cause:** your user is not in the `docker` group, so you have to use `sudo` to reach Docker. Or you used `sudo docker` before, which left files in your `.docker` folder that belong to the root user.

**Fix:** add your user to the `docker` group, as described in **Install Docker**, then log out and log back in. Docker's [post-installation guide](https://docs.docker.com/engine/install/linux-postinstall/) also gives the `newgrp docker` command for the current shell. If the error names your `.docker` folder, run `sudo chown "$USER":"$USER" /home/"$USER"/.docker -R` and `sudo chmod g+rwx "$HOME/.docker" -R`. These are the commands from Docker's post-installation guide.

## WSL 2 or virtualization is not available on Windows

**What you see:** Docker Desktop does not start, or it reports a problem with WSL 2 or with virtualization. The exact words depend on the Docker Desktop version.

**Cause:** hardware virtualization is turned off in your computer's BIOS or UEFI settings, or the WSL 2 feature is not installed in Windows.

**Fix:** restart your computer, open the BIOS or UEFI settings, and turn on hardware virtualization. Its name depends on the computer, and Docker's Windows page refers to it as hardware virtualization. Then open Windows PowerShell as administrator, run `wsl --install`, restart when Windows asks, and start Docker Desktop again.

## Container exits immediately

**What you see:** `docker ps` does not list the container, but `docker ps -a` lists it with a status that shows an exit code other than 0.

**Cause:** the program inside the container finished or failed right after it started. Its error is saved in the container's logs.

**Fix:** read the logs with the container's name, for example:

```
docker logs my-node
```

The logs usually name the file or the setting that was wrong. Correct the file or the folder, then remove the broken container with `docker rm <name>` and start it again. If you mounted a folder, check that the folder on your computer is the one you meant.

## Name already in use

**What you see:** a `docker run` command fails because the name you gave is already used by another container.

**Cause:** a container with that name exists. It may be stopped, and a name stays taken until that container is removed.

**Fix:** if you no longer need the old container, stop it and remove it with `docker stop my-nginx` and `docker rm my-nginx`, then run your command again. To keep both, start the new container with another name, such as `--name my-nginx-2`.

## A service cannot be reached by name

**What you see:** a container that should reach another service by its name fails, and `psql` reports that it cannot find the host.

**Cause:** the two containers are not on the same user-defined network. Containers on the default network cannot find each other by name.

**Fix:** start both containers on the same network with `--network course-net`, as in **Docker networks**. With Docker Compose, all services in one `compose.yaml` file share a network already, so use the service name, for example `db`, and check the names with `docker compose ps`.

## Portainer cannot reach Docker

**What you see:** the Portainer setup page reports that it cannot connect to the local Docker environment.

**Cause:** Portainer started without the connection to the Docker engine. That connection is the mount of the Docker socket in the `docker run` command, or the matching `volumes:` line in a Compose file. A command that leaves it out, or one whose path is mistyped, causes this problem.

**Fix:** remove the Portainer container with `docker stop portainer` and `docker rm portainer`, then run the full command from **Manage containers with Portainer** again. Keep the volume `portainer_data`, so the administrator account is kept too.

## What you learned

- Find the symptom, read its cause, then apply the fix in order and run the command again.
- A port in use, a stopped Docker engine and a missing docker group membership cause most first-week problems.
- The Docker Desktop troubleshooting guide and each tool's own documentation are the places to check when a message is not listed here.

## Still stuck?

Note the exact message, the command you typed and the system you use. Then read the official documentation for the product in question. For Docker Desktop, start with Docker's [troubleshooting guide](https://docs.docker.com/desktop/troubleshoot-and-support/troubleshoot/). For Portainer, use the documentation linked in **Manage containers with Portainer**.

## What comes next

Go back to the lesson you were following and run its command again. When everything works, go on to **Clean up and next steps**, which removes what the course created.
