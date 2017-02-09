/**
 * Module exports.
 */
 
if(typeof module !== 'undefined')
    module.exports = Camera;

function Camera()
{
    this.x = 0;
    this.y = 0;
    this.rotation = 0.0;
    this.zoom = 1.0;
}

// 把canvas默认向下为正,改成向上为正  >>>>>>>>>>>>>>hack.
Camera.prototype.EnableContext2DAcceptWorldCoordinates = function(context)
{
    // 覆盖drawImage
    context.CanvasRenderingContext2D_prototype_drawImage = CanvasRenderingContext2D.prototype.drawImage;
    context.drawImage = function() {
        if(arguments.length === 3) {
            var image   = arguments[0];
            var dx      = arguments[1];
            var dy      = -arguments[2];
            context.CanvasRenderingContext2D_prototype_drawImage.bind(this)(image, dx, dy);
        }
        else if(arguments.length === 5) {
            var image   = arguments[0];
            var dx      = arguments[1];
            var dy      = -arguments[2];
            var dWidth  = arguments[3];
            var dHeight = arguments[4];
            context.CanvasRenderingContext2D_prototype_drawImage.bind(this)(image, dx, dy, dWidth, dHeight);
        }
        else if(arguments.length === 9) {
            var image   = arguments[0];
            var sx      = arguments[1];
            var sy      = arguments[2];
            var sWidth  = arguments[3];
            var sHeight = arguments[4];
            var dx      = arguments[5];
            var dy      = arguments[6];
            var dWidth  = arguments[7];
            var dHeight = arguments[8];
            context.CanvasRenderingContext2D_prototype_drawImage.bind(this)(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
        }
    }
    
    // 覆盖translate
    context.CanvasRenderingContext2D_prototype_translate = CanvasRenderingContext2D.prototype.translate;
    context.translate = function() {
        var x   = arguments[0];
        var y   = -arguments[1];
        context.CanvasRenderingContext2D_prototype_translate.bind(this)(x, y);
    }
    
    // 覆盖 fillText
    context.CanvasRenderingContext2D_prototype_fillText = CanvasRenderingContext2D.prototype.fillText;
    context.fillText = function() {
        if(arguments.length === 3) {
            var text = arguments[0]
            var x    = arguments[1];
            var y    = -arguments[2];
            context.CanvasRenderingContext2D_prototype_fillText.bind(this)(text, x, y);
        }
        else if(arguments.length === 4) {
            var text = arguments[0]
            var x    = arguments[1];
            var y    = -arguments[2];
            var maxWidth = arguments[3];
            context.CanvasRenderingContext2D_prototype_fillText.bind(this)(text, x, y, maxWidth);
        }
    }
    
    //覆盖 strokeText
    context.CanvasRenderingContext2D_prototype_strokeText = CanvasRenderingContext2D.prototype.strokeText;
    context.strokeText = function() {
        if(arguments.length === 3) {
            var text = arguments[0]
            var x    = arguments[1];
            var y    = -arguments[2];
            context.CanvasRenderingContext2D_prototype_strokeText.bind(this)(text, x, y);
        }
        else if(arguments.length === 4) {
            var text = arguments[0]
            var x    = arguments[1];
            var y    = -arguments[2];
            var maxWidth = arguments[3];
            context.CanvasRenderingContext2D_prototype_strokeText.bind(this)(text, x, y, maxWidth);
        }
    }
    
    // 覆盖 fillRect
    context.CanvasRenderingContext2D_prototype_fillRect = CanvasRenderingContext2D.prototype.fillRect;
    context.fillRect = function() {
        var x    = arguments[0];
        var y    = -arguments[1];
        var width = arguments[2];
        var height = -arguments[3];
        context.CanvasRenderingContext2D_prototype_fillRect.bind(this)(x, y, width, height);
    }
    
    // 覆盖moveTo
    context.CanvasRenderingContext2D_prototype_moveTo = CanvasRenderingContext2D.prototype.moveTo;
    context.moveTo = function() {
        var x    = arguments[0];
        var y    = -arguments[1];
        context.CanvasRenderingContext2D_prototype_moveTo.bind(this)(x, y);
    }
    
    // 覆盖lineTo
    context.CanvasRenderingContext2D_prototype_lineTo = CanvasRenderingContext2D.prototype.lineTo;
    context.lineTo = function() {
        var x    = arguments[0];
        var y    = -arguments[1];
        context.CanvasRenderingContext2D_prototype_lineTo.bind(this)(x, y);
    }
    
    // 覆盖arc
    context.CanvasRenderingContext2D_prototype_arc = CanvasRenderingContext2D.prototype.arc;
    context.arc = function() {
        var x    = arguments[0];
        var y    = -arguments[1];
        var radius = arguments[2];
        var startAngle = arguments[3];
        var endAngle = arguments[4];
        var counterclockwise = arguments[5];
        context.CanvasRenderingContext2D_prototype_arc.bind(this)(x, y, radius, startAngle, endAngle, counterclockwise);
    }
}

Camera.prototype.DisableContext2DAcceptWorldCoordinates = function(context)
{
    if ( context.CanvasRenderingContext2D_prototype_drawImage ) { context.drawImage = context.CanvasRenderingContext2D_prototype_drawImage; context.CanvasRenderingContext2D_prototype_drawImage = null; };
    if ( context.CanvasRenderingContext2D_prototype_translate ) { context.translate = context.CanvasRenderingContext2D_prototype_translate; context.CanvasRenderingContext2D_prototype_translate = null; };
    if ( context.CanvasRenderingContext2D_prototype_fillText ) { context.fillText = context.CanvasRenderingContext2D_prototype_fillText;    context.CanvasRenderingContext2D_prototype_fillText = null; };
    if ( context.CanvasRenderingContext2D_prototype_strokeText) { context.strokeText = context.CanvasRenderingContext2D_prototype_strokeText;    context.CanvasRenderingContext2D_prototype_strokeText = null; };
    if ( context.CanvasRenderingContext2D_prototype_fillRect ) { context.fillRect = context.CanvasRenderingContext2D_prototype_fillRect;    context.CanvasRenderingContext2D_prototype_fillRect = null; };
    if ( context.CanvasRenderingContext2D_prototype_moveTo ) { context.moveTo = context.CanvasRenderingContext2D_prototype_moveTo;    context.CanvasRenderingContext2D_prototype_moveTo = null; };
    if ( context.CanvasRenderingContext2D_prototype_lineTo ) { context.lineTo = context.CanvasRenderingContext2D_prototype_lineTo;    context.CanvasRenderingContext2D_prototype_lineTo = null; };
    if ( context.CanvasRenderingContext2D_prototype_arc ) { context.arc = context.CanvasRenderingContext2D_prototype_arc;    context.CanvasRenderingContext2D_prototype_arc = null; };
}

Camera.prototype.Begin = function(context, canvasWidht, canvasHeight)
{
    this.EnableContext2DAcceptWorldCoordinates(context);
    context.save();
    context.translate(0, -canvasHeight);
    var centerX = canvasWidht/(this.zoom*2);
    var centerY = canvasHeight/(this.zoom*2);
    context.scale(this.zoom, this.zoom);
    context.translate(centerX, centerY);
    context.rotate(this.rotation);
    context.translate(-this.x, -this.y);
}

Camera.prototype.End = function(context)
{
    this.DisableContext2DAcceptWorldCoordinates(context);
    context.restore();
}
