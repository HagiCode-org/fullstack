---
minutes: 30
outcome: "You will add a projects section with three entries in one layout, link each entry where you expect, and save each change as its own commit."
terms: [link, alt-text]
---

A projects section shows the work you have made, so a visitor sees it quickly. In this lesson you add or improve that section one small request at a time. By the end your site will show three projects in one clear layout, and each change will have its own save point in GitHub Desktop.

## What a good projects section needs

- A clear heading, such as "Projects".
- Three entries, each with a title, a one or two sentence description and, if you have one, a [link](../../../glossary/#first-website-link) or a picture.
- The same layout for every entry, so the section looks tidy.

## About links

A link takes the reader to another page, file or address when it is activated. MDN describes the anchor element, written `a`, as a hyperlink. It uses an `href` attribute to say where the link goes. [MDN, a element](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/a)

```html
<a href="my-project.html">My recipe app</a>
```

The text the reader sees should say where the link goes. Give the assistant the exact address for each project, and ask it to use those addresses. If the assistant invents an address, you will see a link that goes nowhere, so always click each link once.

## About pictures

A picture is written with an `img` element and needs `alt` text. MDN says the alt attribute defines text that can replace the image in the page, and that the browser may show that text when it cannot display the picture. MDN recommends a useful value for alt whenever possible. [MDN, img element](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/img) Write the [alt text](../../../glossary/#first-website-alt-text) as a short description of what the picture shows.

```html
<img src="images/project-one.jpg" alt="Screenshot of the recipe app's start screen" />
```

Use only pictures you own or are allowed to use. If the assistant suggests a picture address you do not recognise, do not keep it. Ask where the address comes from, or leave a clear placeholder and fill it in yourself.

## What you will do

1. Open the site and look at your current projects section. Note what you want to change.
2. Ask for one change only, such as: `Show each project as a card with a title and a short description. Keep the rest of the page exactly as it is.`
3. Reload the page and look at the result.
4. If it is right, commit in GitHub Desktop with a Summary such as `Project cards`. If it is not, say what is wrong in one sentence and ask again.
5. Ask for a second change: `Add a link on each project title. Use the link text and file names I give you for each project.` Supply them yourself.
6. Click each link and check that it goes where you expect. Then commit again.
7. Ask for a third change of your choice, such as spacing, colours or the order of the projects.

## Check yourself

- The site shows three projects in the same layout.
- Every link goes where you expect.
- You made at least two commits in this lesson, each describing one change.

## What comes next

Go on to **Make it work on phones**, where you check the site at a narrow width.
