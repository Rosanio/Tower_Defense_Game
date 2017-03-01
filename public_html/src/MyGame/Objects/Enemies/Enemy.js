/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function Enemy(startTime) {
    
    this.previousTile = null;
    this.nextTile = null;
    this.startTime = startTime;
    
    this.mEnemy = new Renderable();
    this.mEnemy.setColor([1, 0, 0, 1]);
    this.mEnemy.getXform().setSize(40, 40);
    this.currentTile = null;
    GameObject.call(this, this.mEnemy);
    
    var r = new RigidRectangle(this.mEnemy.getXform(), 20, 20);
    r.setAcceleration([0, 0]);
    r.setColor([1, 0, 0, 1]);
    r.setDrawBounds(true);
    this.setPhysicsComponent(r);
    
    this.health = 15;
}
gEngine.Core.inheritPrototype(Enemy, GameObject);

Enemy.prototype.getHealth = function() {
    return this.health;
};
Enemy.prototype.incHealthBy = function(delta) {
    this.health += delta;
};
Enemy.prototype.getStartTime = function() {
    return this.startTime;
};

Enemy.prototype.spawn = function(board) {
    this.nextTile = board.getStartTile();
    //Get middle position of start tile
    var position = this.nextTile.getPosition();
    var dimensions = this.nextTile.getSize();
    
    //Figure out which spaces are off the board
    var spawnCoords = [];
    for(var i = -1; i < 2; i+=2) {
        var x = position[0] + i*dimensions[0];
        if(!board.areCoordinatesOnBoard(x, position[1])) {
            spawnCoords.push([x, position[1]]);
        }
    }
    for(var i = -1; i < 2; i+=2) {
        var y = position[1] + i*dimensions[1];
        if(!board.areCoordinatesOnBoard(position[0], y)) {
            spawnCoords.push([position[0], y]);
        }
    }
    
    //Pick one of those spaces to spawn at
    var spawnSpaceIndex = Math.floor(Math.random() * spawnCoords.length);
    //var spawnSpaceIndex = 0;
    this.getXform().setPosition(spawnCoords[spawnSpaceIndex][0], spawnCoords[spawnSpaceIndex][1]);
    var xDir = this.nextTile.getPosition()[0] - spawnCoords[spawnSpaceIndex][0];
    var yDir = this.nextTile.getPosition()[1] - spawnCoords[spawnSpaceIndex][1];
    this.setCurrentFrontDir([xDir, yDir]);
    this.setSpeed(0.75);
};

Enemy.prototype.update = function(board) {
    //See if nextTile calculation is needed
    var frontDirection = this.getCurrentFrontDir();
    var position = this.getXform().getPosition();
    var nextTilePosition = this.nextTile.getPosition();
    
    var dirIndex = -1;
    if(Math.abs(frontDirection[0]) > Math.abs(frontDirection[1])) {
        dirIndex = 0;
    } else {
        dirIndex = 1;
    }
    if(frontDirection[dirIndex] > 0) {
        if(position[dirIndex] > nextTilePosition[dirIndex]) {
            this.calculateNextTile(board);
            this.setDirectionBasedOnTiles();
        }
    } else {
        if(position[dirIndex] < nextTilePosition[dirIndex]) {
            this.calculateNextTile(board);
            this.setDirectionBasedOnTiles();
        }
    }
    GameObject.prototype.update.call(this);
};

Enemy.prototype.calculateNextTile = function(board) {
    var adjacentTiles = board.getAdjacentTiles(this.nextTile);
    for(var i = 0; i < adjacentTiles.length; i++) {
        if(adjacentTiles[i] instanceof PathTile) {
            if(this.previousTile) {
                if(adjacentTiles[i].getPosition() !== this.previousTile.getPosition()) {
                    this.previousTile = this.nextTile;
                    this.nextTile = adjacentTiles[i];
                    break;
                }
            } else {
                this.previousTile = this.nextTile;
                this.nextTile = adjacentTiles[i];
            }
        }
    }
};
Enemy.prototype.setDirectionBasedOnTiles = function() {
    var xDir = this.nextTile.getPosition()[0] - this.previousTile.getPosition()[0];
    var yDir = this.nextTile.getPosition()[1] - this.previousTile.getPosition()[1];
    this.setCurrentFrontDir([xDir, yDir]);
};