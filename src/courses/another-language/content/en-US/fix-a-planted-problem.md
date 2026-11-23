---
minutes: 25
outcome: "You will fix a fault planted in a Python program by sending the AI the exact error text, and confirm the fix by running the program again."
terms: [traceback]
---

Programs break. In this lesson a fault has been planted on purpose in a copy of your Python project, so that you can practise the repair without knowing in advance where it is. You will not read the Python code to find it. You will read the error the program prints, copy it exactly, and give it to the AI with what you were doing.

## Read a Python error

When a Python program fails, it often prints a **[traceback](../../../glossary/#another-language-traceback)**: a list of the files and lines the program was running when it stopped, ending with the error itself. The official Python tutorial states the rule for reading it: ["The last line of the error message indicates what happened."](https://docs.python.org/3/tutorial/errors.html) Read that line first, then look up the top lines only if the AI asks you for them.

The last line has a name in it, the kind of error. For example, `ModuleNotFoundError` is the name of an error that the [Python exception reference](https://docs.python.org/3/library/exceptions.html) defines as "raised by import when a module could not be located". In plain words, the program tried to use a package and could not find it. One common cause is that the package is not installed in the environment that is active, so the fix is to install it there, and the AI will tell you the command.

You do not need to know what every line of the traceback means. You need the exact text and the last line.

## What you will do

1. Ask the AI to make a copy of your project folder and put one small, deliberate fault in the copy. Ask it not to tell you where the fault is. Keep the original project unchanged.
2. Run the copy with the commands for your system, shown below. Note what happens.
3. If the program fails, copy the full error text. Use the copy function of your terminal, or take a screenshot if copying is hard.
4. Send the AI three things: the error text exactly as printed, the step you were running, and what you expected to happen.
5. Ask the AI to fix only the cause, and to say in one sentence what the cause was.
6. Run the program again, and check the rest of your finish checklist, not only the step that failed.
7. Save a checkpoint with a message such as "Fix planted problem".

If three attempts do not work, go back to the checkpoint you saved in **Get the first version running** and describe the problem in other words.

## Run it again

Start the program from the project folder with the commands for your system. Use the copy the AI made.

### Windows

```
.venv\Scripts\activate
fastapi dev main.py
```

### Mac

```
source .venv/bin/activate
fastapi dev main.py
```

If the AI asks you to install a package to fix the problem, run its command in the same activated terminal, using `python -m pip install` followed by the package name the AI gives you. The command is the same on Windows and macOS once the environment is active.

## Mistakes to avoid

- Sending only the last line. The top lines help the AI find the file, so send the whole text.
- Describing the error from memory. Retype nothing; paste exactly what the terminal printed.
- Fixing the symptom. If the fix only hides the error, ask the AI to explain why the original code caused it.

## Check yourself

- The step that failed now works, and the rest of the program still works.
- You gave the AI the exact error text.
- You can say what the cause was in one sentence, even though you did not read the code.

## What comes next

Go on to **Challenge: the same job in a third language**, where you repeat the whole job in a language you choose.
