---
minutes: 20
outcome: "You will have a brief that describes the job and the rules for the AI, and that stays the same job when the language changes."
terms: [brief]
---

A good **[brief](../../../glossary/#another-language-brief)** describes the job you want done, not the language the AI should use to do it. That is why the Python brief is almost the same as the brief you already have. In this lesson you copy that brief, add the few lines that a new language needs, and add the rules that keep the AI from guessing.

## What changes and what does not

The job stays the same. The app shows the same items, the same filter and the same total as the app in *Your First Web App*. The description of what you want is still the one you wrote in **Write the app brief**.

Three things are new:

- **The language.** You ask for Python 3. The [official Python documentation](https://docs.python.org/3/tutorial/index.html) describes the current release of Python 3, so it is the place to check the language itself.
- **The rules.** You say which actions the AI must ask about first, so that nothing risky happens without your agreement.
- **Your operating system.** You say whether you use Windows or macOS, so that the AI gives you the commands for your system.

## What you will do

1. Open the brief from **Write the app brief** in your project folder. If the project is not in a folder yet, create one now.
2. Add a section called **Language** with one sentence: "Write the app in Python 3, and list every package you add."
3. Add a section called **Rules** with four points, written in your own words:
   - Ask me before you install anything, delete a file or run a command that needs administrator rights.
   - Show me each command you want me to run, and say whether it is for Windows or macOS.
   - Never put a real password, key or account name in the code. Use obvious placeholders such as `YOUR_KEY_HERE`.
   - If a step fails, stop and ask me. Do not change many files at once to make it pass.
4. Paste the finish checklist from the brief in the same place as before. Each item still starts with "I can". The program must pass every item in the list.
5. Ask the AI to read the brief back to you in its own words. If its summary leaves out a rule or changes the job, correct the brief before you go on.

## Why the brief names no framework

The brief says what the app must do, not which framework builds it. A framework is a ready-made set of tools for a kind of program. You may later see the AI choose one, and the next lesson explains what that means. If you name a framework in the brief, you have decided the tools yourself, which is a reasonable choice, but it is a choice you should be able to explain.

## Mistakes to avoid

- Writing the Python rules as code. You do not need to know Python to write a brief. Describe the result you want.
- Leaving out the rules. Without them, a capable AI will sometimes install packages, rename files or change more than you asked for.
- Forgetting the operating system. Windows and macOS use different commands, and the AI will guess if you do not say which one you use.

## Check yourself

- The brief says what to build, in what language, and what the AI must not do.
- The brief asks the AI to ask before risky actions.
- Your finish checklist is part of the brief.

## What comes next

Go on to **Get the first version running**, where the AI writes the first Python version and you run it.
