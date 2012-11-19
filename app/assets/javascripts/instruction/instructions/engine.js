if (typeof RVR === 'undefined') {
  RVR = {};
}

(function() {
  var group = RVR.instructionGroups.add({label: "Controls"});

  group.addInstruction({
    value: "engine",
    label: "Turn Engine [On/Off]",
    selectLabel: "Turn Engine",
    args: [{name: "engine", label: "Turn Engine", values: ["On", "Off"]}]
  }).perform(function(args) {
    this.setCruise(args.engine === "On");
  });
  group.addInstruction({
    label: "Rotate [Direction]",
    selectLabel: "Rotate",
    value: "rotate",
    args: [{name: "rotate", label: "Rotate", values: ["Left", "Right"]}]
  }).perform(function(args) {
    var degrees = args.rotate === "Left" ? 90 : -90;

    this.rotate(degrees);
  });

})();

