/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function TextureObject(texture, x, y, w, h) {
    this.kDelta = 0.2;
    this.kRDelta = 0.1;
    
    this.mRenderable = new TextureRenderable(texture);
    this.mRenderable.setColor([1, 1, 1, 0.1]);
    this.mRenderable.getXform().setPosition(x, y);
    this.mRenderable.getXform().setSize(w, h);
    GameObject.call(this, this.mRenderable);
}
gEngine.Core.inheritPrototype(TextureObject, GameObject);

TextureObject.prototype.update = function(up, down, left, right, rot) {
    var xform = this.getXform();
    if(gEngine.Input.isKeyPressed(up)) {
        xform.incYPosBy(this.kDelta);
    }
    if(gEngine.Input.isKeyPressed(down)) {
        xform.incYPosBy(-this.kDelta);
    }
    if(gEngine.Input.isKeyPressed(left)) {
        xform.incXPosBy(-this.kDelta);
    }
    if(gEngine.Input.isKeyPressed(right)) {
        xform.incXPosBy(this.kDelta);
    }
    if(gEngine.Input.isKeyPressed(rot)) {
        xform.incRotationByRad(this.kRDelta)
    }
};
