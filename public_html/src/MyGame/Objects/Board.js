/* 
 * Class to encapsulate the unmoving elements in the game
 */

function Board(width, height) {
    this.mWidth = width;
    this.mHeight = height;
    
    this.mTileMatrix = [];
    this.mStartTile = null;
}

Board.prototype.getWidth = function() {
    return this.width;
};
Board.prototype.getHeight = function() {
    return this.height;
};

Board.prototype.getTileMatrix = function() {
    return this.mTileMatrix;
};
Board.prototype.getStartTile = function() {
    return this.mStartTile;
};
Board.prototype.setStartTile = function(tile) {
    this.mStartTile = tile;
};

Board.prototype.areCoordinatesOnBoard = function(x, y) {
    var upperBound = Constants.kBoardHeight - this.mStartTile.getHeight()/2;
    var lowerBound = 0 - this.mStartTile.getHeight()/2;
    var leftBound = 0 - this.mStartTile.getWidth()/2;
    var rightBound = Constants.kBoardWidth - this.mStartTile.getWidth()/2;
    if(x > rightBound || x < leftBound || y > upperBound || y < lowerBound) {
        return false;
    }
    return true;
};

Board.prototype.getTileFromCoords = function(x, y) {
    var tileWidth = this.mStartTile.getWidth();
    var col = Math.floor((x+(tileWidth/2))/tileWidth);
    var row = Math.floor((y+(tileWidth/2))/tileWidth);
    return this.mTileMatrix[row][col];
};

Board.prototype.getAdjacentTiles = function(currentTile) {
    function pushTileIfDefined(tile) {
        if(tile !== undefined) {
            adjacentTiles.push(tile);
        }
    }
    var adjacentTiles = [];
    var x = currentTile.getGridX();
    var y = currentTile.getGridY();
    //Get X Tiles
    var row = this.mTileMatrix[y];
    pushTileIfDefined(row[x+1]);
    pushTileIfDefined(row[x-1]);
    
    //Get Y Tiles
    try {
        pushTileIfDefined(this.mTileMatrix[y+1][x]);
    } catch(e) {};
    try {
       pushTileIfDefined(this.mTileMatrix[y-1][x]); 
    } catch(e) {};
    
    return adjacentTiles;
};

Board.prototype.draw = function(camera) {
    for(var i = 0; i < this.mHeight; i++) {
        for(var j = 0; j < this.mWidth; j++) {
            this.mTileMatrix[i][j].draw(camera);
        }
    }
};
