
/**
 * Module exports.
 */
 
if(typeof module !== 'undefined')
    module.exports = Sprite;
 
function Sprite()
{
    this.anchorPointX = 0.5;
    this.anchorPointY = 0.5;
    this.width = -1;
    this.height = -1;
    this.image = undefined;
    Sprite.base.constructor.call(this);
}
engine.core.Extend(Sprite, engine.core.Drawable);

Sprite.prototype.UseSpriteSheet = function(key, spriteSheet)
{
    this._spriteSheetKey = key;
    this._spriteSheet = spriteSheet;
}

Sprite.prototype.GetUseSpriteSheet = function(key, spriteSheet)
{
    return this._spriteSheet;
}

Sprite.prototype.GetUseSpriteSheetKey = function(key, spriteSheet)
{
    return this._spriteSheetKeyl;
}

Sprite.prototype.Draw = function(ctx)
{
    if (this._spriteSheet) {
        
        if (!this._spriteSheet.GetImage().complete)
            return false;

        if (typeof this._spriteSheet.GetKeyData(this._spriteSheetKey) === 'undefined' )
            return false;
    }
    else if (this.image) {
        if(!this.image.complete)
            return false;
    }
    else {
        return false;
    }
   
    if(this.DrawBegin(ctx))
    {
        if (this._spriteSheet) { 
            var data = this._spriteSheet.GetKeyData(this._spriteSheetKey);
            if (data) {
                this._spriteSheet.Draw(ctx, this._spriteSheetKey, -data.width * this.anchorPointX, -data.height * this.anchorPointY, data.width, data.height);
            }
        } else {
        
            var spriteWidth = this.width > 0 ? this.width : this.image.width;
            var spriteHeight = this.height > 0 ? this.height : this.image.height;
        
            ctx.drawImage(this.image,                           // 源图像
                          0, 0,                                 // 源图像起始x,y
                          this.image.width, this.image.height,  // 源图像尺寸
                          -Math.floor(spriteWidth * this.anchorPointX),  -Math.floor(spriteHeight * this.anchorPointY), //所要绘制在画布的起始x,y
                          spriteWidth, spriteHeight);           //所要绘制在画布的大小。
        }
        
        this.DrawEnd(ctx);
        return true;
    }
    
    return false;
}
