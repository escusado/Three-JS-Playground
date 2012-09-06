Class('Cube')(
  prototype:
    init: (x = 80, y = 8, z = 8, color = "00FF00") ->
      #making a mesh
      material = new THREE.MeshLambertMaterial
        color: parseInt '0x'+color

      cubewGeo = new THREE.CubeGeometry( x, y, z, 1, 1, 1, material )

      @mesh = new THREE.Mesh  cubewGeo, material
)()





Class('Sphere')(
  prototype:
    init: (radius = 80, segments = 8, rings = 8, color = "00FF00") ->
      #making a mesh

      sphereGeometry = new THREE.SphereGeometry radius, segments, rings 
      sphericMaterial = new THREE.MeshLambertMaterial
        color: parseInt '0x'+color

      @mesh = new THREE.Mesh  sphereGeometry, sphericMaterial
)()