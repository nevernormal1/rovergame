if (typeof RVR === 'undefined') {
  RVR = {};
}

(function() {
  var group = RVR.instructionGroups.add({label: "Sensor Checks"});

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
        rover = this,
        currDirection = rover.direction();

    if (currDirection === direction) {
      instructions.forEach(function(instruction) {
        instruction.callback(rover);
      });
    } else {
      elseInstructions.forEach(function(instruction) {
        instruction.callback(rover);
      });
    }
  });

  group.addInstruction({
    label: "If Blocked to the [Direction]",
    args: [
      {name: "direction", label: "If Blocked to the", values: ["North", "South", "East", "West"]}
    ],
    value: "if",
    block: true
  }).perform(function(args, instructions, elseInstructions) {
    var direction = args.direction,
        rover = this;

    if (rover.blocked(direction)) {
      instructions.forEach(function(instruction) {
        instruction.callback(rover);
      });
    } else {
      elseInstructions.forEach(function(instruction) {
        instruction.callback(rover);
      });
    }
  });
})();

