---
minutes: 25
outcome: "You will describe a website problem as a three-part symptom report, get a small correct fix, and judge whether the fix is right before you save it."
terms: [cascade]
---

Real projects often come with problems you did not cause. In this lesson you get a small page with a fault that was put there on purpose, so you can practise finding it. You will describe what you see, find out what is wrong and ask the assistant to fix it. This skill matters every time the assistant changes your site, because a change is only useful when you can judge it.

## The planted page

Create a folder named `planted-problem` inside your `first-website` folder. Save the two files below in it exactly as shown. Both are plain text files, so a plain text editor is enough. [HTML lives inside text files](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Structuring_content/Basic_HTML_syntax), which is why this works.

The file `index.html`:

```html
<!doctype html>
<html lang="en-US">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width" />
    <title>Planted problem</title>
    <link href="style.css" rel="stylesheet" />
  </head>
  <body>
    <h1>Ana Example</h1>
    <p>I build small websites and read about history.</p>
    <a href="my-project.html">My project</a>
  </body>
</html>
```

The file `style.css`:

```css
body {
  background-color: #ffffff;
  font-family: sans-serif;
}

h1 {
  color: #ffffff;
}
```

## Describing a symptom

A symptom is what you see going wrong. A good symptom report has three parts:

1. What you did.
2. What you expected to happen.
3. What happened instead, including any error text copied exactly.

For example: "I opened index.html in my browser. I expected my name at the top of the page. Instead the top line is missing, but the paragraph below it is visible."

## What you will do

1. Open `index.html` in your browser. MDN's tutorial also asks you to open an `index.html` file inside a web browser, so the step is the same as before. [MDN, Creating the content](https://developer.mozilla.org/en-US/docs/Learn_web_development/Getting_started/Your_first_website/Creating_the_content)
2. Look at the page for the fault. Write a three-part symptom report as described above.
3. Paste the report into the assistant and ask: `Find the cause and explain it in plain words before you change anything.`
4. Read the explanation. If it does not match what you saw, say so and ask again.
5. Ask the assistant to make the smallest change that fixes the cause.
6. Reload the page and check that the symptom is gone and the rest of the page is unchanged.
7. Ask the assistant to list every file it changed, and read that list. A good fix changes few files and few lines.
8. Commit in GitHub Desktop with a Summary that describes the fix, such as `Fix the planted problem`.

## Judging a fix

A fix is right when the symptom is gone, nothing else changed, and the explanation matches what you saw. A fix that deletes the heading, or rewrites the whole page, is a bad fix even if the symptom disappears.

This fault lives in the stylesheet, and style rules interact. MDN describes the [cascade](../../../glossary/#first-website-cascade) as an algorithm that defines how property values from different sources are combined. [MDN, Introduction to the CSS cascade](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Cascade/Introduction) So when you judge a fix to a CSS rule, look at every element that rule can reach, not only the one you were looking at.

## Check yourself

- You wrote a three-part symptom report.
- The symptom is gone and the rest of the page is unchanged.
- You read the list of changed files before you committed.

## What comes next

Go on to **Check the site and save it**, where you verify the whole site against your checklist.
