/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function CollisionInfo() {
    this.mDepth = 0;
    this.mNormal = vec2.fromValues(0, 0);
}

CollisionInfo.prototype.setDepth = function(s) {
    this.mDepth = s;
};
CollisionInfo.prototype.setNormal = function(s) {
    this.mNormal = s;
};

CollisionInfo.prototype.getDepth = function() {
    return this.mDepth;
};
CollisionInfo.prototype.getNormal = function() {
    return this.mNormal;
};
