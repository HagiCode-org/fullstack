> **Draft:** this lesson is an outline and will be expanded.

One ability is a feature. Two abilities start to feel like a product. In this lesson you add a second ability next to the first one, in the same small steps. You finish with an app that does two useful things with a model.

Good pairs are easy to build on each other. If the first ability summarises a note, the second can suggest a title, list the open tasks in the note, or answer a question about it.

## What you will do

1. Choose the second ability and write it in the brief in the same way as the first: who uses it, the input, the output, what it must never do and what happens on failure.
2. Add two or more test inputs for the new ability, each with the answer you would accept.
3. Tell your assistant: "Add this second ability. Do not change how the first one works. Make a small change." Keeping the first ability untouched is the important instruction.
4. Run the app and try the new ability with your test inputs.
5. Try the first ability again. A new change can break an old one, so always check both.
6. If the assistant changed more than you asked, go back to the last checkpoint and ask again with a narrower request.
7. When both abilities work, save a checkpoint with a short message that names the new ability.
8. Ask yourself whether the app now sends more text to the model than before. More requests mean more cost, which the next lesson controls.

## Check yourself

- The second ability works on its own test inputs.
- The first ability still gives the answers you accepted before.
- The brief describes both abilities, including what each must never do.
- You saved a checkpoint after both worked.
