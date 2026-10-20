> **Draft:** this lesson is an outline and will be expanded.

Publishing can go wrong in a few typical ways. In this lesson you learn to recognise each one and to ask your AI assistant for the right fix. The pattern is always the same: look at what you see, copy the exact message, and say what you expected.

## What you will do

For each problem, give your AI assistant the address, what you saw, and what you expected.

1. **A page says "404" or "not found".** The address may be wrong, or the file may not have been published. Check the address, then check that the file is in the published folder.
2. **The home page works, but reloading another page gives 404.** The service looks for a file that does not exist at that address. Ask the AI how your project handles page addresses.
3. **You changed the site but the old version still shows.** Your browser or a CDN may keep an older copy. Reload without the cache, wait a few minutes, and check that the run really finished.
4. **The build failed.** Open the log, copy the first error, and give it to the AI. Do not guess.
5. **The service does not see your branch.** Check that the branch exists, that the service is connected to the right repository and branch, and that a run has finished.
6. **Images or styles are missing.** Their paths may be wrong for the published address.

Remember that everything on a website is public. If you ever find a password or a key in your published files, remove it and change it at once, because anyone could have copied it. Front-end variables are also public to every visitor: never put secrets in a website.

## Check yourself

- You know the first thing to check for each of the six problems.
- You can copy an error message exactly, instead of describing it from memory.
- You know that nothing secret belongs in a website.
