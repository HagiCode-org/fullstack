---
minutes: 35
outcome: "You will run Reactive Resume on your own computer with two containers, open it in your browser and create a test account."
terms: [health-check]
---

Reactive Resume is a free, open-source resume builder that you can run on your own computer. It is a useful first real app, because it is made of two containers that work together: the app itself and a PostgreSQL database. In this lesson you will create the three files it needs, start both containers and open the app at an address on your own computer.

The steps below follow the official Docker guide for Reactive Resume. The guide changes when the project changes, so if a command here does not match the page, follow the page and note the difference. Use fake details for your test account.

## What you will do

1. Create a new folder for the app, so its files stay together.
2. Create a `.env` file that holds the settings and secrets.
3. Create a `compose.yml` file that describes the two containers.
4. Start the containers and wait until they are healthy.
5. Open the app in your browser and create a test account.

## Step 1: Create the folder

Open a terminal and make a folder called `reactive-resume`. Then move into it. Use the commands for your system.

On a Mac, open Terminal and type:

```
mkdir reactive-resume && cd reactive-resume
```

On Windows, open PowerShell and type these two lines, one after the other:

```
mkdir reactive-resume
cd reactive-resume
```

Every command from now on runs in this folder. Your terminal prompt should show that you are inside `reactive-resume`.

## Step 2: Create the .env file

Create a file called `.env` in the folder with any plain-text editor. Put these lines in it, and keep the placeholder text until you replace it in the next step:

```
# The address people will use to reach your instance.
APP_URL="http://localhost:3000"

# "postgres" is the database service name in compose.yml.
POSTGRES_PASSWORD="replace-with-a-database-password"
DATABASE_URL="postgresql://postgres:replace-with-a-database-password@postgres:5432/postgres"

# Generate with: openssl rand -hex 32
AUTH_SECRET=""
```

`APP_URL` is the address you will type in the browser. It must match the address exactly, so keep `http://localhost:3000` for this test. The same database password must appear in `POSTGRES_PASSWORD` and in `DATABASE_URL`.

## Step 3: Generate the secret values

Generate a value for `AUTH_SECRET`, and another one to use as the database password. Each value is a long random string. Paste the first value after `AUTH_SECRET=`, and paste the second value in place of `replace-with-a-database-password` in both database lines.

On a Mac, open Terminal and run:

```
openssl rand -hex 32
```

On Windows, the official guide asks for PowerShell 7 or newer. Run this command:

```
[Convert]::ToHexString([Security.Cryptography.RandomNumberGenerator]::GetBytes(32)).ToLower()
```

Run the command twice, so that you have one value for each secret. Never write these values in a chat, an email or a shared file.

## Step 4: Create the compose.yml file

Create a file called `compose.yml` in the same folder. Copy the content below exactly as it is. It describes the two containers, their volumes, their health checks and the port that opens on your computer.

```yaml
services:
  postgres:
    image: postgres:18
    restart: unless-stopped
    environment:
      POSTGRES_DB: postgres
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: ${POSTGRES_PASSWORD}
    volumes:
      - postgres_data:/var/lib/postgresql
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postgres -d postgres"]
      interval: 10s
      timeout: 5s
      retries: 10

  reactive-resume:
    image: amruthpillai/reactive-resume:latest
    restart: unless-stopped
    ports:
      - "3000:3000"
    env_file: .env
    volumes:
      - reactive_resume_data:/app/data
    depends_on:
      postgres:
        condition: service_healthy

volumes:
  postgres_data:
  reactive_resume_data:
```

The `restart: unless-stopped` line tells Docker to restart each container whatever its exit code, and to stop restarting it only when the service is stopped or removed. The `depends_on` block makes the app wait until PostgreSQL reports that it is healthy. The [health check](../../../glossary/#docker-self-hosted-apps-health-check) is the regular test that answers that question.

## Step 5: Start the containers

Run this command. It is the same on a Mac and on Windows:

```
docker compose up -d --wait --wait-timeout 180
```

The `-d` option starts the containers in the background. The `--wait` option keeps the command running until the services are running or healthy, with a timeout of 180 seconds. The first start takes longer, because Docker downloads both images and the app creates its database tables.

If the command fails or times out, check the status and the recent log of the app. Run these two commands, one after the other, on either system:

```
docker compose ps
docker compose logs --tail=50 reactive-resume
```

`docker compose ps` shows whether each container is running and which ports it exposes. The log shows the last 50 lines the app wrote. Lesson 7 explains how to read the most common errors.

## Step 6: Open the app and create an account

Open a browser and go to `http://localhost:3000`. Create an account with an email and a password, and make a test resume with made-up details. The guide says that the account works straight away. Reactive Resume also sends a verification email when SMTP settings exist, but you can use the app without opening that email. Without the SMTP settings, no email is sent, so the address stays unverified.

## Check yourself

- The app opens in your browser at `http://localhost:3000`, on your own computer.
- `docker compose ps` shows both the database and the app as running, and the app as healthy.
- You made a test resume with made-up details, and it is still there after you refresh the page.

## What comes next

Go on to **Configure it and keep secrets safe**, where you will replace the example values with secrets you keep private and close the sign-up page when you no longer need it.
