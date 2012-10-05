if (typeof RVR === 'undefined') {
  RVR = {};
}

(function() {
  var group = RVR.instructionGroups.add({label: "Engine"});

  group.addInstruction({
    label: "Turn Engine On",
    value: "engine.on",
    html: '<button class="btn">Turn Engine</button><button class="btn btn-success">On</button>'
  }).perform(function() {
     this.setCruise(true);
  });

  group.addInstruction({
    label: "Turn Engine Off",
    value: "engine.off",
    html: '<button class="btn">Turn Engine</button><button class="btn btn-danger">Off</button>'
  }).perform(function() {
    this.setCruise(false);
  });
})();

