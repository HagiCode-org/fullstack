---
minutes: 12
outcome: "You will be able to describe, in your own words, what happens between typing an address and seeing a web page."
terms: [url, https, request]
---

Every time you open a web page, two programs talk to each other: your browser, which you use to look at the page, and a server, which is a computer that keeps the page's files and sends them out when someone asks. Publishing your website means making sure a server holds your files and that other people's browsers can reach it. Before you publish anything, this lesson shows you the path a page takes, so the later steps make sense.

## The address

The text you type into the address bar is a [URL](../../../glossary/#publish-your-website-url). Take the address `https://` followed by `example.com/about` as an example. It has three visible parts:

- **The scheme**, which is `https`. It tells the browser which kind of connection to open. The `s` means the connection is [encrypted](../../../glossary/#publish-your-website-https).
- **The host name**, which is `example.com`. This is the part that identifies the computer you want to reach. In lesson 2 you will learn that a host name like this is called a domain.
- **The path**, which is `/about`. It names the file or page you want on that computer.

Nothing in the address tells the browser where the server physically is. The browser has to look that up first, and that lookup is the first thing that happens.

## What the browser asks for

The browser sends a [request](../../../glossary/#publish-your-website-request) to the server. A request is a short message that says, in effect, "please send me the page at this path." The server reads it, finds the file, and sends back a reply. That reply is called a response, and it usually contains the page itself.

A page is rarely a single file. The first response is an HTML document, which is the text that describes the page's structure. While the browser reads it, it notices other files it needs, such as stylesheets that control the layout, scripts that add behaviour, and images. For each of them it sends another request, and the server answers each one. This is why a page with many pictures can take a little longer to appear.

If the server has the file, the browser shows it. If the server has no file at that path, it sends back a reply that means "not found", and the browser shows an error page instead.

## What the browser does with the reply

Once the browser has the files, it draws the page on your screen. It follows the instructions in the HTML and the stylesheet, places the text and pictures, and runs any scripts. You never see this work, but every page you have ever opened went through these same steps.

## Why this matters for publishing

Look at the path again. The browser needs a server that is reachable, a name that points to that server, and files at the right path. If any one of them is missing, the page does not open.

This also explains a common surprise. A website that opens on your own computer, from a file in a folder, is not yet a website for other people. Your computer is not a server that is always on and reachable from other networks, so a friend's browser has nothing to send its request to. Publishing means putting a copy of your files on a server that is always on, and giving that server a name everyone can type.

## Three words to remember

Three words from this lesson come back often. Each one has an entry in the glossary, and you can open it from the first time the word appears above.

## Check yourself

- You can point to the scheme, the host name and the path in an address.
- You can describe a request and a response in your own words, without looking at this page.
- You can explain why a website that works only on your computer cannot be opened by a friend.

## What comes next

The next lesson is **How publishing works**. It explains the words domain, DNS and CDN, which describe how the name in an address leads to a server near each visitor.
