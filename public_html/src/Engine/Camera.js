/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function Camera(wcCenter, wcWidth, viewportArray) {
    //WC and viewport position and size
    this.mWCCenter = wcCenter;
    this.mWCWidth = wcWidth;
    this.mViewport = viewportArray; //[x, y, width, height]
    this.mNearPlane = 0;
    this.mFarPlane = 1000;
    
    //Transformation matrices
    this.mViewMatrix = mat4.create();
    this.mProjMatrix = mat4.create();
    this.mVPMatrix = mat4.create();
    
    //Background color
    this.mBgColor = [0.8, 0.8, 0.8, 1]; //RGB and Alpha
};

//Setter/getter of WC and viewport
Camera.prototype.setWCCenter = function(xPos, yPos) {
    this.mWCCenter[0] = xPos;
    this.mWCCenter[1] = yPos;
};

Camera.prototype.getWCCenter = function() {
    return this.mWCCenter;
};
Camera.prototype.setWCWidth = function(width) {
    this.mWCWidth = width;
};
Camera.prototype.getWCWidth = function() {
    return this.mWCWidth;
};
Camera.prototype.getWCHeight = function() {
    return this.mWCWidth * this.mViewport[3] / this.mViewport[2];
};

Camera.prototype.setViewport = function(viewportArray) {
    this.mViewport = viewportArray;
};
Camera.prototype.getViewport = function() {
    return this.mViewport;
};

Camera.prototype.setBackgroundColor = function(newColor) {
    this.mBgColor = newColor;
};
Camera.prototype.getBackgroundColor = function() {
    return this.mBgColor;
};

//Getter for the View-Projection transform operator
Camera.prototype.getVPMatrix = function() {
    return this.mVPMatrix;
};

//Initializes the camera to begin drawing
Camera.prototype.setupViewProjection = function() {
    var gl = gEngine.Core.getGL();
    //Configure the viewport
    //Setup the viewport: area on canvas to be drawn
    gl.viewport(this.mViewport[0], //x position of bottom-left corner
            this.mViewport[1],     //y position of bottom-right corner
            this.mViewport[2],     //width of the area to be drawn
            this.mViewport[3]);    //height of the area to be drawn
    //Setup the corresponding scissor area to limit clear area
    gl.scissor(this.mViewport[0], this.mViewport[1], this.mViewport[2], this.mViewport[3]);
    //Set the color to be clear to black
    gl.clearColor(this.mBgColor[0], this.mBgColor[1], this.mBgColor[2], this.mBgColor[3]);
    //Enable and clear scissor area
    gl.enable(gl.SCISSOR_TEST);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.disable(gl.SCISSOR_TEST);
    
    //Define the View-Projection matrix
    //Define the view matrix
    mat4.lookAt(this.mViewMatrix,
            [this.mWCCenter[0], this.mWCCenter[1], 10],//WC center
            [this.mWCCenter[0], this.mWCCenter[1], 0],
            [0, 1, 0]);    //orientation
    //Define the projection matrix
    var halfWCWidth = 0.5 * this.mWCWidth;
    var halfWCHeight = halfWCWidth * this.mViewport[3] / this.mViewport[2];
    mat4.ortho(this.mProjMatrix,
            -halfWCWidth,    //distance to left of WC
            halfWCWidth,     //distance to right of WC
            -halfWCHeight,    //distance to bottom of WC
            halfWCHeight,     //distance to top of WC
            this.mNearPlane,  //z-distance to near plane
            this.mFarPlane);  //z-distance to far plane
    //Concatenate view and projection matrices
    mat4.multiply(this.mVPMatrix, this.mProjMatrix, this.mViewMatrix);
};

Camera.prototype.collideWCBound = function(aXform, zone) {
    var bbox = new BoundingBox(aXform.getPosition(), aXform.getWidth(), aXform.getHeight());
    var w = zone * this.getWCWidth();
    var h = zone * this.getWCHeight();
    var cameraBound = new BoundingBox(this.getWCCenter(), w, h);
    return cameraBound.boundCollideStatus(bbox);
}
