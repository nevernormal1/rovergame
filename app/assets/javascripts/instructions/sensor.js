if (typeof RVR === 'undefined') {
  RVR = {};
}

(function() {
  var group = RVR.instructionGroups.add({label: "Sensor"});

  group.addInstruction({
    label: "If Heading Is [Direction]",
    args: [
      {name: "condition", label: "If", values: ["Heading"]},
      {name: "value", label: "Is", values: ["North", "South", "East", "West"]}
    ],
    value: "if",
    block: true
  }).perform(function(args, instructions, elseInstructions) {
    var direction = args.value,
        currDirection = this.direction();

    if (currDirection === direction) {
      instructions.forEach(function(instruction) {
        instruction.callback();
      });
    } else {
      elseInstructions.forEach(function(instruction) {
        instruction.callback();
      });
    }
  });

  group.addInstruction({
    label: "When Blocked",
    selectLabel: "When Blocked",
    value: "navigation.blocked",
    block: true
  }).perform(function(args, instructions) {
    var rover = this;
    rover.dispatch.on("blocked", function() {
      instructions.forEach(function(instruction) {
        instruction.callback();
      });
    });
  });

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

