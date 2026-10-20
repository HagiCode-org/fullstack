> **Draft:** this lesson is an outline and will be expanded.

An API key works like a credit card number: anyone who has it can use your account and run up the bill. In this lesson you make sure your key stays secret and your costs have a ceiling. You finish with a safe setup and a plan for what to do if a key leaks.

## What you will do

1. Find where your project keeps the key. It must live in a private settings file or a secret setting of the service you use, never inside a page that visitors can open.
2. Understand why: anything that runs in a visitor's browser can be read by that visitor. Settings used in the front part of a website are **public**, even if they look hidden. A website that calls the model service directly with your key gives the key to everyone. The key belongs on a back part of your app that only you control, and the front part asks that back part for answers.
3. Ask your assistant: "Show me every place my API key can end up, including the project files and the version history." Read the answer.
4. Make sure the private settings file is on the list of files your project must never save to GitHub. Ask your assistant to check this and to show you the evidence.
5. Open your model service's settings and set a **spending limit**, a maximum amount it may charge, and an alert for when you approach it. Choose an amount you are happy to lose.
6. Ask your assistant to limit how often one visitor can use the feature, and how long a text it will accept.
7. Write your leak plan in three lines: turn the key off at the service, create a new key, put the new key in the private settings. Do these at once if the key was ever pasted in a public place, even briefly.

## Check yourself

- The key is not in any project file that is saved to GitHub or shown on the website.
- You set a spending limit and an alert at the service.
- The feature rejects a very long text instead of sending it.
- You have your three-line leak plan written down.
