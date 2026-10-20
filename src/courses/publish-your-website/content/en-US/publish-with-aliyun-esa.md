> **Draft:** this lesson is an outline and will be expanded.

This is Path B, for readers in mainland China, where some foreign services can be slow or unreachable. Alibaba Cloud ESA is a service that serves your site from computers close to visitors. You keep your code on GitHub and build the finished files on the `gh-pages` branch, as in the previous lesson, and ESA serves what is on that branch.

Alibaba Cloud changes its pages from time to time. Follow its current instructions and use your AI assistant to read them with you.

## What you will do

1. Create an Alibaba Cloud account. Real-name verification is required, which means proving your identity with official documents. It can take some time, so start it early. Keep the password private.
2. Ask your AI assistant: "I have a `gh-pages` branch with a file called `esa.jsonc` and a `dist` folder. What do I need to enter in Alibaba Cloud ESA to serve it?" Compare the answer with what the console currently shows.
3. Create a site in the console and connect your GitHub repository and the `gh-pages` branch.
4. Open `esa.jsonc` in the branch and check that it names your site and serves `./dist`.
5. Start the first publication and open the address the service gives you.
6. Push a small change, wait for the run to finish, and check that the new text appears.

Check what the service charges before you enable anything that is not free. Do not put an access key in your repository.

## Check yourself

- Your site opens from the address ESA gives you.
- ESA reads the `gh-pages` branch, and a new push changes the site.
- You know that real-name verification came first and can say why it takes time.
