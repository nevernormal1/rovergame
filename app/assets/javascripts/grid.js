if (typeof RVR === 'undefined') {
  RVR = {};
}

RVR.grid = function(params) {
  var rowCount = params.rows || 14,
      columnCount = params.columns || 21,
      walls,
      data,
      instance = {};

  instance.getWalls = function() {
    return walls;
  };

  instance.getColumnCount = function() {
    return columnCount;
  }

  instance.getRowCount = function() {
    return rowCount;
  }

  var generateWallCount = function() {
    var randomWallCount = Math.ceil(Math.random() * 4) * 2,
        maxWallCount = Math.floor((rowCount - 1) / 2);

    if (randomWallCount > maxWallCount) {
      return maxWallCount;
    }
    return randomWallCount;
  };

  var buildWalls = function() {
    var i, j, y=0, minY=1, maxY, wall, wallCount = generateWallCount();

    walls = [];

    for(i=0; i<wallCount; i++) {
      wall = new Array();
      maxY = rowCount - 1 - ((wallCount - i - 1) * 2)
      y = Math.floor(Math.random() * (maxY - minY)) + minY;
      if (i % 2 === 0) { // Left wall
        for(j=0; j<columnCount-2; j++) {
          wall.push({x: j, y: y});
        }
      } else { // Right wall
        for(j=2; j<columnCount; j++) {
          wall.push({x: j, y: y});
        }
      }
      walls.push(wall);
      minY = y + 2;
    }
  };

  var populateGrid = function() {
    var i, j, wall, wallPoint;

    data = new Array.matrix(rowCount, columnCount, 0);

    for(i=0; i<walls.length; i++) {
      wall = walls[i];
      for(j=0; j<wall.length; j++) {
        wallPoint = wall[j];
        data[wallPoint.y][wallPoint.x] = 1;
      }
    }
  };

  var outOfBounds = function(position) {
    if (position.x < 0 || position.y < 0) return true;
    if (position.x > columnCount - 1 || position.y > rowCount - 1) return true;
    return false;
  };
  instance.outOfBounds = outOfBounds;

  var collision = function(position) {
    if (data[position.y][position.x] === 1) return true;
    return false;
  };
  instance.collision = collision;

  var reset = function() {
    buildWalls();
    populateGrid();
  };
  instance.reset = reset;

  return instance;
}
