
/**
 * Module exports.
 */
 
if(typeof module !== 'undefined')
    module.exports = SpriteSheet;
 
function SpriteSheet()
{
    this._map = { }; 
}

SpriteSheet.prototype.SetImage = function(image)
{
    this._image = image
}

SpriteSheet.prototype.GetImage = function()
{
    return this._image
}

SpriteSheet.prototype.Add = function(key, startX, startY, width, height){
    this._map[key] = { "startX" : startX, "startY" : startY, "width" : width, "height" : height  };
}

SpriteSheet.prototype.GetKeyData = function(key) {
    return this._map[key];
}

SpriteSheet.prototype.Draw = function(ctx, key, x, y, width, height)
{
    var sheet = this._map[key];
    if(sheet && this._image && this._image.complete){
        
        var imageWidth = width ? width : sheet.width;
        var imageHeight = height ? height : sheet.height;
        
        ctx.drawImage(this._image,                          // 源图像
                      sheet.startX, sheet.startY,           // 源图像起始x,y
                      sheet.width, sheet.height,            // 源图像尺寸
                      (x ? Math.floor(x) : 0), (y ? Math.floor(y) : 0), // 所要绘制在画布的起始x,y
                      imageWidth, imageHeight);             // 所要绘制在画布的大小。
        
        return true;
    }
    
    return false;
}
