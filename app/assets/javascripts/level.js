if (typeof RVR === 'undefined') {
  RVR = {};
}

RVR.level = function(spec, my) {
  var grid,
      parent,
      walls,
      data,
      that = {},

      collision = function(position) {
        if (data[position.y][position.x] === 1) return true;
        return false;
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
  that.reset = reset;
  that.render = render;

  return that;
}
