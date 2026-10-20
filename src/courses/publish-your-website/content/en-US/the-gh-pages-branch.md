> **Draft:** this lesson is an outline and will be expanded.

A **branch** is a separate line of saved changes in your repository. Many projects keep their finished site, ready to serve, on a branch of its own called `gh-pages`. A hosting service then reads only that branch. You build the site once, and any platform can pick up the result. This is how the site you are reading is published.

## What you will do

1. Read how this site does it. Its workflow file, `.github/workflows/fullstack-deploy-gh-pages.yml`, builds the site, checks it, and pushes the finished files to the `gh-pages` branch.
2. Look at what that branch holds at its top level: a file named `esa.jsonc`, a file named `wrangler.jsonc`, and the folder `dist/` with the built site. The two small files tell two different hosting services what to serve.
3. Open `esa.jsonc`. It gives the site a name and says to serve the `./dist` folder. Its install and build commands do nothing, because the site is already built.
4. Ask your AI assistant: "Change my workflow so that it builds my site and pushes the finished files to a `gh-pages` branch." Read its answer before you accept it.
5. Push, wait for the run, and open the `gh-pages` branch on GitHub. Look at the files it holds.

The `gh-pages` branch is rewritten on each publication, so it keeps no history. Your real work and its history stay on the main branch. Never edit the `gh-pages` branch by hand.

## Check yourself

- You can say why a finished site is kept on its own branch.
- Your repository has a `gh-pages` branch that holds only the finished files.
- You can find the main branch history untouched after a publication.
