/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function DyePack(spriteTexture) {
    this.kRefWidth = 80;
    this.kRefHeight = 130;
    
    this.mDyePack = new SpriteRenderable(spriteTexture);
    this.mDyePack.setColor([1, 1, 1, 0.1]);
    this.mDyePack.getXform().setPosition(50, 33);
    this.mDyePack.getXform().setSize(this.kRefWidth / 50, this.kRefWidth / 50);
    this.mDyePack.setElementPixelPositions(510, 595, 23, 153);
    GameObject.call(this, this.mDyePack);
}
gEngine.Core.inheritPrototype(DyePack, GameObject);
