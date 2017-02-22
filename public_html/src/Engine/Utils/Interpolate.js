/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function Interpolate(value, cycles, rate) {
    this.mCurrentValue = value;
    this.mFinalValue = value;
    this.mCycles = cycles;
    this.mRate = rate;
    
    //if there is a new value to interpolate to, number of cycles left for interpolation
    this.mCyclesLeft = 0;
}

Interpolate.prototype._interpolateValue = function() {
    this.mCurrentValue = this.mCurrentValue + this.mRate * (this.mFinalValue - this.mCurrentValue);
};

Interpolate.prototype.getValue = function() {
    return this.mCurrentValue;
};
Interpolate.prototype.setFinalValue = function(v) {
    this.mFinalValue = v;
    this.mCyclesLeft = this.mCycles; //will trigger interpolation
};
Interpolate.prototype.configInterpolation = function(stiffness, duration) {
    this.mRate = stiffness;
    this.mCycles = duration;
};

Interpolate.prototype.updateInterpolation = function() {
    if(this.mCyclesLeft <= 0) 
        return;
    this.mCyclesLeft--;
    if(this.mCyclesLeft === 0) 
        this.mCurrentValue = this.mFinalValue;
    else 
        this._interpolateValue();
};