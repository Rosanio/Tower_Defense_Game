/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function BlueLevel() {
    this.kBgClip = "assets/sounds/BGClip.mp3";
    this.kCue = "assets/sounds/BlueLevel_cue.wav";
    //scene file name
    this.kSceneFile = "assets/BlueLevel.xml";
    //textures: 
    this.kPortal = "assets/minion_portal.jpg";
    this.kCollector = "assets/minion_collector.jpg";
    //all squares
    this.mSqSet = [];
    //The camera to view the scene
    this.mCamera = null;
}
gEngine.Core.inheritPrototype(BlueLevel, Scene);

BlueLevel.prototype.loadScene = function() {
    //load scene file
    gEngine.TextFileLoader.loadTextFile(this.kSceneFile, gEngine.TextFileLoader.eTextFileType.eXMLFile);
    //loads the audio
    gEngine.AudioClips.loadAudio(this.kBgClip);
    gEngine.AudioClips.loadAudio(this.kCue);
    //load the textures
    gEngine.Textures.loadTexture(this.kPortal);
    gEngine.Textures.loadTexture(this.kCollector);
};
BlueLevel.prototype.initialize = function() {
    var sceneParser = new SceneFileParser(this.kSceneFile);
    
    //Parse the camera
    this.mCamera = sceneParser.parseCamera();
    //Parse for all the squares
    sceneParser.parseSquares(this.mSqSet);
    sceneParser.parseTextureSquares(this.mSqSet);
    gEngine.AudioClips.playBackgroundAudio(this.kBgClip);
};
BlueLevel.prototype.draw = function() {
    //Clear the canvas
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]); //clear to light gray
    //Activate the drawing camera
    this.mCamera.setupViewProjection();
    //Draw all squares
    for(var i = 0; i < this.mSqSet.length; i++) {
        this.mSqSet[i].draw(this.mCamera.getVPMatrix());
    }
};
BlueLevel.prototype.update = function() {
    //For this very simple game, let's move the white square and pulse the red
    
    //Move the white square
    var xform = this.mSqSet[0].getXform();
    var deltaX = 0.05;
    
    //test for white square movement
    if(gEngine.Input.isKeyPressed(gEngine.Input.keys.Right)) {
        gEngine.AudioClips.playACue(this.kCue);
        if(xform.getXPos() > 30)  //this is the right-bound of the window
            xform.setPosition(10, 60);
        xform.incXPosBy(deltaX);
    }
    
    //test for white square rotation
    if(gEngine.Input.isKeyClicked(gEngine.Input.keys.Up))
        xform.incRotationByDegree(1);
    
    xform = this.mSqSet[1].getXform();
    //test for pulsing red square
    if(gEngine.Input.isKeyPressed(gEngine.Input.keys.Down)) {
        if(xform.getWidth() > 5)
            xform.setSize(2, 2);
        xform.incSizeBy(0.05);
    }
    
    if(gEngine.Input.isKeyPressed(gEngine.Input.keys.Left)) {
        xform.incXPosBy(-deltaX);
        if(xform.getXPos() < 11) {
            gEngine.GameLoop.stop();
        }
    }
    
    //Continuously change texture tinting
    var c = this.mSqSet[1].getColor();
    var ca = c[3] + deltaX;
    if(ca > 1) {
        ca = 0;
    }
    c[3] = ca;
};
BlueLevel.prototype.unloadScene = function() {
    //stop the background audio
    gEngine.AudioClips.stopBackgroundAudio();
    //unload the scene file
    gEngine.TextFileLoader.unloadTextFile(this.kSceneFile);
    gEngine.AudioClips.unloadAudio(this.kBgClip);
    gEngine.AudioClips.unloadAudio(this.kCue);
    gEngine.Textures.unloadTexture(this.kPortal);
    gEngine.Textures.unloadTexture(this.kCollector);
    
    var nextLevel = new MyGame();
    gEngine.Core.startScene(nextLevel);
};
