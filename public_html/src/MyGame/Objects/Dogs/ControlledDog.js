/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function ControlledDog(texture, name, damage, attackRate) {
    this.mDogRenderable = new TextureRenderable(texture);
    this.mDogRenderable.getXform().setSize(85, 85);
    this.mDogRenderable.setColor([1, 1, 1, 0]);
    
    this.mDestination = null;
    this.mTarget = null;
    
    Dog.call(this, this.mDogRenderable, name, damage, attackRate);
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
ControlledDog.prototype.setTarget = function(tar) {
    this.mTarget = tar;
};
ControlledDog.prototype.getTarget = function() {
    return this.mTarget;
};
ControlledDog.prototype.getBiteTime = function() {
    return this.biteTime;
};
ControlledDog.prototype.setBiteTime = function(t) {
    this.biteTime = t;
};

ControlledDog.prototype.update = function() {
//    if(this.mTarget) {
//        this.rotateObjPointTo(this.mTarget.getXform().getPosition(), 1);
//        this.mDestination = this.mTarget.getXform().getPosition();
//        if(this.mTarget.getPhysicsComponent().collided(this.getPhysicsComponent())) {
//            this.attack(this.mTarget);
//            this.mDestination = null;
//        }
//    }
//    if(this.mDestination) {
//        Dog.prototype.update.call(this);
//        if(this.getPhysicsComponent().containsPos(vec2.add([0, 0], this.mDestination, vec2.scale([0, 0], this.getCurrentFrontDir(), this.getPhysicsComponent().getRadius())))) {
//            this.mDestination = null;
//        }
//    }
};