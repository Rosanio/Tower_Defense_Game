/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function RigidRectangle(xform, w, h) {
    RigidShape.call(this, xform);
    this.mSides = new LineRenderable();
    this.mWidth = w;
    this.mHeight = h;
}
gEngine.Core.inheritPrototype(RigidRectangle, RigidShape);

RigidRectangle.prototype.draw = function(aCamera) {
    if(!this.mDrawBounds) {
        return;
    }
    RigidShape.prototype.draw.call(this, aCamera);
    var x = this.getPosition()[0];
    var y = this.getPosition()[1];
    var w = this.mWidth/2;
    var h = this.mHeight/2;
    
    this.mSides.setFirstVertex(x-w, y+h);
    this.mSides.setSecondVertex(x+w, y+h);
    this.mSides.draw(aCamera);
    this.mSides.setFirstVertex(x+w, y-h);
    this.mSides.draw(aCamera);
    this.mSides.setSecondVertex(x-w, y-h);
    this.mSides.draw(aCamera);
    this.mSides.setFirstVertex(x-w, y+h);
    this.mSides.draw(aCamera);
};

RigidRectangle.prototype.rigidType = function() {
    return RigidShape.eRigidType.eRigidRectangle;
};
RigidRectangle.prototype.getWidth = function() {
    return this.mWidth;
};
RigidRectangle.prototype.getHeight = function() {
    return this.mHeight;
};
RigidRectangle.prototype.setColor = function(color) {
    RigidShape.prototype.setColor.call(this, color);
    this.mSides.setColor(color);
};
