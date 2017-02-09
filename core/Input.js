
/**
 * Module exports.
 */
 
if(typeof module !== 'undefined')
    module.exports = Input;
 
function Input()
{
    // keyboard
    this.keyboard = {};
    this.keyboard.keysDown = [];
    this.keyboard.constant = {
        8: "backspace",
        9: "tab",
        13: "return",
        16: "shift",
        17: "ctrl",
        18: "alt",
        19: "pause",
        20: "capslock",
        27: "escape",
        33: "pageup",
        34: "pagedown",
        35: "end",
        36: "home",
        45: "insert",
        46: "delete",
        37: "left",
        38: "up",
        39: "right",
        40: "down",
        91: "lmeta",
        92: "rmeta",
        93: "mode",
        96: "kp0",
        97: "kp1",
        98: "kp2",
        99: "kp3",
        100: "kp4",
        101: "kp5",
        102: "kp6",
        103: "kp7",
        104: "kp8",
        105: "kp9",
        106: "kp*",
        107: "kp+",
        109: "kp-",
        110: "kp.",
        111: "kp/",
        112: "f1",
        113: "f2",
        114: "f3",
        115: "f4",
        116: "f5",
        117: "f6",
        118: "f7",
        119: "f8",
        120: "f9",
        121: "f10",
        122: "f11",
        123: "f12",
        144: "numlock",
        145: "scrolllock",
        186: ",",
        187: "=",
        188: ",",
        189: "-",
        190: ".",
        191: "/",
        192: "`",
        219: "[",
        220: "\\",
        221: "]",
        222: "'"
    };
    
    // mouse
    this.mouse = {};
    this.mouse.x = 0;
    this.mouse.y = 0;
    this.mouse.buttonsDown = {};
    this.mouse.constant = {
        0:"l",
        1:"m",
        2:"r"
    };
    
    // touch
    this.touches = {};
    
    document.addEventListener("keydown",    function (input) { return function(event) { input.HandleKeyboardDown(event); }; }(this), false);
    document.addEventListener("keyup",      function (input) { return function(event) { input.HandleKeyboardUp(event); }; }(this), false);
}

Input.prototype.RegisterCanvasEvent = function(canvas) {
    canvas.addEventListener("mousemove",  function (input) { return function(event) { input.HandleMouseMove(event); }; }(this), false);
    canvas.addEventListener("mousedown",  function (input) { return function(event) { input.HandleMouseDown(event); }; }(this), false);
    canvas.addEventListener("mouseup",    function (input) { return function(event) { input.HandleMouseUp(event); }; }(this), false);
    
    canvas.addEventListener('touchstart', function (input) { return function(event) { input.HandleTouchDown(event); }; }(this), true);
    canvas.addEventListener('touchmove',  function (input) { return function(event) { input.HandleTouchMove(event); }; }(this), true);
    canvas.addEventListener('touchend',   function (input) { return function(event) { input.HandleTouchUp(event); }; }(this), true);
}

Input.prototype.HandleKeyboardDown = function(event) {
    if (event.code == 'F8' ||event.code == 'F9' || event.code == 'F10' || event.code == 'F11' || event.code == 'F12') { return; }
    //event.preventDefault();
    var keyPressed = this.keyboard.constant[event.keyCode] || String.fromCharCode(event.keyCode).toLowerCase();
    if (this.keyboard.keysDown[keyPressed]) {
        if (this.keypressed) {
            this.keypressed(keyPressed);
        }
    }
    this.keyboard.keysDown[keyPressed] = true;
}

Input.prototype.HandleKeyboardUp = function(event) {
    if (event.code == 'F8' || event.code == 'F9' || event.code == 'F10' || event.code == 'F11' || event.code == 'F12') { return; }
    //event.preventDefault();
    var keyReleased = this.keyboard.constant[event.keyCode] || String.fromCharCode(event.keyCode).toLowerCase();
    if (this.keyreleased) {
        this.keyreleased(keyReleased);
    }
    this.keyboard.keysDown[keyReleased] = false;
}

Input.prototype.KeyboardIsDown = function() {
    for (var i = 0; i < arguments.length; i++) {
        if (this.keyboard.keysDown[arguments[i]]) {
            return true;
        }
    }
    return false;
}

Input.prototype.HandleMouseMove = function (event) {
    event.preventDefault();
    this.mouse.x = event.clientX;
    this.mouse.y = event.clientY;
}

Input.prototype.HandleMouseDown = function (event) {
    event.preventDefault();
    var mousepressed = this.mouse.constant[event.button];
    this.mouse.buttonsDown[mousepressed] = true;
    if (this.mousepressed) {
        this.mousepressed(event.clientX, event.clientY, mousepressed);
    }
}

Input.prototype.HandleMouseUp = function (event) {
    event.preventDefault();
    var mousereleased = this.mouse.constant[event.button];
    this.mouse.buttonsDown[mousereleased] = false;
    if (this.mousereleased) {
        this.mousereleased(event.clientX, event.clientY, mousereleased);
    }
}

Input.prototype.GetMouseX = function (canvas) {
    if (canvas) {
        var rect = canvas.getBoundingClientRect();
        return this.mouse.x - rect.left;
    }
    return this.mouse.x;
}

Input.prototype.GetMouseY = function (canvas) {
    if (canvas) {
        var rect = canvas.getBoundingClientRect();
        return this.mouse.y - rect.top;
    }
    return this.mouse.y;
}

Input.prototype.MouseIsDown = function () {
    for (var i = 0; i < arguments.length; i++) {
        if (this.mouse.buttonsDown[arguments[i]]) {
            return true;
        }
    }
    return false;
}

Input.prototype.HandleTouchDown = function (event) {
    event.preventDefault();
    for( var i=0; i< event.changedTouches.length; i++) {
        touch = event.changedTouches[i];
        touch.identifier = touch.identifier || 0;
        
        this.touches[touch.identifier] = touch;
    }
}

Input.prototype.HandleTouchMove = function (event) {
    event.preventDefault();
    for( var i=0; i< event.changedTouches.length; i++) {
        touch = event.changedTouches[i];
        touch.identifier = touch.identifier || 0;
        
        if (this.touches[touch.identifier]) {
            this.touches[touch.identifier] = touch;
        }
    }
}

Input.prototype.HandleTouchUp = function (event) {
    event.preventDefault();
    for( var i=0; i< event.changedTouches.length; i++) {
        touch = event.changedTouches[i];
        touch.identifier = touch.identifier || 0;
        
        if (this.touches[touch.identifier]) {
            this.touches[touch.identifier] = undefined;
        }
    }
}

Input.prototype.GetTouches = function () {
    return this.touches;
}

