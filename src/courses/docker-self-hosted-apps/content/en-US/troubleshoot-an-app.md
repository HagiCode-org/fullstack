> **Draft:** this lesson is an outline and will be expanded.

Sooner or later an app will not start or its page will not open. That is normal, and the cause is usually one of a few common ones. In this lesson you will learn to find which one, using the logs (the app's own written record of what it did) and the code a browser shows when a page fails to load. You already used Dozzle and the troubleshooting lesson in Docker for Beginners, so this lesson focuses on apps with several containers. At the end you will have a repeatable way to turn an error into a fix.

## What you will do

1. Check whether each container is running. A container that keeps stopping or restarting needs its log read first.
2. Read the log of the container that failed. Look at the last lines before it stopped, because the cause is usually there.
3. Copy the exact error text, not a summary of it, and give it to your AI helper together with the relevant part of the compose file. Ask: "What does this error mean, and what is the most likely cause?" Ask for one fix at a time.
4. Handle the three common problems:
   - The container will not start: the log often names a missing or wrong setting.
   - The port is already in use: another program uses it, so choose a different port on your computer.
   - The page will not open: check the address and the port, then check the number the browser shows. In general, a number starting with 4 means a problem with the request or the address, and a number starting with 5 means a problem inside the app.
5. After each change, start the app again and check whether the error is gone before trying another change.
6. If three attempts fail, undo your changes and ask the AI to start over from the official instructions.

**Safety note:** do not run a command from the AI that deletes volumes, images or containers unless you understand what it removes and you have a backup.

## Check yourself

- You can find and read the log of one container.
- You can say what a port conflict is and how to fix it.
- You solved one deliberately broken setup, such as a wrong port, using your own steps.
