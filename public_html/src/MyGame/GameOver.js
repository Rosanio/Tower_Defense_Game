/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function GameOver() {
    this.mCamera = null;
    this.mMsg = null;
};
gEngine.Core.inheritPrototype(GameOver, Scene);

GameOver.prototype.initialize = function() {
    //set up the cameras
    this.mCamera = new Camera(
            vec2.fromValues(50, 33),
            100,
            [0, 0, 600, 400]);
    this.mCamera.setBackgroundColor([0.9, 0.9, 0.9, 1]);
    
    this.mMsg = new FontRenderable("Gam eOver!");
    this.mMsg.setColor([0, 0, 0, 1]);
    this.mMsg.getXform().setPosition(22, 32);
    this.mMsg.setTextHeight(10);
};

GameOver.prototype.draw = function() {
    //clear the canvas
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]);
    
    //activate the drawing camera
    this.mCamera.setupViewProjection();
    this.mMsg.draw(this.mCamera);
};

GameOver.prototype.update = function() {
    gEngine.GameLoop.stop();
};

GameOver.prototype.unloadScene = function() {
    gEngine.Core.cleanUp(); //release gl resources
};
