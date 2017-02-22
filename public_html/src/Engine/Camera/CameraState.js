/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function CameraState(center, width) {
    this.kCycles = 300;  //number of cycles to complete this transaction
    this.kRate = 0.1;    //rate of change for each cycle
    this.mCenter = new InterpolateVec2(center, this.kCycles, this.kRate);
    this.mWidth = new Interpolate(width, this.kCycles, this.kRate);
}

CameraState.prototype.getCenter = function() {
    return this.mCenter.getValue();
};
CameraState.prototype.getWidth = function() {
    return this.mWidth.getValue();
};
CameraState.prototype.setCenter = function(c) {
    this.mCenter.setFinalValue(c);
};
CameraState.prototype.setWidth = function(w) {
    this.mWidth.setFinalValue(w);
};

CameraState.prototype.updateCameraState = function() {
    this.mCenter.updateInterpolation();
    this.mWidth.updateInterpolation();
};

CameraState.prototype.configInterpolation = function(stiffness, duration) {
    this.mCenter.configInterpolation(stiffness, duration);
    this.mWidth.configInterpolation(stiffness, duration);
};
