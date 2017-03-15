/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function Meat(texture) {
    this.mMeat = new TextureRenderable(texture);
    this.mMeat.setColor([1, 1, 1, 0]);
    this.mMeat.getXform().setSize(35, 35);
    
    this.inPile = true;
    this.enemy = null;
    
    GameObject.call(this, this.mMeat);
}
gEngine.Core.inheritPrototype(Meat, GameObject);

Meat.prototype.isInPile = function() {
    return this.isInPile;
};
Meat.prototype.setInPile = function(b) {
    this.isInPile = b;
};
Meat.prototype.getEnemy = function() {
    return this.enemy;
};
Meat.prototype.setEnemy = function(e) {
    this.enemy = e;
};

Meat.prototype.initialize = function(tile) {
    var maxX = tile.getXPos() + tile.getWidth()/3;
    var minX = tile.getXPos() - tile.getWidth()/3;
    var maxY = tile.getYPos() + tile.getHeight()/3;
    var minY = tile.getYPos() - tile.getWidth()/3;
    var x = Math.floor(Math.random() * (maxX - minX)) + minY;
    var y = Math.floor(Math.random() * (maxY - minY)) + minY;
    this.mMeat.getXform().setPosition(x, y);
};

Meat.prototype.update = function() {
    if(this.enemy) {
        var x = this.enemy.getXform().getXPos();
        var y = this.enemy.getXform().getYPos();
        this.mMeat.getXform().setPosition(x, y);
    }
};
