if (typeof RVR === 'undefined') {
  RVR = {};
}

RVR.zigzagup = function() {
  var my = {},
      that = RVR.level(my),
      wallGroups,

      generateWallCount = function() {
        return Math.ceil(Math.random() * 6) + 4;
      },

      rowLength = function(x, y, length) {
        var i, wall = [];

        console.log({x: x, y: y});

        for (i = 0; i < length; i++) {
          if (x + i <= my.grid.getColumnCount()) {
            wall.push({x: x + i, y: y});
          }
        }

        return wall;
      },


      buildWalls = function() {
        var i = 0,
            wallCount = generateWallCount(),
            width = my.grid.getColumnCount(),
            height = my.grid.getRowCount(),
            topWalls = [],
            bottomWalls = [];

        wallGroups = [];

        for(i = 0; i < wallCount; i++) {
          topWalls.push(rowLength(0, i, wallCount - i));
          bottomWalls.push(rowLength(width - wallCount + i, height - i - 1, wallCount - i));
        }

        wallGroups.push(topWalls);
        wallGroups.push(bottomWalls);
      },

      populateGrid = function() {
        buildWalls();

        wallGroups.forEach(function(walls) {
          my.walls(walls);
        });
      },

      render = function() {
        var wallGroupSelection, wallSelection, wallBlocks;

        wallGroupSelection = my.grid.selectAll(".wallGroup").data(wallGroups);
        wallGroupSelection.enter()
          .append("g")
          .attr("class", "wallGroup");
        wallGroupSelection.exit().remove();

        wallSelection = wallGroupSelection.selectAll(".wall").data(function(d) { return d; });
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
    my.grid.clear();
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
        position: {x: 0, y: my.grid.getRowCount() - 1}
      });
    }
    return my.rover;
  };

  that.goal = function() {
    if (typeof my.goal === 'undefined') {
      my.goal = RVR.goal({
        grid: my.grid,
        x: my.grid.getColumnCount() - 1,
        y: 0
      });
    }
    return my.goal;
  };

  that.mission = [
    'This level introduces you to the "Heading" sensor check.',
    'The "If Heading Is ---" sensor checks your current heading against one of the 4 possible directions: North, South, East & West. If your heading matches the selected direction, the first block of nested instructions will execute. If your heading does not match the selected direction, the "Otherwise" block of instructions will run.',
    "Sensor checks are not events, so they do not wait for a trigger to execute. They will execute immediately when called.",
    "Sensor checks should only be used when your rover is stopped or blocked.",
    "See if you can combine this sensor check with the instructions you've already learned to reach this level's goal."
  ];

  that.render = render;

  return that;
};

