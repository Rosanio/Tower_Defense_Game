/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function DogTile(x, y) {
    this.mDogTile = new Renderable();
    this.mDogTile.getXform().setPosition(x, y);
    this.mDogTile.getXform().setSize(270, 90);
    this.mDogTile.setColor([0.847, 0.855, 0.773, 1]);
    GameObject.call(this, this.mDogTile);
    
    this.mDogPicture = new Renderable();
    this.mDogPicture.getXform().setPosition(this.mDogTile.getXform().getXPos()-90, this.mDogTile.getXform().getYPos());
    this.mDogPicture.getXform().setSize(80, 80);
    this.mDogPicture.setColor([1, 0.961, 0.867, 1]);
}
gEngine.Core.inheritPrototype(DogTile, GameObject);

DogTile.prototype.draw = function(aCamera) {
    GameObject.prototype.draw.call(this, aCamera);
    this.mDogPicture.draw(aCamera);
};