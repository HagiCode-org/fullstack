---
minutes: 30
outcome: "You will add a second ability to your app and prove with a test list that the first ability still works."
terms: [regression-test]
---

One ability is a feature. Two abilities start to feel like a product. In this lesson you add a second ability next to the first one, in small steps, and you make sure the first one still works. You finish with an app that does two useful things with a model, and a test list that shows both of them work.

Good pairs share the same material but do different jobs. If the first ability summarises a note, the second can suggest a title for the note, list the open tasks in it, or answer a question about it. Choose a second ability that uses the same kind of input, so that both abilities can be tested with the same notes.

## Why the first ability must be checked again

Every change can break something that worked before. When you add the second ability, the first one is changed too, even if you did not touch its code. A [regression test](../../../glossary/#add-ai-features-regression-test) is a check that repeats earlier test inputs after a change, to confirm that answers you accepted before are still accepted.

Anthropic's guide to [building evaluations](https://platform.claude.com/docs/en/test-and-evaluate/develop-tests) recommends structuring questions so that they can be graded automatically, for example as multiple choice, string match, code-graded or LLM-graded. It also says that more questions with slightly lower signal are better than fewer questions that a person grades by hand. Both ideas make a regression test practical: a long list that a computer can check in a few seconds.

## What you will do

1. Write the second ability in your feature brief in the same form as the first: who uses it, the input, the output, what it must never do, what happens on failure and its edge cases.
2. Add at least two test inputs for the new ability, each with the answer you would accept.
3. Keep the first ability's test list from the brief. Do not delete any test just because it is inconvenient.
4. Ask your assistant: "Add this second ability. Do not change how the first ability works. Keep the change small." Keeping the first ability untouched is the important instruction.
5. Run the app and try the new ability with its test inputs.
6. Run the first ability's whole test list again. A new change can break an old answer, so always check both abilities.
7. If the assistant changed more than you asked, go back to your last checkpoint and ask again with a narrower request.
8. When both abilities pass, save a checkpoint whose message names the new ability.
9. Ask yourself whether the app now sends more text to the model than before. More requests mean more usage, and the lesson "Keep keys and costs safe" shows how to control it.

## Run the same test twice

Sometimes a model gives different answers to the same input. Anthropic's [guide to reducing hallucinations](https://platform.claude.com/docs/en/test-and-evaluate/strengthen-guardrails/reduce-hallucinations) suggests running the same prompt several times and comparing the outputs, because inconsistencies across outputs can point to hallucinations. For each new ability, run one important test input two or three times and write down whether the answers agree. If they disagree, the feature needs a clearer brief or a narrower task.

## Keep the first ability honest

Your first ability was accepted with specific answers. When you change the prompt for the second ability, the first ability may start to give a longer or differently worded answer that still looks fine but fails your check. Compare each answer with the accepted one, not with your memory of it. If a check fails only because of wording, decide whether the accepted answer needs to change, and write that decision in the brief rather than quietly changing the test.

## Check yourself

- The second ability works on its own test inputs.
- The first ability still gives the answers you accepted before.
- The brief describes both abilities, including what each must never do.
- You saved a checkpoint after both abilities worked.

## What comes next

Go on to **Keep keys and costs safe**. There you make sure the key stays secret, set the spending limit and an alert, and limit how much text the features accept.
