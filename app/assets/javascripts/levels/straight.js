if (typeof RVR === 'undefined') {
  RVR = {};
}

RVR.straight = function() {
  var my = {},
      that = RVR.level(my),
      wallGroups,

      generateWallCount = function() {
        return Math.ceil((Math.random() * (my.grid.getRowCount() / 2 - 1)));
      },

      buildWalls = function() {
        var i,
            j,
            wall,
            walls,
            y = 0,
            width = my.grid.getColumnCount(),
            height = my.grid.getRowCount(),
            wallCount = generateWallCount();

        wallGroups = [];
        walls = new Array();

        for(y = wallCount - 1; y >= 0; y--) {
          wall = new Array();

          for(j = 0; j < width; j++) {
            wall.push({x: j, y: y});
          }

          walls.push(wall);
        }

        wallGroups.push(walls);

        walls = new Array();

        for(y = height - wallCount; y <= height; y++) {
          wall = new Array();

          for(j = 0; j < width; j++) {
            wall.push({x: j, y: y});
          }

          walls.push(wall);
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

  that.reset = function() {
    my.reset();
    buildWalls();
    populateGrid();
  };

  that.render = render;

  return that;
};

