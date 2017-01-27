/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function MyGame() {
    
    this.kMinionSprite = "assets/minion_sprite.png";
    this.kMinionPortal = "assets/minion_portal.png";
    this.kBg = "assets/bg.png";
    
    //The camera to view the scene
    this.mCamera = null;
    this.mBg = null;
    
    //For echo message
    this.mMsg = null;
    
    //The hero and support objects
    this.mHero = null;
    this.mBrain = null;
    this.mPortal = null;
    this.mLMinion = null;
    this.mRMinion = null;
    this.mFocusObj = null;
    
    this.mChoice = 'D';
};
gEngine.Core.inheritPrototype(MyGame, Scene);

MyGame.prototype.loadScene = function() {
    gEngine.Textures.loadTexture(this.kMinionSprite);
    gEngine.Textures.loadTexture(this.kMinionPortal);
    gEngine.Textures.loadTexture(this.kBg);
};

MyGame.prototype.unloadScene = function() {
    gEngine.Textures.unloadTexture(this.kMinionSprite);
    gEngine.Textures.unloadTexture(this.kMinionPortal);
    gEngine.Textures.unloadTexture(this.kBg);
};

MyGame.prototype.initialize = function() {
    //Parse the camera
    this.mCamera = new Camera(vec2.fromValues(50, 37.5), 100, [0, 0, 640, 480]);
    this.mCamera.setBackgroundColor([0.8, 0.8, 0.8, 1]);
    
    var bgR = new SpriteRenderable(this.kBg);
    bgR.setElementPixelPositions(0, 1024, 0, 1024);
    bgR.getXform().setSize(150, 150);
    bgR.getXform().setPosition(50, 35);
    this.mBg = new GameObject(bgR);
    
    this.mBrain = new Brain(this.kMinionSprite);
    
    this.mHero = new Hero(this.kMinionSprite);
    
    this.mPortal = new TextureObject(this.kMinionPortal, 50, 30, 10, 10);
    
    this.mLMinion = new Minion(this.kMinionSprite, 30, 30);
    this.mRMinion = new Minion(this.kMinionSprite, 70, 30);
    
    this.mFocusObj = this.mHero;
    
    //Create and initialize message output
    this.mMsg = new FontRenderable("Status Message");
    this.mMsg.setColor([1, 1, 1, 1]);
    this.mMsg.getXform().setPosition(2, 4);
    this.mMsg.setTextHeight(3);
    
    this.mCollide = this.mHero;
};

//The update function, updates the application state. Make sure to NOT draw anything in this function!
MyGame.prototype.update = function() {
    var zoomDelta = 0.05;
    var msg = "L/R: Left or Right Minion; H: Dye; P: Portal]:";
    
    this.mLMinion.update();
    this.mRMinion.update();
    
    this.mHero.update();
    
    this.mPortal.update(gEngine.Input.keys.Up, gEngine.Input.keys.Down, gEngine.Input.keys.Left, gEngine.Input.keys.Right, gEngine.Input.keys.P);
    
    var h = [];
    
    if(!this.mHero.pixelTouches(this.mBrain, h)) {
        this.mBrain.rotateObjPointTo(this.mHero.getXform().getPosition(), 0.01);
        GameObject.prototype.update.call(this.mBrain);
    }
    
    if(gEngine.Input.isKeyClicked(gEngine.Input.keys.L)) {
        //TODO: Start here
    }
    if(gEngine.Input.isKeyClicked(gEngine.Input.keys.R)) {
        this.mCollide = this.mRMinion;
        this.mChoice = 'R';
    }
    if(gEngine.Input.isKeyClicked(gEngine.Input.keys.B)) {
        this.mCollide = this.mBrain;
        this.mChoice = 'B';
    }
    if(gEngine.Input.isKeyClicked(gEngine.Input.keys.H)) {
        this.mCollide = this.mHero;
        this.mChoice = 'H';
    }
    
    this.mMsg.setText(msg + this.mChoice);
};

//This is the draw function, make sure to setup proper drawing environment, and more importantly, make sure to NOT change any state
MyGame.prototype.draw = function() {
    //Clear the canvas
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]); //clear to light gray
    //Activate the drawing camera
    this.mCamera.setupViewProjection();
    //Draw all squares
    this.mHero.draw(this.mCamera);
    this.mBrain.draw(this.mCamera);
    this.mPortal.draw(this.mCamera);
    this.mLMinion.draw(this.mCamera);
    this.mRMinion.draw(this.mCamera);
    this.mPortalHit.draw(this.mCamera);
    this.mHeroHit.draw(this.mCamera);
    this.mMsg.draw(this.mCamera);
};
