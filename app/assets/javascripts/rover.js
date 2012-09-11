if (typeof RVR === 'undefined') {
  RVR = {};
}

RVR.rover = function(spec) {
  spec.position = spec.position || {x: 0, y: 0};
  spec.rotation = spec.rotation || 0;
  spec.cruise = false;

  var that = {};

  that.reset = function() {
    spec.position = {x: 0, y: 0};
    spec.rotation = 0;
    spec.cruise = false;
  };

  that.getPosition = function() {
    return spec.position;
  };

  that.getRotation = function() {
    return spec.rotation;
  };

  that.rotate = function(degrees) {
    spec.rotation += degrees;
    if (spec.rotation < 0) {
      spec.rotation = 270;
    }
  };

  that.cruise = function(bool) {
    spec.cruise = bool;
  };

  that.isMoving = function() {
    return spec.cruise;
  };

  var nextPosition = function() {
    var x = spec.position.x,
        y = spec.position.y;

    if (spec.rotation === 0) {
      x += 1;
    } else if (spec.rotation === 90) {
      y -= 1;
    } else if (spec.rotation === 180) {
      x -= 1;
    } else if (spec.rotation === 270) {
      y += 1;
    }

    return {x: x, y: y};
  };
  that.nextPosition = nextPosition;

  that.updatePosition = function() {
    spec.position = nextPosition();
  };

  return that;
};

