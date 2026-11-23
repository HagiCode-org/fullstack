---
minutes: 30
outcome: "You will import a GitHub repository into Alibaba Cloud ESA Pages, choose the right acceleration region for your visitors, and publish a site that redeploys after each push to the production branch."
terms: [edge-node, access-key]
---

This is an optional lesson, Path B, for readers who need their site to reach visitors in mainland China. Alibaba Cloud Edge Security Acceleration, called ESA, serves your site from [edge nodes](../../../glossary/#publish-your-website-edge-node), which are servers placed close to the visitors who ask for it. ESA Pages can import a GitHub repository, build it, and serve the output folder. This lesson follows the steps in Alibaba Cloud's own guide for importing a repository.

Before you start, know three things. Alibaba Cloud requires individual identity verification before you can buy its products. ESA's acceleration regions have different rules about ICP filing, which is covered in step 3 below. And ESA's billing has a plan fee plus pay-as-you-go charges for anything over the plan, so read the billing page before you add a site.

## What you will do

**Windows and Mac:** the console steps happen in your browser. The `npm` commands in step 5 work the same way on both systems, if you run them on your own computer to test the build first.

1. Create an Alibaba Cloud account. Individual identity verification is required before you can purchase cloud products. You can verify with Alipay, which needs the Alipay mobile app because the web version is not supported, or with a face scan on a computer. Keep the password private, and do this early because each method needs your phone.
2. Activate Functions and Pages in the ESA console, then go to **Edge Computing and AI**, then **Functions and Pages**. Click **Create**, choose the **Import from GitHub Repo** tab, and click **Add GitHub Accounts**. Authorize the connection on GitHub with **Install & Authorize**.
3. Choose the acceleration region. ESA says you should choose the region that matches where your users are. The Chinese Mainland region uses servers only inside mainland China, and the Global region uses servers worldwide. Both of these require an ICP filing for your domain, and ESA's documentation says this applies regardless of where your origin server is. The Global (Excluding the Chinese Mainland) region does not require an ICP filing. Confirm the rule on the ESA page before you choose.
4. Select your repository. The list shows only public repositories by default, so a private one must be found by typing its name in the search box.
5. Configure the build. The production branch defaults to `main`. An install command such as `npm install` and a build command such as `npm run build` are entered here if your project needs them. Enter the **Static Assets Dir**, which is the folder in the build output that ESA serves, such as `./dist`. Then click **Start Deploy**.
6. When the build finishes, open the preview domain ESA shows. ESA says this address is for testing only, and that you need an access token, which is valid for 60 minutes, to open it.
7. Push a small change to `main`. ESA builds the production branch again, so reload the preview after the build finishes and check that the new text is there.

## Environment variables and keys

ESA lets you set environment variables for the build, which your build code can read through `process.env`. Use them for settings such as the name of a site, never for secrets that grant access. A cloud key that lets a program act for your account is called an [access key](../../../glossary/#publish-your-website-access-key). An Alibaba Cloud access key has two parts, an ID and a secret, and the secret is shown only once when it is created. Alibaba Cloud recommends a RAM user access key instead of one for the account itself, because an account key has unrestricted permissions. The secret cannot be viewed again after it is created, so store it somewhere safe at that moment. If a secret is lost or leaks, create a new pair, store its secret, and then disable or delete the old pair. Keep any key out of your repository.

## Check yourself

- Your site opens from the preview address that ESA gives you, using the access token.
- A push to the production branch starts a new build, and the new text appears after it finishes.
- You can explain why real-name verification comes first, and which acceleration regions need an ICP filing for your domain.

## What comes next

The next lesson is **Custom domain and HTTPS (optional)**. It explains how to give a site its own name, and what an ICP filing means for that name.
