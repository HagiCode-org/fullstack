In this lesson you install **Portainer Community Edition**, a web page that shows the containers, networks and volumes on your computer. Until now you have used commands to see what Docker is doing. Portainer lets you check the same things in a browser, with buttons to start, stop and read the logs of a container.

Portainer is a community project with its own documentation, which you can read at [docs.portainer.io](https://docs.portainer.io/). This lesson uses the tag `2.45.2`, which is the Portainer 2.45 long-term support release. Its tags are listed on the [Portainer image page on Docker Hub](https://hub.docker.com/r/portainer/portainer-ce/tags).

## Security note: read this first

Portainer manages Docker by talking to the Docker engine through a connection on your computer. Giving Portainer that connection means Portainer can start, stop and change every container on the computer, and it can do so as an administrator. Anyone who can use Portainer can do the same.

Follow these rules every time you run a tool like Portainer:

- Keep the page on your own computer. The address in this lesson, `https://localhost:9443`, works only on your computer.
- Create the administrator account as soon as the page appears, with a long password that you do not use anywhere else.
- Never make the page reachable from the internet, for example by opening a router port or publishing it on a public server.

## Step 1: Start Portainer

Choose the command for your system. The command is the same in every case, but the terminal is different. Each command starts Portainer in the background, publishes its page on port 9443, and keeps its data in a volume called `portainer_data`.

**Linux and macOS:** type this command in a Terminal window and press Enter.

```
docker run -d --name portainer --restart=always -p 9443:9443 -v /var/run/docker.sock:/var/run/docker.sock -v portainer_data:/data portainer/portainer-ce:2.45.2
```

**Windows:** open a WSL terminal (for example, the Ubuntu app from the Start menu). Docker Desktop must have WSL integration turned on for that distribution under **Settings**, then **Resources**, then **WSL Integration**. Type the same command in the WSL terminal, not in PowerShell.

```
docker run -d --name portainer --restart=always -p 9443:9443 -v /var/run/docker.sock:/var/run/docker.sock -v portainer_data:/data portainer/portainer-ce:2.45.2
```

The command mounts the Docker engine's connection into the Portainer container. That mount is the reason for the security rules above. `--restart=always` starts Portainer again whenever Docker starts.

## Step 2: Find the setup token

The first time Portainer starts, it needs a one-time setup token before it creates the administrator. Portainer prints the token in its logs. Type this command and press Enter:

```
docker logs portainer
```

Look for a line that contains `setup_token=`. The text after the equals sign is the token. Copy it. The token is used once, and you do not need to keep it afterwards.

## Step 3: Create the administrator account

Open a browser and go to **https://localhost:9443**. The address starts with `https`, and the page is served from your own computer.

Your browser may show a warning that the certificate is not trusted. Portainer creates this certificate on your computer for its own page, so the warning is expected here. Choose the option to show the details or continue to the site.

The page is titled **New Portainer installation**. Fill in these fields:

- **Username:** type `admin`, or any name you prefer.
- **Password:** at least 12 characters. Use a password you do not use anywhere else.
- **Confirm password:** type the same password again.
- **Setup token:** paste the token from Step 2.

Select **Create user**. You must create the administrator within **5 minutes** of Portainer's first start. If the page says that Portainer timed out for security purposes, run `docker restart portainer`, reload the page and try again.

After you create the user, Portainer may offer **Edge Compute**. Select **Skip**, because this course does not use it. Then the environment wizard appears. Select **Get Started** to use the local environment, which is the Docker engine on your computer.

## Step 4: Find your containers

The home page shows the **local** environment. Select it, then select **Containers** in the left-hand menu. The table lists every container on your computer, with its **Name**, **State**, **Stack**, **Image** and **Published Ports** columns. Each name is a link.

The containers from earlier lessons may not be running now, because the Compose lesson ended with `docker compose down`. To have something to look at, open your `docker-course` folder in a terminal and run:

```
docker compose up -d
```

Then return to the **Containers** page and select the refresh icon at the top right of the list if the new containers do not appear. You should see `docker-course-web-1`, `docker-course-app-1` and `docker-course-db-1`. Use the **Search** box above the table to type `docker-course` and show only those.

Two other places show what the earlier lessons made:

- **Networks** lists networks by name. Look for `docker-course_default`, the network Compose created.
- **Volumes** lists volumes by name. Look for `docker-course_pgdata` or `pgdata`. Volumes with long codes instead of names belong to other programs. Leave them alone.

Portainer shows every container on your computer, including some that you did not start. If you do not recognize a container, do not stop or remove it.

## Step 5: Read a container's logs

Select a container's name, such as `docker-course-app-1`, and then select the **Logs** tab. The log lines are the same ones that `docker logs` printed in earlier lessons. Use the options above the log to wrap long lines or show timestamps.

## Step 6: Stop and start a container from the browser

On the same container page, the buttons at the top include **Start**, **Stop**, **Restart** and **Remove**. Select **Stop**. The **Status** line changes to show that the container stopped. Select **Start** to run it again. The change appears on the **Containers** list too.

Use **Stop** and **Start** only on containers that you started. **Remove** deletes the container, and that can lose unsaved work inside it.

## Step 7: Optional: keep Portainer in a Compose file

Instead of the long command, you can describe Portainer in a file. Create a folder named `portainer`, and inside it create a file named `compose.yaml` with this content:

```yaml
services:
  portainer:
    image: portainer/portainer-ce:2.45.2
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

The official installation steps for Portainer on standalone Docker are in the [Portainer documentation](https://docs.portainer.io/start/install-ce/server/docker/linux). They also explain how to change the port and how to reset the administrator password.

## What you learned

- Portainer shows containers, networks and volumes in a browser, and it can start, stop and read the logs of a container.
- Portainer needs access to the Docker engine, so you keep it on your own computer and protect its administrator account.
- Stopping or removing a container from Portainer has the same effect as the Docker commands you used before.

## What comes next

Go on to **More containers**, where you can choose more community tools for your next steps.
