/* 
 * Class to encapsulate the unmoving elements in the game
 */

function Board(width, height) {
    this.mWidth = width;
    this.mHeight = height;
    
    this.mTileMatrix = [];
    this.mStartTile = null;
    this.mLastTile = null;
    
    this.exitDirections = null;
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
Board.prototype.getLastTile = function() {
    return this.mLastTile;
};
Board.prototype.setLastTile = function(tile) {
    this.mLastTile = tile;
};
Board.prototype.getExitDirections = function() {
    return this.exitDirections;
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
    var tileRow = this.mTileMatrix[row];
    var tile = tileRow[col];
    return tile;
};

Board.prototype.getAdjacentTiles = function(currentTile) {
    var adjacentTiles = [];
    var adjacentCoords = this.getAdjacentCoords(currentTile);
    for(var i = 0; i < adjacentCoords.length; i++) {
        if(this.areCoordinatesOnBoard(adjacentCoords[i][0], adjacentCoords[i][1])) {
            adjacentTiles.push(this.getTileFromCoords(adjacentCoords[i][0], adjacentCoords[i][1]));
        }
    }
    return adjacentTiles;
};

Board.prototype.getAdjacentCoords = function(tile) {
    var adjacentCoords = [];
    var tileCoords = tile.getXform().getPosition();
    adjacentCoords.push([tileCoords[0]+tile.getWidth(), tileCoords[1]]);
    adjacentCoords.push([tileCoords[0]-tile.getWidth(), tileCoords[1]]);
    adjacentCoords.push([tileCoords[0], tileCoords[1] + tile.getHeight()]);
    adjacentCoords.push([tileCoords[0], tileCoords[1] - tile.getHeight()]);
    return adjacentCoords;
};

Board.prototype.calculateExitDirections = function() {
    var exitDirs = [];
    var lastTilePosition = this.mLastTile.getXform().getPosition();
    var adjacentCoords = this.getAdjacentCoords(this.mLastTile);
    for(var i = 0; i < adjacentCoords.length; i++) {
        if(!this.areCoordinatesOnBoard(adjacentCoords[i][0], adjacentCoords[i][1])) {
            var exitDir = [];
            exitDir[0] = adjacentCoords[i][0] - lastTilePosition[0];
            exitDir[1] = adjacentCoords[i][1] - lastTilePosition[1];
            exitDirs.push(exitDir);
        }
    }
    this.exitDirections = exitDirs;
};

Board.prototype.initialize = function() {
    this.calculateExitDirections();
};

Board.prototype.draw = function(camera) {
    for(var i = 0; i < this.mHeight; i++) {
        for(var j = 0; j < this.mWidth; j++) {
            this.mTileMatrix[i][j].draw(camera);
        }
    }
};
