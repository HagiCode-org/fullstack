---
minutes: 15
outcome: "You will know the difference between a page and an app, and you will have chosen the app you are going to build."
terms: [state, browser-storage]
---

In this course you build a small app that runs in your web browser: an expense tracker or a to-do list, whichever you would really use. You will not write the code yourself. You describe what you want to an AI assistant, run what it makes, and check the result. This first lesson is about looking at the finished version, so you know where you are going before you start.

## Words you will meet

**Page and app.** A page shows information and stays the same until you open another one. An app reacts to you: you type something, press a button, and what you see changes straight away. The browser makes this possible with [JavaScript](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/What_is_JavaScript). MDN, the Mozilla developer reference, describes JavaScript as a scripting language that lets you create dynamically updating content.

**[State](../../../glossary/#first-web-app-state).** Everything the app remembers at this moment, such as the list of expenses you have entered so far. The state is the app's memory. When the state changes, the screen changes with it. React, a tool that an AI assistant may use to build the screen, calls the memory of one part of a screen its state. The [React guide on state](https://react.dev/learn/state-a-components-memory) explains this.

**[Browser storage](../../../glossary/#first-web-app-browser-storage).** A small space inside your browser where a website can keep data on your own computer. Each website has its own storage area. [MDN's Web Storage API article](https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API) says that localStorage data persists even when the browser is closed and reopened. The browser can still delete this data when it needs space, or when you delete the site's data in the browser settings. [MDN's storage quotas article](https://developer.mozilla.org/en-US/docs/Web/API/Storage_API/Storage_quotas_and_eviction_criteria) explains these rules. So browser storage is useful, but it is not a safe place for anything you cannot afford to lose.

## Tools you may meet

The AI assistant may choose tools such as React and TypeScript to build your app. React helps you build the screen out of pieces called components. The [React guide](https://react.dev/learn) describes a component as a piece of the user interface that has its own logic and appearance. TypeScript is a static type checker for JavaScript programs. The [TypeScript handbook](https://www.typescriptlang.org/docs/handbook/intro.html) says its goal is to check a program before it runs. You do not need to learn these tools now. Your job is to describe the result and to check it.

## What you will do

1. Open the finished example that your course provides, and use it for a few minutes. Add three items, remove one, and notice what changes on the screen.
2. Reload the page and see whether your items are still there. Write down your guess before you reload, so you can compare it with what really happens.
3. Write down, in your own words, three things the app can do.
4. Choose which app you will build: an expense tracker or a to-do list. Pick the one you would actually use every week.

Do not worry about the code. The point of this lesson is to notice what the app does from the outside, the same way a person who uses it would.

## Why this matters

A clear picture of the finished app is the standard you will check against later. When your AI assistant builds a first version, you can compare it with this example, item by item, and see what is missing. Without this picture, you would not know whether the first version is right.

## Check yourself

- You can say the difference between a page and an app in your own words.
- You wrote down three things your app must do.
- You chose which app to build, and you can say why.

## What comes next

The next lesson is Write the app brief. There you turn your choice into a short written description that the AI assistant can follow.
