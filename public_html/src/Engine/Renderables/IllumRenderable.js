/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function IllumRenderable(myTexture, myNormalMap) {
    LightRenderable.call(this, myTexture);
    Renderable.prototype._setShader.call(this, gEngine.DefaultResources.getIllumShader());
    
    //here is the normal map resource id
    this.mNormalMap = myNormalMap;
    
    //Normal map texture coordinates will reproduce the corresponding sprite sheet
    //This means, the normal map MUST be based on the sprite sheet
    
    //material for this renderable
    this.mMaterial = new Material();
}
gEngine.Core.inheritPrototype(IllumRenderable, LightRenderable);

IllumRenderable.prototype.draw = function(aCamera) {
    gEngine.Textures.activateNormalMap(this.mNormalMap);
        //Here the normal map texture coordinate is copied from those of
        //the corresponding sprite sheet
    this.mShader.setMaterialAndCameraPos(this.mMaterial, aCamera.getPosInPixelSpace());
    LightRenderable.prototype.draw.call(this, aCamera);
};

IllumRenderable.prototype.getMaterial = function() {
    return this.mMaterial;
};