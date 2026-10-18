In this lesson you run Nginx, a web server, as a container. First you open its welcome page in your browser. Then you replace that page with one of your own, using a folder on your computer. Finally you read the server's logs and remove the container.

Nginx is an official image. This lesson uses the tag `stable`, which is the stable release line of Nginx. The tags are listed on the [official Nginx image page on Docker Hub](https://hub.docker.com/_/nginx/tags), and the project's own documentation is at [nginx.org](https://nginx.org/en/docs/).

## Step 1: Start Nginx and publish port 8080

Type this command in your terminal and press Enter:

```
docker run -d --name my-nginx -p 8080:80 nginx:stable
```

Each part of the command has a job:

- `-d` runs the container in the background, so the terminal is free again.
- `--name my-nginx` gives the container a name you can use in later commands.
- `-p 8080:80` publishes a port. Port 80 is where Nginx listens inside the container. Port 8080 is the door on your computer. Your browser uses 8080, and Docker passes each visit on to port 80 of the container.
- `nginx:stable` is the image and tag to start the container from.

The command prints a long identifier and returns to the prompt. The first time, Docker also downloads the image.

Open a browser and go to **http://localhost:8080**. You should see a page with the heading **Welcome to nginx!**. This page comes from inside the container, not from your computer.

If the command fails with a message containing `address already in use` or `port is already allocated`, another program already uses port 8080. Choose a different number on the left of the colon, for example `-p 8090:80`, and go to **http://localhost:8090**. The **Troubleshooting** lesson covers this in more detail.

## Step 2: Read the logs

Type this command and press Enter:

```
docker logs my-nginx
```

The logs show what the server did. Refresh the browser page and run the command again. A new line appears near the bottom. It contains `GET / HTTP/1.1` followed by the status code `200`, which means the page was delivered successfully.

## Step 3: Stop and remove the container

Type these two commands, one after the other:

```
docker stop my-nginx
docker rm my-nginx
```

`docker stop` stops the container. `docker rm` removes it. Reload the browser page. It no longer loads, because nothing is listening on port 8080. The image is still on your computer, so you can start the same server again at any time.

## Step 4: Serve your own page

Create a folder named `my-site` in a place you can find, such as your Documents folder. Inside it, create a text file named `index.html`. Use any plain-text editor, such as Notepad on Windows or TextEdit on macOS, and turn off rich-text formatting if your editor offers that choice. Paste this into the file and save it:

```html
<!doctype html>
<html>
  <head>
    <meta charset="utf-8">
    <title>My page</title>
  </head>
  <body>
    <h1>Hello from my own page</h1>
    <p>Served by Nginx from a folder on my computer.</p>
  </body>
</html>
```

Now start Nginx again, but this time connect your `my-site` folder to the place where Nginx looks for web pages. This connection is called a **bind mount**. The folder stays on your computer, and the container reads it directly.

First, open the terminal in the folder that **contains** `my-site`. Use `cd` followed by the folder path, for example `cd Documents` on Windows or `cd ~/Documents` on macOS and Linux. Then type the command for your system. The two versions differ only in how they write the current folder.

**macOS and Linux:**

```
docker run -d --name my-nginx -p 8080:80 -v "$PWD/my-site:/usr/share/nginx/html:ro" nginx:stable
```

**Windows (Windows PowerShell):**

```
docker run -d --name my-nginx -p 8080:80 -v "${PWD}\my-site:/usr/share/nginx/html:ro" nginx:stable
```

The part after `-v` has three pieces, separated by colons: the folder on your computer, the place inside the container, and `ro`, which means read-only. Nginx can read your page but cannot change it.

Refresh **http://localhost:8080** in the browser. You should now see **Hello from my own page** instead of the welcome page. If you edit `index.html`, save the file and refresh the browser again to see the change. You do not need to restart the container.

## Step 5: Read the logs and clean up

Run `docker logs my-nginx` again to see the new visits. When you have finished, stop and remove the container with the same two commands as before:

```
docker stop my-nginx
docker rm my-nginx
```

Your `my-site` folder and its `index.html` file stay on your computer, because the container only read them.

## What you learned

- `-p 8080:80` connects a port on your computer to a port inside a container.
- `docker logs` shows what a container printed, including every visit.
- `docker stop` and `docker rm` stop a container and remove it.
- `-v` connects a folder on your computer to a folder inside a container.

## What comes next

Go on to **Run PostgreSQL**, where a database runs in a container and keeps data in a named volume.
