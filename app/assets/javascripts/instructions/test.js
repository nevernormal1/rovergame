if (typeof RVR === 'undefined') {
  RVR = {};
}

(function() {
  var group = RVR.instructionGroups.add({label: "Test"});

  group.addInstruction({label: "If [Condition] Is...", value: "if"})
    .perform(function(condition, insructions) {
    });
})();

