/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function LineShader(vertexShaderPath, fragmentShaderPath) {
    SimpleShader.call(this, vertexShaderPath, fragmentShaderPath);
    
    this.mPointSizeRef = null;
    var gl = gEngine.Core.getGL();
    
    //point size uniform
    this.mPointSizeRef = gl.getUniformLocation(this.mCompiledShader, "uPointSize");
    
    this.mPointSize = 1;
}
gEngine.Core.inheritPrototype(LineShader, SimpleShader);

LineShader.prototype.activateShader = function(pixelColor, aCamera) {
    SimpleShader.prototype.activateShader.call(this, pixelColor, aCamera);
    
    var gl = gEngine.Core.getGL();
    gl.uniform1f(this.mPointSizeRef, this.mPointSize);
    gl.bindBuffer(gl.ARRAY_BUFFER, gEngine.VertexBuffer.getGLLineVertexRef());
    gl.vertexAttribPointer(this.mShaderVertexPositionAttribute, 3, gl.FLOAT, false, 0, 0);
    
    gl.enableVertexAttribArray(this.mShaderVertexPositionAttribute);
};
LineShader.prototype.setPointSize = function(w) {
    this.mPointSize = w;
};