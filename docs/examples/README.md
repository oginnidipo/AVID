# Example content — templates, not real records

The three `example-*.md` files in this folder are **invented**. St Mary's
Primary School, its 412 pupils and its 1,180 books do not exist. They were
written to demonstrate the design of a library record and to show the level of
specificity that makes the transparency wall persuasive.

They live here, outside `src/content/libraries/`, on purpose. A wall of named
schools only works if every school on it is real — fabricated entries would
destroy the exact thing the wall is for, and "we'll remember to delete them
before launch" is not a control. So the site ships with the wall genuinely
empty and a designed empty state that says so.

## To add your first real library

Copy a template into the live folder and edit every field:

```bash
cp docs/examples/example-st-marys-primary.md src/content/libraries/st-marys-primary.md
```

Then either edit that file directly, or use the editor at `/admin`, which gives
you a form with the same fields and explains each one.

Delete nothing from this folder — the templates are worth keeping as a
reference for what a good record looks like.

## What makes a good record

The `result` line is the one that earns trust. Compare:

- **Weak:** "The pupils are delighted with their new library."
- **Strong:** "The library now opens five days a week and 380 pupils hold
  borrowing cards; 1,180 books were issued in the first term."

The second one can be checked. That is the whole point.

The body of the entry follows a **Before / What we did / What changed**
structure in the templates. It is worth keeping: funders read the "before" to
understand the need and the "what changed" to judge whether you delivered.

Include the failures too. A library that closed, a build that slipped two
months, a school that withdrew — writing those up is what makes the successes
believable.
