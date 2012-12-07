if (typeof RVR === 'undefined') {
  RVR = {};
}

RVR.rotate = function() {
  var my = {},
      that = RVR.level(my),
      wallGroups,

      generateWallCount = function() {
        return Math.ceil((Math.random() * (my.grid.getColumnCount() / 2 - 1)));
      },

      wallAtColumn = function(x) {
        var wall = new Array(),
            height = my.grid.getRowCount(),
            y;

        for(y = 0; y < height; y++) {
          wall.push({x: x, y: y});
        }

        return wall;
      },

      buildWalls = function() {
        var walls,
            x,
            width = my.grid.getColumnCount(),
            wallCount = generateWallCount();

        wallGroups = [];
        walls = new Array();

        for(x = wallCount - 1; x >= 0; x--) {
          walls.push(wallAtColumn(x));
        }

        wallGroups.push(walls);

        walls = new Array();

        for(x = width - wallCount; x < width; x++) {
          walls.push(wallAtColumn(x));
        }

        wallGroups.push(walls);
      },

      populateGrid = function() {
        buildWalls();

        $.each(wallGroups, function(walls, wallGroup) {
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
    populateGrid();
  };

  that.rover = function() {
    if (typeof my.rover === 'undefined') {
      my.rover = RVR.rover({
        grid: my.grid,
        level: that,
        position: {x: my.grid.getColumnCount() / 2, y: 0}
      });
    }
    return my.rover;
  };

  that.goal = function() {
    if (typeof my.goal === 'undefined') {
      my.goal = RVR.goal({
        grid: my.grid,
        x: my.grid.getColumnCount() / 2,
        y: my.grid.getRowCount() - 1
      });
    }
    return my.goal;
  };

  that.mission = [
    'This level introduces you to the rotate instruction.',
    'On this level, the goal is not on your initial path, so you will need to rotate before moving.',
    'See if you can program the rover to reach the goal.'
  ];

  that.render = render;

  return that;
};

