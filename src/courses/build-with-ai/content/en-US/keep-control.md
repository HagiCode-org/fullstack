> **Draft:** this lesson is an outline and will be expanded.

An AI partner does a great deal of the work, but four kinds of decision stay with you because a mistake in them is costly or hard to undo. In this lesson you learn to spot them. By the end you will have a short list to read before you accept any change.

## 1. Secrets and passwords

A secret is anything that proves who you are or lets a program use a paid service: a password, an access key, a token. Never paste a secret into a request, and never let it be written into a file you save to GitHub, because other people may be able to read the file. If the assistant asks for one, stop and ask yourself why. If a secret has already been saved or shared, treat it as stolen: replace it with a new one on the service's own website.

## 2. Commands that delete data

Watch for commands or actions that remove files, folders, databases or whole projects. Before you approve one, ask the assistant: `What exactly will this delete, and can I get it back?` If you cannot get it back, make a copy first.

## 3. Anything that costs money

Buying a domain, starting a cloud service or calling a paid model can all cost money, sometimes without warning. Ask the assistant what will be charged, check the price on the service's own page, and set a limit if one is offered.

## 4. Things you did not ask for

A dependency is a piece of someone else's code that your project uses. If the assistant adds one you do not recognise, ask what it is for and whether a simpler way exists. Also read the list of changed files after each step, and look for files you did not expect.

## What you will do

1. Write these four headings in a file called `my-checklist.txt` and add one line of your own under each.
2. Ask the assistant: `Is there anything in this project that stores a secret, deletes data, or could cost money? List it.`
3. Read the answer and decide for yourself what to do about each item.
4. Keep the checklist open during every later course.

## Check yourself

- Your checklist has all four headings.
- You know which files in your project, if any, contain a secret.
- You asked what a deleting or paid action does before approving it.

## What comes next

Go on to **Your First Website**, the next course, where you apply everything on a real project.
