Array.matrix = function (m, n, initial) {
  var a, i, j, mat = [];
  for (i = 0; i < m; i += 1) {
    a = [];
    for (j = 0; j < n; j += 1) {
      a[j] = initial;
    }
    mat[i] = a;
  }
  return mat;
};

Array.vector = function(l, initial) {
  var a = [], i;
  for (i = 0; i < l; l++) {
    a[i] = initial;
  }
  return a;
}

