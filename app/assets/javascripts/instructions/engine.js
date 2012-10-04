if (typeof RVR === 'undefined') {
  RVR = {};
}

(function() {
  var group = RVR.instructionGroups.add({label: "Engine"});

  group.addInstruction({label: "Turn Engine On", value: "engine.on"})
    .perform(function() {
       this.setCruise(true);
    });

  group.addInstruction({label: "Turn Engine Off", value: "engine.off"})
    .perform(function() {
      this.setCruise(false);
    });
})();

