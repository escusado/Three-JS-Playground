Class('Sphere')(
  prototype:
    init: (radius = 80, segments = 8, rings = 8, color = "00FF00") ->
      #making a mesh

      sphereGeometry = new THREE.SphereGeometry radius, segments, rings 
      sphericMaterial = new THREE.MeshLambertMaterial
        color: parseInt '0x'+color

      @mesh = new THREE.Mesh  sphereGeometry, sphericMaterial
)()