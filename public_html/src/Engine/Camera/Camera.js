/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function PerRenderCache() {
    this.mWCToPixelRatio = 1; // WC to pixel transformation
    this.mCameraOrgX = 1;  //Lower-left corner of camera in WC
    this.mCameraOrgY = 1;
    this.mCameraPosInPixelSpace = vec3.fromValues(0,0,0);
}

function Camera(wcCenter, wcWidth, viewportArray, bound) {
    //WC and viewport position and size
    this.mCameraState = new CameraState(wcCenter, wcWidth);
    this.mCameraShake = null;
    
    this.mViewport = []; //[x, y, width, height]
    this.mViewportBound = 0;
    if(bound !== undefined) {
        this.mViewportBound = bound;
    }
    this.mScissorBound = []; //use for bounds
    this.setViewport(viewportArray, this.mViewportBound);
    this.mNearPlane = 0;
    this.mFarPlane = 1000;
    
    //Transformation matrices
    this.mViewMatrix = mat4.create();
    this.mProjMatrix = mat4.create();
    this.mVPMatrix = mat4.create();
    
    //Background color
    this.mBgColor = [0.8, 0.8, 0.8, 1]; //RGB and Alpha
    
    //per-rendering cached information
    //needed for computing transforms for shaders
    //updated each time in setupViewProjection()
    this.mRenderCache = new PerRenderCache();
        //SHOULD NOT be used except
        //xform operations during the rendering
        //Client game should not access this!
        
    this.kCameraZ = 10; //This is for illumination computation
};

Camera.eViewport = Object.freeze({
    eOrgX: 0,
    eOrgY: 1,
    eOrgWidth: 2,
    eOrgHeight: 3
});

//Setter/getter of WC and viewport
Camera.prototype.setWCCenter = function(xPos, yPos) {
    var p = vec2.fromValues(xPos, yPos);
    this.mCameraState.setCenter(p);
};

Camera.prototype.getWCCenter = function() {
    return this.mCameraState.getCenter();
};
Camera.prototype.setWCWidth = function(width) {
    this.mCameraState.setWidth(width);
};
Camera.prototype.getWCWidth = function() {
    return this.mCameraState.getWidth();
};
Camera.prototype.getWCHeight = function() {
    return this.mCameraState.getWidth() * this.mViewport[3] / this.mViewport[2];
};

Camera.prototype.setViewport = function(viewportArray, bound) {
    if(bound === undefined) {
        bound = this.mViewportBound;
    }
    // [x, y, width, height]
    this.mViewport[0] = viewportArray[0] + bound;
    this.mViewport[1] = viewportArray[1] + bound;
    this.mViewport[2] = viewportArray[2] - (2 * bound);
    this.mViewport[3] = viewportArray[3] - (2 * bound);
    this.mScissorBound[0] = viewportArray[0];
    this.mScissorBound[1] = viewportArray[1];
    this.mScissorBound[2] = viewportArray[2];
    this.mScissorBound[3] = viewportArray[3];
};
Camera.prototype.getViewport = function() {
    var out = [];
    out[0] = this.mScissorBound[0];
    out[1] = this.mScissorBound[1];
    out[2] = this.mScissorBound[2];
    out[3] = this.mScissorBound[3];
    return out;
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
    gl.scissor(this.mScissorBound[0], this.mScissorBound[1], this.mScissorBound[2], this.mScissorBound[3]);
    //Set the color to be clear to black
    gl.clearColor(this.mBgColor[0], this.mBgColor[1], this.mBgColor[2], this.mBgColor[3]);
    //Enable and clear scissor area
    gl.enable(gl.SCISSOR_TEST);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.disable(gl.SCISSOR_TEST);
    
    //Define the View-Projection matrix
    //Define the view matrix
    var center = [];
    if(this.mCameraShake !== null) {
        center = this.mCameraShake.getCenter();
    } else {
        center = this.getWCCenter();
    }
    mat4.lookAt(this.mViewMatrix,
            [center[0], center[1], this.kCameraZ],//WC center
            [center[0], center[1], 0],
            [0, 1, 0]);    //orientation
    //Define the projection matrix
    var halfWCWidth = 0.5 * this.getWCWidth();
    var halfWCHeight = 0.5 * this.getWCHeight();
    mat4.ortho(this.mProjMatrix,
            -halfWCWidth,    //distance to left of WC
            halfWCWidth,     //distance to right of WC
            -halfWCHeight,    //distance to bottom of WC
            halfWCHeight,     //distance to top of WC
            this.mNearPlane,  //z-distance to near plane
            this.mFarPlane);  //z-distance to far plane
    //Concatenate view and projection matrices
    mat4.multiply(this.mVPMatrix, this.mProjMatrix, this.mViewMatrix);
    
    //compute and cache per-rendering information
    this.mRenderCache.mWCToPixelRatio = this.mViewport[Camera.eViewport.eOrgWidth] / this.getWCWidth();
    this.mRenderCache.mCameraOrgX = center[0] - (this.getWCWidth()/2);
    this.mRenderCache.mCameraOrgY = center[1] - (this.getWCHeight()/2);
    var p = this.wcPosToPixel(this.getWCCenter());
    this.mRenderCache.mCameraPosInPixelSpace[0] = p[0];
    this.mRenderCache.mCameraPosInPixelSpace[1] = p[1];
    this.mRenderCache.mCameraPosInPixelSpace[2] = this.fakeZInPixelSpace(this.kCameraZ);
};

Camera.prototype.collideWCBound = function(aXform, zone) {
    var bbox = new BoundingBox(aXform.getPosition(), aXform.getWidth(), aXform.getHeight());
    var w = zone * this.getWCWidth();
    var h = zone * this.getWCHeight();
    var cameraBound = new BoundingBox(this.getWCCenter(), w, h);
    return cameraBound.boundCollideStatus(bbox);
};

Camera.prototype.clampAtBoundary = function(aXform, zone) {
    var status = this.collideWCBound(aXform, zone);
    if(status !== BoundingBox.eboundCollideStatus.eInside) {
        var pos = aXform.getPosition();
        if((status & BoundingBox.eboundCollideStatus.eCollideTop) !== 0)
            pos[1] = (this.getWCCenter())[1] + (zone * this.getWCHeight() / 2) - (aXform.getHeight() / 2);
        if((status & BoundingBox.eboundCollideStatus.eCollideBottom) !== 0)
            pos[1] = (this.getWCCenter())[1] - (zone * this.getWCHeight() / 2) + (aXform.getHeight() / 2);
        if((status & BoundingBox.eboundCollideStatus.eCollideRight) !== 0) 
            pos[0] = (this.getWCCenter())[0] + (zone * this.getWCWidth() / 2) - (aXform.getWidth() / 2);
        if((status & BoundingBox.eboundCollideStatus.eCollideLeft) !== 0)
            pos[0] = (this.getWCCenter())[0] - (zone * this.getWCWidth() / 2) + (aXform.getWidth() / 2);
    }
    return status;
};

Camera.prototype.getPosInPixelSpace = function() {
    return this.mRenderCache.mCameraPosInPixelSpace;
};