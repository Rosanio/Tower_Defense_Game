/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function RigidCircle(xform, r) {
    RigidShape.call(this, xform);
    this.kNumSides = 16;
    this.mSides = new LineRenderable();
    this.mRadius = r;
}
gEngine.Core.inheritPrototype(RigidCircle, RigidShape);

RigidCircle.prototype.draw = function(aCamera) {
    if(!this.mDrawBounds) {
        return;
    }
    RigidShape.prototype.draw.call(this, aCamera);
    
    //kNumSides forms the circle
    var pos = this.getPosition();
    var prevPoint = vec2.clone(pos);
    var deltaTheta = (Math.PI*2.0) / this.kNumSides;
    var theta = deltaTheta;
    prevPoint[0] += this.mRadius;
    var i, x, y;
    for(i = 0; i <= this.kNumSides; i++) {
        x = pos[0] + this.mRadius * Math.cos(theta);
        y = pos[1] + this.mRadius * Math.sin(theta);
        
        this.mSides.setFirstVertex(prevPoint[0], prevPoint[1]);
        this.mSides.setSecondVertex(x, y);
        this.mSides.draw(aCamera);
        
        theta = theta + deltaTheta;
        prevPoint[0] = x;
        prevPoint[1] = y;
    }
};

RigidCircle.prototype.rigidType = function() {
    return RigidShape.eRigidType.eRigidCircle;
};
RigidCircle.prototype.getRadius = function() {
    return this.mRadius;
};
RigidCircle.prototype.setColor = function(color) {
    RigidShape.prototype.setColor.call(this, color);
    this.mSides.setColor(color);
};
