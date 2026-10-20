> **Draft:** this lesson is an outline and will be expanded.

Almost every app you can run with Docker comes with a file named `compose.yaml` (sometimes `docker-compose.yml`). It lists the containers the app needs and how they are connected. You met this kind of file in the Docker Compose lesson of Docker for Beginners, so this lesson does not teach it again. Instead you will let an AI helper explain an unfamiliar file to you, and then you will check four things yourself. At the end you will be able to read any app's compose file without fear.

## What you will do

1. Open the project page of an app you chose in the last lesson and find its compose file. The project's own page is the right source, because blog posts and videos are often out of date.
2. Give the whole file to your AI helper and ask: "Explain this file to a beginner, one service at a time. Say what each service is for."
3. Ask the AI four follow-up questions, one at a time:
   - Which ports does this open on my computer?
   - Where does the app store its data?
   - Which passwords or secret values does it use, and which of them must I change?
   - How would I back up this app?
4. Check each answer against the file yourself. Look for the word `ports` for the first answer and the word `volumes` for the second. If the AI says something you cannot find in the file, ask it to point to the exact line.
5. Write the four answers in a short note and keep it. You will use it again when you back up the app.

**Safety note:** do not run a compose file you have not had explained. A file can start programs on your computer and open ports to your network.

## Check yourself

- Your note answers all four questions: ports, where data lives, passwords, how to back up.
- You found each answer in the file and did not rely on the AI alone.
- You can say which service in the file is the database and which is the app.
