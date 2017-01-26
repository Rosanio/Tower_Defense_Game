/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function MyGame() {
    
    this.kMinionSprite = "assets/minion_sprite.png";
    //The camera to view the scene
    this.mCamera = null;
    
    //For echo message
    this.mMsg = null;
    
    //The hero and support objects
    this.mHero = null;
    this.mMinionSet = null;
    this.mDyePack = null;
    this.mBrain = null;
    
    this.mMode = 'H';
};
gEngine.Core.inheritPrototype(MyGame, Scene);

MyGame.prototype.loadScene = function() {
    gEngine.Textures.loadTexture(this.kMinionSprite);
};

MyGame.prototype.unloadScene = function() {
    gEngine.Textures.unloadTexture(this.kMinionSprite);
};

MyGame.prototype.initialize = function() {
    //Parse the camera
    this.mCamera = new Camera(vec2.fromValues(50, 37.5), 100, [0, 0, 640, 480]);
    this.mCamera.setBackgroundColor([0.8, 0.8, 0.8, 1]);
    
    //The dye pack, simple another GameObject
    this.mDyePack = new DyePack(this.kMinionSprite);
    
    //A set of Minions
    this.mMinionSet = new GameObjectSet();
    var i, randomY, aMinion;
    //create 5 minions at random Y values
    for(i = 0; i < 5; i++) {
        randomY = Math.random() * 65;
        aMinion = new Minion(this.kMinionSprite, randomY);
        this.mMinionSet.addToSet(aMinion);
    }
    
    //Create the hero object
    this.mHero = new Hero(this.kMinionSprite);
    
    //Create the brain object
    this.mBrain = new Brain(this.kMinionSprite);
    
    //Create and initialize message output
    this.mMsg = new FontRenderable("Status Message");
    this.mMsg.setColor([0, 0, 0, 1]);
    this.mMsg.getXform().setPosition(1, 2);
    this.mMsg.setTextHeight(3);
};

//The update function, updates the application state. Make sure to NOT draw anything in this function!
MyGame.prototype.update = function() {
    var msg = "brain modes [H:keys, J:immediate, K:gradual]: ";
    var rate = 1;
    
    this.mHero.update();
    this.mMinionSet.update();
    //this.mDyePack.update();
    
    var hBbox = this.mHero.getBbox();
    var bBbox = this.mBrain.getBbox();
    
    switch(this.mMode) {
        case 'H':
            this.mBrain.update(); //player steers with arrow keys
            break;
        case 'K':
            rate = 0.02; //gradual rate
            //When 'K' is typed, the following should also be executed
        case 'J':
            if(!hBbox.intersectsBound(bBbox)) {
                this.mBrain.rotateObjPointTo(this.mHero.getXform().getPosition(), rate);
                GameObject.prototype.update.call(this.mBrain);
            }
            break;
    }
    
    //check for the hero going outside 80% of the WC window bound
    var status = this.mCamera.collideWCBound(this.mHero.getXform(), 0.8);            
    
    if(gEngine.Input.isKeyClicked(gEngine.Input.keys.H))
        this.mMode = 'H';
    if(gEngine.Input.isKeyClicked(gEngine.Input.keys.J)) 
        this.mMode = 'J';
    if(gEngine.Input.isKeyClicked(gEngine.Input.keys.K))
        this.mMode = 'K';
    
    this.mMsg.setText(msg + this.mMode + " [Hero bound=" + status + "]");
};

//This is the draw function, make sure to setup proper drawing environment, and more importantly, make sure to NOT change any state
MyGame.prototype.draw = function() {
    //Clear the canvas
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]); //clear to light gray
    //Activate the drawing camera
    this.mCamera.setupViewProjection();
    //Draw all squares
    this.mHero.draw(this.mCamera);
    this.mMinionSet.draw(this.mCamera);
    this.mDyePack.draw(this.mCamera);
    this.mBrain.draw(this.mCamera);
    this.mMsg.draw(this.mCamera);
};
