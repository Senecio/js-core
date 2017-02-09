
/**
 * Module exports.
 */
 
if(typeof module !== 'undefined')
    module.exports = Resource;
 
function Resource()
{
    this._images = {};
    this._sounds = {};
    this._files = {};
}

Resource.prototype.GetImage = function(url)
{
    if (this._images[url]){
        return this._images[url];
    }else{
        var img = new Image();
        img.src = url;
        this._images[url] = img;
        return img;
    }
}

Resource.prototype.GetSound = function(url)
{
    if (this._sounds[url]){
        return this._sounds[url];
    }else{
        var snd = new Audio();
        snd.src = url;
        snd.loop = false;
        snd.onloadeddata = function() {
            snd.loadComplete = true;
        }
        this._sounds[url] = snd;
        return snd;
    }
}

Resource.prototype.PrepareSound = function()
{
    for (var key in this._sounds) {
        var snd = this._sounds[key];
        if (snd.loadComplete === true && snd.prepareComplete !== true) {
            snd.play();
            snd.pause();
            snd.prepareComplete = true;
            engine.commom.Logger(snd.src + "加载完成!")
        }
    }
}

Resource.prototype.GetFile = function(url)
{
    if (this._files[url]){
        return this._files[url];
    }else{
        var img = new Image();
        img.src = url;
        this._images[url] = img;
        return img;
    }
}