/*
 * jQuery Hotkeys Plugin
 * Copyright 2010, John Resig
 * Dual licensed under the MIT or GPL Version 2 licenses.
 *
 * Based upon the plugin by Tzury Bar Yochay:
 * http://github.com/tzuryby/hotkeys
 *
 * Original idea by:
 * Binny V A, http://www.openjs.com/scripts/events/keyboard_shortcuts/
*/

(function(jQuery){
        
        jQuery.hotkeys = {
                version: "0.8",

                specialKeys: {
                        8: "backspace", 9: "tab", 13: "return", 16: "shift", 17: "ctrl", 18: "alt", 19: "pause",
                        20: "capslock", 27: "esc", 32: "space", 33: "pageup", 34: "pagedown", 35: "end", 36: "home",
                        37: "left", 38: "up", 39: "right", 40: "down", 45: "insert", 46: "del", 
                        96: "0", 97: "1", 98: "2", 99: "3", 100: "4", 101: "5", 102: "6", 103: "7",
                        104: "8", 105: "9", 106: "*", 107: "+", 109: "-", 110: ".", 111 : "/", 
                        112: "f1", 113: "f2", 114: "f3", 115: "f4", 116: "f5", 117: "f6", 118: "f7", 119: "f8", 
                        120: "f9", 121: "f10", 122: "f11", 123: "f12", 144: "numlock", 145: "scroll", 191: "/", 224: "meta"
                },
        
                shiftNums: {
                        "`": "~", "1": "!", "2": "@", "3": "#", "4": "$", "5": "%", "6": "^", "7": "&", 
                        "8": "*", "9": "(", "0": ")", "-": "_", "=": "+", ";": ": ", "'": "\"", ",": "<", 
                        ".": ">",  "/": "?",  "\\": "|"
                }
        };

        function keyHandler( handleObj ) {
                // Only care when a possible input has been specified
                if ( typeof handleObj.data !== "string" ) {
                        return;
                }
                
                var origHandler = handleObj.handler,
                        keys = handleObj.data.toLowerCase().split(" ");
        
                handleObj.handler = function( event ) {
                        // Don't fire in text-accepting inputs that we didn't directly bind to
                        if ( this !== event.target && (/textarea|select/i.test( event.target.nodeName ) ||
                                 event.target.type === "text") ) {
                                return;
                        }
                        
                        // Keypress represents characters, not special keys
                        var special = event.type !== "keypress" && jQuery.hotkeys.specialKeys[ event.which ],
                                character = String.fromCharCode( event.which ).toLowerCase(),
                                key, modif = "", possible = {};

                        // check combinations (alt|ctrl|shift+anything)
                        if ( event.altKey && special !== "alt" ) {
                                modif += "alt+";
                        }

                        if ( event.ctrlKey && special !== "ctrl" ) {
                                modif += "ctrl+";
                        }
                        
                        // TODO: Need to make sure this works consistently across platforms
                        if ( event.metaKey && !event.ctrlKey && special !== "meta" ) {
                                modif += "meta+";
                        }

                        if ( event.shiftKey && special !== "shift" ) {
                                modif += "shift+";
                        }

                        if ( special ) {
                                possible[ modif + special ] = true;

                        } else {
                                possible[ modif + character ] = true;
                                possible[ modif + jQuery.hotkeys.shiftNums[ character ] ] = true;

                                // "$" can be triggered as "Shift+4" or "Shift+$" or just "$"
                                if ( modif === "shift+" ) {
                                        possible[ jQuery.hotkeys.shiftNums[ character ] ] = true;
                                }
                        }

                        for ( var i = 0, l = keys.length; i < l; i++ ) {
                                if ( possible[ keys[i] ] ) {
                                        return origHandler.apply( this, arguments );
                                }
                        }
                };
        }

        jQuery.each([ "keydown", "keyup", "keypress" ], function() {
                jQuery.event.special[ this ] = { add: keyHandler };
        });

})( jQuery );




$(function() {
  window.keydown = {};

  function keyName(event) {
    return $.hotkeys.specialKeys[event.which] ||
        String.fromCharCode(event.which).toLowerCase();
  }

  $(document).bind("keydown", function(event) {
    keydown[keyName(event)] = true;
  });

  $(document).bind("keyup", function(event) {
    keydown[keyName(event)] = false;
  });
});







/*
 * @author zz85
 */
THREE.DragControls = function(_camera, _objects, _domElement) {

    if (_objects instanceof THREE.Scene) {
        _objects = _objects.children;
    }
    var _projector = new THREE.Projector();

    var _mouse = new THREE.Vector3(),
        _offset = new THREE.Vector3();
    var _selected;

    _domElement.addEventListener('mousemove', onDocumentMouseMove, false);
    _domElement.addEventListener('mousedown', onDocumentMouseDown, false);
    _domElement.addEventListener('mouseup', onDocumentMouseUp, false);

    function onDocumentMouseMove(event) {

        event.preventDefault();

        _mouse.x = (event.clientX / _domElement.width) * 2 - 1;
        _mouse.y = -(event.clientY / _domElement.height) * 2 + 1;

        var ray = _projector.pickingRay(_mouse, _camera);

        if (_selected) {
            var targetPos = ray.direction.clone().multiplyScalar(_selected.distance).addSelf(ray.origin);
            _selected.object.position.copy(targetPos.subSelf(_offset));

            return;

        }

        var intersects = ray.intersectObjects(_objects);

        if (intersects.length > 0) {

            _domElement.style.cursor = 'pointer';

        } else {

            _domElement.style.cursor = 'auto';

        }

    }

    function onDocumentMouseDown(event) {

        event.preventDefault();

        _mouse.x = (event.clientX / _domElement.width) * 2 - 1;
        _mouse.y = -(event.clientY / _domElement.height) * 2 + 1;

        var ray = _projector.pickingRay(_mouse, _camera);
        var intersects = ray.intersectObjects(_objects);

        if (intersects.length > 0) {
            _selected = intersects[0];

            _offset.copy(_selected.point).subSelf(_selected.object.position);

            _domElement.style.cursor = 'move';

        }


    }

    function onDocumentMouseUp(event) {

        event.preventDefault();

        if (_selected) {
            _selected = null;
        }

        _domElement.style.cursor = 'auto';

    }


}