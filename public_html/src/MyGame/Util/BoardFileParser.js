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

BoardFileParser.prototype.parseTiles = function(tileSet, boardTileWidth, boardTileHeight) {
    var elm = this._getElm("Tile");
    var i, j, index, x, y, w, h, type, tile;
    w = Constants.kBoardWidth / boardTileWidth;
    h = Constants.kBoardHeight / boardTileHeight;
    for(i = 0; i < boardTileWidth; i++) {
        var tileRow = [];
        for(j = 0; j < boardTileHeight; j++) {
            x = w * i;
            y = h * j;
            index = 8*i + j;
            type = elm.item(index).attributes.getNamedItem("Type").value;
            if(type === 'path') {
                tile = new PathTile(x, y, w, h);
            } else {
                tile = new GrassTile(x, y, w, h);
            }
            tileRow.push(tile);
        }
        tileSet.push(tileRow);
    }
};
