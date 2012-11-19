if (typeof RVR === 'undefined') {
  RVR = {};
}

RVR.instruction = function(params) {
  var label = params.label,
      selectLabel = params.selectLabel,
      value = params.value,
      args = params.args,
      block = params.block,
      target_function,
      perform = function(f) {
        target_function = f;
      },
      instance = function() {
        var arg = function(name, value) {
              argValues[name] = value;
            },
            argValues = {},
            subInstructions = [],
            elseInstructions = [],

            callback = function() {
              target_function.call(RVR.rover, argValues, subInstructions, elseInstructions);
            },
            subInstruction = function(instruction) {
              subInstructions.push(instruction);
            },
            elseInstruction = function(instruction) {
              elseInstructions.push(instruction);
            },
            that = {};

        that.arg = arg;
        that.callback = callback;
        that.subInstruction = subInstruction;
        that.elseInstruction = elseInstruction;

        return that;
      },
      that = {};

  that.perform = perform;
  that.label = label;
  that.selectLabel = selectLabel;
  that.value = value;
  that.args = args;
  that.block = block;
  that.instance = instance;

  return that;
};

