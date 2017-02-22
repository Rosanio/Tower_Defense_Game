/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

'use strict';
function LightShader(vertexShaderPath, fragmentShaderPath) {
    //Call super class constructor
    SpriteShader.call(this, vertexShaderPath, fragmentShaderPath);
    
    this.mLights = null;
    
    //*******WARNING**********
    //this number MUST correspond to the GLSL uLight[] array size
    //(for LightFS.glsl and IllumFS.glsl)
    //*********WARNING*********
    this.kGLSLuLightArraySize = 4;
    
    this.mShaderLights = [];
    for(var i = 0; i < this.kGLSLuLightArraySize; i++) {
        var ls = new ShaderLightAtIndex(this.mCompiledShader, i);
        this.mShaderLights.push(ls);
    }
}
gEngine.Core.inheritPrototype(LightShader, SpriteShader);

LightShader.prototype.setLight = function(l) {
    this.mLight = l;
};

LightShader.prototype.activateShader = function(pixelColor, aCamera) {
    //first call the super class's activate
    SpriteShader.prototype.activateShader.call(this, pixelColor, aCamera);
    
    //now push the light information to the shader
    var numLight = 0;
    if(this.mLights !== null) {
        while(numLight < this.mLights.length) {
            this.mShaderLights[numLight].loadToShader(aCamera, this.mLights[numLight]);
            numLight++;
        }
    }
    //switch off leftover ones
    while(numLight < this.kGLSLuLightArraySize) {
        this.mShaderLights[numLight].switchOffLight(); //switch off unused lights
        numLight++;
    }
};

LightShader.prototype.setLights = function(l) {
    this.mLights = l;
};