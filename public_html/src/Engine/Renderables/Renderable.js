/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function Renderable() {
    this.mShader = gEngine.DefaultResources.getConstColorShader(); 
    this.mColor = [1,1,1,1]; //Color for fragment shader
    this.mXform = new Transform(); //Transform operator for the object
};

Renderable.prototype._setShader = function(s) { this.mShader = s; };

Renderable.prototype.draw = function(aCamera) {
    var gl = gEngine.Core.getGL();
    this.mShader.activateShader(this.mColor, aCamera);
    //always load the shader first!!
    this.mShader.loadObjectTransform(this.mXform.getXform());
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
};

Renderable.prototype.setColor = function(color) {
    this.mColor = color;
};
Renderable.prototype.getColor = function() {
    return this.mColor;
};

Renderable.prototype.getXform = function() {
    return this.mXform;
};