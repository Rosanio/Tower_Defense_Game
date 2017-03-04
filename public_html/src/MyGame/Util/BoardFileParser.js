/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function BoardFileParser(boardFilePath) {
    this.mBoardXml = gEngine.ResourceMap.retrieveAsset(boardFilePath);
}

BoardFileParser.prototype._getElm = function(tagElm) {
    var theElm = this.mBoardXml.getElementsByTagName(tagElm);
    if(theElm.length === 0) 
        console.error("Warning: Level element:[" + tagElm + "]: is not found!");
    return theElm;
};

BoardFileParser.prototype.parseTiles = function(board, boardTileWidth, boardTileHeight) {
    var elm = this._getElm("Tile");
    var i, j, index, x, y, w, h, type, tile;
    w = Constants.kBoardWidth / boardTileWidth;
    h = Constants.kBoardHeight / boardTileHeight;
    for(i = boardTileHeight-1; i >= 0; i--) {
        var tileRow = [];
        for(j = 0; j < boardTileWidth; j++) {
            x = w * j;
            y = h * (boardTileHeight - i - 1);
            index = 8*i + j;
            type = elm.item(index).attributes.getNamedItem("Type").value;
            var start = elm.item(index).attributes.getNamedItem("Start");
            var last = elm.item(index).attributes.getNamedItem("Last");
            if(type === 'path') {
                tile = new PathTile(x, y, w, h);
            } else {
                tile = new GrassTile(x, y, w, h);
            }
            if(start) {
                board.setStartTile(tile);
            } else if(last) {
                board.setLastTile(tile);
            }
            tileRow.push(tile);
        }
        board.getTileMatrix().push(tileRow);
    }
};
