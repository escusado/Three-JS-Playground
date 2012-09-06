(function() {
  Class('PlayGround')({
    prototype: {
      init: function() {
        var ASPECT, FAR, NEAR, VIEW_ANGLE, col, cubeMargin, cubeSize, dragcontrols, gridSize, group, i, mesh, row, _ref, _step;
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
        gridSize = {};
        this.renderer.setSize(this.canvasSize.w, this.canvasSize.h);
        this.camera.position.z = 500;
        this.camera.position.y = this.canvasSize.h / 2;
        this.camera.position.x = this.canvasSize.w / 2;
        $('.canvas').append(this.renderer.domElement);
        this.startTime = new Date().getTime();
        this.pointLight = new THREE.PointLight(0xFFFFFF);
        this.ambientLight = new THREE.AmbientLight(0x222222);
        this.directionalLight = new THREE.DirectionalLight(0xffffff);
        this.pointLight.position.x = this.canvasSize.w / 2;
        this.pointLight.position.y = this.canvasSize.h / 2;
        this.pointLight.position.z = 10;
        cubeSize = 16;
        cubeMargin = 0;
        gridSize.w = Math.floor(this.canvasSize.w / (cubeSize + cubeMargin));
        gridSize.h = Math.floor(this.canvasSize.h / (cubeSize + cubeMargin));
        group = new THREE.Object3D();
        row = 0;
        col = 0;
        for (i = 0, _ref = gridSize.w * gridSize.h, _step = 1; 0 <= _ref ? i <= _ref : i >= _ref; i += _step) {
          mesh = new Cube(cubeSize, cubeSize, cubeSize, '00ff55').mesh;
          mesh.position.x = row * (cubeMargin + cubeSize);
          mesh.position.y = col * (cubeMargin + cubeSize);
          if (row === gridSize.w - 1) {
            row = 0;
            if (col === gridSize.h - 1) {
              col = 0;
            } else {
              col++;
            }
          } else {
            row++;
          }
          mesh.position.z = Math.floor(Math.random() * 10);
          group.add(mesh);
        }
        this.scene.add(this.pointLight);
        this.scene.add(this.ambientLight);
        this.scene.add(group);
        this.scene.add(this.camera);
        dragcontrols = new THREE.DragControls(this.camera, this.scene, this.renderer.domElement);
        return this.bindEvents();
      },
      bindEvents: function() {},
      update: function(t) {
        var increment, objPos, time, val;
        this.renderer.clear();
        time = t - this.startTime;
        val = (Math.round(time / 100)) + 50;
        objPos = this.pointLight.position;
        increment = 10;
        if (keydown.pageup) {
          objPos.z += increment;
          console.log('z-up: ' + objPos.z);
        }
        if (keydown.pagedown) {
          objPos.z -= increment;
          console.log('z-down: ' + objPos.z);
        }
        if (keydown.up) {
          objPos.y += increment;
          console.log('up: ' + objPos.y);
        }
        if (keydown.down) {
          objPos.y -= increment;
          console.log('down: ' + objPos.y);
        }
        if (keydown.left) {
          objPos.x -= increment;
          console.log('left: ' + objPos.x);
        }
        if (keydown.right) {
          objPos.x += increment;
          return console.log('right: ' + objPos.x);
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
