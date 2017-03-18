/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function ControlledDog(texture, name) {
    this.mDogRenderable = new TextureRenderable(texture);
    this.mDogRenderable.getXform().setSize(85, 85);
    this.mDogRenderable.setColor([1, 1, 1, 0]);
    
    this.mDestination = null;
    
    Dog.call(this, this.mDogRenderable, name);
}
gEngine.Core.inheritPrototype(ControlledDog, Dog);

ControlledDog.prototype.getRenderable = function() {
    return this.mDogRenderable;
};
ControlledDog.prototype.getSpeed = function() {
    return this.mSpeed;
};
ControlledDog.prototype.setSpeed = function(s) {
    this.mSpeed = s;
};
ControlledDog.prototype.getDestination = function() {
    return this.mDestination;
};
ControlledDog.prototype.setDestination = function(des) {
    this.mDestination = des;
};

ControlledDog.prototype.update = function() {
    if(this.mDestination) {
        Dog.prototype.update.call(this);
        if(this.getPhysicsComponent().containsPos(this.mDestination)) {
            this.mDestination = null;
        }
    }
};