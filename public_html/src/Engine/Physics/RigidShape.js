/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

RigidShape.eRigidType = Object.freeze({
    eRigidAbstract: 0,
    eRigidCircle: 1,
    eRigidRectagnle: 2
});

function RigidShape(xform) {
    this.mXform = xform;
    this.kPadding = 0.25;
    this.mPositionMark = new LineRenderable();
    this.mDrawBounds = false;
    
    //physical properties
    this.mInvMass = 1;
    this.mRestitution = 0.8;
    this.mVelocity = vec2.fromValues(0, 0);
    this.mFriction = 0.3;
    this.mAcceleration = gEngine.Physics.getSystemAcceleration();
}

RigidShape.prototype.draw = function(aCamera) {
    if(!this.mDrawBounds) {
        return;
    }
    
    //calculation for the X center of the shape
    var x = this.mXform.getXPos();
    var y = this.mXform.getYPos();
    
    this.mPositionMark.setFirstVertex(x - this.kPadding, y + this.kPadding);
    this.mPositionMark.setSecondVertex(x + this.kPadding, y - this.kPadding);
    this.mPositionMark.draw(aCamera);
    
    this.mPositionMark.setFirstVertex(x + this.kPadding, y + this.kPadding);
    this.mPositionMark.setSecondVertex(x - this.kPadding, y - this.kPadding);
    this.mPositionMark.draw(aCamera);
};

RigidShape.prototype.update = function() {};

RigidShape.prototype.rigidType = function() {
    return RigidShape.eRigidType.eRigidAbstract;
};

RigidShape.prototype.getPosition = function() {
    return this.mXform.getPosition();
};
RigidShape.prototype.setPosition = function(x, y) {
    this.mXform.setPosition(x, y);
};
RigidShape.prototype.getXform = function() {
    return this.mXform;
};
RigidShape.prototype.setXform = function(xform) {
    this.mXform = xform;
};
RigidShape.prototype.setColor = function(color) {
    this.mPositionMark.setColor(color);
};
RigidShape.prototype.getColor = function() {
    return this.mPositionMark.getColor();
};
RigidShape.prototype.setDrawBounds = function(d) {
    this.mDrawBounds = d;
};
RigidShape.prototype.getDrawBounds = function() {
    return this.mDrawBounds;
};
