engine = {}
engine.commom = require("../common/CommonExport.js");
engine.core = {}

engine.core.Extend = function(extension, base) {
    var F = new Function();
    F.prototype = base.prototype;
    extension.prototype = new F();
    extension.prototype.constructor = extension;
    extension.base = base.prototype;

    if(extension.prototype.constructor == Object.prototype.constructor) {
        extension.prototype.constructor = base;
    }
}
        
engine.core.Resource = new (require("./core/Resource.js"));
engine.core.Input = new (require("./core/Input.js"));
engine.core.Camera = require("./core/Camera.js");
engine.core.Drawable = require("./core/Drawable.js");
engine.core.Sprite = require("./core/Sprite.js");
engine.core.SpriteSheet = require("./core/SpriteSheet.js");
engine.core.SpriteAnimation = require("./core/SpriteAnimation.js");

var isSafari = navigator.userAgent.indexOf("Safari") != -1;
var isIe = navigator.userAgent.indexOf("MSIE") != -1;
var isFireFox = navigator.userAgent.indexOf("Firefox") != -1;
var isIOS = navigator.userAgent.match(/iPad|iPod|iPhone/i) != null;
var isAndroid = navigator.userAgent.match(/Android/i) != null;
var isWindows = navigator.userAgent.match(/Windows/i) != null;

function CanvasResizeNotifyParent(canvas)
{
    var gameContainer = canvas.parentNode;
    if(gameContainer){
        gameContainer.style.width = canvas.width + "px";
    }
}

function FullScreenChangeCanvas(canvas)
{
    var ctx = canvas.getContext("2d");
    if(screenfull.isFullscreen)
    {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        
        engine.canvasScaleX = canvas.width / engine.designCanvasWidth;
        engine.canvasScaleY = canvas.height / engine.designCanvasHeight;
        
        ctx.save();
        ctx.scale(engine.canvasScaleX, engine.canvasScaleY);
    }
    else
    {
        canvas.width = engine.designCanvasWidth;
        canvas.height = engine.designCanvasHeight;
    
        engine.canvasScaleX = 1.0;
        engine.canvasScaleY = 1.0;
        
        ctx.restore();
    }
    
    CanvasResizeNotifyParent(canvas);
}
        
function FillCanvasToFullWindow(canvas)
{
    var ctx = canvas.getContext("2d");
    if (window.innerHeight > window.innerWidth) {
        canvas.width = window.innerWidth;
        
        var scale = canvas.width / engine.designCanvasWidth;
        canvas.height = Math.ceil(engine.designCanvasHeight * scale);
        
    }else {
        canvas.height = window.innerHeight;
    
        var scale = canvas.height / engine.designCanvasHeight;
        canvas.width = Math.ceil(engine.designCanvasWidth * scale);
    }

    engine.canvasScaleX = canvas.width / engine.designCanvasWidth;
    engine.canvasScaleY = canvas.height / engine.designCanvasHeight;
    
    ctx.scale(engine.canvasScaleX, engine.canvasScaleY);
    
    CanvasResizeNotifyParent(canvas);
}

engine.InitCanvas = function(canvas, fullCanvasWithWindow)
{
    engine.canvas = canvas;
    engine.context = canvas.getContext("2d");
    engine.designCanvasWidth = canvas.width;
    engine.designCanvasHeight = canvas.height;
    
    engine.canvasScaleX = 1.0;
    engine.canvasScaleY = 1.0;
   
    engine.core.Input.RegisterCanvasEvent(canvas);
    canvas.addEventListener('touchstart', function(e) { e.preventDefault(); },true);
    canvas.addEventListener('touchmove',function(e) { e.preventDefault(); },true);
    canvas.addEventListener('touchend', function(e) { e.preventDefault();  /* if(!isWindows && screenfull.enabled && !screenfull.isFullscreen){ screenfull.request();} */ }, true);
    
    // For Android
    canvas.addEventListener('dblclick',function(e) { e.preventDefault(); },true);
    canvas.addEventListener('click',function(e) { e.preventDefault();  /* if(!isWindows && screenfull.enabled && !screenfull.isFullscreen){ screenfull.request(); } */ },true);
    
    engine.fullCanvasWithWindow = false;
    if(fullCanvasWithWindow === true){
        FillCanvasToFullWindow(canvas);
        engine.fullCanvasWithWindow = true;
    }
    
    if(screenfull.enabled) {
        var fullPng = "url(data:image/png;base64,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)";
        var exitFullPng = "url(data:image/png;base64,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)";
        var new_element=document.createElement("style"); 
        new_element.innerHTML = '#drager {' +
        '   position: fixed;' +
        '   width: 36px;' +
        '   height: 36px;' +
        '   background-color: rgba(255, 255, 255, 0.5);' +
        '   z-index: 10000;' +
        '   cursor: pointer;' +
        '   top: 0px;' +
        '   left: 0px;' +
        '   border-radius: 20%;' +
        '   padding: 6px;' +
        ' }' +
        ' ' +
        ' #drager>div {' +
        '   width: 100%;' +
        '   height: 100%;' +
        '   background-image: '+fullPng+';' +
        '   background-repeat: no-repeat;' +
        '   background-size: 100% 100%;'
        '   transition: all 1.2s;' +
        '  -webkit-transition: all 1.2s;' +
        '  -moz-transition: all 1.2s;' +
        '  -o-transition: all 1.2s;' +
        ' }' +
        ' #drager:hover>div{' +
        '   background-image: '+exitFullPng+';' +
        ' } ';
        
        document.body.appendChild(new_element);
        new_element=document.createElement('div'); 
        new_element.setAttribute("id","drager");
        new_element.style.top="100px";
        new_element.style.left="0px";
        new_element.innerHTML = ' <div></div>' ;
        document.body.appendChild(new_element);

        var fdiv = document.getElementById("drager");
        var fdivSub = fdiv.children[0];
        var touchIdentifier = null;
        var touchX, touchY;
        var isDrag = false;
        
        function CheckBackgroundImage() {
            if (screenfull.isFullscreen) {
                fdivSub.style.backgroundImage = exitFullPng;
            }else{
                fdivSub.style.backgroundImage = fullPng;
            }
        }
        
        CheckBackgroundImage();
        
        document.addEventListener(screenfull.raw.fullscreenchange, function() { 
            window.setTimeout(function() {
                if (engine.fullCanvasWithWindow) {
                    if (!screenfull.isFullscreen) {
                        FillCanvasToFullWindow(canvas);
                    }
                    else {
                        FullScreenChangeCanvas(canvas);
                    }
                }
                
                CheckBackgroundImage(); 
            },  1000); 
        });

        fdiv.addEventListener('click', function (event) {
            event.preventDefault();
            if (screenfull.isFullscreen) {
                screenfull.exit(); 
                fdivSub.style.backgroundImage = fullPng; 
            } else {
                screenfull.request(); 
                fdivSub.style.backgroundImage = exitFullPng;
            }
        });

        fdiv.addEventListener('touchstart', function (event) { event.preventDefault();
            if (touchIdentifier === null) {
                touchIdentifier = event.changedTouches[0].identifier || 0;
                touchX = touch.pageY;
                touchY = touch.pageY;
                isDrag = false;
            }
            
        }, false);
        fdiv.addEventListener('touchmove',  function (event) { event.preventDefault();
            for( var i=0; i< event.changedTouches.length; i++) {
                touch = event.changedTouches[i];
                if(touch.identifier === touchIdentifier) {
                
                    if (isDrag === false && ( Math.abs(touch.pageX - touchX) > 20 || Math.abs(touch.pageY - touchY) > 20)){
                        isDrag = true;
                    }
                    
                    if (isDrag) {
                        fdiv.style.top = (touch.pageY - 18) + "px";
                        fdiv.style.left = (touch.pageX - 18) + "px";
                    }
                    break;
                }
            }
        }, false);
        
        fdiv.addEventListener('touchend',   function (event) { event.preventDefault();
            if (touchIdentifier !== null) {
                for( var i=0; i< event.changedTouches.length; i++) {
                    touch = event.changedTouches[i];
                    if(touch.identifier === touchIdentifier) {
                        if (isDrag === false) {
                            // onclick
                            if (screenfull.isFullscreen) {
                                screenfull.exit(); 
                                fdivSub.style.backgroundImage = fullPng; 
                            } else { 
                                screenfull.request(); 
                                fdivSub.style.backgroundImage = exitFullPng;
                            }
                            
                        } else {
                            var a = touch.pageX;
                            var b = touch.pageY;
                            var c = window.innerWidth - touch.pageX;
                            var d = window.innerHeight - touch.pageY;
                            var size = fdiv.clientWidth;
                            var hsize = size / 2;
                            if (a <= b && a <= c && a <= d) {
                                fdiv.style.left = "0px";
                                fdiv.style.top = (touch.pageY - hsize) + "px";
                            }
                            if (b <= a && b <= c && b <= d) {
                                fdiv.style.top = "0px";
                                fdiv.style.left = (touch.pageX - hsize) + "px";
                            }
                            if (c <= a && c <= b && c <= d) {
                                fdiv.style.left = window.innerWidth - size + "px";
                                fdiv.style.top = (touch.pageY - hsize) + "px";
                            }
                            if (d <= a && d <= b && d <= c) {
                                fdiv.style.top = window.innerHeight - size + "px";;
                                fdiv.style.left = (touch.pageX - hsize) + "px";
                            }
                        }
                        touchIdentifier = null;
                    }
                }
            }
        }, false);
    }
}

engine.Start = function()
{
    if (engine.onStart)
        engine.onStart();
        
    var requestAnimFrame = (function(callback)
    {
        return window.requestAnimationFrame ||
               window.webkitRequestAnimationFrame ||
               window.mozRequestAnimationFrame ||
               window.oRequestAnimationFrame ||
               window.msRequestAnimationFrame ||
               function(callback) {
                   window.setTimeout(callback, 1000 / 60);
               };
    })();
    
    var prev_tick = this_tick = (new Date()).getTime();
    (function Step(){
        prev_tick = this_tick;
        this_tick = (new Date()).getTime();
        var deltaTime = (this_tick - prev_tick) * 0.001;

        if (engine.onFrame)
            engine.onFrame(deltaTime);

        if (engine.showStats) {
            if(typeof stats === 'undefined'){
                stats = new function(){function f(a,e,b){a=document.createElement(a);a.id=e;a.style.cssText=b;return a}function l(a,e,b){var c=f("div",a,"padding:0 0 3px 3px;text-align:left;background:"+b),d=f("div",a+"Text","font-family:Helvetica,Arial,sans-serif;font-size:9px;font-weight:bold;line-height:15px;color:"+e);d.innerHTML=a.toUpperCase();c.appendChild(d);a=f("div",a+"Graph","width:74px;height:30px;background:"+e);c.appendChild(a);for(e=0;74>e;e++)a.appendChild(f("span","","width:1px;height:30px;float:left;opacity:0.9;background:"+
b));return c}function m(a){for(var b=c.children,d=0;d<b.length;d++)b[d].style.display=d===a?"block":"none";n=a}function p(a,b){a.appendChild(a.firstChild).style.height=Math.min(30,30-30*b)+"px"}var q=self.performance&&self.performance.now?self.performance.now.bind(performance):Date.now,k=q(),r=k,t=0,n=0,c=f("div","stats","width:80px;opacity:0.9;cursor:pointer");c.addEventListener("mousedown",function(a){a.preventDefault();m(++n%c.children.length)},!1);var d=0,u=Infinity,v=0,b=l("fps","#0ff","#002"),
A=b.children[0],B=b.children[1];c.appendChild(b);var g=0,w=Infinity,x=0,b=l("ms","#0f0","#020"),C=b.children[0],D=b.children[1];c.appendChild(b);if(self.performance&&self.performance.memory){var h=0,y=Infinity,z=0,b=l("mb","#f08","#201"),E=b.children[0],F=b.children[1];c.appendChild(b)}m(n);return{REVISION:14,domElement:c,setMode:m,begin:function(){k=q()},end:function(){var a=q();g=a-k;w=Math.min(w,g);x=Math.max(x,g);C.textContent=(g|0)+" MS ("+(w|0)+"-"+(x|0)+")";p(D,g/200);t++;if(a>r+1E3&&(d=Math.round(1E3*
t/(a-r)),u=Math.min(u,d),v=Math.max(v,d),A.textContent=d+" FPS ("+u+"-"+v+")",p(B,d/100),r=a,t=0,void 0!==h)){var b=performance.memory.usedJSHeapSize,c=performance.memory.jsHeapSizeLimit;h=Math.round(9.54E-7*b);y=Math.min(y,h);z=Math.max(z,h);E.textContent=h+" MB ("+y+"-"+z+")";p(F,b/c)}return a},update:function(){k=this.end()}}};
                stats.domElement.style.position='absolute';
                stats.domElement.style.left="0px";
                stats.domElement.style.top="0px";
                document.body.appendChild( stats.domElement );
            }
            stats.update();
        }
                
        requestAnimFrame(Step);
    }());
}

module.exports = engine;