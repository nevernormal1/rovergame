RVR.levels = function() {
  var levels = [],
      current = 0,

      buildLevels = function() {
        levels = [
          RVR.straight,
          RVR.zigzag
        ]
      },

      maker = function() {
        return {
          next: function() {
            var level;

            if (levels.length == 0) {
              buildLevels();
            }

            level = levels[current];
            current += 1;

            return level();
          },
        };
      }

  return maker();
}();

