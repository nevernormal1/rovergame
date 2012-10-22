if (typeof RVR === 'undefined') {
  RVR = {};
}

(function() {
  var group = RVR.instructionGroups.add({label: "Test"});

  group.addInstruction({
    label: "If [Condition] Is [Value]",
    value: "if",
    html: 'If <input type="hidden" class="test-condition"/> Is <input type="hidden" class="test-values"/>'
  }).perform(function(condition, insructions) {
  });
})();

