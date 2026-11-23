---
minutes: 30
outcome: "You will run a first Python version of your app from its own environment, and save a checkpoint of the version that works."
terms: [virtual-environment, framework]
---

Now the AI writes the first Python version, and you run it. For a web app it will probably use a **[framework](../../../glossary/#another-language-framework)**, a ready-made set of tools for building a kind of program. FastAPI is one Python framework for building web apps. Its official site describes it as "a modern, fast (high-performance), web framework for building APIs with Python". You do not need to understand the code to run the program and judge whether it does what you asked.

The Python packages for this project will live in a **[virtual environment](../../../glossary/#another-language-virtual-environment)**, a folder of its own inside the project. Keeping them there means this project's packages do not mix with packages used by other projects on your computer.

## What you will do

1. Create a new folder for this project and open it in the AI assistant you chose in **Choose an AI coding assistant**.
2. Paste your brief from the previous lesson.
3. Ask the AI to list the files it will create, and what each file is for. Read the list before you let it write anything.
4. Ask for the exact commands to run the app, including anything that must be installed first. Ask for Windows and macOS commands separately, as the brief says.
5. Run the commands one at a time, and read the output after each one.

The commands below are the ones this lesson expects. If the AI gives you different file names, use its names. Replace `main.py` with the file that holds the app.

### Windows

Open a terminal in the project folder and run these commands in order.

```
python -m venv .venv
.venv\Scripts\activate
python -m pip install "fastapi[standard]"
fastapi dev main.py
```

The first command creates the environment in a folder called `.venv`. The second activates it, which puts the environment's Python first on your path. The third installs FastAPI and its standard extras into that environment. The fourth starts the development server.

If you use Command Prompt, use `.venv\Scripts\activate.bat`. If PowerShell refuses to run the activation script, the [official virtual environment guide](https://docs.python.org/3/library/venv.html) explains the setting that allows it. Ask the AI before you change any setting.

### Mac

Open Terminal in the project folder and run these commands in order.

```
python3 -m venv .venv
source .venv/bin/activate
python -m pip install "fastapi[standard]"
fastapi dev main.py
```

The `python3` command creates the environment, because on macOS the Python you installed from python.org is called `python3`. After `source .venv/bin/activate`, the word `python` runs the environment's Python, so the third command works in the same way as on Windows.

## Check that it runs

When the server starts, the output gives an address such as `http://127.0.0.1:8000`. Open it in your browser. If the app has an API, the FastAPI documentation is also available at `/docs`, which lists what the program can do.

If the output shows an error, do not change anything yet. Copy the whole error text and go to the lesson **Fix a planted problem** for how to read it. Keep the exact text for the AI.

## Save the list of packages

Once the app runs, save the list of packages it uses so that the same versions can be installed again later. Run this command in the same terminal, with the environment active.

```
python -m pip freeze > requirements.txt
```

The file is a plain list of dependencies. The [pip user guide](https://pip.pypa.io/en/stable/user_guide/#requirements-files) describes requirements files as the place to keep this list. You will need it if you move the project to another computer.

## Save a checkpoint

Use the same method you learned in **Save a checkpoint (commit)** to save this working version. Give it a message such as "First Python version", so that you can return to it if a later change breaks something.

## Safety note

If the AI asks to install something with administrator rights, or to run a command you do not understand, stop and ask it to explain why that is needed. A short answer is a good sign. A long answer you cannot follow is a reason to ask again.

## Check yourself

- The program runs from the steps the AI gave you.
- Most of your finish checklist already passes.
- You saved a checkpoint of the working version.

## What comes next

Go on to **Add a feature**, where you ask for one change in the Python version.
