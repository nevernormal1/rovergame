if (typeof RVR === 'undefined') {
  RVR = {};
}

RVR.grid = function(params) {
  var container = params.container,
      dimensions = container.getLevelDimensions(),
      rowCount = params.rows || 14,
      columnCount = params.columns || 14,
      parent = container.getElement(),

      outOfBounds = function(position) {
        if (position.x < 0 || position.y < 0) return true;
        return (position.x > columnCount - 1 || position.y > rowCount - 1);
      },

      x = d3.scale.linear().range([0, dimensions.width]),
      y = d3.scale.linear().range([0, dimensions.height]),
      cellWidth = dimensions.width / columnCount,
      cellHeight = dimensions.height / rowCount,

      baseOffset = {
        x: function(d) { return x(d.x) },
        y: function(d) { return y(d.y) }
      },

      selectAll = function() {
        return parent.selectAll.apply(parent, arguments);
      },

      offsetX = function(percentage) {
        return function(d) {
          return x(d.x) - cellWidth * percentage - 0.5;
        };
      },

      offsetY = function(percentage) {
        return function(d) {
          return y(d.y) - cellHeight * percentage - 0.5;
        }
      },

      getCellWidth = function() {
        return cellWidth;
      },

      getCellHeight = function() {
        return cellHeight;
      },

      clear = function() {
        selectAll("*").remove();
      },

      instance = {};

  x.domain([0, columnCount - 1]);
  y.domain([0, rowCount - 1]);

  instance.getColumnCount = function() {
    return columnCount;
  }

  instance.getRowCount = function() {
    return rowCount;
  }

  instance.outOfBounds = outOfBounds;
  instance.x = x;
  instance.y = y;
  instance.baseOffset = baseOffset;
  instance.offsetX = offsetX;
  instance.offsetY = offsetY;
  instance.getCellWidth = getCellWidth;
  instance.getCellHeight = getCellHeight;
  instance.selectAll = selectAll;
  instance.clear = clear;

  return instance;
}
