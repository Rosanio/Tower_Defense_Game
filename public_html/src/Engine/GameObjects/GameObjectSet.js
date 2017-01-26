/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function GameObjectSet() {
    this.mSet = [];
}

GameObjectSet.prototype.size = function() {
    return this.mSet.length;
};

GameObjectSet.prototype.getObjectAt = function(index) {
    return this.mSet[index];
};

GameObjectSet.prototype.addToSet = function(obj) {
    this.mSet.push(obj);
};

GameObjectSet.prototype.update = function() {
    var i;
    for(i = 0; i < this.mSet.length; i++) {
        this.mSet[i].update();
    }
};

GameObjectSet.prototype.draw = function(aCamera) {
    var i;
    for(i = 0; i < this.mSet.length; i++) {
        this.mSet[i].draw(aCamera);
    }
};
