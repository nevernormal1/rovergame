if (typeof RVR === 'undefined') {
  RVR = {};
}

(function() {
  var generateWallCount = function() {
        var randomWallCount = Math.ceil(Math.random() * 4) * 2,
            maxWallCount = Math.floor((grid.getRowCount() - 1) / 2);

        if (randomWallCount > maxWallCount) {
          return maxWallCount;
        }
        return randomWallCount;
      },

      buildWalls = function() {
        var i, j, y=0, minY=1, maxY, wall, wallCount = generateWallCount(), walls;

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

        return walls;
      },

      populateGrid = function() {
        var data, i, j, wall, wallPoint, walls = buildWalls();

        data = new Array.matrix(grid.getRowCount(), grid.getColumnCount(), 0);

        for(i=0; i<walls.length; i++) {
          wall = walls[i];
          for(j=0; j<wall.length; j++) {
            wallPoint = wall[j];
            data[wallPoint.y][wallPoint.x] = 1;
          }
        }
      };

  return RVR.level().reset(function() {
    buildWalls();
    populateGrid();
  });

})();

