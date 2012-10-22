if (typeof RVR === 'undefined') {
  RVR = {};
}

(function() {
  var group = RVR.instructionGroups.add({label: "Engine"});

  group.addInstruction({
    value: "engine",
    label: "Engine [option]",
    selectLabel: "Engine",
    args: ["On", "Off"]
  }).perform(function() {
     this.setCruise(true);
  });
})();

