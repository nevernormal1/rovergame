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

  return that;
}
