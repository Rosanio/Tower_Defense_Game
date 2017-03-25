/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function Dog(renderable, name, damage, attackRate) {
    this.mDog = renderable;
    this.mName = name;
    this.mDamage = damage;
    this.mAttackRate = attackRate;
    this.mLastAttackTime = 0;
    GameObject.call(this, renderable);
}
gEngine.Core.inheritPrototype(Dog, GameObject);

Dog.prototype.getName = function() {
    return this.mName;
};
Dog.prototype.setName = function(n) {
    this.mName = n;
};
Dog.prototype.isAttacking = function() {
    return ((this.mLastAttackTime + this.mAttackRate) > GameClock.getFrameCount());
};

Dog.prototype.update = function() {
    if(this.mDestination) {
        GameObject.prototype.update.call(this);
    }
};

Dog.prototype.attack = function(enemy) {
    enemy.incHealthBy(-this.mDamage);
    this.mLastAttackTime = GameClock.getFrameCount();
};