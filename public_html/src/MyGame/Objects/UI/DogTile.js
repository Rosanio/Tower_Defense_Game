/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function DogTile(x, y, texture) {
    this.mDogTile = new Renderable();
    this.mDogTile.getXform().setPosition(x, y);
    this.mDogTile.getXform().setSize(270, 90);
    this.mDogTile.setColor([0.847, 0.855, 0.773, 1]);
    GameObject.call(this, this.mDogTile);
    
    this.mDog = new Jersey();
    this.mDog.initialize();
    
    this.mDogPicture = new TextureRenderable(texture);
    this.mDogPicture.getXform().setPosition(this.mDogTile.getXform().getXPos()-90, this.mDogTile.getXform().getYPos());
    this.mDogPicture.getXform().setSize(80, 80);
    this.mDogPicture.setColor([1, 1, 1, 0]);
}
gEngine.Core.inheritPrototype(DogTile, GameObject);

DogTile.prototype.getDog = function() {
    return this.mDog;
};
DogTile.prototype.setDog = function(d) {
    this.mDog = d;
};

DogTile.prototype.draw = function(aCamera) {
    GameObject.prototype.draw.call(this, aCamera);
    this.mDogPicture.draw(aCamera);
};

DogTile.prototype.areCoordsOnTile = function(coords) {
    var position = this.mDogTile.getXform().getPosition();
    var halfWidth = this.mDogTile.getXform().getWidth()/2;
    var halfHeight = this.mDogTile.getXform().getHeight()/2;
    var minX = position[0] - halfWidth;
    var maxX = position[0] + halfWidth;
    var minY = position[1] - halfHeight;
    var maxY = position[1] + halfHeight;
    return (coords[0] > minX && coords[0] < maxX && coords[1] > minY && coords[1] < maxY);
};