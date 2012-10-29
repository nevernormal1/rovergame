if (typeof RVR === 'undefined') {
  RVR = {};
}

(function() {
  var group = RVR.instructionGroups.add({label: "Sensor Events"});

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
})();

