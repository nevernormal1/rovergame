if (typeof RVR === 'undefined') {
  RVR = {};
}

RVR.rover = function(params) {
  var grid = params.grid,
      level = params.level,
      instance = {},
      position,
      rotation,
      cruise,
      roverOffsetX = grid.offsetX(0.25),
      roverOffsetY = grid.offsetY(0.25),

      width = grid.getCellWidth() / 2,
      height = grid.getCellHeight() / 2,
      radius = 3,

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
        } else if (rotation >= 360) {
          rotation = 0;
        }
      },

      direction = function() {
        if (rotation === 0) {
          return "East";
        } else if (rotation === 90) {
          return "North";
        } else if (rotation === 180) {
          return "West";
        } else if (rotation == 270) {
          return "South";
        }
      },

      blocked = function(direction) {
        var pos;

        if (direction === "East") {
          pos = {x: position.x + 1, y: position.y};
        } else if (direction === "West") {
          pos = {x: position.x - 1, y: position.y};
        } else if (direction === "South") {
          pos = {x: position.x, y: position.y + 1};
        } else {
          pos = {x: position.x, y: position.y - 1};
        }

        return (grid.outOfBounds(pos) || level.collision(pos));
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
        var pos;

        if (!isMoving()) return;

        pos = nextPosition();
        if (grid.outOfBounds(pos) || level.collision(pos)) {
          dispatch.blocked();
          return;
        }

        position = pos;
      },

      drawRover = function(d) {
        return "M" + roverOffsetX(d) + "," + roverOffsetY(d) +
          "h" + (width - radius) +
          "a" + radius + "," + radius + " 0 0 1 " + radius + "," + radius + "v" + (height - 2 * radius) +
          "a" + radius + "," + radius + " 0 0 1 " + -radius + "," + radius + "h" + (radius - width) + "z";
      },

      render = function() {
        var rover = grid.selectAll(".rover").data([position]),
            heading = d3.select("#heading").data([direction()]);

        rover.enter()
          .append("path")
          .attr("class", "rover")
          .attr("d", drawRover);

        rover.transition()
          .duration(RVR.transitionDuration)
          .ease('linear')
          .attr("transform", function(d, i) {
            var newX = grid.baseOffset.x(d),
                newY = grid.baseOffset.y(d);

            return "translate(" + newX + "," + newY + ")" +
                   "rotate(" + -rotation + ")";
          });

        heading.text(function(d) { return d; });
      };

      dispatch = d3.dispatch("blocked");

  reset();

  instance.reset = reset;
  instance.render = render;

  instance.updatePosition = updatePosition;
  instance.setCruise = setCruise;
  instance.rotate = rotate;

  instance.getPosition = getPosition;
  instance.getRotation = getRotation;
  instance.direction = direction;
  instance.blocked = blocked;

  instance.dispatch = dispatch;

  RVR.rover = instance;

  return instance;
};

