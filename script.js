(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  Class('PlayGround')({
    prototype: {
      init: function() {
        var ASPECT, FAR, NEAR, VIEW_ANGLE, dragcontrols, pointLight;
        this.canvasSize = {};
        this.canvasSize.w = $(window).width();
        this.canvasSize.h = $(window).height();
        VIEW_ANGLE = 45;
        ASPECT = this.canvasSize.w / this.canvasSize.h;
        NEAR = 0.1;
        FAR = 10000;
        this.renderer = new THREE.WebGLRenderer({
          antialias: true,
          clearColor: 0x000000,
          clearAlpha: 1
        });
        this.camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
        this.scene = new THREE.Scene();
        this.mouse = {};
        this.renderer.setSize(this.canvasSize.w, this.canvasSize.h);
        this.camera.position.z = 500;
        $('.canvas').append(this.renderer.domElement);
        this.startTime = new Date().getTime();
        pointLight = new THREE.PointLight(0xFFFFFF);
        pointLight.position.x = 10;
        pointLight.position.y = 50;
        pointLight.position.z = 130;
        this.sphere = new Sphere(20, 8, 8, '00ff55').mesh;
        this.scene.add(pointLight);
        this.scene.add(this.sphere);
        this.scene.add(this.camera);
        dragcontrols = new THREE.DragControls(this.camera, this.scene, this.renderer.domElement);
        return this.bindEvents();
      },
      bindEvents: function() {
        return $(document).mousemove(__bind(function(ev) {
          this.mouse.x = (ev.pageX / window.innerWidth) * 2 - 1;
          return this.mouse.y = (ev.pageY / window.innerHeight) * 2 + 1;
        }, this));
      },
      update: function(t) {
        var time, val;
        this.renderer.clear();
        time = t - this.startTime;
        val = (Math.round(time / 100)) + 50;
        if (keydown.up) {
          this.sphere.position.y++;
          console.log('up: ' + this.sphere.position.y);
        }
        if (keydown.down) {
          this.sphere.position.y--;
          console.log('down: ' + this.sphere.position.y);
        }
        if (keydown.left) {
          this.sphere.position.x--;
          console.log('left: ' + this.sphere.position.x);
        }
        if (keydown.right) {
          this.sphere.position.x++;
          return console.log('right: ' + this.sphere.position.x);
        }
      }
    }
  })();
  $(document).ready(function() {
    var animLoop, animate;
    animLoop = new PlayGround();
    animate = function(t) {
      requestAnimFrame(animate);
      animLoop.update(t);
      return animLoop.renderer.render(animLoop.scene, animLoop.camera);
    };
    return animate();
  });
}).call(this);
