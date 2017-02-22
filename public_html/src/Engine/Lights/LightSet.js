/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function LightSet() {
    this.mSet = [];
}

LightSet.prototype.NumLights = function() {
    return this.mSet.length;
};

LightSet.prototype.getLightAt = function(index) {
    return this.mSet[index];
};
LightSet.prototype.addToSet = function(light) {
    this.mSet.push(light);
};
