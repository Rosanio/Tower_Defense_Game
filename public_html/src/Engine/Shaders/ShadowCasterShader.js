/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function ShadowCasterShader(vertexShaderPath, fragmentShaderPath) {
    SpriteShader.call(this, vertexShaderPath, fragmentShaderPath);
    
    this.mLight = null; //The light that casts the shadow
    
    // **** The GLSL Shader must define uLights[1] <-- as the only light source!!
    this.mShaderLight = new ShaderLightAtIndex(this.mCompiledShader, 0);
}
gEngine.Core.inheritPrototype(ShadowCasterShader, SpriteShader);

ShadowCasterShader.prototype.activateShader = function(pixelColor, aCamera) {
    SpriteShader.prototype.activateShader.call(this, pixelColor, aCamera);
    this.mShaderLight.loadToShader(aCamera, this.mLight);
};

ShadowCasterShader.prototype.setLight = function(l) {
    this.mLight = l;
};