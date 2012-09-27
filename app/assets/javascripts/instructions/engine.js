if (typeof RVR === 'undefined') {
  RVR = {};
}

(function() {
  var group = RVR.instructionGroups.add({label: "engine"});

  group.addInstruction({label: "Turn Engine On", value: "engine.on"})
    .perform(function() {
       setCruise(true);
    });

  group.addInstruction({label: "Turn Engine Off", value: "engine.off"})
    .perform(function() {
      setCruise(false);
    });
})();

