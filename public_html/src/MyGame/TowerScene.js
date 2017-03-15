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
    
    //Game Objects
    this.player = null;
    this.board = null;
    this.towers = [];
    this.enemies = [];
    this.projectiles = [];
    this.meatPile = [];
    this.looseMeats = [];
    
    this.kHeartTexture = "assets/heart.png";
    this.kMeatTexture = "assets/Meat.png";
    this.heartIcon = null;
    this.meatIcon = null;
    this.healthText = null;
    
    this.nextScene = null;
};
gEngine.Core.inheritPrototype(MyGame, Scene);

MyGame.prototype.loadScene = function() {
    gEngine.TextFileLoader.loadTextFile(this.kBoardFile, gEngine.TextFileLoader.eTextFileType.eXMLFile);
    gEngine.TextFileLoader.loadTextFile(this.kWave1File, gEngine.TextFileLoader.eTextFileType.eXMLFile);
    gEngine.Textures.loadTexture(this.kHeartTexture);
    gEngine.Textures.loadTexture(this.kMeatTexture);
};

MyGame.prototype.unloadScene = function() {
    gEngine.TextFileLoader.unloadTextFile(this.kBoardFile);
    gEngine.TextFileLoader.unloadTextFile(this.kWave1File);
    gEngine.Textures.unloadTexture(this.kHeartTexture);
    gEngine.Textures.unloadTexture(this.kMeatTexture);
    gEngine.Core.startScene(this.nextScene);
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
    
    //Create player object
    this.player = new Player();
    
    //Create board
    this.board = new Board(this.kBoardWidth, this.kBoardHeight);
    boardFileParser.parseTiles(this.board, this.kBoardWidth, this.kBoardHeight);
    this.board.initialize();
    
    //Parse wave 1
    this.enemies = waveFileParser.parseWave();
    
    this.meatIcon = new TextureRenderable(this.kMeatTexture);
    this.meatIcon.getXform().setPosition(-96, 310);
    this.meatIcon.getXform().setSize(40, 40);
    this.meatIcon.setColor([1, 1, 1, 0]);
    var meat = this.player.getMeat().toString();
    this.meatText = new FontRenderable(meat);
    this.meatText.setColor([1, 1, 1, 0]);
    this.meatText.getXform().setPosition(-70, 313);
    this.meatText.setTextHeight(20);
    
    for(var i = 0; i < this.player.getMeat(); i++) {
        var meat = new Meat(this.kMeatTexture);
        meat.initialize(this.board.getLastTile());
        this.meatPile.push(meat);
    }
};

//This is the draw function, make sure to setup proper drawing environment, and more importantly, make sure to NOT change any state
MyGame.prototype.draw = function() {
    //Clear the canvas
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]); //clear to light gray
    this.mBoardCamera.setupViewProjection();
    
    this.board.draw(this.mBoardCamera);
    
    for(var i = 0; i < this.meatPile.length; i++) {
        this.meatPile[i].draw(this.mBoardCamera);
    }
    
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
    
    for(var i = 0; i < this.looseMeats.length; i++) {
        this.looseMeats[i].draw(this.mBoardCamera);
    }
    
    this.mPlayerCamera.setupViewProjection();
    this.meatIcon.draw(this.mPlayerCamera);
    this.meatText.draw(this.mPlayerCamera);
};

//The update function, updates the application state. Make sure to NOT draw anything in this function!
MyGame.prototype.update = function() {
    this.mBoardCamera.update();
    this.mPlayerCamera.update();
    
    for(var i = 0; i < this.enemies.length; i++) {
        if(this.enemies[i].getStartTime() === this.mFrameCount) {
            this.enemies[i].spawn(this.board);
        } else if(this.enemies[i].getStartTime() < this.mFrameCount) {
            this.enemies[i].update(this.board);
        }
        if(this.enemies[i].getPreviousTile() === this.board.getLastTile() && this.enemies[i].getCarryingMeat() === null) {
            console.log('grab the meats!!');
            for(var j = this.meatPile.length-1; j >= 0; j--) {
                this.meatPile[j].setEnemy(this.enemies[i]);
                this.enemies[i].setCarryingMeat(this.meatPile[j]);
                this.looseMeats.push(this.meatPile[j]);
                this.meatPile.splice(j, 1);
                break;
            }
        }
        if(this.enemies[i].hasLeftBoard(this.board)) {
            if(this.enemies[i].getCarryingMeat()) {
                this.player.incMeatBy(-1);
            }
            this.enemies.splice(i, 1);
            if(this.player.getMeat() <= 0) {
                this.nextScene = new GameOver();
                gEngine.GameLoop.stop();
            }
        }
    }
    for(var i = 0; i < this.projectiles.length; i++) {
        this.projectiles[i].update();
        var target = this.projectiles[i].getTarget();
        //Delete any projectiles which are no longer on the board
        if(!this.board.areCoordinatesOnBoard(this.projectiles[i].getXform().getPosition()[0], this.projectiles[i].getXform().getPosition()[1])) {
            this.projectiles.splice(i, 1);
        } else {
            if(target) {
                //Check for target collision if particle has a target
                if(this.projectiles[i].getPhysicsComponent().collided(target.getPhysicsComponent())) {
                    this.projectiles[i].onHit();
                    this.projectiles.splice(i, 1);
                    if(target.getHealth() <= 0) {
                        //Delete enemy if health is 0 or less
                        for(var j = 0; j < this.enemies.length; j++) {
                            if(this.enemies[j] === target) {
                                this.enemies.splice(j, 1);
                            }
                        }
                        //Reset target for all other projectiles so they keep on going
                        for(var j = 0; j < this.projectiles.length; j++) {
                            if(this.projectiles[j].getTarget() === target) {
                                this.projectiles[j].setTarget(null);
                            }
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
    
    for(var i = 0; i < this.looseMeats.length; i++) {
        this.looseMeats[i].update();
    }
    
    this.meatText.setText(this.player.getMeat().toString());
    
    //Lastly, update frame count
    this.mFrameCount++;
};