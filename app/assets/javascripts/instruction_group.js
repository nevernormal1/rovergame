if (typeof RVR === 'undefined') {
  RVR = {};
}

RVR.instructionGroup = function(params) {
  var label = params.label,
      instructions = [],
      that = {},

      addInstruction = function(params) {
        var instruction = RVR.instruction(params);
        instructions.push(instruction);
        return instruction;
      };

  that.addInstruction = addInstruction;

  return that;
};

RVR.instructionGroups = function() {
  var groups = [],
      maker = function() {
        return {
          add: function(params) {
            var group = RVR.instructionGroup(params);
            groups.push(group);
            return group;
          },

          get: function() {
            return groups;
          }
        };
      }

  return maker();
}();

