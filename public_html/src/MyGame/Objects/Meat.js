/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function Meat(texture) {
    this.mMeat = new TextureRenderable(texture);
    this.mMeat.setColor([1, 1, 1, 0]);
    this.mMeat.getXform().setSize(35, 35);
    
    GameObject.call(this, this.mMeat);
}
gEngine.Core.inheritPrototype(Meat, GameObject);

Meat.prototype.initialize = function(tile) {
    var maxX = tile.getXPos() + tile.getWidth()/3;
    var minX = tile.getXPos() - tile.getWidth()/3;
    var maxY = tile.getYPos() + tile.getHeight()/3;
    var minY = tile.getYPos() - tile.getWidth()/3;
    var x = Math.floor(Math.random() * (maxX - minX)) + minY;
    var y = Math.floor(Math.random() * (maxY - minY)) + minY;
    this.mMeat.getXform().setPosition(x, y);
};
