/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function IllumShader(vertexShaderPath, fragmentShaderPath) {
    //Call super class constructor
    LightShader.call(this, vertexShaderPath, fragmentShaderPath);
    
    var gl = gEngine.Core.getGL();
    
    //this is the material property of the renderable
    this.mMaterial = null;
    this.mMaterialLoader = new ShaderMaterial(this.mCompiledShader);
    
    //Reference to the camera position
    this.mCameraPos = null;
    this.mCameraPosRef = gl.getUniformLocation(this.mCompiledShader, "uCameraPosition");
    
    //reference to the normal map sampler
    this.mNormalSamplerRef = gl.getUniformLocation(this.mCompiledShader, "uNormalSampler");
}
gEngine.Core.inheritPrototype(IllumShader, LightShader);

IllumShader.prototype.activateShader = function(pixelColor, aCamera) {
    //first call the super class's activate
    LightShader.prototype.activateShader.call(this, pixelColor, aCamera);
    var gl = gEngine.Core.getGL();
    gl.uniform1i(this.mNormalSamplerRef, 1); //binds to texture unit 1
    //do not need to set up texture coordinate buffer
    //as we are going to use the ones from the sprite texture
    //in the fragment shader
    
    this.mMaterialLoader.loadToShader(this.mMaterial);
    gl.uniform3fv(this.mCameraPosRef, this.mCameraPos);
};

IllumShader.prototype.setMaterialAndCameraPos = function(m, p) {
    this.mMaterial = m;
    this.mCameraPos = p;
};