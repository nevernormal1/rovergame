if (typeof RVR === 'undefined') {
  RVR = {};
}

(function() {
  var group = RVR.instructionGroup("label");
  group.addInstruction("Turn Engine On", "engine.on");
  group.addInstruction("Turn Engine Off", "engine.off");
})();

