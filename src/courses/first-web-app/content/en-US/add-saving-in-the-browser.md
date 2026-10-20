> **Draft:** this lesson is an outline and will be expanded.

Right now, reloading the page probably empties your list. In this lesson you ask the AI assistant to keep the data in the browser's storage, so your items are still there after a refresh. Remember that the storage lives only in this browser on this computer.

## What you will do

1. Reload your app and write down what happens to your items. This is the "before".
2. Tell your AI assistant exactly what you want: "Keep the list after I reload the page, using the browser's own storage. Do not use a server." Ask for one change only.
3. Run the app, add two items, reload, and check that the two items are still there.
4. Test the edges. Remove an item and reload: it should stay removed. Open the app in a private window: it should be empty, because that window has its own storage.
5. Ask the AI: "What happens if the stored data is damaged or empty? Make sure the app does not break." Try to understand the answer in plain words.
6. When it works, commit the change with a message such as "Keep data after reload".

Browser storage is not private from other people who use your computer, and it is not a backup. Do not store passwords or anything sensitive in it.

## Check yourself

- Items are still there after a reload.
- A removed item stays removed after a reload.
- The app still works the first time you open it with nothing stored.
- You committed the change.
