/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function Tile(x, y, w, h) {
    this.mTile = new Renderable();
    this.mTile.getXform().setSize(w, h);
    this.mTile.getXform().setPosition(x, y);
    GameObject.call(this, this.mTile);
    
    this.mGridX = x/w;
    this.mGridY = y/h;
    
}
gEngine.Core.inheritPrototype(Tile, GameObject)

Tile.prototype.getPosition = function() {
    return this.mTile.getXform().getPosition();
};
Tile.prototype.getXPos = function() {
    return this.mTile.getXform().getPosition()[0];
};
Tile.prototype.getYPos = function() {
    return this.mTile.getXform().getPosition()[1];
};

Tile.prototype.getSize = function() {
    return this.mTile.getXform().getSize();
};
Tile.prototype.getWidth = function() {
    return this.mTile.getXform().getSize()[0];
};
Tile.prototype.getHeight = function() {
    return this.mTile.getXform().getSize()[1];
};

Tile.prototype.getGridX = function() {
    return this.mGridX;
};
Tile.prototype.getGridY = function() {
    return this.mGridY;
};

Tile.prototype.draw = function(camera) {
    this.mTile.draw(camera);
};
