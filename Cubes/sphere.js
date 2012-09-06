(function() {
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
