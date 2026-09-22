/* sp-live.js - the verdict bench for learn-ship-playbook-with-phoebe
 *
 * A portfolio of candidate use cases, put through the two gates the playbook argues for:
 * the DATA-ENTITY GATE (can this be built at all with what the business actually holds)
 * and the REVENUE-MODEL FILTER (does it move the money this particular model makes).
 *
 * THE BUSINESS IS CONSTRUCTED. Ridgeline Fitness is an invented 22-site gym chain, written so
 * the five presets behave differently from each other. The arithmetic is real; the chain is not,
 * and no figure here is a claim about gyms, or about how often any of this happens in practice.
 *
 * What is computed, never asserted:
 *   clears today     every required entity is held in full
 *   conditional      every required entity is held, but at least one only partially
 *   blocked          at least one required entity is not held at all
 *   revenue fit      sum of per-case fit (0-3) over the cases that actually clear
 *   weeks            build effort of the selection that clears
 *   fit per week     revenue fit that clears, divided by the weeks spent
 *   unlock           for each entity NOT held in full, the revenue fit it would release
 *
 * The unlock table is the point. The entity that releases the most value is not the one
 * attached to the most exciting use case.
 */
(function () {
  "use strict";

  /* The five categories are this playbook's own frame, not a citation. They are a ladder:
   * each rung needs the one below it to be trustworthy first. */
  var CATEGORIES = [
    { id: "see",     label: "See it",     note: "know what is happening, agreed and repeatable" },
    { id: "explain", label: "Explain it", note: "why it happened, at a level somebody can act on" },
    { id: "predict", label: "Predict it", note: "what is likely next, per member or per site" },
    { id: "decide",  label: "Decide it",  note: "what to do about it, ranked and costed" },
    { id: "do",      label: "Do it",      note: "the system acts, with no person in the loop" }
  ];

  /* The verdict is a SEPARATE axis from the category. Category is what kind of thing it is.
   * Verdict is what you should do about it. Conflating the two is the commonest mistake. */
  var VERDICTS = {
    automate: "Automate it - the work is repeatable and the cost of being wrong is low",
    augment:  "Augment the person - the judgement stays human, the gathering does not",
    build:    "Build something new - nothing here does this yet, and that is the point",
    human:    "Keep it human - either the stakes or the trust make handing it over wrong"
  };

  /* What the business actually holds. "full" = complete and usable. "partial" = collected
   * some of the time, or on paper. "none" = does not exist. */
  var ENTITIES = {
    e1:  { label: "Member record",              have: "full"    },
    e2:  { label: "Door-swipe visit events",    have: "full"    },
    e3:  { label: "Payment and billing events", have: "full"    },
    e4:  { label: "PT session bookings",        have: "full"    },
    e5:  { label: "Class schedule and capacity",have: "full"    },
    e9:  { label: "Staff shift roster",         have: "full"    },
    e6:  { label: "Cancellation reason",        have: "partial", why: "a free-text box the front desk fills in about a third of the time" },
    e10: { label: "Member goals at intake",     have: "partial", why: "collected on paper at some sites, never keyed in" },
    e12: { label: "Injury and incident log",    have: "partial", why: "a paper folder per site" },
    e7:  { label: "Cafe till linked to member", have: "none",    why: "the till is a separate system with no member id" },
    e8:  { label: "Per-machine equipment use",  have: "none",    why: "would need sensors on 900 machines" },
    e11: { label: "Competitor pricing",         have: "none",    why: "nobody collects it; it would be a standing job" }
  };

  /* fit is revenue-model fit, 0 to 3. Ridgeline makes its money on recurring memberships,
   * so anything that moves retention scores high and anything that moves cafe spend scores low.
   * THAT IS THE WHOLE POINT: the same use case would score differently at a different business. */
  var CASES = [
    { id: "c1",  name: "Weekly site scorecard",            cat: "see",     verdict: "automate", needs: ["e1","e2","e3"],       fit: 2, weeks: 3, asked: 6 },
    { id: "c2",  name: "Why this site's retention dropped",cat: "explain", verdict: "augment",  needs: ["e1","e2","e3","e6"],  fit: 3, weeks: 5, asked: 5 },
    { id: "c3",  name: "Churn risk score per member",      cat: "predict", verdict: "augment",  needs: ["e1","e2","e3"],       fit: 3, weeks: 6, asked: 7 },
    { id: "c4",  name: "Who to call today, ranked",        cat: "decide",  verdict: "augment",  needs: ["e1","e2","e3"],       fit: 3, weeks: 4, asked: 4 },
    { id: "c5",  name: "Auto-send the win-back offer",     cat: "do",      verdict: "automate", needs: ["e1","e3"],            fit: 2, weeks: 3, asked: 5 },
    { id: "c6",  name: "Class timetable optimiser",        cat: "decide",  verdict: "augment",  needs: ["e5","e2","e9"],       fit: 2, weeks: 7, asked: 6 },
    { id: "c7",  name: "Trainer matching at signup",       cat: "decide",  verdict: "augment",  needs: ["e4","e10"],           fit: 2, weeks: 5, asked: 4 },
    { id: "c8",  name: "Cafe basket recommendations",      cat: "decide",  verdict: "build",    needs: ["e7","e1"],            fit: 1, weeks: 6, asked: 9 },
    { id: "c9",  name: "Equipment failure prediction",     cat: "predict", verdict: "build",    needs: ["e8"],                 fit: 1, weeks: 9, asked: 8 },
    { id: "c10", name: "Price against the competition",    cat: "decide",  verdict: "build",    needs: ["e11","e1","e3"],      fit: 2, weeks: 10, asked: 7 },
    { id: "c11", name: "Injury pattern review",            cat: "explain", verdict: "human",    needs: ["e12"],                fit: 1, weeks: 2, asked: 3 },
    { id: "c12", name: "Front-desk hours chatbot",         cat: "do",      verdict: "automate", needs: [],                     fit: 0, weeks: 4, asked: 9 }
  ];

  var byCase = {};
  CASES.forEach(function (c) { byCase[c.id] = c; });

  /* status of one case against the entity map, optionally with some entities upgraded to full */
  function statusOf(c, upgraded) {
    var worst = "full";
    var missing = [], thin = [];
    c.needs.forEach(function (e) {
      var have = (upgraded && upgraded.indexOf(e) >= 0) ? "full" : ENTITIES[e].have;
      if (have === "none") { worst = "none"; missing.push(e); }
      else if (have === "partial") { if (worst !== "none") worst = "partial"; thin.push(e); }
    });
    return { state: worst === "full" ? "clears" : (worst === "partial" ? "conditional" : "blocked"),
             missing: missing, thin: thin };
  }

  /* what each not-fully-held entity would release if it were finished or built */
  function unlocks() {
    var rows = [];
    Object.keys(ENTITIES).forEach(function (e) {
      if (ENTITIES[e].have === "full") return;
      var released = 0, names = [];
      CASES.forEach(function (c) {
        var before = statusOf(c, []);
        var after = statusOf(c, [e]);
        if (before.state !== "clears" && after.state === "clears") {
          released += c.fit; names.push(c.name);
        }
      });
      rows.push({ id: e, label: ENTITIES[e].label, have: ENTITIES[e].have,
                  why: ENTITIES[e].why, released: released, cases: names });
    });
    rows.sort(function (a, b) { return b.released - a.released; });
    return rows;
  }

  var PRESETS = [
    { id: "all", label: "Everything everybody asked for",
      note: "All twelve candidates, the way the list arrives after a round of workshops.",
      pick: CASES.map(function (c) { return c.id; }), upgrade: [] },
    { id: "today", label: "Only what clears the gate today",
      note: "Drop anything needing data the business does not fully hold.",
      pick: ["c1","c2","c3","c4","c5","c6","c7","c8","c9","c10","c11","c12"], upgrade: [], onlyClears: true },
    { id: "exciting", label: "Chase the three exciting ones",
      note: "The cafe recommender, the equipment prediction, the competitor pricing.",
      pick: ["c8","c9","c10"], upgrade: [] },
    { id: "field", label: "Finish one field first, then go",
      note: "Same as clearing the gate today, plus actually completing the cancellation reason.",
      pick: ["c1","c2","c3","c4","c5","c6","c11","c12"], upgrade: ["e6"], onlyClears: true },
    { id: "chatbot", label: "Just ship the chatbot",
      note: "It needs no data at all, and it was the single most requested thing.",
      pick: ["c12"], upgrade: [], anti: true }
  ];

  function evaluate(ids, upgrade, onlyClears) {
    var clears = [], conditional = [], blocked = [];
    var missingSet = {};
    ids.forEach(function (id) {
      var c = byCase[id];
      var st = statusOf(c, upgrade);
      st.missing.forEach(function (e) { missingSet[e] = true; });
      if (st.state === "clears") clears.push(c);
      else if (st.state === "conditional") conditional.push(c);
      else blocked.push(c);
    });
    var built = onlyClears ? clears : clears.concat(conditional).concat(blocked);
    var fit = clears.reduce(function (a, c) { return a + c.fit; }, 0);
    var weeks = built.reduce(function (a, c) { return a + c.weeks; }, 0);
    /* Stipulated, like every effort figure here: making the cancellation reason a required
     * dropdown instead of an optional free-text box is a form change plus a bit of backfill,
     * not a system build. One week is if anything generous. */
    var upgradeWeeks = upgrade.length * 1;
    weeks += upgradeWeeks;
    return {
      clears: clears, conditional: conditional, blocked: blocked,
      fit: fit, weeks: weeks, upgradeWeeks: upgradeWeeks,
      missingCount: Object.keys(missingSet).length,
      perWeek: weeks > 0 ? fit / weeks : 0,
      zeroFit: clears.filter(function (c) { return c.fit === 0; })
    };
  }

  /* ---------- UI ---------- */

  var root, readout, table, unlockBox, current = "all", out = null, btns = {};

  function esc(s) {
    return String(s).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }

  function metric(label, value, unit, kind) {
    return '<div class="mb-metric"><span class="mb-mlabel">' + esc(label) + "</span>" +
      '<span class="mb-mvalue">' + esc(value) + "</span>" +
      '<span class="mb-munit">' + esc(unit) + "</span>" +
      '<span class="mb-mkind is-' + kind + '">' + kind + "</span></div>";
  }

  function grade(r, p) {
    if (p.anti) {
      return ["bad", "Clears the gate, needs no data at all, and carries a revenue fit of zero"];
    }
    if (r.blocked.length >= 3 && r.clears.length === 0) {
      return ["bad", r.blocked.length + " of them blocked, and the revenue fit that clears is " + r.fit];
    }
    if (r.blocked.length > 0 && !p.onlyClears) {
      return ["bad", r.weeks + " weeks on the board and " + r.blocked.length +
              " cases cannot be built at all yet"];
    }
    if (p.upgrade && p.upgrade.length) {
      return ["good", "Fit " + r.fit + " for " + r.weeks + " weeks, and " + r.upgradeWeeks +
              " of those weeks were spent finishing a field, not building a system"];
    }
    return ["ok", "Fit " + r.fit + " that actually clears, over " + r.weeks + " weeks"];
  }

  function caseRow(c, st) {
    var badge = st.state === "clears" ? '<span class="mb-mkind is-measured">clears</span>'
      : st.state === "conditional" ? '<span class="mb-mkind is-heuristic">conditional</span>'
      : '<span class="sp-blocked">blocked</span>';
    var note = st.missing.length
      ? "needs " + st.missing.map(function (e) { return ENTITIES[e].label; }).join(", ") + ", not held"
      : st.thin.length
        ? "needs " + st.thin.map(function (e) { return ENTITIES[e].label; }).join(", ") + ", held only partly"
        : "every entity held in full";
    var cat = CATEGORIES.filter(function (x) { return x.id === c.cat; })[0];
    return "<tr><th>" + esc(c.name) + "<em>" + esc(cat.label) + " &middot; " +
      esc(c.verdict) + "</em></th><td>" + c.fit + "</td><td>" + c.weeks + "w</td><td>" +
      badge + "</td><td>" + esc(note) + "</td></tr>";
  }

  function render() {
    var p = PRESETS.filter(function (x) { return x.id === current; })[0];
    var r = evaluate(p.pick, p.upgrade, p.onlyClears);
    out = r;
    var g = grade(r, p);

    readout.innerHTML =
      '<div class="mb-verdict is-' + g[0] + '">' + esc(g[1]) +
        ' <span class="mb-mkind is-heuristic">heuristic</span></div>' +
      '<div class="mb-metrics">' +
        metric("Clears the gate", r.clears.length, "of " + p.pick.length + " picked", "measured") +
        metric("Revenue fit that clears", r.fit, "sum of per-case fit, 0 to 3 each", "measured") +
        metric("Weeks", r.weeks, r.upgradeWeeks ? r.upgradeWeeks + " of them finishing a field" : "build effort", "measured") +
        metric("Fit per week", r.perWeek.toFixed(2), "the only number worth ranking on", "measured") +
        metric("Blocked", r.blocked.length, r.missingCount + " entities not held", "measured") +
      "</div>";

    var rows = p.pick.map(function (id) {
      return caseRow(byCase[id], statusOf(byCase[id], p.upgrade));
    }).join("");
    table.innerHTML =
      '<table class="dt-table"><thead><tr><th>Candidate</th><th>Fit</th><th>Effort</th>' +
      "<th>Gate</th><th>Why</th></tr></thead><tbody>" + rows + "</tbody></table>";

    var u = unlocks();
    unlockBox.innerHTML =
      '<p class="mb-hint"><strong>What each missing or half-held entity would release,</strong> ' +
      "computed across all twelve candidates rather than the selection above:</p>" +
      '<table class="dt-table"><thead><tr><th>Entity</th><th>Held</th><th>Fit released</th>' +
      "<th>Which cases</th></tr></thead><tbody>" +
      u.map(function (x) {
        return "<tr><th>" + esc(x.label) + "<em>" + esc(x.why || "") + "</em></th><td>" +
          esc(x.have === "none" ? "not at all" : "partly") + "</td><td><strong>" + x.released +
          "</strong></td><td>" + esc(x.cases.length ? x.cases.join(", ") : "none on this list") +
          "</td></tr>";
      }).join("") + "</tbody></table>";
  }

  function setPreset(id) {
    current = id;
    Object.keys(btns).forEach(function (k) {
      btns[k].classList.toggle("is-on", k === id);
      var i = btns[k].querySelector("input");
      if (i) i.checked = (k === id);
    });
    render();
  }

  function buildUI() {
    var panel = document.createElement("div");
    panel.className = "mb-presets";
    PRESETS.forEach(function (p) {
      var lab = document.createElement("label");
      lab.className = "mb-preset" + (p.anti ? " is-anti" : "");
      lab.innerHTML = '<input type="radio" name="sp-p" value="' + p.id + '">' +
        '<span class="mb-pname">' + esc(p.label) +
        (p.anti ? ' <em class="mb-anti">the most requested, and the emptiest</em>' : "") + "</span>" +
        '<span class="mb-pnote">' + esc(p.note) + "</span>";
      panel.appendChild(lab);
      btns[p.id] = lab;
      lab.querySelector("input").addEventListener("change", function () { setPreset(p.id); });
    });

    var hint = document.createElement("p");
    hint.className = "mb-hint";
    hint.textContent = "Ridgeline Fitness: " + CASES.length + " candidate use cases, " +
      Object.keys(ENTITIES).length + " data entities of which " +
      Object.keys(ENTITIES).filter(function (e) { return ENTITIES[e].have === "full"; }).length +
      " are held in full. The chain is invented so the five presets behave differently; the " +
      "arithmetic is real. Revenue fit is scored against a recurring-membership model, and the " +
      "same use case would score differently at a business that made its money another way.";

    readout = document.createElement("div"); readout.className = "mb-readout";
    table = document.createElement("div"); table.className = "dt-tablewrap";
    unlockBox = document.createElement("div"); unlockBox.className = "dt-tablewrap sp-unlock";

    root.appendChild(panel); root.appendChild(hint);
    root.appendChild(readout); root.appendChild(table); root.appendChild(unlockBox);
    setPreset("all");
  }

  function init() {
    root = document.getElementById("verdict-bench");
    if (!root) return;
    buildUI();
    window.SP_LIVE = {
      presets: PRESETS.map(function (p) { return p.id; }),
      show: setPreset,
      evaluate: evaluate,
      unlocks: unlocks,
      cases: CASES,
      entities: ENTITIES,
      categories: CATEGORIES,
      verdicts: VERDICTS,
      get current() { return current; },
      get metrics() { return out; }
    };
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
