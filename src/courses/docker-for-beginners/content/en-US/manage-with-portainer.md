---
minutes: 25
outcome: "You will run Portainer on your own computer, create its administrator account, and use its browser page to read logs and start or stop a container."
terms: [docker-socket]
---

In this lesson you install **Portainer Community Edition**, a web page that shows the containers, networks and volumes on your computer. Until now you have used commands to see what Docker is doing. Portainer lets you check the same things in a browser, with buttons to start, stop and read the logs of a container.

Portainer has its own documentation at [docs.portainer.io](https://docs.portainer.io/). Its install page for Docker on Linux uses the `lts` image tag, which is the long-term support line of Portainer Community Edition, and this lesson uses the same tag. The image is listed on [Docker Hub](https://hub.docker.com/r/portainer/portainer-ce/tags).

## Security note: read this first

Portainer manages Docker by talking to the Docker engine through a connection on your computer. Giving Portainer that connection, which is the [Docker socket](../../../glossary/#docker-for-beginners-docker-socket), means Portainer can start, stop and change every container on the computer, and it can do so as an administrator. Anyone who can use Portainer can do the same.

Follow these rules every time you run a tool like Portainer:

- Keep the page on your own computer. The address in this lesson, `https://localhost:9443`, works only on your computer.
- Create the administrator account as soon as the page appears, with a long password that you do not use anywhere else.
- Never make the page reachable from the internet, for example by opening a router port or publishing it on a public server.

## Step 1: Start Portainer

Choose the command for your system. The command is the same in every case, but the terminal is different. Each command starts Portainer in the background, publishes its page on port 9443, and keeps its data in a volume called `portainer_data`.

**Linux and macOS:** type this command in your Terminal window and press Enter.

```
docker run -d --name portainer --restart=always -p 9443:9443 -v /var/run/docker.sock:/var/run/docker.sock -v portainer_data:/data portainer/portainer-ce:lts
```

**Windows:** type the same command in Windows PowerShell and press Enter. Docker Desktop must be running first. Docker's [WSL page](https://docs.docker.com/desktop/features/wsl/) says that the `docker` command works from Windows without a Linux distribution, so PowerShell is enough for this step.

The command mounts the Docker engine's connection into the Portainer container. That mount is the reason for the security rules above. `--restart=always` starts Portainer again whenever Docker starts. The official install page also shows an optional port 8000 for Edge agents. This course does not use Edge agents, so the command leaves it out.

## Step 2: Find the setup token

A new Portainer installation requires a setup token for its first-time setup. Portainer's [setup token FAQ](https://docs.portainer.io/faqs/installing/setup-token) says the token is written to the server logs. Type this command and press Enter:

```
docker logs portainer
```

Look for a line that contains `setup_token=`. The text after the equals sign is the token. Copy it. You need it only for the first-time setup, and the token is not needed again afterwards.

## Step 3: Create the administrator account

Open a browser and go to **https://localhost:9443**. The address starts with `https`, and the page is served from your own computer.

Your browser may show a warning that the certificate is not trusted. Portainer generates a self-signed certificate for its own page, as the official install page explains, so the warning is expected here. Choose the option that shows the details or continues to the site.

On the first-time setup page, enter a username and a password, and paste the setup token from Step 2 into the setup token field. Choose a password you do not use anywhere else. The official FAQ says the administrator must be created within 5 minutes. If the setup page refuses the token, check that you copied the whole value from the logs, then try again. If the time runs out, run `docker restart portainer`, reload the page and repeat the steps.

## Step 4: Find your containers

After setup, open the local environment, which is the Docker engine on your computer, and select **Containers** in the menu. The table lists the containers on your computer, with their names, states and published ports. Each name is a link.

The containers from earlier lessons may not be running now, because the Compose lesson ended with `docker compose down`. To have something to look at, open your `docker-course` folder in a terminal and run:

```
docker compose up -d
```

Then return to the **Containers** page and refresh the list. You should see the three containers from the Compose lesson. Use the search box above the table to type `docker-course` and show only those.

Two other places show what the earlier lessons made:

- **Networks** lists networks by name. Look for `docker-course_default`, the network Compose created.
- **Volumes** lists volumes by name. Look for `docker-course_pgdata` or `pgdata`.

Portainer shows every container on your computer, including some that you did not start. If you do not recognize a container, do not stop or remove it.

## Step 5: Read a container's logs

Select a container's name, such as `docker-course-app-1`, and then open its **Logs** view. The log lines are the same ones that `docker logs` printed in the earlier lessons.

## Step 6: Stop and start a container from the browser

On the container's page, the buttons at the top include **Start**, **Stop**, **Restart** and **Remove**. Select **Stop**, and the status changes to show that the container stopped. Select **Start** to run it again.

Use **Stop** and **Start** only on containers that you started. **Remove** deletes the container, and any work that was not saved outside it is lost.

## Step 7: Optional: keep Portainer in a Compose file

Instead of the long command, you can describe Portainer in a Compose file. Create a folder named `portainer`, and inside it create a file named `compose.yaml` with this content:

```yaml
services:
  portainer:
    image: portainer/portainer-ce:lts
    restart: always
    ports:
      - "9443:9443"
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock
      - portainer_data:/data

volumes:
  portainer_data:
```

Run `docker compose up -d` in that folder. Do not run it while the container from Step 1 is still running, because both would use port 9443. Stop the earlier container first with `docker stop portainer` and `docker rm portainer`.

The official installation steps for Portainer on standalone Docker are in the [Portainer documentation](https://docs.portainer.io/start/install-ce/server/docker/linux). The FAQ on setup tokens explains the flags that skip or customize the token.

## What you learned

- Portainer shows containers, networks and volumes in a browser, and it can start, stop and read the logs of a container.
- Portainer needs access to the Docker socket, so keep it on your own computer and protect its administrator account.
- Stopping or removing a container in Portainer has the same effect as the Docker commands you used before.

## What comes next

Go on to **More community containers**, where you can choose more community tools for your next steps.
