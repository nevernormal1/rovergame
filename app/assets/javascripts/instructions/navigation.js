if (typeof RVR === 'undefined') {
  RVR = {};
}

(function() {
  var group = RVR.instructionGroups.add({label: "Navigation"});

  group.addInstruction({
    label: "Rotate Right",
    value: "rotate.right",
    html: '<button class="btn">Rotate</button><button class="btn btn-warning">Right</button>'
  }).perform(function() {
     this.rotate(-90);
  });

  group.addInstruction({
    label: "Rotate Left",
    value: "rotate.left",
    html: '<button class="btn">Rotate</button><button class="btn btn-info">Left</button>'
  }).perform(function() {
     this.rotate(90);
  });

  group.addInstruction({
    label: "When Blocked",
    value: "navigation.blocked",
    async: true
  }).perform(function(instructions) {
    console.log("Block invoked with instructions");
    console.log(instructions);
  });
})();

