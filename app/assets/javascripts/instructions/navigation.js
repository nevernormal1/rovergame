if (typeof RVR === 'undefined') {
  RVR = {};
}

(function() {
  var group = RVR.instructionGroups.add({label: "Navigation"});

  group.addInstruction({
    label: "Rotate [direction]",
    selectLabel: "Rotate",
    value: "rotate",
    args: ["Left", "Right"]
  }).perform(function() {
     this.rotate(-90);
  });

  group.addInstruction({
    label: "When Blocked",
    selectLabel: "When Blocked",
    value: "navigation.blocked",
    async: true
  }).perform(function(instructions) {
    var rover = this;
    rover.dispatch.on("blocked", function() {
      instructions.forEach(function(instruction) {
        instruction.callback();
      });
    });
  });
})();

