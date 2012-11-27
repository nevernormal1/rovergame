if (typeof RVR === 'undefined') {
  RVR = {};
}

(function() {
  var group = RVR.instructionGroups.add({label: "Controls"});

  group.addInstruction({
    value: "cruise",
    label: "Turn Cruise [On/Off]",
    selectLabel: "Turn Cruise",
    args: [{name: "cruise", label: "Turn Cruise", values: ["On", "Off"]}]
  }).perform(function(args) {
    this.setCruise(args.cruise === "On");
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

