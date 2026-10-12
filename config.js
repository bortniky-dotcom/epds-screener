(function () {
  var Q = [
    ["1.", "I have been able to laugh and see the funny side of things", ["As much as I always could","Not quite so much now","Definitely not so much now","Not at all"], false],
    ["2.", "I have looked forward with enjoyment to things", ["As much as I ever did","Rather less than I used to","Definitely less than I used to","Hardly at all"], false],
    ["*3.", "I have blamed myself unnecessarily when things went wrong", ["Yes, most of the time","Yes, some of the time","Not very often","No, never"], true],
    ["4.", "I have been anxious or worried for no good reason", ["No, not at all","Hardly ever","Yes, sometimes","Yes, very often"], false],
    ["*5.", "I have felt scared or panicky for no very good reason", ["Yes, quite a lot","Yes, sometimes","No, not much","No, not at all"], true],
    ["*6.", "Things have been getting on top of me", ["Yes, most of the time I haven’t been able to cope at all","Yes, sometimes I haven’t been coping as well as usual","No, most of the time I have coped quite well","No, I have been coping as well as ever"], true],
    ["*7.", "I have been so unhappy that I have had difficulty sleeping", ["Yes, most of the time","Yes, sometimes","Not very often","No, not at all"], true],
    ["*8.", "I have felt sad or miserable", ["Yes, most of the time","Yes, quite often","Not very often","No, not at all"], true],
    ["*9.", "I have been so unhappy that I have been crying", ["Yes, most of the time","Yes, quite often","Only occasionally","No, never"], true],
    ["*10.", "The thought of harming myself has occurred to me", ["Yes, quite often","Sometimes","Hardly ever","Never"], true]
  ];
  window.CFG = {
    slug: "epds", short: "EPDS", sub: "Edinburgh Postnatal Depression Scale",
    fields: [{ id: "baby_dob", label: "Baby’s Date of Birth", type: "date" }],
    intro: "As you are pregnant or have recently had a baby, we would like to know how you are feeling. Please check the answer that comes closest to how you have felt IN THE PAST 7 DAYS, not just how you feel today.",
    sections: [{ id: "s1", title: "In the past 7 days:", items: Q.map(function (q, i) { return { id: "q" + (i + 1), num: q[0], text: q[1], opts: q[2].map(function (l, j) { return { v: q[3] ? 3 - j : j, l: l, show: false }; }) }; }) }],
    scoringHint: '<p class="hint">Questions 1, 2 and 4 (without an *) are scored 0, 1, 2 or 3 with top box scored as 0 and the bottom box scored as 3. Questions 3, 5-10 (marked with an *) are reverse scored, with the top box scored as a 3 and the bottom box scored as 0. Maximum score: 30. Possible Depression: 10 or greater. Always look at item 10 (suicidal thoughts). All the items must be completed. Mothers who score above 13 are likely to be suffering from a depressive illness of varying severity. The EPDS score should not override clinical judgment.</p><p class="hint">If you are having thoughts of harming yourself, call or text 988, or call 911 in an emergency.</p>',
    footer: "EPDS · Cox, Holden, Sagovsky 1987 · screening only",
    score: function (A, H) {
      var t = H.sum(A, H.ids("q", 1, 10)), flags = [];
      if (A.q10 !== null && A.q10 > 0) flags.push("Item 10 (thought of harming myself) answered above 0. Always look at item 10. Review safety.");
      if (A.q10 === null) flags.push("Item 10 (suicidal thoughts) blank. Follow up.");
      var b = t === null ? "Incomplete, not scored" : (t > 13 ? "Above 13: likely suffering from a depressive illness of varying severity" : (t >= 10 ? "Possible Depression (10 or greater)" : "Below 10"));
      return { incomplete: t === null, flags: flags, rows: [["Total (0-30)", t === null ? "Incomplete, not scored" : t], ["Interpretation", b], ["Item 10 score", A.q10 === null ? "blank" : A.q10]] };
    }
  };
})();
