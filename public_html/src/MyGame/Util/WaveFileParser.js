/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function WaveFileParser(waveXMLPath) {
    this.waveXML = gEngine.ResourceMap.retrieveAsset(waveXMLPath);
}

WaveFileParser.prototype._getElm = function(tagElm) {
    var theElm = this.waveXML.getElementsByTagName(tagElm);
    if(theElm.length === 0) 
        console.error("Warning: Level element:[" + tagElm + "]: is not found!");
    return theElm;
};

WaveFileParser.prototype.parseWave = function() {
    var elm = this._getElm("Enemy");
    var enemy, enemies=[];
    for(var i = 0; i < elm.length; i++) {
        var startTime = Number(elm.item(i).attributes.getNamedItem("startTime").value);
        enemy = new Enemy(startTime);
        enemies.push(enemy);
    }
    return enemies;
};