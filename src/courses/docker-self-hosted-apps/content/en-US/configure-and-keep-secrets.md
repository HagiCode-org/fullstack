> **Draft:** this lesson is an outline and will be expanded.

An app needs some values that only you should know, such as a database password or a key that locks its login sessions. These are called **secrets**. Apps usually read them from a file named `.env` that sits next to the compose file. In this lesson you will replace example secrets with strong ones of your own and learn the rules that keep them safe. At the end your app will use secrets that nobody else has.

## What you will do

1. Open the `.env` file of the app from the last lesson, or the example file the project provides, and list every value that looks like a password, a key or a token.
2. Ask your AI helper: "Which of these values must I change before I use this app for real? How do I make a strong random value for each one?" Check its answer against the project's official instructions.
3. Replace each example secret with a new random value, and keep the values in a password manager rather than in a note on your desktop.
4. Restart the app so it reads the new values, and check that you can still open it.
5. Learn the three rules: never paste a secret into a chat with an AI helper, never commit a `.env` file to GitHub, and never reuse a password from another service.
6. Ask the AI to check that the project's `.gitignore` file lists `.env`, so a later commit cannot include it by accident.

**Safety note:** by default an app started on your own computer is reachable only from that computer or your home network. Do not expose it to the internet until you understand who could reach it, and never expose an app whose secrets are still the examples.

## Check yourself

- No example password or key remains in your `.env` file.
- Your new secrets are saved in a password manager.
- `.env` is listed in `.gitignore`.
- The app still opens after the restart.
