/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function TextureRenderable(myTexture) {
    Renderable.call(this);
    Renderable.prototype.setColor.call(this, [1, 1, 1, 0]);
        //Alpha 0: switch tinting off
    Renderable.prototype._setShader.call(this, gEngine.DefaultResources.getTextureShader());
    this.mTexture = null;
    //these two instance variables are to cache texture information
    //for supporting per-pixel accurate collision
    this.mTextureInfo = null;
    this.mColorArray = null;
    //defined for subclass to override
    this.mTexWidth = 0;
    this.mTexHeight = 0;
    this.mTexLeftIndex = 0;
    this.mTexBottomIndex = 0;
    this.setTexture(myTexture);
}
gEngine.Core.inheritPrototype(TextureRenderable, Renderable);

TextureRenderable.prototype.draw = function(aCamera) {
    //activate the texture
    gEngine.Textures.activateTexture(this.mTexture);
    Renderable.prototype.draw.call(this, aCamera);
};

TextureRenderable.prototype.getTexture = function() {
    return this.mTexture;
};
TextureRenderable.prototype.setTexture = function(t) {
    this.mTexture = t;
    this.mTextureInfo = gEngine.Textures.getTextureInfo(t);
    this.mColorArray = null;
    this.mTexWidth = this.mTextureInfo.mWidth;
    this.mTexHeight = this.mTextureInfo.mHeight;
    this.mTexLeftIndex = 0;
    this.mTexBottomIndex = 0;
};
