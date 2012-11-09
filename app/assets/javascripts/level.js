if (typeof RVR === 'undefined') {
  RVR = {};
}

RVR.level = function() {
  var grid,
      parent,
      walls,
      data,
      instance = {},

      generateWallCount = function() {
        var randomWallCount = Math.ceil(Math.random() * 4) * 2,
            maxWallCount = Math.floor((grid.getRowCount() - 1) / 2);

        if (randomWallCount > maxWallCount) {
          return maxWallCount;
        }
        return randomWallCount;
      },

      buildWalls = function() {
        var i, j, y=0, minY=1, maxY, wall, wallCount = generateWallCount();

        walls = [];

        for(i=0; i<wallCount; i++) {
          wall = new Array();
          maxY = grid.getRowCount() - 1 - ((wallCount - i - 1) * 2)
          y = Math.floor(Math.random() * (maxY - minY)) + minY;
          if (i % 2 === 0) { // Left wall
            for(j = 0; j< grid.getColumnCount() - 2; j++) {
              wall.push({x: j, y: y});
            }
          } else { // Right wall
            for(j = 2; j < grid.getColumnCount(); j++) {
              wall.push({x: j, y: y});
            }
          }
          walls.push(wall);
          minY = y + 2;
        }
      },

      populateGrid = function() {
        var i, j, wall, wallPoint;

        data = new Array.matrix(grid.getRowCount(), grid.getColumnCount(), 0);

        for(i=0; i<walls.length; i++) {
          wall = walls[i];
          for(j=0; j<wall.length; j++) {
            wallPoint = wall[j];
            data[wallPoint.y][wallPoint.x] = 1;
          }
        }
      },

      collision = function(position) {
        if (data[position.y][position.x] === 1) return true;
        return false;
      },

      reset = function() {
        buildWalls();
        populateGrid();
      },

      render = function() {
        var wallSelection, wallBlocks;

        wallSelection = parent.selectAll(".wall").data(walls);
        wallSelection.enter()
          .append("g")
          .attr("class", "wall");

        wallSelection.exit().remove();

        wallBlocks = wallSelection.selectAll(".block")
          .data(function(d) { return d; });

        wallBlocks.enter()
          .append("rect")
          .attr("class", "block")
          .attr("x", grid.offsetX(0.5))
          .attr("y", grid.offsetY(0.5))
          .attr("rx", "2")
          .attr("ry", "2")
          .attr("height", grid.getCellHeight() + 0.5)
          .attr("width", grid.getCellWidth() + 0.5);

        wallBlocks.transition()
          .attr("x", grid.offsetX(0.5))
          .attr("y", grid.offsetY(0.5));
      };

  instance.grid = function(grid_param) {
    grid = grid_param;
    return instance;
  };

  instance.parent = function(parent_param) {
    parent = parent_param;
    return instance;
  };

  instance.collision = collision;
  instance.reset = reset;
  instance.render = render;

  return instance;
}
