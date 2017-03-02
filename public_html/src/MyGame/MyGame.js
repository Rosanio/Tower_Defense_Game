/* 
 * Notes: All objects are drawn with the coordinates given set as center
 */

'use strict';
function MyGame() {
    //The camera to view the board
    this.mBoardCamera = null;
    //Camera for Player UI
    this.mPlayerCamera = null;
    
    //Frame count to measure time
    this.mFrameCount = 0;
    
    this.kBoardWidth = 8;
    this.kBoardHeight = 8;
    
    this.kBoardFile = "assets/boardScenes/Board1.xml";
    this.kWave1File = "assets/enemyWaveXML/Lv1Wave1.xml";
    
    this.board = null;
    this.towers = [];
    this.enemies = [];
    this.projectiles = [];
    
    this.kHeartTexture = "assets/heart.png";
    this.heartIcon = null;
};
gEngine.Core.inheritPrototype(MyGame, Scene);

MyGame.prototype.loadScene = function() {
    gEngine.TextFileLoader.loadTextFile(this.kBoardFile, gEngine.TextFileLoader.eTextFileType.eXMLFile);
    gEngine.TextFileLoader.loadTextFile(this.kWave1File, gEngine.TextFileLoader.eTextFileType.eXMLFile);
    gEngine.Textures.loadTexture(this.kHeartTexture);
};

MyGame.prototype.unloadScene = function() {
    gEngine.TextFileLoader.unloadTextFile(this.kBoardFile);
    gEngine.TextFileLoader.unloadTextFile(this.kWave1File);
    gEngine.Textures.unloadTexture(this.kHeartTexture);
};

MyGame.prototype.initialize = function() {
    var boardFileParser = new BoardFileParser(this.kBoardFile);
    var waveFileParser = new WaveFileParser(this.kWave1File);
    
    //Set global lighting
    gEngine.DefaultResources.setGlobalAmbientIntensity(3);
    
    //Initialize camera
    this.mBoardCamera = new Camera(vec2.fromValues(315, 315), 720, [280, 0, 720, 720]);
    this.mBoardCamera.setBackgroundColor([0.8, 0.8, 0.8, 1]);
    
    this.mPlayerCamera = new Camera(vec2.fromValues(0, 0), 280, [0, 0, 280, 720]);
    this.mPlayerCamera.setBackgroundColor([0.9, 0.9, 0.9, 1]);
    
    //Create board
    this.board = new Board(this.kBoardWidth, this.kBoardHeight);
    boardFileParser.parseTiles(this.board, this.kBoardWidth, this.kBoardHeight);
    
    //Parse wave 1
    this.enemies = waveFileParser.parseWave();
    
    this.heartIcon = new TextureRenderable(this.kHeartTexture);
    this.heartIcon.getXform().setPosition(-100, 330);
    this.heartIcon.getXform().setSize(40, 40);
    this.heartIcon.setColor([1, 1, 1, 0]);
};

//This is the draw function, make sure to setup proper drawing environment, and more importantly, make sure to NOT change any state
MyGame.prototype.draw = function() {
    //Clear the canvas
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]); //clear to light gray
    this.mBoardCamera.setupViewProjection();
    
    this.board.draw(this.mBoardCamera);
    
    for(var i = 0; i < this.enemies.length; i++) {
        if(this.enemies[i].getStartTime() < this.mFrameCount) {
            this.enemies[i].draw(this.mBoardCamera);
        }
    }
    
    for(var i = 0; i < this.towers.length; i++) {
        this.towers[i].draw(this.mBoardCamera);
    }
    
    for(var i = 0; i < this.projectiles.length; i++) {
        this.projectiles[i].draw(this.mBoardCamera);
    }
    
    this.mPlayerCamera.setupViewProjection();
    this.heartIcon.draw(this.mPlayerCamera);
    
};

//The update function, updates the application state. Make sure to NOT draw anything in this function!
MyGame.prototype.update = function() {
    this.mBoardCamera.update();
    this.mPlayerCamera.update();
    
    for(var i = 0; i < this.enemies.length; i++) {
        if(this.enemies[i].getStartTime() === this.mFrameCount) {
            this.enemies[i].spawn(this.board)
        } else if(this.enemies[i].getStartTime() < this.mFrameCount) {
            this.enemies[i].update(this.board);
        }
    }
    for(var i = 0; i < this.projectiles.length; i++) {
        this.projectiles[i].update();
        var target = this.projectiles[i].getTarget();
        if(target) {
            if(this.projectiles[i].getPhysicsComponent().collided(target.getPhysicsComponent())) {
                this.projectiles[i].onHit();
                this.projectiles.splice(i, 1);
                if(target.getHealth() <= 0) {
                    for(var j = 0; j < this.enemies.length; j++) {
                        if(this.enemies[j] === target) {
                            this.enemies.splice(j, 1);
                        }
                    }
                    for(var j = 0; j < this.projectiles.length; j++) {
                        if(this.projectiles[j].getTarget() === target) {
                            this.projectiles[j].setTarget(null);
                        }
                    }
                }
            }
        }
    }
    if(gEngine.Input.isButtonClicked(gEngine.Input.mouseButton.Left)) {
        console.log(this.mBoardCamera.mouseWCX() + " " + this.mBoardCamera.mouseWCY());
        
    }
    if(gEngine.Input.isButtonClicked(gEngine.Input.mouseButton.Right)) {
        var tile = this.board.getTileFromCoords(this.mBoardCamera.mouseWCX(), this.mBoardCamera.mouseWCY());
        if(tile instanceof GrassTile) {
            if(tile.getTower() === null) {
                var tower = new Tower();
                tower.initialize(tile);
                this.towers.push(tower);
                tile.setTower(tower);
            }
        }
    }
    for(var i = 0; i < this.towers.length; i++) {
        this.towers[i].update();
        for(var j = 0; j < this.enemies.length; j++) {
            if(this.towers[i].getPhysicsComponent().collided(this.enemies[j].getPhysicsComponent()) && this.towers[i].getShotCountdown() === 0) {
                var proj = new Projectile();
                proj.initialize(this.towers[i], this.enemies[j]);
                this.projectiles.push(proj);
                this.towers[i].setShotCountdown(60);
            }
        }
    }
    
    //Lastly, update frame count
    this.mFrameCount++;
};