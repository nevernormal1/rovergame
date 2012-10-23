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
        argValue,
        target_function,
        callback = function(nestedInstructions) {
          target_function.call(RVR.rover, argValue, nestedInstructions);
        },
        arg = function(value) {
          argValue = value;
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

