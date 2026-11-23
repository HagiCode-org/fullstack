---
minutes: 20
outcome: "Your items stay in the app after a reload, and you know which parts of browser storage you can rely on and which you cannot."
terms: [backup]
---

Right now, reloading the page probably empties your list. In this lesson you ask the AI assistant to keep the data in the browser storage you met in the first lesson, so your items are still there after a refresh. The storage stays in this browser on this computer. It is not a [backup](../../../glossary/#first-web-app-backup) of your data, and this lesson explains why.

## Why the list disappears

A reload loads the page again from the beginning. Items that exist only in the page's memory while it is open are lost when that happens. Saving them in browser storage gives the app a place to read them back from when it starts again.

## What you will do

1. Reload your app and write down what happens to your items. This is your "before".
2. Tell your AI assistant exactly what you want: "Keep the list after I reload the page, using the browser's own storage. Do not use a server." Ask for one change only.
3. Run the app, add two items, reload, and check that the two items are still there. Then close the browser window completely, open the app again, and check once more.
4. Test the edges. Remove an item and reload: it should stay removed. Then open a private window, add an item there, close the private window and open it again. The item should be gone, because MDN says that data stored in a private window is deleted when the browser or the tab is closed.
5. Ask the AI: "What happens if the stored data is damaged or empty? Make sure the app does not break." Try to understand the answer in plain words, and ask again about any word you do not know.
6. When it works, commit the change in GitHub Desktop with a message such as "Keep data after reload".

## How the storage holds your data

Browser storage keeps text, not lists. [MDN's storage quotas article](https://developer.mozilla.org/en-US/docs/Web/API/Storage_API/Storage_quotas_and_eviction_criteria) says that the Web Storage API stores string-only key and value pairs. So the AI will normally turn your list into text before it saves it, and turn the text back into a list when the app starts. If that text is damaged, the app may fail to read it. This is why the question in step 5 matters.

## Browser storage is not a backup

Browser storage can be deleted. The same MDN article says that the browser may delete best-effort data when it needs the space, and that the user can delete it through the browser's settings. Do not treat the stored list as the only copy of anything important. Do not store passwords or anything sensitive in it either. The app in this course does not need them.

## Check yourself

- Items are still there after a reload.
- A removed item stays removed after a reload.
- The app still works the first time you open it with nothing stored.
- You committed the change.

## What comes next

The next lesson is Add filters and totals. There you ask for two small features, one at a time, and check each one yourself.
