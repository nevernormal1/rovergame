if (typeof RVR === 'undefined') {
  RVR = {};
}

RVR.level = function(my) {
  var that = {},

      collision = function(position) {
        if (my.data[position.y][position.x] === 1) return true;
        return false;
      };

  my = my || {};

  my.reset = function() {
    my.data = new Array.matrix(
      my.grid.getRowCount(), my.grid.getColumnCount(), 0
    );
  };

  my.walls = function(wall_data) {
    var wallPoint;

    for(i=0; i < wall_data.length; i++) {
      wall = wall_data[i];
      for(j=0; j < wall.length; j++) {
        wallPoint = wall[j];
        my.data[wallPoint.y][wallPoint.x] = 1;
      }
    }
  };

  that.grid = function(grid_param) {
    my.grid = grid_param;

    return that;
  };

  that.collision = collision;

  return that;
}
