if (typeof RVR === 'undefined') {
  RVR = {};
}

(function() {
  var group = RVR.instructionGroups.add({label: "Navigation"});

  group.addInstruction({
    label: "Rotate [direction]",
    value: "rotate",
    selectHtml: '<p>Rotate <select style="width: 100px"><option>Right</option><option>Left</option></select>'
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
    selectHtml: '<p>When <span class="label">Blocked</span></p>',
    async: true
  }).perform(function(instructions) {
    var rover = this;
    rover.dispatch.on("blocked", function() {
      instructions.forEach(function(instruction) {
        RVR.instruction.run(instruction);
      });
    });
  });
})();

