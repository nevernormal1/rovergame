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
  }).perform(function(arg) {
    var degrees = arg === "Left" ? 90 : -90;

    this.rotate(degrees);
  });

  group.addInstruction({
    label: "When Blocked",
    selectLabel: "When Blocked",
    value: "navigation.blocked",
    async: true
  }).perform(function(arg, instructions) {
    var rover = this;
    rover.dispatch.on("blocked", function() {
      instructions.forEach(function(instruction) {
        instruction.callback();
      });
    });
  });
})();

