---
minutes: 25
outcome: "You will check your homepage at a phone-sized width, fix what breaks with one commit per fix, and keep the wide layout working."
terms: [responsive-design, viewport, media-query]
---

Many people will open your site on a phone, where the screen is much narrower than a computer monitor. This lesson shows you how to check the page at phone width and ask the assistant for fixes that keep the page readable. By the end the site reads comfortably on a small screen as well as on a wide one.

## What responsive design means

A site that adjusts its layout to the width of the screen uses [responsive design](../../../glossary/#first-website-responsive-design). MDN describes it as designing web layouts so that they are flexible and work well across different device screen sizes. [MDN, Responsive design](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/CSS_layout/Responsive_Design)

Three ideas do most of the work:

- The [viewport](../../../glossary/#first-website-viewport) is the area of the screen where the browser draws the page. A `meta` element with the name `viewport` gives the browser hints about how to size it. MDN's recommended setting is `<meta name="viewport" content="width=device-width" />`, which sets the viewport to match the device's width. [MDN, viewport meta value](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/meta/name/viewport)
- A [media query](../../../glossary/#first-website-media-query) applies CSS only when a condition is true. MDN's example applies styles only when the browser's viewport is equal to or narrower than 1250 pixels. [MDN, Using media queries](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Media_queries/Using) A rule for a narrow screen looks like this:

```css
@media (max-width: 600px) {
  /* styles that apply only on narrow screens */
}
```

- The `max-width` property sets the maximum width of an element. [MDN, max-width](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/max-width) A wide picture with a limit like this can shrink to fit a narrow screen without running past the edge.

## How to look at a phone-sized page

Make your browser window narrow by dragging its edge or corner until it is about as wide as a phone. The narrow window is enough for this lesson. A real phone is a useful extra check later, once the site is published in the next course.

## What to look for

- Text that is cut off or runs past the edge of the screen.
- A page you can drag sideways, which means something is too wide.
- Buttons or links that are too small to press with a finger.
- Pictures that are too big or stretched out of shape.

## What you will do

1. Narrow the window and scroll through the whole page. Write down every problem you see.
2. Ask the assistant for one fix at a time. Describe the symptom in your own words, for example: `At a phone width the project cards run past the right edge. Fix only that.`
3. Reload the page, narrow the window again and check the result.
4. Commit in GitHub Desktop after each fix that works. Write a Summary that names that one fix.
5. Widen the window back to full size and check that the wide layout still looks right. A fix for phones can spoil the large view, and then you need another fix.

## Check yourself

- At a narrow width no text is cut off and the page does not scroll sideways.
- Links and buttons are large enough to press.
- The wide layout still looks right, and each fix has its own commit.

## What comes next

Go on to **Fix a planted problem**, where you practise finding and correcting a mistake that someone else put in the page.
