# Photograph consent

**Set this up before your first school visit.** Consent obtained on the day is
straightforward; consent chased six months later, after the photographs are
already on a website, is very hard and sometimes impossible. The brief flagged
this as a gap that is far cheaper to build in now than to add later, and it is
right.

This document is practical guidance, not legal advice. Have your board approve a
final policy, ideally reviewed by a Canadian lawyer familiar with charity
safeguarding.

---

## Why this is treated as a hard requirement

AVID's transparency wall depends on photographs of real schools. That is the most
persuasive thing a small charity can do — and it puts you in the position of
publishing images of children in another country, to an audience in Canada, on a
site whose whole argument is that you can be trusted.

The technical control: **the site will not build** if a library entry has
photographs while `photoConsentOnFile` is `false`. You get an error naming the
file and the previous version stays live. It is deliberately not overridable from
the editor, because the failure mode being prevented — a rushed publish, a
forgotten check — is exactly the one a checkbox on an honour system does not
prevent.

---

## What to obtain

### 1. From the school — always

Written permission, signed by the head teacher or proprietor, covering:

- photography on the premises
- publication on AVID's website, in reports, and in funding applications
- use of the school's name alongside the images

The school's name matters: naming schools is the point of the wall, and a school
should agree to be named before you name it.

### 2. From a parent or guardian — for any identifiable child

Signed consent for that specific child, stating:

- where the image may appear (website, social media, printed reports, funder
  presentations — list them; do not write "anywhere")
- that the child's full name will **not** be published with the photograph
- that consent may be withdrawn at any time, with a named contact and address
- how long the image will be kept

Collect these through the school, in the language the family reads. In Lagos that
may mean English, Yorùbá, or another language — a consent form somebody cannot
read is not consent. Budget for translation.

### 3. From the child

Ask them too, in words they understand, and honour a refusal even where a
guardian has agreed. A child who does not want their photograph taken should not
have their photograph taken. Record that you asked.

---

## Practical rules for the shoot

- **Prefer photographs that do not identify individuals.** The room, the shelves,
  hands holding a book, a class from behind. These are often the better
  photographs anyway, and they carry none of this weight.
- **No child's full name with their photograph.** First name only, or no name.
- **Nothing that reveals where a child can be found** — no home addresses, no
  timetables, no uniform-plus-name combinations.
- **No photographs in changing areas, toilets, or of children in distress.**
- **Keep the consent forms with the images.** A photograph whose consent form you
  cannot find is a photograph you cannot publish.
- **Take a second set without children in frame.** You will be glad of it when a
  consent is withdrawn.

---

## Recording it

Keep a register — a spreadsheet is fine — with one row per shoot:

| Field | Example |
|---|---|
| School | St Mary's Primary School, Surulere |
| Date of visit | 2026-09-14 |
| School consent signed by | Head teacher, name, date |
| Guardian consents obtained | 6 of 6 identifiable children |
| Where forms are stored | AVID Drive → Consent → 2026-09 St Marys |
| Photographer | Name |
| Withdrawals | — |

Store it with your governance records, not on someone's laptop. Then, and only
then, tick `photoConsentOnFile` on the library entry.

---

## Withdrawal

Consent can be withdrawn at any time, and the privacy policy commits you to
acting on it — usually within two working days. To remove an image:

1. Delete it from the library or news entry in `/admin` (or from the file in
   `src/content/`).
2. Delete the file from `src/assets/uploads/`.
3. Save. The site rebuilds without it.

Because the site is rebuilt from source each time, a deleted image genuinely
stops being served. Record the withdrawal in the register.

Note that anything already downloaded, shared, or captured by a third party is
beyond your reach — which is a reason to be conservative about what goes up in
the first place.

---

## A consent form you can adapt

> **Permission to photograph — The AVID Foundation**
>
> The AVID Foundation is refurbishing the library at **[school name]**. We would
> like to take photographs of the work so that we can show our supporters what
> their donations paid for.
>
> **Where the photographs may appear:** our website
> (theavidfoundation.org), our reports to donors, and applications we make for
> funding.
>
> **What we will not do:** we will not publish your child's full name with their
> photograph. We will not sell the photographs or give them to anyone else for
> advertising.
>
> **You can change your mind at any time.** Email [address] or tell the school,
> and we will remove the photograph from our website, normally within two working
> days.
>
> ☐ I agree to my child being photographed and to those photographs being used
> as described above.
>
> ☐ I do **not** agree.
>
> Child's name: ______________________  Class: ____________
>
> Parent or guardian: ______________________
>
> Signature: ______________________  Date: ____________

Have this translated as needed, and give a copy to the family — not just to the
school.
