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
        async = params.async,
        target_function,
        callback = function(nestedInstructions) {
          target_function.apply(RVR.rover, [nestedInstructions]);
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
    that.async = async;
    that.callback = callback;

    return that;
  };

  return maker;
}();

