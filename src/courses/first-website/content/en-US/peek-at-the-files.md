---
minutes: 25
outcome: "You will be able to say what HTML, CSS and JavaScript each control, find those files in your project, and check an assistant's explanation against the page."
terms: [html, css, javascript]
---

This lesson is for reading only. You will open a few of the files the assistant made for your site, learn what each kind of file controls, and check the explanation against the page you see in the browser. You will not change anything. Reading first is the habit that keeps you in control of your project.

## Where the files are

Open the `first-website` folder with your computer's file manager: File Explorer on Windows, or Finder on a Mac. Look at the names of the files and folders. A folder named `images` usually holds pictures, and a file named `index.html` usually holds the home page. If the assistant used a framework, it may have created more folders. Ask it to show the folder tree in plain text, so you can see where each file sits.

MDN's tutorial uses the same pattern: the home page content goes in an `index.html` file, and pictures go in an `images` folder inside the same folder as that file. [MDN, Creating the content](https://developer.mozilla.org/en-US/docs/Learn_web_development/Getting_started/Your_first_website/Creating_the_content)

## HTML: the structure of the page

[HTML](../../../glossary/#first-website-html) (HyperText Markup Language) is the code that structures a web page and its content. MDN says HTML tells web browsers how to structure the web pages you visit. Most HTML elements have an opening tag, the content, and a closing tag. For example:

```html
<h1>Your name</h1>
<p>A short introduction.</p>
```

The `h1` element is a top-level heading, and the `p` element is a paragraph. Think of HTML as the skeleton of a house. It decides where the rooms and walls go, but it does not decide what colour they are. [MDN, Basic HTML syntax](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Structuring_content/Basic_HTML_syntax)

## CSS: the style of the page

[CSS](../../../glossary/#first-website-css) (Cascading Style Sheets) is the code that styles web content. MDN's article [Getting started with CSS](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Styling_basics/Getting_started) takes a simple HTML document and applies CSS to it, which is the same job the assistant does for your site. An HTML file usually connects to its stylesheet with a `link` element inside its `head`, as MDN shows for an external stylesheet. [MDN, link element](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/link)

Think of CSS as the paint, furniture and decorations that make the same house feel warm or cold. Two houses with the same walls can look completely different.

## JavaScript: the behaviour of the page

[JavaScript](../../../glossary/#first-website-javascript) is a scripting or programming language that allows you to implement complex features on web pages. [MDN, What is JavaScript?](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/What_is_JavaScript) A page usually brings JavaScript in through a `script` element, which MDN describes as the element used to embed executable code or to refer to JavaScript code. [MDN, script element](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/script)

The browser also turns the page into a logical tree of objects, which MDN calls the Document Object Model. That tree is what connects the page to scripts. [MDN, Document Object Model](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model) Think of JavaScript as the electric switches in a house. It makes something happen when you press a switch, but it does not decide where the walls are.

## Ask the AI to explain a file and check it yourself

1. Pick one file from the folder, such as `index.html`.
2. Ask the assistant: `Explain in one sentence what this file does, then name the part of the page it controls.`
3. Find a piece of text you can see on the page inside the file, such as your name. Find a colour or size you can see on the page inside the stylesheet.
4. If the explanation does not match what you see, do not accept it. Say what you see on the page and ask again.

An explanation counts only when the page shows it. A file you cannot match to the page is a question to ask, not a file to ignore.

## Check yourself

- You can name what HTML, CSS and JavaScript each control.
- You can find those kinds of files in your project folder.
- You can ask the assistant to explain a file and check the answer against the page.

## What comes next

Go on to **Add a projects section**, where you improve the first thing on your list one small change at a time.
