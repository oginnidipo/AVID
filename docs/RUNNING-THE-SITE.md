# Running the AVID website

**A guide for Ade and the AVID team. No technical knowledge assumed.**

This is everything you need to run theavidfoundation.org yourself: how to change
what is on it, who to contact when something breaks, what has to be paid for and
when, and which few things still need a developer.

Read Part 1 now. Come back to the rest when you need it.

---

## Contents

- [Part 0: Three things to do first](#part-0-three-things-to-do-first)
- [Part 1: What the website is made of](#part-1-what-the-website-is-made-of)
- [Part 2: Changing things yourself](#part-2-changing-things-yourself)
- [Part 3: Photographs, and the consent rule](#part-3-photographs-and-the-consent-rule)
- [Part 4: The four email addresses](#part-4-the-four-email-addresses)
- [Part 5: The forms, and the limit to watch](#part-5-the-forms-and-the-limit-to-watch)
- [Part 6: What is deliberately left blank](#part-6-what-is-deliberately-left-blank)
- [Part 7: The yearly calendar](#part-7-the-yearly-calendar)
- [Part 8: Being found on Google](#part-8-being-found-on-google)
- [Part 9: If something looks wrong](#part-9-if-something-looks-wrong)
- [Part 10: When you need a developer](#part-10-when-you-need-a-developer)

---

## Part 0: Three things to do first

Handover is not complete until these are done.

### 1. Look after your access key, and know when it expires

You already have what you need to sign in: your developer has issued you an
**access token**, a long string of characters that lets you edit the site. Part 2
explains how to use it.

Three things to do with it now.

**Put it in a password manager today.** That token is the equivalent of a
password for the live website. If it is currently sitting in a WhatsApp thread or
an email, move it somewhere safe and delete it from there. Anyone who has it can
change the site.

**Find out its expiry date and put it in the calendar.** Access tokens usually
expire, often after a year. When it does, you will simply be refused at sign-in
with no warning beforehand. Ask your developer for the exact date, diarise it a
fortnight early, and ask for a fresh token before it lapses rather than after.

**Know what it does not give you.** The token lets you edit content. It is not an
account of your own, so every change you make is recorded under your developer's
name rather than yours. That is fine for now and it does not limit what you can
do, but it means there is no record of who changed what.

When AVID is ready, the tidier arrangement is your own free **github.com** account
added as a collaborator, registered to an AVID address, with two-factor
authentication switched on. That gives you a proper trail and access that does not
expire. Worth doing when there is more than one person editing, and worth doing
for a second director regardless, so the foundation is never one person away from
losing control of its own site.

### 2. Move the accounts into AVID's name

Four accounts sit behind this website. Each one should be registered to AVID,
with an AVID email address, and at least two directors able to get in.

| Account | What it does | Who has it today |
|---|---|---|
| Dynadot | The domain name and the email addresses | |
| GitHub | The website's files, and the hosting | Your developer. You hold an access token |
| Formspree | Delivers the three contact forms | |
| Google Search Console | Shows how people find you on Google | |

Fill in the right-hand column, keep it with your governance records, and store
the passwords in a shared password manager rather than a spreadsheet or a
notebook. Turn on two-factor authentication on Dynadot and GitHub at minimum.

Losing the domain name is the one mistake that is genuinely hard to undo. Every
other problem on this list is recoverable.

### 3. Confirm the domain renews automatically

Sign in to Dynadot, find theavidfoundation.org, and check that **auto-renew is
switched on** for both the domain and the email. Check the card on file has not
expired.

If the domain lapses, the website goes dark and the email addresses stop
receiving. Someone else can then buy the name. Put the renewal date in the
calendar as well, rather than relying on auto-renew alone.

---

## Part 1: What the website is made of

Five separate pieces, only two of which cost money.

**The domain name, theavidfoundation.org.** Bought from Dynadot. Paid yearly.
This is AVID's address on the internet.

**The email addresses.** Also from Dynadot, on the same yearly bill. Four
mailboxes, covered in Part 4.

**The hosting.** The pages themselves are stored and served free by GitHub. It
does not go down, it does not send bills, and there is nothing to maintain. It
handles any amount of traffic without you doing anything.

**The forms.** The three forms on the site are delivered by a service called
Formspree, on its free plan. Details, and its one limit, in Part 5.

**The editor.** A page at theavidfoundation.org/admin where you add libraries,
news, photographs and team members without touching code. Free.

There is no database, no server to restart, and no software to update. The site
is built once and served as finished pages, which is why it is fast and why
there is so little that can break.

**What this costs you each year:** the Dynadot bill for the domain and email.
Nothing else, unless you outgrow the free form plan.

---

## Part 2: Changing things yourself

### Getting in

Go to **theavidfoundation.org/admin**. Choose the option to sign in with a
**personal access token** and paste in the token your developer gave you.

Do this once now, while nothing is urgent, so you know it works and you are not
learning it the first time you need it. If it is refused, the likely reason is
that the token has expired. See Part 0.

You will then see four sections.

| Section | What it holds |
|---|---|
| **Libraries** | One entry per school. This is the transparency wall. |
| **News** | Openings, updates, anything you want to announce. |
| **Photos** | The sliding picture galleries on the home page and For Schools. |
| **Board & Team** | The founder, directors, key volunteers. |

Every field has a label and a note explaining what to put in it. Nothing is
guesswork.

### What happens when you save

Your change is saved as a **draft** first. Nothing is public yet. You can leave
it, come back, and change it again.

When you are ready, publish it. The site then rebuilds itself and your change is
live in **about two minutes**. You do not need to tell anyone or do anything
else.

### Adding a library

This is the most important thing you will do, because the Libraries section is
what makes the transparency claim on the site true rather than decorative.

1. **Libraries**, then **New Library**.
2. Fill in the school's name, where it is, and the status: planned, in progress,
   or open.
3. **Month** is the month it opened or is due to open, written as `2026-11`.
4. **Books placed**, once you know the number.
5. **The one-line result** is the sentence a donor reads. Be concrete. "412
   pupils now have a timetabled reading period" says more than "a successful
   refurbishment".
6. Tick which of the five components the project included.
7. **Sponsor credit** only if that donor has asked to be named. Leave it blank
   otherwise.
8. **The full record** is the longer account: what the room was like, what you
   did, what it cost, what changed.
9. Save as draft, read it back, publish.

The numbers on the Impact page are counted from these entries. Add a library
here and the totals update themselves. This is deliberate: no one can type an
impact figure into this website that is not backed by a real record.

### Adding a news story

**News**, then **New News story**. Title, a short summary, then the story.

The **Draft** switch keeps something unpublished without deleting it. Useful for
writing ahead of an announcement.

News stories also go out on the site's news feed, so anyone subscribed sees them
without you sending anything.

### Adding a photograph to the galleries

**Photos**, then **New Photo**. Read Part 3 before your first one, because there
is a rule the site enforces.

- **Description of the photograph** is required. It is read aloud to blind
  visitors and shown if the image fails to load. Describe what is happening:
  "Children sitting on a mat while a teacher reads aloud", not "library photo".
- **Caption** is optional and appears under the picture.
- **School or place**, for example "St Mary's Primary, Surulere".
- **Order** controls the sequence. Lower numbers come first.
- **Where it appears**: the home page, For Schools, or both.
- **Written photo consent is on file** must be ticked. See Part 3.

### Adding a board member

**Board & Team**, then **New Person**. Name, role, a short biography, and
**Order** for where they appear. The founder is 1.

### Changing wording on the pages themselves

Headings, the mission statement, the case for action and similar text are not in
the editor. They live in the site's files.

You can still change them: go to **github.com/oginnidipo/AVID**, find the file,
click the pencil icon, edit the plain English text, and save. The site rebuilds
itself the same way.

It is more exposed than the editor, in that you can see the code around the
words. **The safety net is real, though: if you break something, the build fails
and the previous working version stays live.** A broken edit cannot take the
site down. It simply does not get published.

For your first one, ask your developer to walk you through it. It is
straightforward afterwards.

### If you make a mistake

Every change is recorded and can be undone. There is a complete history of every
edit, who made it and when.

If you delete something by accident, do not panic and do not try to retype it
from memory. Ask your developer to restore it from the history. It takes a
minute and comes back exactly as it was.

---

## Part 3: Photographs, and the consent rule

### The four pictures on the site are drawings

The pictures in the galleries are illustrations, drawn for AVID in the site's
own colours. They are placeholders, and they are honest ones: a drawing makes no
claim to be a particular child in a particular school.

They were not photographs because AVID has not photographed a library yet, and
freely usable photographs of Nigerian school libraries essentially do not exist.
A stock photograph of an unrelated Western library sitting above AVID's
transparency wall would quietly undermine the thing that wall exists to do.

**Replace them as soon as you have your own photographs.** Add the real ones in
**Photos** and delete the drawings. Nothing else needs to change.

### The consent rule

**Before photographing pupils, get written consent from the school and from a
parent or guardian for every identifiable child.** Keep the signed forms.

The website enforces this. If a photograph is added without the consent box
ticked, **the site refuses to publish it and the build stops** with a message
naming the file. This is intentional. It is a deliberate guard, not a fault, and
the way to clear it is to obtain the consent and then tick the box, never to
work around it.

Practical guidance:

- Photographs of the room, the shelves and the books need no consent and are
  often the better image anyway.
- Children from behind, or in the middle distance, carry far less risk than
  faces.
- If a parent later withdraws consent, delete the entry in **Photos**. It is
  gone from the live site within two minutes.

There is a fuller note for whoever runs your first shoot in
`docs/PHOTO-CONSENT.md` in the repository.

---

## Part 4: The four email addresses

All four are real mailboxes on Dynadot and all four have been tested.

| Address | For | Where it appears |
|---|---|---|
| **info@** | General enquiries | Contact page, footer |
| **applications@** | Schools applying for a library | For Schools |
| **partners@** | Funders, corporate partners, in-kind offers | Get Involved |
| **donate@** | Anything about giving | The give buttons |

Decide now who reads each one, and check them on a schedule. The site tells
people a real person will read what they send, so the promise needs keeping.

**Check the spam folder for the first few weeks.** New domains often land there
until the address builds a history, and a school's application going unread is
the worst version of this problem.

One thing worth knowing: applications contain personal information about named
individuals at named schools. The privacy policy commits AVID to storing them
securely, not sharing them beyond what delivery requires, and deleting
unsuccessful applications within 24 months. That is a real commitment. Decide who
has access, and diarise the deletion pass.

---

## Part 5: The forms, and the limit to watch

Three forms: the school application, the general enquiry, and the partnership
enquiry. Each one sends an email with every answer laid out under its real
question, so an application arrives readable.

### The limit

The free Formspree plan carries **50 submissions per month across all three
forms combined.** For a foundation at AVID's current stage that is comfortable.

It will not stay comfortable. An application window, a press mention or a
successful campaign can pass 50 in days, and **once the limit is reached, further
submissions are not delivered.** A head teacher who fills in a long application
would get an error rather than a confirmation, and you would never know they had
tried.

**What to do:** watch the Formspree dashboard when you open an application
window or launch a campaign. If you expect volume, upgrade before it rather than
after. It is inexpensive, and the cost of a lost application is much higher.

### Two things the free plan does not do

**It does not keep your submissions.** History is limited and there is no
permanent archive. Treat the email as the record, and move applications into a
spreadsheet once they start arriving, because you will want to sort and compare
them.

**It does not accept file attachments.** The application form deliberately does
not ask for photographs, and invites applicants to email them instead, which
always works. This is safer than the alternative: an application carrying a file
it cannot store could be rejected outright, and the school would lose the whole
form.

---

## Part 6: What is deliberately left blank

Four things are intentionally absent. Each is written so that the site stays
truthful while it waits, and each has a note in the code saying exactly what to
do when the real answer arrives.

### How to give

The site currently says nothing about how to donate, because the Interac account
is still being set up and AVID has not chosen to announce it. The give buttons
open the donate@ inbox, so nobody who wants to give is left with nowhere to go.

**When Interac is ready, tell your developer.** It is a small change, but not a
one-line one: two sentences on Get Involved and in the privacy policy currently
describe a generic payment provider, and an Interac transfer goes straight to
AVID's own bank instead. Those need rewording at the same time, or the site will
describe something that is not happening.

You may want a neutral line in the meantime, along the lines of "Write to
donate@theavidfoundation.org and we will tell you how." That is your call, and it
is a five-minute change.

### Charitable registration

The registration number is blank, so the site says registration is in progress
and **never implies that tax receipts are issued**. This is deliberate. Under
Canadian rules, official donation receipts can only be issued once the CRA grants
registered charity status.

**When it is granted, give your developer the number.** Adding it switches on
the receipt wording everywhere it belongs, in one change. Do not add receipt
wording by hand before then.

### The impact figures

The site shows two sets of numbers, kept apart on purpose. **Goals** are what the
first cohort is funded to achieve. **Actual** is what has been delivered and
verified, and it currently reads zero.

Zero is the correct and honest number today. The site will never present a goal
as an achievement, and the actual figures come from the Libraries entries you
add, so they cannot be inflated by typing.

### Phone number and social media

Both blank, which hides them completely rather than showing an empty space. Give
your developer a phone number or social profile links whenever you have them.

---

## Part 7: The yearly calendar

Six recurring items. Put them in a shared calendar rather than one person's head.

| When | What |
|---|---|
| **Now** | Confirm Dynadot auto-renew, and the card on file |
| **Now** | Access token stored in the password manager, expiry date diarised |
| **Now** | Second director has Dynadot access, and access to the site |
| **Two weeks before the token expires** | Ask your developer for a fresh one |
| **Yearly, before the renewal date** | Check the Dynadot payment went through |
| **Monthly, while quiet** | Glance at Formspree usage. Weekly during a campaign |
| **Yearly** | Review the privacy policy and terms with a lawyer |
| **Every 24 months** | Delete unsuccessful applications, as the privacy policy commits you to |

The single most important line here is the first one. Everything else is
recoverable.

---

## Part 8: Being found on Google

The site is built to be found: it describes itself to search engines in a format
they read directly, it lists all its pages for them, and it is verified in Google
Search Console under the account used at setup.

**Search Console is worth ten minutes a month.** Go to
search.google.com/search-console. It shows you the actual words people typed
before arriving at the site, which is genuinely useful for knowing how AVID is
being looked for.

Two things you can do there yourself:

- **URL Inspection**, then **Request indexing**, after publishing something
  important. It asks Google to look sooner.
- **Indexing, then Pages**, to see which pages Google has taken.

### What actually moves the needle

Technical work is done and there is no more to extract from it. From here,
visibility comes from two things, and only two.

**Real links from real sites.** A school's website, a partner, a funder's grantee
list, a local news piece, a directory of Canadian non-profits. Each genuine
mention is worth more than any amount of further tuning. Ask every partner to
link to you.

**Publishing the work.** Each library you add and each news story you publish is
another page that can be found, and the ones describing real named schools in
Lagos are exactly what someone searching for this kind of work would land on.

### What not to do

Do not buy links, do not pay an SEO agency promising rankings, and do not add
hidden keywords. These carry real penalties, and a foundation's reputation is
worth more than a ranking.

### Honest timeline

A brand new domain takes **three to six months** to be taken seriously,
regardless of what is done to it. Searches for "AVID Foundation" should work
within weeks. Competitive phrases like "school libraries Nigeria" take longer and
depend far more on the two things above than on anything technical.

---

## Part 9: If something looks wrong

### I cannot sign in to /admin

Almost always the access token has expired. Ask your developer for a fresh one.
Nothing is lost and the site is unaffected: an expired token stops you editing,
it does not touch anything that is already published.

### A change I published is not showing

Wait three minutes and refresh. If it is still missing, the build probably
failed, which means the previous version is still live and nothing is broken.
Send your developer a note saying what you changed.

### The whole site is down

Check theavidfoundation.org from your phone on mobile data, not office wifi. If
it works there, the problem is your network and not the site.

If it is genuinely down, the two likely causes are the domain lapsing, which
Part 0 covers, or a GitHub outage, which you can confirm at
githubstatus.com and which resolves itself.

### The build failed and mentions photo consent

Working as designed. A photograph was added without the consent box ticked. See
Part 3.

### Someone says a form did not reach us

Check the Formspree dashboard for the monthly limit first, as that is the most
likely cause. See Part 5.

### Email has stopped arriving

Check Dynadot billing. Email and domain are on the same account, and an expired
card stops both.

---

## Part 10: When you need a developer

You can do all of this yourself: content, photographs, news, team, and the page
wording via GitHub.

Ask a developer for these:

- Adding the donation link, with the wording pass described in Part 6
- Adding the charitable registration number
- Adding a phone number or social media links
- A new page, or a change to how a page is laid out
- Restoring something deleted by accident
- Anything where the build has failed and the message is not clear

### If you engage a different developer

Everything they need is in the repository. Point them at `README.md` and
`docs/HANDOVER.md`, which covers how the site is built and, more usefully, which
decisions were deliberate and should not be undone.

Two worth stating up front, because both look like omissions and neither is:

**The site refuses to publish a photograph without recorded consent**, and this
is enforced by stopping the build. It is not a bug to be routed around.

**Impact figures are counted, never typed.** They come from the Libraries
entries. Please keep it that way, because it is the difference between a
transparency page that is true by construction and one that is true only as long
as somebody remembers to keep it true.

---

## The short version

If you remember five things:

1. **Store your access token safely, and diarise the day it expires.** Sign in
   once this week so you know it works.
2. **Keep the domain paid.** It is the only unrecoverable failure.
3. **Add every library to the Libraries section.** The impact numbers count
   themselves from it.
4. **Never publish a photograph of a child without written consent.** The site
   will stop you, and it is right to.
5. **Watch the form limit before a campaign, not after.**

Everything else can be fixed.
