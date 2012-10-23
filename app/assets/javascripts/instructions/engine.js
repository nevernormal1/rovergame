if (typeof RVR === 'undefined') {
  RVR = {};
}

(function() {
  var group = RVR.instructionGroups.add({label: "Engine"});

  group.addInstruction({
    value: "engine",
    label: "Engine [option]",
    selectLabel: "Engine",
    args: [{label: "Turn Engine", values: ["On", "Off"]}]
  }).perform(function(arg) {
    this.setCruise(arg === "On");
  });
})();

