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
    
    GameObject.call(this, this.mProjectile);
}
gEngine.Core.inheritPrototype(Projectile, GameObject);

Projectile.prototype.initialize = function(tower, enemy) {
    this.mProjectile.getXform().setPosition(tower.getRenderable().getXform().getPosition()[0], tower.getRenderable().getXform().getPosition()[1]);
    this.setSpeed(1.5);
    
    this.mTarget = enemy;
};

Projectile.prototype.update = function() {
    this.rotateObjPointTo(this.mTarget.getXform().getPosition(), 1);
    GameObject.prototype.update.call(this);
};