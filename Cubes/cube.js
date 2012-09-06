(function() {
  Class('Cube')({
    prototype: {
      init: function(x, y, z, color) {
        var cubewGeo, material;
        if (x == null) {
          x = 80;
        }
        if (y == null) {
          y = 8;
        }
        if (z == null) {
          z = 8;
        }
        if (color == null) {
          color = "00FF00";
        }
        material = new THREE.MeshLambertMaterial({
          color: parseInt('0x' + color)
        });
        cubewGeo = new THREE.CubeGeometry(x, y, z, 1, 1, 1, material);
        return this.mesh = new THREE.Mesh(cubewGeo, material);
      }
    }
  })();
  Class('Sphere')({
    prototype: {
      init: function(radius, segments, rings, color) {
        var sphereGeometry, sphericMaterial;
        if (radius == null) {
          radius = 80;
        }
        if (segments == null) {
          segments = 8;
        }
        if (rings == null) {
          rings = 8;
        }
        if (color == null) {
          color = "00FF00";
        }
        sphereGeometry = new THREE.SphereGeometry(radius, segments, rings);
        sphericMaterial = new THREE.MeshLambertMaterial({
          color: parseInt('0x' + color)
        });
        return this.mesh = new THREE.Mesh(sphereGeometry, sphericMaterial);
      }
    }
  })();
}).call(this);
