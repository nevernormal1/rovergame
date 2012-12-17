if (typeof RVR === 'undefined') {
  RVR = {};
}

RVR.zigzagup = function() {
  var my = {},
      that = RVR.level(my),
      walls,

      randomLength = function() {
        return Math.ceil(Math.random() * 3);
      },

      rowLength = function(x, y, length) {
        var i, wall = [];

        for (i = 0; i < length; i++) {
          if (x + i <= my.grid.getColumnCount()) {
            wall.push({x: x + i, y: y});
          }
        }

        return wall;
      },

      columnLength = function(x, y, length) {
        var i, wall = [];

        for (i = 0; i < length; i++) {
          if (y + i >= 0) {
            wall.push({x: x, y: y + i});
          }
        }

        return wall;
      },

      buildWalls = function() {
        var x = 0,
            width = my.grid.getColumnCount(),
            y = my.grid.getRowCount() - 1,
            length;

        walls = [];

        while (y > 0) {
          length = randomLength();

          walls.push(rowLength(x, y - 1, length));

          walls.push(columnLength(x + length + 1, y, length));

          x += length;
          y -= length;
        }
      },

      populateGrid = function() {
        buildWalls();

        my.walls(walls);
      },

      render = function() {
        var wallSelection, wallBlocks;

        wallSelection = my.grid.selectAll(".wall").data(walls);
        wallSelection.enter()
          .append("g")
          .attr("class", "wall");

        wallSelection.exit().remove();

        wallBlocks = wallSelection.selectAll(".block")
          .data(function(d) { return d; });

        wallBlocks.enter()
          .append("rect")
          .attr("class", "block")
          .attr("x", my.grid.offsetX(0.5))
          .attr("y", my.grid.offsetY(0.5))
          .attr("rx", "2")
          .attr("ry", "2")
          .attr("height", my.grid.getCellHeight() + 0.5)
          .attr("width", my.grid.getCellWidth() + 0.5);

        wallBlocks.transition()
          .attr("x", my.grid.offsetX(0.5))
          .attr("y", my.grid.offsetY(0.5));
      };

  that.clear = function() {
    walls = [];
    my.reset();
    that.rover().reset();
    render();
  };

  that.reset = function() {
    my.reset();
    that.rover().reset();
    buildWalls();
    populateGrid();
  };

  that.rover = function() {
    if (typeof my.rover === 'undefined') {
      my.rover = RVR.rover({
        grid: my.grid,
        level: that,
        position: {x: 0, y: 0}
      });
    }
    return my.rover;
  };

  that.goal = function() {
    if (typeof my.goal === 'undefined') {
      my.goal = RVR.goal({
        grid: my.grid,
        x: my.grid.getColumnCount() - 1,
        y: my.grid.getRowCount() - 1
      });
    }
    return my.goal;
  };

  that.mission = [
    'This level introduces you to your sensor checks. You have 2 sensor checks.',
    'The first one checks your current heading against one of the 4 possible directions: North, South, East & West. If your heading matches the selected direction, the first block of nested instructions will execute. If your heading does not match the selected direction, the "Otherwise" block of instructions will run.',
    "The second sensor can determine whether or not a specific direction is blocked for travel in the rover's current position. If it is, the first group of instructions will execute. If it is not, the second group will execute.",
    "Sensor checks are not events, so they do not wait for a trigger to execute. They will execute immediately when called.",,
    "Sensor checks should only be used when your rover is stopped or blocked."
  ];

  that.render = render;

  return that;
};

