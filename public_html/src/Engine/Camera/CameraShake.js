/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function CameraShake(state, xDelta, yDelta, shakeFrequency, shakeDuration) {
    this.mOrgCenter = vec2.clone(state.getCenter());
    this.mShakeCenter = vec2.clone(this.mOrgCenter);
    this.mShake = new ShakePosition(xDelta, yDelta, shakeFrequency, shakeDuration);
}

CameraShake.prototype.updateShakeState = function() {
    var s = this.mShake.getShakeResults();
    vec2.add(this.mShakeCenter, this.mOrgCenter, s);
};

CameraShake.prototype.shakeDone = function() {
    return this.mShake.shakeDone();
};

CameraShake.prototype.getCenter = function() {
    return this.mShakeCenter;
};
CameraShake.prototype.setRefCenter = function(c) {
    this.mOrgCenter[0] = c[0];
    this.mOrgCenter[1] = c[1];
};
