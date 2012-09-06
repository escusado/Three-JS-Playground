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

      @renderer.setSize @canvasSize.w, @canvasSize.h
      @camera.position.z = 500;

      $('.canvas').append @renderer.domElement

      @startTime = new Date().getTime()

     
      
      pointLight = new THREE.PointLight 0xFFFFFF

      pointLight.position.x = 10
      pointLight.position.y = 50
      pointLight.position.z = 130

      @sphere = new Sphere(20,8,8,'00ff55').mesh

      @scene.add pointLight
      @scene.add @sphere
      @scene.add @camera

      dragcontrols = new THREE.DragControls(@camera, @scene, @renderer.domElement);


      @bindEvents()

    bindEvents: ->
      $(document).mousemove (ev) =>
        @mouse.x = ( ev.pageX / window.innerWidth ) * 2 - 1;
        @mouse.y = ( ev.pageY / window.innerHeight ) * 2 + 1;
      
      # $(document).keypress (ev) =>
      #     if ev.keyCode is 38
      #       @Arrows.up = yes
      #     if ev.keyCode is 40
      #       @Arrows.do = yes
      #     if ev.keyCode is 37
      #       @Arrows.le = yes
      #     if ev.keyCode is 39
      #       @Arrows.ri = yes

      # $(document).keyup (ev) =>
      #   for direction in @Arrows
      #     direction = no


    update: (t) ->

      @renderer.clear()

      #t = current time
      time = t - @startTime
      
      val =  (Math.round time/100)+50

      # @sphere.position.x = @mouse.x*100
      # @sphere.position.y = @mouse.y*100

      if keydown.up
        @sphere.position.y++
        console.log 'up: '+@sphere.position.y

      if keydown.down
        @sphere.position.y--
        console.log 'down: '+@sphere.position.y

      if keydown.left
        @sphere.position.x--
        console.log 'left: '+@sphere.position.x

      if keydown.right
        @sphere.position.x++
        console.log 'right: '+@sphere.position.x
      
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