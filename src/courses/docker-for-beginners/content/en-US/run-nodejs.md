In this lesson you run a small Node.js program without installing Node.js on your computer. The program runs inside a container from the official `node` image. First it prints a message and stops. Then it becomes a tiny web server that your browser can visit.

The image tag is `node:24`, which is the Node.js 24 line. It is an LTS release, meaning Node.js supports it for a long period. The tags are listed on the [official Node.js image page on Docker Hub](https://hub.docker.com/_/node/tags). The programming reference for the server you write is the [Node.js HTTP documentation](https://nodejs.org/api/http.html).

## Step 1: Write a one-file script

Create a folder named `my-node` in a place you can find, such as your Documents folder. Inside it, create a text file named `hello.js` with this content. Use a plain-text editor, and save the file with exactly that name.

```javascript
console.log('Hello from Node.js inside a container');
console.log('Node.js version:', process.version);
```

## Step 2: Run the script inside a container

Open your terminal in the folder that **contains** `my-node`. Use `cd` followed by the folder path, for example `cd Documents` on Windows or `cd ~/Documents` on macOS and Linux. Then type the command for your system. The two versions differ only in how they write the current folder.

**macOS and Linux:**

```
docker run --rm -v "$PWD/my-node:/app" -w /app node:24 node hello.js
```

**Windows (Windows PowerShell):**

```
docker run --rm -v "${PWD}\my-node:/app" -w /app node:24 node hello.js
```

The parts of the command are:

- `--rm` removes the container when it finishes, so nothing is left behind.
- `-v` connects your `my-node` folder to a folder named `/app` inside the container.
- `-w /app` makes `/app` the folder where the command starts.
- `node:24` is the image, and `node hello.js` is the command the container runs.

The first time, Docker downloads the image, which takes a little while. Then the output is:

```
Hello from Node.js inside a container
Node.js version: v24.22.0
```

The version number may be a newer one in the `v24` line. The program ran with Node.js from the image, so your computer does not need Node.js at all.

## Step 3: Turn the script into a web server

Create a second file in the same `my-node` folder, named `server.js`, with this content:

```javascript
const http = require('node:http');

const port = 3000;

// Listens on every network interface, so the published port can reach it.
http.createServer((request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
  response.end('Hello from Node.js running in a container\n');
}).listen(port, () => {
  console.log(`Listening on port ${port}`);
});
```

The program does not stop, because it keeps waiting for visits. Each visit gets the same text in reply.

Start it in the background from the same folder as before. Use the command for your system:

**macOS and Linux:**

```
docker run -d --name my-node -p 3000:3000 -v "$PWD/my-node:/app" -w /app node:24 node server.js
```

**Windows (Windows PowerShell):**

```
docker run -d --name my-node -p 3000:3000 -v "${PWD}\my-node:/app" -w /app node:24 node server.js
```

The new part is `-p 3000:3000`, which publishes port 3000 of the container on port 3000 of your computer. If port 3000 is already in use, the **Troubleshooting** lesson shows how to pick another number.

Type `docker logs my-node` and press Enter. It shows `Listening on port 3000`.

Open a browser and go to **http://localhost:3000**. You should see:

```
Hello from Node.js running in a container
```

## Step 4: Stop and remove the server

Type these two commands, one after the other:

```
docker stop my-node
docker rm my-node
```

Reload the browser page. It no longer loads, because the server has stopped. Your `my-node` folder and its two files stay on your computer.

## What you learned

- `docker run --rm` runs a program in a container and removes the container when the program ends.
- `-v` connects a folder on your computer to a folder inside a container, so the container runs your own files.
- A program in a container must listen on every network interface, or the published port cannot reach it.
- `-p 3000:3000` publishes a port, so a browser on your computer can reach the program.

## What comes next

Go on to **Docker networks**, where containers reach each other by name instead of through your computer's ports.
