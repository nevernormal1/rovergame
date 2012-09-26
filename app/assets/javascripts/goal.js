if (typeof RVR === 'undefined') {
  RVR = {};
}

RVR.goal = function(params) {
  var parent = params.parent,
      grid = params.grid,
      position = {
        x: params.x,
        y: params.y
      },

      getPosition = function() {
        return position;
      },

      render = function() {
        parent.selectAll(".goal")
          .data([position])
          .enter()
          .append("circle")
          .attr("class", "goal")
          .attr("r", grid.getCellWidth() / 4)
          .attr("cx", grid.baseOffset.x)
          .attr("cy", grid.baseOffset.y);
      },

      instance = {};

  instance.render = render;

  return instance;


};
