/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

"use strict";

var gEngine = gEngine || { };

gEngine.Core = (function() {
    //instance variable: the graphical context for drawing
    var mGL = null;
    
    //Accessor of the webGL context
    var getGL = function() { return mGL };
    
    //initialize the WebGL, the vertex buffer and the compile shaders
    var initializeWebGL = function(htmlCanvasID) {
        var canvas = document.getElementById(htmlCanvasID);
        
        //Get standard webGL or experimental
        //Binds webGL to the Canvas area on the web-page to the variable mGL
        mGL = canvas.getContext("webgl", {alpha: false, depth: true, stencil: true}) || canvas.getContext("experimental-webgl", {alpha: false, depth: true, stencil: true});
        
        //Allows transparency with textures
        mGL.blendFunc(mGL.SRC_ALPHA, mGL.ONE_MINUS_SRC_ALPHA);
        mGL.enable(mGL.BLEND);
        
        //Set images to flip the y axis to match the texture coordinate space
        mGL.pixelStorei(mGL.UNPACK_FLIP_Y_WEBGL, true);
        
        //make sure depth testing is enabled
        mGL.enable(mGL.DEPTH_TEST);
        mGL.depthFunc(mGL.LEQUAL);
        
        if(mGL === null) {
            document.write("<br><b>WebGL is not supported!</b>");
            return;
        }
    };
    
    var initializeEngineCore = function(htmlCanvasID, myGame) {
        initializeWebGL(htmlCanvasID);
        //now initialize vertex buffer
        gEngine.VertexBuffer.initialize();
        gEngine.Input.initialize(htmlCanvasID);
        gEngine.AudioClips.initAudioContext();
        //Inits DefaultResources, when done, invoke startScene(myGame).
        gEngine.DefaultResources.initialize(function() {startScene(myGame);});
        
        gEngine.Physics.initialize();
    };
    
    var startScene = function(myGame) {
        myGame.loadScene.call(myGame); //Called in this way to keep correct context
        gEngine.GameLoop.start(myGame); //call initialize() only after async loading is done
    };
    
    var clearCanvas = function(color) {
        mGL.clearColor(color[0], color[1], color[2], color[3]); //set color to be cleared
        mGL.clear(mGL.COLOR_BUFFER_BIT | mGL.STENCIL_BUFFER_BIT | mGL.DEPTH_BUFFER_BIT);
    };
    
    var inheritPrototype = function(subClass, superClass) {
        var prototype = Object.create(superClass.prototype);
        prototype.constructor = subClass;
        subClass.prototype = prototype;
    }
    
    var cleanUp = function() {
        gEngine.VertexBuffer.cleanUp();
        gEngine.DefaultResources.cleanUp();
    };
    
    //Contains the functions and variables that will be accessible
    var mPublic = {
        getGL: getGL,
        initializeEngineCore: initializeEngineCore,
        clearCanvas: clearCanvas,
        startScene: startScene,
        inheritPrototype: inheritPrototype,
        cleanUp: cleanUp
    };
    
    return mPublic;
}());
