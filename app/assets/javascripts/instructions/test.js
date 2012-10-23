if (typeof RVR === 'undefined') {
  RVR = {};
}

(function() {
  var group = RVR.instructionGroups.add({label: "Test"});

  group.addInstruction({
    label: "If [Condition] Is [Value]",
    args: [{label: "If", values: ["Heading"]}, {label: "Is", values: ["North", "South", "East", "West"]}],
    value: "if",
    block: true
  }).perform(function(condition, insructions) {
  });
})();

