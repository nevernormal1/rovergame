if (typeof RVR === 'undefined') {
  RVR = {};
}

RVR.rover = function(params) {
  var container = params.container,
      instance = {},
      position,
      rotation,
      cruise,
      reset = function() {
        position = params.position || {x: 0, y: 0};
        rotation = params.rotation || 0;
        cruise = false;
      },
      getPosition = function() {
        return position;
      },
      getRotation = function() {
        return rotation;
      },
      rotate = function(degrees) {
        rotation += degrees;
        if (rotation < 0) {
          rotation = 270;
        }
      },
      setCruise = function(bool) {
        cruise = bool;
      },
      isMoving = function() {
        return cruise;
      },
      nextPosition = function() {
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
      },
      updatePosition = function() {
        position = nextPosition();
      };

  reset();

  instance.reset = reset;
  instance.getPosition = getPosition;
  instance.getRotation = getRotation;
  instance.rotate = rotate;
  instance.setCruise = setCruise;
  instance.isMoving = isMoving;
  instance.updatePosition = updatePosition;
  instance.nextPosition = nextPosition;

  return instance;
};

