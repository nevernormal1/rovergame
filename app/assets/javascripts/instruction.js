if (typeof RVR === 'undefined') {
  RVR = {};
}

RVR.instruction = function(params) {
  var hash = {},
  maker = function(m_params) {
    var label = m_params.label,
        value = m_params.value,
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
    that.callback = callback;

    return that;
  };

  maker.run = function(value) {
    var instruction = hash[value];
    instruction.callback();
  };

  return maker;
}();

