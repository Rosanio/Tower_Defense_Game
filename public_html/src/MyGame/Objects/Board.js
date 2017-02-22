/* 
 * Class to encapsulate the unmoving elements in the game
 */

function Board(width, height) {
    this.kScreenWidth = 600;
    this.kScreenHeight = 600;
    
    this.mWidth = width;
    this.mHeight = height;
    
    this.mTileMatrix = [];
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
