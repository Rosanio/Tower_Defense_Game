/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function Tile(x, y, w, h) {
    this.mTile = new Renderable();
    this.mTile.getXform().setSize(w, h);
    this.mTile.getXform().setPosition(x, y);
}
