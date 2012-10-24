if (typeof RVR === 'undefined') {
  RVR = {};
}

(function() {
  var group = RVR.instructionGroups.add({label: "Test"});

  group.addInstruction({
    label: "If [Condition] Is [Value]",
    args: [
      {name: "condition", label: "If", values: ["Heading"]},
      {name: "value", label: "Is", values: ["North", "South", "East", "West"]}
    ],
    value: "if",
    block: true
  }).perform(function(args, instructions) {
    var direction = args.value;

    if (this.direction() === args.value) {
      instructions.forEach(function(instruction) {
        instruction.callback();
      });
    }
  });
})();

