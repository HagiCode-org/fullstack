---
minutes: 25
outcome: "You will replace the example values in your app's settings with secrets only you know, keep them out of Git and close the sign-up page."
terms: [secret, gitignore]
---

An app needs some values that only you should know. A database password is one, and a key that signs each login session is another. A value like this is called a [secret](../../../glossary/#docker-self-hosted-apps-secret). If someone else learns it, they can read or change your data. In this lesson you will replace the example secrets in your Reactive Resume `.env` file, keep them out of the places where they could leak and tighten who can sign up.

The guide you used in the last lesson has example values in it. The examples are there so the app starts. They are not safe to keep, and you should never use the example values for a real instance.

## What you will do

1. List every secret in your `.env` file.
2. Keep the `AUTH_SECRET` you generated, and understand what changing it does.
3. Decide whether you need `ENCRYPTION_SECRET`.
4. Give the database a password you generated, and use the same value in both places.
5. Keep the `.env` file out of Git.
6. Restart the app so it reads the new values, then close sign-up.

## Step 1: List the secrets

Open your `.env` file in a text editor. For Reactive Resume there are three values to check:

- `POSTGRES_PASSWORD` is the password the database container starts with.
- `DATABASE_URL` contains the same password inside a connection string. The app uses it to reach the database.
- `AUTH_SECRET` signs sessions and encrypts sign-in data.

`ENCRYPTION_SECRET` is a fourth value, which you add only if you want people to save their own AI or web-access keys in the app. It is optional.

## Step 2: Understand AUTH_SECRET

The Reactive Resume settings reference says that changing `AUTH_SECRET` signs everyone out, and that data encrypted with the old value cannot be read again. That includes two-factor authentication secrets. So generate it once, keep it, and do not change it casually. The same rule appears in the backup lesson, where you will learn why it matters for a restored copy.

## Step 3: Decide on ENCRYPTION_SECRET

If you want the app's AI and web-access features to use keys that each user enters, set `ENCRYPTION_SECRET`. The reference says it must be at least 32 characters, must be different from `AUTH_SECRET`, and is required before personal keys can be saved. Generate it the same way you generated `AUTH_SECRET` in the deployment lesson. If you do not need personal keys, you can leave it empty and skip the feature.

## Step 4: Replace the database password

Pick one new password for the database, generated the same way as before, and write it in two places: `POSTGRES_PASSWORD`, and the password part of `DATABASE_URL`. The two values must match. The guide's own repository also uses default passwords for PostgreSQL and SeaweedFS, and its compose file keeps those ports off the host, so a default password is never a good choice for a copy you run for real.

Save your new values in a password manager as well. Do not keep them in a note on your desktop, a chat window or a shared document.

## Step 5: Keep the .env file out of Git

Git is a tool that records changes to a folder, and a project can be pushed to a website such as GitHub. A [gitignore file](../../../glossary/#docker-self-hosted-apps-gitignore), named `.gitignore`, tells Git which files to skip. The GitHub documentation says you create a `.gitignore` file in the root of the repository to list the files and folders Git should ignore when it makes a commit.

Create a file called `.gitignore` in your `reactive-resume` folder, or open it if it exists. Add a line that reads `.env` and save the file. Do this the same way on a Mac and on Windows, with any plain-text editor. Then check that the `.env` file is listed in `.gitignore`.

Even with this line, never paste your `.env` file into a chat with an AI helper. The file is the secret.

## Step 6: Restart and check

The settings reference says changes take effect after a restart, and that with Docker Compose you run `docker compose up -d` to recreate the container with the new environment. Run this command on a Mac or on Windows, in the `reactive-resume` folder:

```
docker compose up -d
```

Then open `http://localhost:3000` and sign in with your account. If sign-in fails, check that the new database password is the same in both places, and read the log of the app with `docker compose logs --tail=50 reactive-resume`.

## Step 7: Close sign-up

When your own account exists, you can stop anyone else from creating one. Add this line to `.env`:

```
FLAG_DISABLE_SIGNUPS="true"
```

The settings reference says that this stops new accounts from being created, and that existing accounts keep working. Then run `docker compose up -d` again. Your account still signs in. A new visitor cannot create an account.

Some apps can also read a secret from a file instead of a plain setting. Docker Compose can mount a secret as a file under `/run/secrets/` inside a container. Memos supports the same idea with `_FILE` variables. You do not need this for Reactive Resume, but you will see it again in the next lessons.

**Safety note:** a secret that has been pasted into a chat, a screenshot or a public file should be treated as leaked. Replace it, restart the app and check the log.

## Check yourself

- No example password or key remains in your `.env` file.
- Your new secrets are saved in a password manager, and not in a chat or a shared file.
- `.env` is listed in `.gitignore`.
- The app still opens and signs you in after the restart.

## What comes next

Go on to **Back up, upgrade and restore**, where you will copy the database and uploads, practise restoring them and update the app to a newer version.
