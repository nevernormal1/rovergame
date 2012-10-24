if (typeof RVR === 'undefined') {
  RVR = {};
}

RVR.instruction = function() {
  var hash = {},
  maker = function(params) {
    var label = params.label,
        selectLabel = params.selectLabel,
        value = params.value,
        args = params.args,
        block = params.block,
        argValues = {},
        target_function,
        callback = function(nestedInstructions) {
          target_function.call(RVR.rover, argValues, nestedInstructions);
        },
        arg = function(name, value) {
          argValues[name] = value;
        },
        perform = function(f) {
          target_function = f;
        },
        that = {};

    hash[value] = that;
    that.perform = perform;
    that.label = label;
    that.selectLabel = selectLabel;
    that.value = value;
    that.args = args;
    that.block = block;
    that.callback = callback;
    that.arg = arg;

    return that;
  };

  return maker;
}();

