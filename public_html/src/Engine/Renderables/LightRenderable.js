/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function LightRenderable(myTexture) {
    SpriteAnimateRenderable.call(this, myTexture);
    Renderable.prototype._setShader.call(this, gEngine.DefaultResources.getLightShader());
    
    // here is the Light source
    this.mLights = [];
}
gEngine.Core.inheritPrototype(LightRenderable, SpriteAnimateRenderable);

LightRenderable.prototype.draw = function(aCamera) {
    this.mShader.setLights(this.mLights);
    SpriteAnimateRenderable.prototype.draw.call(this, aCamera);
};

LightRenderable.prototype.numLights = function() {
    return this.mLights.length;
};

LightRenderable.prototype.getLightAt = function(index) {
    return this.mLights[index];
};
LightRenderable.prototype.addLight = function(l) {
    this.mLights.push(l);
};
