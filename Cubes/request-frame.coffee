# requestAnimationFrame() shim by Paul Irish
# http://paulirish.com/2011/requestanimationframe-for-smart-animating/

window.requestAnimFrame = (->
  window.requestAnimationFrame or window.webkitRequestAnimationFrame or                         window.mozRequestAnimationFrame or window.oRequestAnimationFrame or window.msRequestAnimationFrame or (callback, element) ->
    window.setTimeout callback, 1000 / 60
)()

# Behaves the same as setInterval except uses requestAnimationFrame() where possible for better performance
# @param {function} fn The callback function
# @param {int} delay The delay in milliseconds

window.requestInterval = (fn, delay) ->

  return window.setInterval(fn, delay) if not window.requestAnimationFrame and not         window.webkitRequestAnimationFrame and not (window.mozRequestAnimationFrame and     window.mozCancelRequestAnimationFrame) and not window.oRequestAnimationFrame and not     window.msRequestAnimationFrame

  start = new Date().getTime()
  handle = {}

  theLoop = ->
    current = new Date().getTime()
    delta = current - start
    if delta >= delay
      fn.call()
      start = new Date().getTime()
    handle.value = requestAnimFrame(theLoop)  

  handle.value = requestAnimFrame(theLoop)
  return handle
# Behaves the same as clearInterval except uses cancelRequestAnimationFrame() where possible for better performance
# @param {int|object} fn The callback function

window.clearRequestInterval = (handle) ->
  (if window.cancelAnimationFrame then window.cancelAnimationFrame(handle.value) else (if     window.webkitCancelAnimationFrame then window.webkitCancelAnimationFrame(handle.value) else     (if window.webkitCancelRequestAnimationFrame then     window.webkitCancelRequestAnimationFrame(handle.value) else (if     window.mozCancelRequestAnimationFrame then window.mozCancelRequestAnimationFrame(handle.value)     else (if window.oCancelRequestAnimationFrame then     window.oCancelRequestAnimationFrame(handle.value) else (if window.msCancelRequestAnimationFrame then window.msCancelRequestAnimationFrame(handle.value)         else clearInterval(handle)))))))

