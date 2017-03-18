/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function Jersey() {
    ControlledDog.call(this, "assets/Jersey.png", "Jersey", 5, 45);
    this.setSpeed(3.5);
    var r = new RigidCircle(this.getXform(), 21);
    r.setColor([0, 0, 1, 1]);
    r.setDrawBounds(true);
    r.setAcceleration([0, 0]);
    this.setPhysicsComponent(r);
}
gEngine.Core.inheritPrototype(Jersey, ControlledDog);

Jersey.prototype.update = function() {
    if((this.mLastAttackTime + this.mAttackRate) < GameClock.getFrameCount()) {
        ControlledDog.prototype.update.call(this);
    }
};