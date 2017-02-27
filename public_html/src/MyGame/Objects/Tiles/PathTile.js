/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function PathTile(x, y, w, h) {
    Tile.call(this, x, y, w, h);
    this.mTile.setColor([0.969, 0.906, 0.745]);
}
gEngine.Core.inheritPrototype(PathTile, Tile);
