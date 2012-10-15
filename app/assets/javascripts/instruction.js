if (typeof RVR === 'undefined') {
  RVR = {};
}

RVR.instruction = function() {
  var hash = {},
  maker = function(params) {
    var label = params.label,
        value = params.value,
        html = params.html,
        async = params.async,
        target_function,
        callback = function() {
          target_function.apply(RVR.rover);
        },
        perform = function(f) {
          target_function = f;
        },
        that = {};

    hash[value] = that;
    that.perform = perform;
    that.label = label;
    that.value = value;
    that.html = html;
    that.async = async;
    that.callback = callback;

    return that;
  };

  maker.run = function(value) {
    var instruction = hash[value];
    instruction.callback();
  };

  return maker;
}();

