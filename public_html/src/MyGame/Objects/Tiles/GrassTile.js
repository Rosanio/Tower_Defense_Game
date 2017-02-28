/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function GrassTile(x, y, w, h) {
    Tile.call(this, x, y, w, h);
    this.mTile.setColor([0, 0.5, 0, 1]);
    
    this.mTower = null;
}
gEngine.Core.inheritPrototype(GrassTile, Tile);

GrassTile.prototype.getTower = function() {
    return this.mTower;
};
GrassTile.prototype.setTower = function(t) {
    this.mTower = t;
};

