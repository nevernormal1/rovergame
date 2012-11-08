if (typeof RVR === 'undefined') {
  RVR = {};
}

RVR.container = function(params) {
  var dimensions = params.dimensions || {width:  573, height: 573},
      margins = params.margins || {top: 20, right: 24, bottom: 16, left: 20},
      rowCount = params.rowCount,
      columnCount = params.columnCount,
      element = d3.select("#level-content")
        .append("svg")
        .attr("height", dimensions.height)
        .attr("width", dimensions.width)
        .append("g")
        .attr("transform", "translate(" + margins.left + "," + margins.top + ")"),
      levelDimensions = {
        width: dimensions.width - margins.left - margins.right,
        height: dimensions.height - margins.top - margins.bottom
      },
      instance = {};

  instance.getLevelDimensions = function() {
    return levelDimensions;
  };

  instance.getElement = function() {
    return element;
  };

  return instance;
};

