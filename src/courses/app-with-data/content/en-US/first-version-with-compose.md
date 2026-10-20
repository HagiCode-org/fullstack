> **Draft:** this lesson is an outline and will be expanded.

Now the AI builds the first version of your app from your brief, and you run it. You use **Docker Compose**, the tool from the Docker course that starts several containers together from one file named `compose.yaml`. Here it starts your app and its database at the same time. By the end you have the app open in your browser, with an entry that survives a restart.

The AI chooses the tools. Node.js for the back end and PostgreSQL for the database are likely choices, and either is fine. You do not need to learn them. If the AI proposes something unusual, ask it to explain why in plain words.

## What you will do

1. Create a new empty folder for the project and save a checkpoint in GitHub Desktop as you learned in the GitHub course.
2. Open the AI assistant in that folder and paste your brief. Add: "Run the database in a container, start everything with Docker Compose, and tell me the exact command to start it and the address to open."
3. Let the AI create the files. Read the short summary it gives you of what it made.
4. Run the start command it gave you. If Docker Desktop is not running, start it first.
5. Open the address in your browser. Add an entry, then reload the page.
6. Stop and start the app again with the commands the AI gave you. Check that your entry is still there.
7. If something fails, copy the full error text back to the AI and ask it to fix it. If three attempts do not work, go back to your last checkpoint and describe the problem differently.
8. When it works, save a checkpoint with a message such as "First working version".

## Check yourself

- The app opens in your browser at an address with a port number.
- An entry you added is still there after you stop and start the app.
- You saved a checkpoint of the working version.
