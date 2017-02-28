/* 
 * Notes: All objects are drawn with the coordinates given set as center
 */

'use strict';
function MyGame() {
    //The camera to view the scene
    this.mCamera = null;
    
    this.kBoardWidth = 8;
    this.kBoardHeight = 8;
    
    this.kBoardFile = "assets/boardScenes/Board1.xml";
    
    this.board = null;
    this.towers = [];
    this.enemies = [];
    this.projectiles = [];
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
    
    gEngine.DefaultResources.setGlobalAmbientIntensity(3);
    
    //Create board
    this.board = new Board(this.kBoardWidth, this.kBoardHeight);
    boardFileParser.parseTiles(this.board, this.kBoardWidth, this.kBoardHeight);
    
    this.mCamera = new Camera(vec2.fromValues(315, 315), 720, [280, 0, 720, 720]);
    this.mCamera.setBackgroundColor([0.8, 0.8, 0.8, 1]);
    
    //Create enemy
    var enemy = new Enemy(this.board);
    enemy.spawn();
    this.enemies.push(enemy);
};

//This is the draw function, make sure to setup proper drawing environment, and more importantly, make sure to NOT change any state
MyGame.prototype.draw = function() {
    //Clear the canvas
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]); //clear to light gray
    this.mCamera.setupViewProjection();
    
    this.board.draw(this.mCamera);
    
    for(var i = 0; i < this.enemies.length; i++) {
        this.enemies[i].draw(this.mCamera);
    }
    
    for(var i = 0; i < this.towers.length; i++) {
        this.towers[i].draw(this.mCamera);
    }
    
    for(var i = 0; i < this.projectiles.length; i++) {
        this.projectiles[i].draw(this.mCamera);
    }
};

//The update function, updates the application state. Make sure to NOT draw anything in this function!
MyGame.prototype.update = function() {
    this.mCamera.update();
    
    for(var i = 0; i < this.enemies.length; i++) {
        this.enemies[i].update();
    }
    for(var i = 0; i < this.projectiles.length; i++) {
        this.projectiles[i].update();
    }
    if(gEngine.Input.isButtonClicked(gEngine.Input.mouseButton.Left)) {
        console.log(this.mCamera.mouseWCX() + " " + this.mCamera.mouseWCY());
        
    }
    if(gEngine.Input.isButtonClicked(gEngine.Input.mouseButton.Right)) {
        var tile = this.board.getTileFromCoords(this.mCamera.mouseWCX(), this.mCamera.mouseWCY());
        if(tile instanceof GrassTile) {
            if(tile.getTower() === null) {
                var tower = new Tower();
                tower.initialize(tile);
                this.towers.push(tower);
            }
        }
    }
    for(var i = 0; i < this.towers.length; i++) {
        this.towers[i].update();
        if(this.towers[i].getShotCountdown() === 0) {
            for(var j = 0; j < this.enemies.length; j++) {
                if(this.towers[i].getPhysicsComponent().collided(this.enemies[j].getPhysicsComponent())) {
                    console.log('collision');
                    var proj = new Projectile();
                    proj.initialize(this.towers[i], this.enemies[j]);
                    this.projectiles.push(proj);
                    this.towers[i].setShotCountdown(60);
                }
            }
        }
    }
};