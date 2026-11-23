---
minutes: 30
outcome: "You will point your own domain name at a GitHub Pages site, check the DNS records yourself, and turn on HTTPS for the site."
terms: [icp-filing, certificate, dns-record]
---

This is an optional lesson. Your site already works at the default address from the previous lessons, and you can finish the course without a custom domain. A custom domain gives the site a name of your own, such as `example.com`. The steps below use GitHub Pages, because it is the service you have already set up. A [DNS record](../../../glossary/#publish-your-website-dns-record) is the entry that tells the internet's naming system where a name should point, and most of this lesson is about adding the right records.

Buying a domain costs money. Check the first-year price and the renewal price before you pay, and keep the account password private.

## Two kinds of name

A custom domain can be an apex domain, such as `example.com`, or a subdomain, such as `www.example.com`. GitHub's documentation recommends setting up both for a site that uses HTTPS, so that one name redirects to the other. The two need different records, so decide which one your visitors should type first.

## What you will do

**Windows and Mac:** the GitHub steps happen in your browser, and the DNS checks in step 5 use a different command on each system, as shown there.

1. Buy the domain from a company that sells domain names, or use a domain you already own. Ask your AI assistant: "I have a GitHub Pages site and a new domain. Which records do I add at my DNS provider for an apex domain and for a www subdomain?" Compare the answer with GitHub's documentation before you change anything.
2. In your repository, open **Settings**, find **Custom domain**, type your domain, and click **Save**. GitHub recommends verifying the domain first, so read that part of the documentation before you save. If your site is published from a branch, GitHub creates a `CNAME` file on that branch. If it is published with a workflow, no file is created.
3. At your DNS provider, add the records. For an apex domain, create four `A` records that point to GitHub Pages' IP addresses, which are `185.199.108.153`, `185.199.109.153`, `185.199.110.153` and `185.199.111.153`. For `www`, create a `CNAME` record that points to `your-name.github.io`. The `CNAME` must point to your account's address without the repository name. Remove any other default records for the same name, because they can block the certificate.
4. Do not create a wildcard record such as `*.example.com`. GitHub warns that wildcard records put a domain at risk of takeover, even when the domain is verified.
5. Check the records. On a Mac, open Terminal and run `dig www.example.com` with your own name, and check that the answer matches GitHub's addresses. On Windows, open PowerShell and run `Resolve-DnsName www.example.com`. GitHub's documentation notes that `dig` is not included in Windows.
6. Wait. GitHub says DNS changes can take up to 24 hours to propagate. The **Enforce HTTPS** option can also take up to 24 hours to appear.
7. When GitHub has issued the certificate, select **Enforce HTTPS**. If the check says the certificate is not yet created for several minutes, remove the domain, type it again and save.

A [certificate](../../../glossary/#publish-your-website-certificate) is the document that proves the site belongs to the domain. GitHub requests one from Let's Encrypt for your domain once the DNS check succeeds. When HTTPS is on, your browser shows a padlock.

## Mainland China and ICP filing

If you want visitors inside mainland China to reach your site through Alibaba Cloud ESA, the domain must complete an [ICP filing](../../../glossary/#publish-your-website-icp-filing) first. ESA's documentation says this applies to the Global and Chinese Mainland regions, whatever the location of the origin server, and that the Global (Excluding the Chinese Mainland) region does not require it. The filing is a registration with the authorities, and it takes time. Confirm the current rule on the ESA page before you buy or configure anything.

## Check yourself

- Your own domain opens your site, and the browser shows a padlock.
- You can name the records an apex domain and a `www` subdomain need, and what each one points to.
- You know that DNS changes can take up to 24 hours, and whether an ICP filing is needed for the region you choose.

## What comes next

The next lesson is **Choose where to publish**. It compares the three services you have seen and helps you pick one for your next project.
