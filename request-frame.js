(function() {
  window.requestAnimFrame = (function() {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(callback, element) {
      return window.setTimeout(callback, 1000 / 60);
    };
  })();
  window.requestInterval = function(fn, delay) {
    var handle, start, theLoop;
    if (!window.requestAnimationFrame && !window.webkitRequestAnimationFrame && !(window.mozRequestAnimationFrame && window.mozCancelRequestAnimationFrame) && !window.oRequestAnimationFrame && !window.msRequestAnimationFrame) {
      return window.setInterval(fn, delay);
    }
    start = new Date().getTime();
    handle = {};
    theLoop = function() {
      var current, delta;
      current = new Date().getTime();
      delta = current - start;
      if (delta >= delay) {
        fn.call();
        start = new Date().getTime();
      }
      return handle.value = requestAnimFrame(theLoop);
    };
    handle.value = requestAnimFrame(theLoop);
    return handle;
  };
  window.clearRequestInterval = function(handle) {
    if (window.cancelAnimationFrame) {
      return window.cancelAnimationFrame(handle.value);
    } else {
      if (window.webkitCancelAnimationFrame) {
        return window.webkitCancelAnimationFrame(handle.value);
      } else {
        if (window.webkitCancelRequestAnimationFrame) {
          return window.webkitCancelRequestAnimationFrame(handle.value);
        } else {
          if (window.mozCancelRequestAnimationFrame) {
            return window.mozCancelRequestAnimationFrame(handle.value);
          } else {
            if (window.oCancelRequestAnimationFrame) {
              return window.oCancelRequestAnimationFrame(handle.value);
            } else {
              if (window.msCancelRequestAnimationFrame) {
                return window.msCancelRequestAnimationFrame(handle.value);
              } else {
                return clearInterval(handle);
              }
            }
          }
        }
      }
    }
  };
}).call(this);
