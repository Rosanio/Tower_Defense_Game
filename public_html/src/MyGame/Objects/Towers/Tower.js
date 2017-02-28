/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function Tower() {
    this.mTower = new Renderable();
    this.mTower.setColor([0, 0, 1, 1]);
    this.mTower.getXform().setSize(35, 35);
    
    GameObject.call(this, this.mTower);
    
    var r = new RigidCircle(this.getXform(), 115);
    r.setColor([0, 0, 1, 1]);
    r.setDrawBounds(true);
    this.setPhysicsComponent(r);
    
    this.shotInterval = 60;
    this.shotCountdown = 0;
    
    this.mDamage = 1;
}
gEngine.Core.inheritPrototype(Tower, GameObject);

Tower.prototype.initialize = function(tile) {
    var x = tile.getPosition()[0];
    var y = tile.getPosition()[1];
    this.mTower.getXform().setPosition(x, y);
};

Tower.prototype.getShotInterval = function() {
    return this.shotInterval;
};
Tower.prototype.setShotInterval = function(num) {
    this.shotInterval = num;
};
Tower.prototype.getShotCountdown = function() {
    return this.shotCountdown;
};
Tower.prototype.setShotCountdown = function(num) {
    this.shotCountdown = num;
};
Tower.prototype.getDamage = function() {
    return this.mDamage;
};
Tower.prototype.setDamage = function(d) {
    this.mDamage = d;
};

Tower.prototype.update = function() {
    if(this.shotCountdown > 0) {
        this.shotCountdown--;
    }
};