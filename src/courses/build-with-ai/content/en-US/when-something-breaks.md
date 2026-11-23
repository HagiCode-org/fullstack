---
minutes: 15
outcome: "You can describe a failure with the exact evidence, stop guessing after a few tries, and return to your last working save point."
terms: [rollback]
---

Sooner or later a change will break the site. A page goes blank, a button stops working, or the assistant reports an error you do not understand. This is normal, and it does not mean you chose the wrong tool. What matters is how you respond. This lesson gives you a fixed routine: describe the problem with evidence, try a small number of fixes, and then return to the last version that worked.

The most common mistake is to keep asking for more changes on top of a broken state. Each new change hides the evidence of the last one, and soon nobody, including the assistant, knows what went wrong.

## The routine

1. **Describe the symptom.** Say what you did and what you saw, for example: "After the last change, the contact page is blank."
2. **Paste the evidence unchanged.** If there is an error message, copy the whole message exactly as it appears, including the file names and line numbers. Do not summarise it.
3. **Ask for a cause, not a fix.** Use this wording: `Explain the most likely cause of this error. Do not change any file yet.`
4. **Try one fix at a time.** Apply the fix, then check the site. If it works, commit it.
5. **Count your tries.** If three fixes in a row fail, stop.

## Go back instead of going on

After three failed tries, do not add a fourth change on top of the three. Return to the last working save point instead. In GitHub Desktop, that is the most recent commit where the site worked. Returning to it is a [rollback](../../../glossary/#build-with-ai-rollback): your files go back to an earlier state that you know worked.

Your assistant may also offer its own way back. Claude Code, for example, keeps checkpoints of its file edits and offers a rewind option. Anthropic's documentation warns, however, that checkpoints are not a replacement for version control, and that changes made by Bash commands are not tracked by them. Your commits are the record you can rely on. Source: [Claude Code checkpointing](https://code.claude.com/docs/en/checkpointing).

## What you will do

1. Use a real problem you already have, such as a page that no longer loads or a link that goes nowhere. If you have none, do not invent one: read the routine above until you can follow it.
2. Write down the symptom in one sentence, then paste the exact error text, if there is one, into a file called `error.txt`.
3. Ask the assistant for the most likely cause, using the wording in the routine above.
4. Try one fix, check it, and commit only if it works.
5. If the site still fails after three tries, open GitHub Desktop, find your last working commit in the history, and roll back to it.
6. Open the site again and check that your earlier commits are still there.

Windows and Mac steps are the same. The only difference is where you save `error.txt`: any folder you can find easily on either system will do, as long as it is not inside the code you are changing.

## Check yourself

- You pasted the error text exactly as it appeared, without changing it.
- You stopped after three failed tries and went back to a save point instead of adding more changes.
- The site works again, and your earlier commits are still in the history.

## What comes next

Go on to **Check the result**, where you learn to test the site yourself, rather than trusting the assistant's word that it is finished.
