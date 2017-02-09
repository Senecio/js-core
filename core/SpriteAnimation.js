
/**
 * Module exports.
 */
 
if(typeof module !== 'undefined')
    module.exports = SpriteAnimation;
 
function SpriteAnimation()
{
    this.anchorPointX = 0.5;
    this.anchorPointY = 0.5;
    this.width = -1;
    this.height = -1;
    
    this._frames = [];
    this.duration = 0;
    this.interval = 0.05;
    this.frameIndex = 0; 
    this.loop = false;
    this.playing = false;
}
engine.core.Extend(SpriteAnimation, engine.core.Drawable);

SpriteAnimation.prototype.SetAnimation = function(frames, spriteSheet) 
{
    this._frames = frames;
    this._spriteSheet = spriteSheet;
}

SpriteAnimation.prototype.Play = function(loop, callback)
{
    this.loop = loop;
    this.callback = callback;
    this.frameIndex = 0;
    this.playing = true;
}

SpriteAnimation.prototype.Stop = function()
{
    this.playing = false;
}

SpriteAnimation.prototype.Update = function(dt)
{
    if (!this.playing)
        return;

    this.duration += dt;
    if(this.duration > this.interval)
    {
        this.duration -= this.interval;
        ++this.frameIndex;
        if (this.frameIndex === this._frames.length) {
            
            if (this.callback) {
                this.callback(this);
            }
            
            if (this.loop === true) {
                this.frameIndex = 0;
            }
            else {
                this.playing = false;
            }
        }
    }
 }

SpriteAnimation.prototype.Draw = function(ctx)
{
    if (!this._spriteSheet.GetImage().complete)
        return false;
    
    if(this.DrawBegin(ctx))
    {
        var data = this._spriteSheet.GetKeyData(this._frames[this.frameIndex]);
        if (data) {
            this._spriteSheet.Draw(ctx, this._frames[this.frameIndex], -data.width * this.anchorPointX, -data.height * this.anchorPointY, data.width, data.height);
        }

        this.DrawEnd(ctx);
        return true;
    }
    
    return false;
}
