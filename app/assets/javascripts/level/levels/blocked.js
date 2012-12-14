if (typeof RVR === 'undefined') {
  RVR = {};
}

RVR.blocked = function() {
  var my = {},
      that = RVR.level(my),
      walls,

      generateWallCount = function() {
        return 12;
        //return Math.ceil(Math.random() * 2) * 2;
      },

      // Puts a wall from the starting index to the ending one, inclusive
      wallRange = function(start, end, coordinates) {
        var wall = new Array(),
            direction = start < end ? 1 : -1,
            i;

        end += direction;

        for(i = start; i !== end; i += direction) {
          wall.push(coordinates(i));
        }

        return wall;
      },

      rowCoordinates = function(row) {
        return function(i) {
          return {x: i, y: row};
        }
      };

      columnCoordinates = function(column) {
        return function(i) {
          return {x: column, y: i};
        }
      };

      buildWalls = function() {
        var i,
            row = 1,
            column = 0,
            direction = 1,
            width = my.grid.getColumnCount() - 2,
            height = my.grid.getRowCount() - 4,
            wallCount = generateWallCount();

        walls = new Array();

        for(i = 0; i < wallCount; i++) {
          if (i % 2 == 0) {
            if (direction > 0) {
              // Horizontal wall from left to right
              walls.push(wallRange(column, column + width, rowCoordinates(row)));
              column = column + width;
              row += 1;
              width -= 2;
            } else {
              // Horizontal wall from right to left
              walls.push(wallRange(column, column - width - 1, rowCoordinates(row)));
              column = column - width - 1;
              row -= 1;
              height -= 2;
              width -= 1;
            }

          } else {
            if (direction > 0) {
              // Vertical wall from top to bottom
              walls.push(wallRange(row, row + height, columnCoordinates(column)));
              column -= 1;
              row = row + height;
              width -= 1;
            } else {
              // Vertical wall from bottom to top
              walls.push(wallRange(row, row - height, columnCoordinates(column)));
              row = row - height;
              column += 1;
              height -= 2;
            }
            direction *= -1;
          }
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
        position: {x: 0, y: 0}
      });
    }
    return my.rover;
  };

  that.goal = function() {
    if (typeof my.goal === 'undefined') {
      my.goal = RVR.goal({
        grid: my.grid,
        x: my.grid.getColumnCount() / 2,
        y: my.grid.getRowCount() / 2
      });
    }
    return my.goal;
  };

  that.mission = [
    'This level introduces you to the "Blocked" event.',
    'When an obstacle prevents your rover from cruising on its current heading, a "Blocked" event will be triggered.',
    'Events are special instructions that have their own set of instructions nested inside them. These nested instructions are only executed when the event is triggered.',
    'To solve this level you will need to place on instruction inside a "Blocked" event. Good luck!'
  ];

  that.render = render;

  return that;
};

