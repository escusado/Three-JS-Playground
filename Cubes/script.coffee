Class('PlayGround')(
  prototype:
    init: ->
      @canvasSize = {}
      @canvasSize.w  = $(window).width()
      @canvasSize.h = $(window).height()

      VIEW_ANGLE = 45
      ASPECT = @canvasSize.w/@canvasSize.h
      NEAR = 0.1
      FAR = 10000

      @renderer = new THREE.WebGLRenderer({ antialias: true, clearColor: 0x000000, clearAlpha: 1 })
      @camera = new THREE.PerspectiveCamera VIEW_ANGLE, ASPECT, NEAR, FAR
      @scene = new THREE.Scene()

      @mouse = {}
      gridSize = {}

      @renderer.setSize @canvasSize.w, @canvasSize.h
      @camera.position.z = 500
      @camera.position.y = @canvasSize.h/2
      @camera.position.x = @canvasSize.w/2

      $('.canvas').append @renderer.domElement

      @startTime = new Date().getTime()
      
      @pointLight = new THREE.PointLight 0xFFFFFF
      @ambientLight = new THREE.AmbientLight 0x222222
      @directionalLight = new THREE.DirectionalLight 0xffffff
      #@directionalLight.position.set(4, 24, 20)

      @pointLight.position.x = @canvasSize.w/2
      @pointLight.position.y = @canvasSize.h/2
      @pointLight.position.z = 10

      #@sphere = new Sphere(20,8,8,'00ff55').mesh

      cubeSize = 16
      cubeMargin = 0
      gridSize.w = Math.floor @canvasSize.w / (cubeSize+cubeMargin)
      gridSize.h = Math.floor @canvasSize.h / (cubeSize+cubeMargin)

      group = new THREE.Object3D()
      
      row = 0
      col = 0

      for i in [0..gridSize.w*gridSize.h] by 1
        mesh = new Cube(cubeSize,cubeSize,cubeSize,'00ff55').mesh

        mesh.position.x = row * (cubeMargin + cubeSize)
        mesh.position.y = col * (cubeMargin + cubeSize)

        if row is gridSize.w-1 
          row = 0
          if col is gridSize.h-1 then col = 0 else col++
        else row++
        

        mesh.position.z = Math.floor Math.random() * 10
        
        group.add( mesh )

      @scene.add @pointLight
      @scene.add @ambientLight
      #@scene.add @directionalLight
      @scene.add group
      @scene.add @camera

      dragcontrols = new THREE.DragControls(@camera, @scene, @renderer.domElement);

      @bindEvents()

    bindEvents: ->

    update: (t) ->

      @renderer.clear()

      #t = current time
      time = t - @startTime
      
      val =  (Math.round time/100)+50

      objPos = @pointLight.position

      increment = 10

      if keydown.pageup
        objPos.z += increment
        console.log 'z-up: '+objPos.z
      
      if keydown.pagedown
        objPos.z -= increment
        console.log 'z-down: '+objPos.z

      if keydown.up
        objPos.y += increment
        console.log 'up: '+objPos.y

      if keydown.down
        objPos.y -= increment
        console.log 'down: '+objPos.y

      if keydown.left
        objPos.x -= increment
        console.log 'left: '+objPos.x

      if keydown.right
        objPos.x += increment
        console.log 'right: '+objPos.x
      
)()

$(document).ready ->
  animLoop = new PlayGround()

  animate = (t) ->
    requestAnimFrame animate
    animLoop.update(t)
    #render
    animLoop.renderer.render animLoop.scene, animLoop.camera
  
  #kickoff
  animate()