if (typeof RVR === 'undefined') {
  RVR = {};
}

(function() {
  var group = RVR.instructionGroups.add({label: "Navigation"});

  group.addInstruction({
    label: "Rotate Right",
    value: "rotate.right",
    html: '<button class="btn">Rotate</button><button class="btn btn-warning">Right</button>'
  }).perform(function(degrees) {
     this.rotate(degrees);
  });

  group.addInstruction({
    label: "Rotate Left",
    value: "rotate.left",
    html: '<button class="btn">Rotate</button><button class="btn btn-info">Left</button>'
  }).perform(function(degrees) {
     this.rotate(degrees);
  });

  group.addInstruction({label: "When Blocked", value: "navigation.blocked"})
    .perform(function(instructions) {
    });
})();

