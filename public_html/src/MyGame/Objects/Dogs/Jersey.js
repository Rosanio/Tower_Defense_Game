/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function Jersey() {
    ControlledDog.call(this, "assets/Jersey.png", "Jersey", 2, 150);
    this.setSpeed(3.5);
    var r = new RigidCircle(this.getXform(), 21);
    r.setColor([0, 0, 1, 1]);
    r.setDrawBounds(true);
    r.setAcceleration([0, 0]);
    this.setPhysicsComponent(r);
    
    this.biteTime = 90;
    this.knockbackTime = 60;
    this.isBeingKnockedBack = false;
    this.knockbackDirection = [0, 0];
    this.targetIsAlive = false;
}
gEngine.Core.inheritPrototype(Jersey, ControlledDog);

Jersey.prototype.getKnockbackTime = function() {
    return this.knockbackTime;
};
Jersey.prototype.isKnockedBack = function() {
    return this.isBeingKnockedBack;
};
Jersey.prototype.setTargetIsAlive = function(b) {
    this.targetIsAlive = b;
};

Jersey.prototype.update = function() {
    if((this.mLastAttackTime + this.biteTime) > GameClock.getFrameCount()) {
        if((this.mLastAttackTime + this.knockbackTime) > GameClock.getFrameCount()) {
            //don't move if biting
            this.setCurrentFrontDir([0, 0]);
        } else if((this.mLastAttackTime + this.knockbackTime) < GameClock.getFrameCount()) {
            
        } else if((this.mLastAttackTime + this.knockbackTime) === GameClock.getFrameCount()) {
            //TODO: Find a way to make jersey get knocked back even when a new destination is set while biting
            if(this.mTarget === null) {
                if(this.targetIsAlive) {
                    this.handleKnockBack();
                } else if(this.mDestination === null) {
                    this.setCurrentFrontDir([0, 0]);
                } else {
                    var frontDir = [(this.mDestination[0] - this.getXform().getXPos()), (this.mDestination[1] - this.getXform().getYPos())];
                    this.setCurrentFrontDir(frontDir);
                }
            } else {
                this.handleKnockBack();
            }
        }
    } else if((this.mLastAttackTime + this.biteTime) < GameClock.getFrameCount()) {
        if(this.mTarget) {
            this.rotateObjPointTo(this.mTarget.getXform().getPosition(), 1);
            this.mDestination = this.mTarget.getXform().getPosition();
            if(this.mTarget.getPhysicsComponent().collided(this.getPhysicsComponent())) {
                this.attack(this.mTarget);
                this.bite(this.mTarget);
                vec2.negate(this.knockbackDirection, this.getCurrentFrontDir());
                this.setCurrentFrontDir([0, 0]);
            }
            if(this.mTarget.getHealth() <= 0) {
                this.mTarget = null;
                this.mDestination = this.getXform().getPosition();
                this.targetIsAlive = false;
            }
        } else if(this.mDestination) {
            
            if(this.getPhysicsComponent().containsPos(vec2.add([0, 0], this.mDestination, vec2.scale([0, 0], this.getCurrentFrontDir(), this.getPhysicsComponent().getRadius())))) {
                this.mDestination = null;
                this.setCurrentFrontDir([0, 0]);
            } else {
                var frontDir = [(this.mDestination[0] - this.getXform().getXPos()), (this.mDestination[1] - this.getXform().getYPos())];
                this.setCurrentFrontDir(frontDir);
            }
        } else {
            this.setCurrentFrontDir([0, 0]);
        }
    } else {
        this.setSpeed(3.5);
        if(this.mTarget === null) {
            this.targetIsAlive = false;
        }
    }
    Dog.prototype.update.call(this);
};

Jersey.prototype.handleKnockBack = function() {
    this.setCurrentFrontDir(this.knockbackDirection);
    this.isBeingKnockedBack = true;
    this.setSpeed(1.5);
};

Jersey.prototype.bite = function(enemy) {
    enemy.getBit(this);
};