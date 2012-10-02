if (typeof RVR === 'undefined') {
  RVR = {};
}

(function() {
  var group = RVR.instructionGroups.add({label: "Navigation"});

  group.addInstruction({label: "Change Direction To...", value: "direction.update"})
    .perform(function(degrees) {
       this.rotate(degrees);
    });

  group.addInstruction({label: "When Blocked", value: "navigation.blocked"})
    .perform(function(instructions) {
    });
})();

