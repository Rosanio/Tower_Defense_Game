/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

'use strict';
function MyGame() {
    //The camera to view the scene
    this.mCamera = null;
    
    this.kBoardWidth = 8;
    this.kBoardHeight = 8;
    
    this.kBoardFile = "assets/boardScenes/Board1.xml";
    
    this.board = null;
};
gEngine.Core.inheritPrototype(MyGame, Scene);

MyGame.prototype.loadScene = function() {
    gEngine.TextFileLoader.loadTextFile(this.kBoardFile, gEngine.TextFileLoader.eTextFileType.eXMLFile);
};

MyGame.prototype.unloadScene = function() {
    gEngine.TextFileLoader.unloadTextFile(this.kBoardFile);
};

MyGame.prototype.initialize = function() {
    var boardFileParser = new BoardFileParser(this.kBoardFile);
    //Parse the camera
    this.mCamera = new Camera(vec2.fromValues(100, 56.25), 200, [0, 0, 1280, 720]);
    this.mCamera.setBackgroundColor([0.8, 0.8, 0.8, 1]);
    
    gEngine.DefaultResources.setGlobalAmbientIntensity(3);
    
    //Create board
    this.board = new Board(this.kBoardWidth, this.kBoardHeight);
    boardFileParser.parseTiles(this.board.getTileMatrix(), this.kBoardWidth, this.kBoardHeight);
    console.log(this.board.getTileMatrix());
};

//This is the draw function, make sure to setup proper drawing environment, and more importantly, make sure to NOT change any state
MyGame.prototype.draw = function() {
    //Clear the canvas
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]); //clear to light gray
    
    this.mCamera.setupViewProjection();
};

//The update function, updates the application state. Make sure to NOT draw anything in this function!
MyGame.prototype.update = function() {
    this.mCamera.update();
    
    
};