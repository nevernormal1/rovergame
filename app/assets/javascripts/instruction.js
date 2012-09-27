if (typeof RVR === 'undefined') {
  RVR = {};
}

RVR.instruction = function(params) {
  var label = params.label,
      value = params.value,
      callback,
      perform = function(f) {
        callback = f;
      },
      that = {};

  that.perform = perform;
  that.label = label;
  that.value = value;

  return that;
}
