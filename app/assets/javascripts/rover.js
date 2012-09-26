if (typeof RVR === 'undefined') {
  RVR = {};
}

RVR.rover = function(params) {
  var parent = params.parent,
      grid = params.grid,
      instance = {},
      position,
      rotation,
      cruise,
      roverOffsetX = grid.offsetX(0.25),
      roverOffsetY = grid.offsetY(0.25),

      reset = function() {
        position = params.position || {x: 0, y: 0};
        rotation = params.rotation || 0;
        cruise = false;
        draw();
      },

      draw = function() {
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
        var pos;

        if (!isMoving()) return;

        pos = nextPosition();
        if (grid.outOfBounds(pos) || grid.collision(pos)) return;

        position = pos;

        render();
      },

      render = function() {
        var rover = parent.selectAll(".rover").data([position]);

        rover.enter()
          .append("rect")
          .attr("class", "rover")
          .attr("x", roverOffsetX)
          .attr("y", roverOffsetY)
          .attr("width", grid.getCellWidth() / 2)
          .attr("height", grid.getCellHeight() / 2);

        rover.transition()
          .duration(RVR.transitionDuration)
          .ease('linear')
          .attr("transform", function(d, i) {
            var newX = grid.baseOffset.x(d),
                newY = grid.baseOffset.y(d);

            return "translate(" + newX + "," + newY + ")";
          });
      };

  reset();

  instance.reset = reset;
  instance.render = render;

  instance.updatePosition = updatePosition;
  instance.setCruise = setCruise;
  instance.rotate = rotate;

  instance.getPosition = getPosition;
  instance.getRotation = getRotation;

  return instance;
};

