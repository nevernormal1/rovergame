if (typeof RVR === 'undefined') {
  RVR = {};
}

RVR.rover = function(params) {
  var container = params.container,
      instance = {},
      position,
      rotation,
      cruise;

  var reset = function() {
    position = params.position || {x: 0, y: 0};
    rotation = params.rotation || 0;
    cruise = false;
  };
  instance.reset = reset;

  instance.getPosition = function() {
    return position;
  };

  instance.getRotation = function() {
    return rotation;
  };

  instance.rotate = function(degrees) {
    rotation += degrees;
    if (rotation < 0) {
      rotation = 270;
    }
  };

  instance.setCruise = function(bool) {
    cruise = bool;
  };

  instance.isMoving = function() {
    return cruise;
  };

  var nextPosition = function() {
    var x = position.x,
        y = position.y;

    if (rotation === 0) {
      x += 1;
    } else if (rotation === 90) {
      y -= 1;
    } else if (rotation === 180) {
      x -= 1;
    } else if (rotation === 270) {
      y += 1;
    }

    return {x: x, y: y};
  };
  instance.nextPosition = nextPosition;

  instance.updatePosition = function() {
    position = nextPosition();
  };

  reset();
  return instance;
};

