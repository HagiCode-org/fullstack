---
minutes: 20
outcome: "You will be able to say what a language, a runtime and a dependency are, and check whether Python is already on your computer."
terms: [programming-language, runtime, dependency]
---

When the AI tells you what to install, it uses a few words again and again. You do not need to memorise them. You need to recognise them, so that you can understand what it asks and answer its questions without guessing.

## Words you will meet

- **[Programming language](../../../glossary/#another-language-programming-language)**: a set of written rules, with its own words and grammar, that tells a computer what to do. Python is one programming language. JavaScript is another. The AI writes the rules for you; you only need to know which language it chose.
- **[Runtime](../../../glossary/#another-language-runtime)**: the software a program needs while it runs. For Python, the core of the runtime is the Python interpreter, the program that reads Python code and carries out its instructions. The official Python documentation describes how the interpreter [reads and executes a script from a file](https://docs.python.org/3/tutorial/interpreter.html). A program cannot run until its runtime is installed.
- **[Dependency](../../../glossary/#another-language-dependency)**: a ready-made piece of code, written by someone else, that your program uses instead of writing everything itself. Python dependencies are called packages. The tool that installs them is called pip, and [pip installs packages from PyPI](https://pip.pypa.io/en/stable/user_guide/), the public collection of Python packages. Each package has its own author and its own version number, so the same program can behave differently when a package changes.

## What you will do

Check whether Python is installed on your computer. Use the section for your system only.

### Windows

1. Open a terminal, such as Windows Terminal or PowerShell.
2. Type `python --version` and press Enter.
3. If you see a version number that starts with 3, Python is installed.
4. If Windows says the command is not found, install Python. The [official Windows page](https://docs.python.org/3/using/windows.html) says Python is installed through the Python install manager, which you can get from the Microsoft Store or from the [Python downloads page](https://www.python.org/downloads/). After it is installed, open a new terminal and type `python`.
5. If `python` still does not work, read the troubleshooting section of the official Windows page before you continue.

### Mac

1. Open Terminal.
2. Type `python3 --version` and press Enter.
3. If you see a version number that starts with 3, Python is installed.
4. If the command is not found, or the version is older than you expect, install Python from the [Python downloads page](https://www.python.org/downloads/). The [official macOS page](https://docs.python.org/3/using/mac.html) explains that recent versions of macOS include an older, incomplete `python3` that Apple's developer tools use. Never change or delete it. The python.org installer adds its own `python3`, and its default options make that one the command you run.

Write down three facts for the next lesson: your operating system and version, whether Python is installed, and which command worked for you.

## Why the words matter

If the AI says "install the runtime for this language", it means the software that runs your code. If it says "add a dependency", it means it wants a package from a package collection, which will change the files you have. Either request is normal. Before you agree, ask the AI what each one is for and which command installs it. If it cannot say, that is a sign to slow down.

## Check yourself

- You can say what a runtime is and why a program needs one.
- You know whether Python is installed on your computer.
- You can say what a dependency is and who writes it.

## What comes next

Go on to **Write the brief for a Python version**, where you change the description from the first lesson into a brief for the AI.
