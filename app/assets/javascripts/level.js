if (typeof RVR === 'undefined') {
  RVR = {};
}

RVR.level = function(my) {
  var parent,
      that = {},

      collision = function(position) {
        if (my.data[position.y][position.x] === 1) return true;
        return false;
      };

  my = my || {};

  that.grid = function(grid_param) {
    my.grid = grid_param;
    return that;
  };

  that.parent = function(parent_param) {
    my.parent = parent_param;
    return that;
  };

  that.collision = collision;

  return that;
}
