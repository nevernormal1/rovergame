if (typeof RVR === 'undefined') {
  RVR = {};
}

(function() {
  var group = RVR.instructionGroups.add({label: "Test"});

  group.addInstruction({
    label: "If Blocked to the [Direction]",
    args: [
      {name: "direction", label: "If Blocked to the", values: ["North", "South", "East", "West"]}
    ],
    value: "if",
    block: true
  }).perform(function(args, instructions, elseInstructions) {
    var direction = args.direction;

    if (this.blocked(direction)) {
      instructions.forEach(function(instruction) {
        instruction.callback();
      });
    } else {
      elseInstructions.forEach(function(instruction) {
        instruction.callback();
      });
    }
  });
})();

