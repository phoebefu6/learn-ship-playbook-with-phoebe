# learn-ship-playbook-with-phoebe - source map

Internal build document. Not linked from any audience-facing page.

Bucket `ship`, difficulty 3, audience both, 6 sessions, single track, no code required.

Built 2026-09-22.

---

## Why this course exists

The `ship` shelf had one built course and two planned, and **the spine they all import did not
exist**. Its own hub card describes it as "the shared spine every vertical roadmap imports", and
without it the one built course (Five-Year Platform Diagnosis) had to carry its own.

This is a one-source-of-truth hole, not an on-ramp hole. Building the spine is what makes the
other two verticals possible to write without each re-deriving the same four ideas.

The four parts, taken verbatim from the shelf plan:

1. Five use-case categories
2. The four-way verdict: automate, augment, build, keep human
3. The data-entity gate that decides what is even possible
4. The sequencing rule that the revenue model decides which use cases actually pay

**Seams checked before the first page was written.** `learn-ship-platform-diagnosis-with-phoebe`
(the one built ship course, 8 sessions, two tracks) was grepped for all four parts. It owns
**none** of them: "automate" and "verdict" appear incidentally in two pages, and "augment",
"keep human", "use-case categories", "data entity" and "revenue model" appear nowhere. Clean.

Other seams: this course does not teach architecture choice (System Design d4), does not design
a screen (Product Design d3), does not decide what to build for one product (Product Thinking
d1, shipped 2026-09-21), and does not trace data through a pipeline (Data Pipelines d1).

---

## The bench (`assets/sp-live.js`)

Twelve candidate use cases at an invented 22-site gym chain, twelve data entities of which six
are held in full, three partially and three not at all. Every number computed from the
entity-availability map. No figure asserted.

**The two gates.** A case clears only if every entity it needs is held in full. Revenue fit is
scored 0 to 3 against a **recurring-membership** model, so retention work scores high and cafe
spend scores low. The same case would score differently at a business that made its money
another way, and that is the sequencing rule the shelf plan asks for.

### Verified ladder, derived headlessly 2026-09-22 before any page quoted it

| Preset | Clears | Blocked | Revenue fit | Weeks | Fit per week |
|---|---|---|---|---|---|
| Everything everybody asked for | 6 | 3 | 12 | **64** | 0.188 |
| Only what clears the gate today | 6 | 3 | **12** | **27** | 0.444 |
| Chase the three exciting ones | **0** | 3 | **0** | 25 | **0.000** |
| Finish one field first, then go | **7** | **0** | **15** | 33 | 0.455 |
| **ANTI: just ship the chatbot** | 1 | 0 | **0** | 4 | **0.000** |

**The four findings the sessions are built on, all measured:**

1. **Dropping the blocked third of the list costs zero revenue fit.** 64 weeks to 27, fit
   unchanged at 12, because work that cannot be built contributes nothing while still consuming
   the estimate. This is the strongest and most robust finding on the bench.
2. **The three most-requested new-data cases produce nothing.** 25 weeks, fit 0, because all
   three are blocked behind entities the business does not hold. The honest dip.
3. **Finishing one half-collected field is the only route to the ceiling.** The
   "finish one field" row is the only preset that reaches fit 15 and the only one with zero
   blocked cases.
4. **The anti-lever.** The single most-requested item on the list (asked 9 out of 10, tied with
   the cafe recommender) needs no data at all, clears the gate instantly in 4 weeks, and carries
   a revenue fit of **zero**. It passes every gate except the one that matters.

### The unlock table, which is the distinctive artefact

For each entity not held in full, what it would release across all twelve candidates:

| Entity | Held | Fit released | Which case |
|---|---|---|---|
| **Cancellation reason** | partly, a free-text box filled about a third of the time | **3** | Why this site's retention dropped |
| Member goals at intake | partly, on paper, never keyed in | 2 | Trainer matching at signup |
| Competitor pricing | not at all, would be a standing job | 2 | Price against the competition |
| Injury and incident log | partly, a paper folder per site | 1 | Injury pattern review |
| Cafe till linked to member | not at all, separate system, no member id | 1 | Cafe basket recommendations |
| Per-machine equipment use | not at all, would need sensors on 900 machines | 1 | Equipment failure prediction |

**The finding: a field the front desk already half-fills releases more than any brand-new data
source on the board.** The best new source (competitor pricing) releases 2 and would require a
standing job forever; finishing the cancellation reason releases 3 and is a form change.

### A tuning decision recorded rather than hidden

The upgrade cost for finishing a partially-held entity was first stipulated at **2 weeks**, and
at that value "finish one field" scored **0.441** fit per week against **0.444** for "clears the
gate today" - marginally worse. Reducing it to **1 week** (a form change plus backfill, not a
system build) flipped that to **0.455 against 0.444**.

**That flip was caused by a number I chose, so no page teaches that comparison.** 0.44 against
0.46 on a stipulated cost is a coin flip, and presenting it as a result would be exactly the
data-tuning-for-pedagogy error. What the pages do teach from that row is what holds at any
upgrade cost: it is the only preset that reaches fit 15, and the only one with zero blocked.

### Honest limits, to be stated on every page that quotes a figure

- **Ridgeline Fitness is invented.** Twelve cases and twelve entities written so the five presets
  behave differently from each other. The arithmetic is real; the chain is not.
- **Revenue fit is a judgement, shown rather than hidden.** Scoring it against a
  recurring-membership model is the point, not a finding.
- **Every effort figure is stipulated,** including the one-week upgrade above. Estimating build
  effort honestly is a real skill and a different subject.
- **No figure here is a claim about businesses in general,** or about how often a portfolio is
  blocked, or how often the most-requested item is empty.

---

## Sessions

| # | Title | Signature thing |
|---|---|---|
| 1 | The five categories | The ladder, and why each rung needs the one below it to be trusted first |
| 2 | The four-way verdict | Category is what it is; verdict is what to do about it. Conflating them is the common error |
| 3 | **The verdict bench** | **Twelve candidates, two gates; the most-requested item scores zero** |
| 4 | The data gate | What you hold decides what is possible; the unlock table and the half-filled field |
| 5 | The revenue model decides | The same use case is worth different amounts at different businesses |
| 6 | The roadmap on one page | The artefact a vertical imports, final scorecard, where next |

---

## Design system

Palette: aubergine and gold. Chosen for the `ship` shelf and checked before the first page.

| Token | Hex | Role |
|---|---|---|
| aub-900 | `#3A2340` | darkest band |
| aub-700 | `#4E2F55` | primary band |
| aub-600 | `#6B4372` | secondary band |
| aub-200 | `#D6C7DA` | light fill |
| aub-050 | `#F5F0F6` | pale ground |
| muted | `#655C6A` | secondary text |
| gold | `#8A6A12` | accent band |
| gold-ink | `#5F4A0D` | accent text |

**WCAG AA verified before the first page was written: 26 pairs checked, 0 failures, lowest
5.06:1** (white text on gold). The first gold candidate `#9A7615` failed white text at 4.22:1
and was darkened to `#8A6A12`.

Universal reds kept from the donor stylesheet unchanged: `#991B1B` `#FEF2F2` `#7F1D1D`
`#FCA5A5`. Page-level red in markup is `#991B1B`; `#7F1D1D` is donor CSS only and must never
appear in page markup.

Scaffolded from `learn-product-thinking-with-phoebe`. All 16 donor slate/ochre hex values
swapped and verified absent. **`PASSPORT_KEY` and the journey `var pages` array were repointed
immediately after the copy**, not at the gate, because that trap fired on the two previous
builds: they are now `lwp-passport:ship-playbook` and this course's six filenames.

---

## Verified facts, by tier

Tier A = primary source read directly in this build. Tier B = reliable secondary quoting the
primary. Tier C = search result only, and nothing at Tier C is stated on a page.

### The lineage of the five categories - session 1

**Tier B.** Thomas H. Davenport and Rajeev Ronanki, "Artificial Intelligence for the Real
World", *Harvard Business Review*, January-February 2018. HBR's own text could not be opened;
a full reproduction was read instead.

Its three named categories, **verbatim**, and the page must use these exact terms rather than
paraphrasing them:

| Category | Its own description |
|---|---|
| **Process Automation** | "automation of digital and physical tasks... using robotic process automation"; described as the cheapest and least smart |
| **Cognitive Insight** | "using algorithms to detect patterns in vast columns of data"; called "Analytics on steroids" |
| **Cognitive Engagement** | engaging "employees and customers with natural language processing chatbots, intelligent agents, and machine learning" |

**The common drift to correct:** secondary summaries paraphrase these as generic phrases like
"automating processes, gaining insight, engaging customers". Those are not the categories.

**UNVERIFIED and not stated:** the widely repeated "250 executives surveyed, 152 AI projects"
method. Consistent across citation indexes, never confirmed in HBR's own text. Tier C.

**The five categories on these pages are this playbook's own frame,** stated as such. They are a
ladder (see it, explain it, predict it, decide it, do it) and are not attributed to anybody.

### The four-way verdict, and its one real anchor - session 2

**Tier A, read directly.** Erik Brynjolfsson, "The Turing Trap: The Promise and Peril of
Human-Like Artificial Intelligence", forthcoming in *Daedalus* Spring 2022, author's preprint.

Quotable, verbatim: *"While both types of AI can be enormously beneficial, there are currently
excess incentives for automation rather than augmentation among technologists, business
executives, and policy-makers."*

The Daedalus thought experiment is in the paper close to how it is usually retold: engineers who
"fully automated" herding, pottery, weaving, cart repair and bloodletting would see labour
productivity soar, and *"there is only so much value one can get from clay pots and horse-drawn
carts, even with unlimited quantities and zero prices."*

This is the course's justification for making augment a first-class verdict rather than a
consolation prize.

**Tier A, read directly.** Erik Brynjolfsson, Tom Mitchell and Daniel Rock, "What Can Machines
Learn, and What Does It Mean for Occupations and the Economy?", *AEA Papers and Proceedings*
2018, 108: 43-47.

- The suitability-for-machine-learning rubric has **23 statements**, each rated 1 to 5.
  **A commonly quoted figure of 21 is wrong.**
- Applied to **964 occupations, 18,156 tasks and 2,069 direct work activities** from O\*NET.
- Central finding, verbatim: *"(i) most occupations in most industries have at least some tasks
  that are SML; (ii) few if any occupations have all tasks that are SML; and (iii) unleashing ML
  potential will require significant redesign of the task content of jobs."*
- **Zero occupations out of 950** had every task suitable, a figure Brynjolfsson repeats in the
  Turing Trap essay.

This is the anchor for the session-2 rule that the verdict is passed on a **task**, never on a
job or a department.

**UNVERIFIED and not stated:** the five "Step" strategies from Davenport and Kirby, "Beyond
Automation" (HBR, June 2015). The five names are well attested; **no primary or full-text
secondary source for their actual definitions could be read**, so no definitions are given and
the framework is not described.

### The data gate - session 4

**Tier A, read directly.** Neil Lawrence, "Data Readiness Levels", arXiv 1705.02245.

Three bands, worst to best, each with sub-levels 1 (best) to 4 (worst):

| Band | What it asks |
|---|---|
| **C - accessibility** | Is the data machine-readable and ethically cleared at all? C4 is "hearsay": nobody has verified it exists |
| **B - faithfulness** | Does what was recorded match what it purports to record? Missing values, noise |
| **A - in context** | Is it appropriate for *this* question? A dataset can be A1 for one question and only B1 for another |

**Lawrence's own caveat, which the page repeats:** he calls it explicitly a position paper meant
"to trigger a discussion", not a finished or adopted standard. It must not be presented the way
an established standard would be.

The bench's own three states (held in full, held partly, not held) are a **deliberate
simplification** of this, and the page says so rather than implying the bench implements it.

**UNVERIFIED, not attempted this build:** DAMA DMBOK and the CMMI Data Management Maturity
Model. Neither is cited anywhere.

### The failure-rate numbers, all of which are unsound - session 5

Three claims get quoted to justify roadmaps. None survives.

**"Gartner: 85% of AI projects will deliver erroneous outcomes."** Gartner's own 2018 release
could not be opened. Even taking the most-repeated wording at face value, it was a forecast
scoped **"through 2022"**. Quoted in 2026 as a live rate it is **superseded by its own stated
expiry**. Not stated on any page except as an example of a number that expired.

**"87% of data science projects never reach production."** Traced to a 2019 VentureBeat article
reporting an **unattributed remark from a conference panel**. No study, no survey, no
methodology. Tier B for the trace, and the claim itself has no source.

**"90% of models never reach production."** **Tier A correction.** Shankar, Garcia, Hellerstein
and Parameswaran, "Operationalizing Machine Learning: An Interview Study", arXiv 2209.09125,
2022 (18 ML engineers, semi-structured interviews, IRB-reviewed, grounded-theory coding over
1,766 coded segments). The paper states verbatim that *"various articles claim that it is a
problem for 90% of models to never make it to production... but we find that this statistic is
misguided"*, because constant experimentation is **expected** to produce many versions that do
not ship. Its footnoted origins for the 90% and 85% figures are a non-peer-reviewed monograph
and a blog post.

**What may be said about time to production.** From the same Tier A study, and only as an
attributed anecdote from one named participant rather than a statistic: P19 reported that
"around 40 or 50% will make it to initial launch" and that staged deployment "took over three
months". The paper does not claim this generalises and neither does the page.

### Sequencing by revenue model - session 5, and an honest gap

**No peer-reviewed source makes this claim.** A deliberate search found nothing stating that a
firm's revenue model determines which AI or automation investments pay off. **The sequencing
rule is therefore presented as this playbook's own heuristic, uncited, and labelled as such.**

The nearest credible adjacent work, **Tier A, read directly**: Erik Brynjolfsson, Lorin Hitt and
Shinkyu Yang, "Intangible Assets: Computers and Organizational Capital", *Brookings Papers on
Economic Activity*, 2002 (1,216 firms 1987-97, matched survey subsample of 272). Each dollar of
computer capital was associated with **$10 to $12 of market value** against about **$1** for
other physical capital, and the premium was strongly conditional on complementary
**organisational** investment: decentralisation, teams, training.

**The mismatch is stated on the page:** that paper is about organisational complements to IT, not
about revenue models, and it is cited only for the adjacent point that the investment alone does
not pay without the complements around it.

**UNVERIFIED:** McKinsey "Notes from the AI Frontier" (fetch timed out). Not cited. It is also a
consultancy discussion paper rather than peer-reviewed, which the page would have to say.

## Claims deliberately NOT stated (UNVERIFIED)

- **Any AI or data project failure rate.** All three circulating figures are unsound, one is
  expired by its own terms, one traces to an unattributed panel remark, and one is called
  misguided by a study that read its sources.
- **Davenport and Ronanki's sample and method** (the "250 executives, 152 projects" figures).
- **Any definition of Davenport and Kirby's five "Step" strategies.**
- **That 21 criteria make up the SML rubric.** It is 23.
- **That any published work says the revenue model decides sequencing.** It does not; the rule is
  the playbook's own.
- **Data Readiness Levels as an adopted industry standard.** Its author calls it a position paper.
- **Any generalisable time-to-production figure.** Only one named participant's anecdote exists.
- **Any rate at which real portfolios are blocked, or arrive with an empty favourite.** The bench
  demonstrates mechanisms on invented data and claims nothing about the world.

## A tooling finding from this build

The research pass twice received **fabricated content from single-pass PDF summarisation**: one
attempt on the AEA paper returned an invented rubric of "6 criteria" with six plausible names,
none of which appear in the paper. It was caught only by re-reading the PDF directly. **Treat any
single-pass PDF summary as unverified until the file itself has been read.**

---

## Build record

Built 2026-09-22. Six sessions, landing page, one computed bench. Sessions 1 and 3 hand written;
2, 4, 5 and 6 written by agents against this map and session 1 as template.

**Verification actually run before publish**

| Check | Result |
|---|---|
| WCAG AA on the palette, before any page existed | 26 pairs, 0 failures, lowest 5.06:1 |
| Bench ladder derived headlessly before any page quoted it | all five presets, matched to the digit |
| `gate.sh` (Playwright geometry + static checks) | 6 pages, 15 figures, 0 defects, PASSED |
| Quiz engine, all six pages | 3/3 clears on every page |
| Console and page errors, six pages plus landing | zero |
| SVG text outside its own viewBox | zero across all 15 figures |
| SVG text with a transparent computed fill | zero (the CSS-beats-attribute trap) |
| Bench mounted and driven in the page | yes, matches the ladder |
| Scorecard rows on session 6 | 6, each quoting its own session correctly |
| Prev/next chain and landing links | complete and correct |
| Internal `materials/` paths on audience pages | zero |
| Em and en dashes, all pages | zero |
| Off-palette hex values, all pages | zero |
| Sources heading identical on all six | yes, the estate standard string |

**Four defects found and fixed during verification**

1. **My own session 3 figure failed the gate** on a 21% text collision: a subtitle at x=30 ran
   under an annotation at x=340 on the same baseline. Moved the annotation to x=600. The gate
   caught what my own geometry pass had missed, because my pass checked viewBox containment and
   rect overlap but not text-against-text.
2. **Five palette-bound `rgba()` values had leaked through two generations of scaffold.** The
   lightbox scrim `rgba(31,42,34,.9)` and four shadow colours `rgba(63,93,69,...)` are moss
   values from the original donor, and my swap map only matched hex, so they survived into a
   slate course and an aubergine one. The scrim is the visible one: clicking to zoom any figure
   showed a dark green wash. Fixed in all three repos by introducing `--scrim-rgb` and
   `--shadow-rgb` in `:root` and repointing every usage, so a future scaffold changes two lines
   next to the hex tokens instead of missing them entirely.
3. **The landing mindmap gradient was a hardcoded `#F1F5F1`,** the same class of leak, now
   `var(--indigo-50)`. Fixed and pushed to the two live courses that had inherited it.
4. **Session 6 dropped the estate-standard source-map line,** its agent believing it was an
   internal reference. It is not a path, it is the standard closing line on session pages (216
   live session pages carry it, 91 with this exact wording) and it is deliberately absent from
   landing pages (0 carry it). Restored, so all six agree.

**A detector limitation worth recording.** My rect-overlap check counts a rect fully contained
inside another as a collision, so session 4's figures reported 21 overlaps that were all
intentional nesting (cards inside bands). Screenshotting settled it in one look. Containment is
not collision, and the check should exclude it.

**Two questions raised and deliberately not acted on**

- **`.cheat` is a dark panel** (`background: var(--ink)`) and the **lightbox scrim is dark** in
  all 121 live courses, each scrim palette-matched to its own course. That sits against the
  standing light-surfaces-only preference. Changing it is an estate-wide decision across 121
  repos, not a call to make inside one build, so both were left consistent with the estate and
  the question raised instead.
- **Six live session pages carry a double-punctuation typo** in the source-map line
  ("source map., including a quarantine list"). Pre-existing, unrelated to this build, flagged
  not fixed.
