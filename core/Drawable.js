
/**
 * Module exports.
 */
 
if(typeof module !== 'undefined')
    module.exports = Drawable;
 
function Drawable()
{
    this.x = 0;
    this.y = 0;
    this.alpha = 1;
    this.rotation = 0;
    this.flipX = false;
    this.flipY = false;
    this.scaleX = 1;
    this.scaleY = 1;
    this.visible = true;
}

Drawable.prototype.DrawBegin = function(ctx)
{
    if (!this.visible) {
        // 不可见
        return false;
    }
       
    if (this.alpha <= 0) {
        // 完全透明
        return false;
    }
    
    // 保存当前画布状态
    ctx.save();
    
    // 透明度
    if (this.alpha < 1) {
        ctx.globalAlpha = this.alpha;
    }

    // 平移到坐标点
    ctx.translate(this.x, this.y);
    
    // 缩放和翻转
    ctx.scale(this.scaleX * (this.flipX ? -1 : 1), this.scaleY * (this.flipY ? -1 : 1));
           
    // 旋转
    if (this.rotation % 360 !== 0) {
        ctx.rotate(this.rotation % 360 / 180 * Math.PI);
    }

    return true;
}

Drawable.prototype.DrawEnd = function(ctx)
{
    // 恢复画布状态
    ctx.restore();
    return true;
}
