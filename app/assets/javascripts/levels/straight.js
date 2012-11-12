if (typeof RVR === 'undefined') {
  RVR = {};
}

RVR.straight = function() {
  var my = {},
      that = RVR.level(my),
      walls,

      generateWallCount = function() {
        return Math.ceil((Math.random() * (my.grid.getRowCount() / 2 - 1))) * 2;
      },

      buildWalls = function() {
        var i,
            j,
            wall,
            y = 0,
            width = my.grid.getColumnCount(),
            wallCount = generateWallCount();

        walls = [];

        for(i = 0; i < wallCount / 2; i++) {
          wall = new Array();

          for(j = 0; j < width; j++) {
            wall.push({x: j, y: y});
          }

          walls.push(wall);
          y += 1;
        }

        y = my.grid.getRowCount() - (wallCount - i);

        for(i = wallCount / 2; i < wallCount; i++) {
          wall = new Array();

          for(j = 0; j < width; j++) {
            wall.push({x: j, y: y});
          }

          walls.push(wall);
          y += 1;
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

  that.reset = function() {
    my.reset();
    buildWalls();
    populateGrid();
  };

  that.render = render;

  return that;
};

