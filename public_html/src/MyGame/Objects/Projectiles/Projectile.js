/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function Projectile() {
    this.mProjectile = new Renderable();
    this.mProjectile.setColor([0.969, 0.969, 0.298, 1]);
    this.mProjectile.getXform().setSize(10, 10);
    
    this.mTarget = null;
    this.mTower = null;
    
    GameObject.call(this, this.mProjectile);
    
    var r = new RigidRectangle(this.mProjectile.getXform(), 10, 10);
    r.setAcceleration([0, 0]);
    this.setPhysicsComponent(r);
}
gEngine.Core.inheritPrototype(Projectile, GameObject);

Projectile.prototype.getTarget = function() {
    return this.mTarget;
};
Projectile.prototype.setTarget = function(t) {
    this.mTarget = null;
};

Projectile.prototype.initialize = function(tower, enemy) {
    this.mTower = tower;
    this.mProjectile.getXform().setPosition(tower.getRenderable().getXform().getPosition()[0], tower.getRenderable().getXform().getPosition()[1]);
    this.setSpeed(2.25);
    
    this.mTarget = enemy;
};

Projectile.prototype.update = function() {
    if(this.mTarget !== null) {
        this.rotateObjPointTo(this.mTarget.getXform().getPosition(), 1);
    }
    GameObject.prototype.update.call(this);
};

Projectile.prototype.onHit = function() {
    this.mTarget.incHealthBy(-this.mTower.getDamage());
};