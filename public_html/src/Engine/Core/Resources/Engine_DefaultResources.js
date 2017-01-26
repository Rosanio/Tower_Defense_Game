/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var gEngine = gEngine || {};
gEngine.DefaultResources = (function() {
    //Simple Shader GLSL Shder file paths
    var kSimpleVS = "src/GLSLShaders/SimpleVS.glsl";
    var kSimpleFS = "src/GLSLShaders/SimpleFS.glsl";
    //Texture Shader
    var kTextureVS = "src/GLSLShaders/TextureVS.glsl";
    var kTextureFS = "src/GLSLShaders/TextureFS.glsl";
    
    var mConstColorShader = null;
    var mTextureShader = null;
    var mSpriteShader = null;
    
    //Default font
    var kDefaultFont = "assets/fonts/system-default-font";
    
    var _getConstColorShader = function() {
        return mConstColorShader;
    };
    var getTextureShader = function() {
        return mTextureShader;
    };
    var getSpriteShader = function() {
        return mSpriteShader;
    };
    var getDefaultFont = function() {
        return kDefaultFont;
    };
    
    //callback function after loadings are done
    var _createShaders = function(callbackFunction) {
        gEngine.ResourceMap.setLoadCompleteCallback(null);
        mConstColorShader = new SimpleShader(kSimpleVS, kSimpleFS);
        mTextureShader = new TextureShader(kTextureVS, kTextureFS);
        mSpriteShader = new SpriteShader(kTextureVS, kTextureFS);
        callbackFunction();
    };
    //initiate asynchronous loading of GLSL Shader files
    var _initialize = function(callbackFunction) {
        //constant color shader: SimpleVS, and SimpleFS
        gEngine.TextFileLoader.loadTextFile(kSimpleVS, gEngine.TextFileLoader.eTextFileType.eTextFile);
        gEngine.TextFileLoader.loadTextFile(kSimpleFS, gEngine.TextFileLoader.eTextFileType.eTextFile);
        
        //texture shader:
        gEngine.TextFileLoader.loadTextFile(kTextureVS, gEngine.TextFileLoader.eTextFileType.eTextFile);
        gEngine.TextFileLoader.loadTextFile(kTextureFS, gEngine.TextFileLoader.eTextFileType.eTextFile);
        
        //load default font
        gEngine.Fonts.loadFont(kDefaultFont);
        
        gEngine.ResourceMap.setLoadCompleteCallback(function() {_createShaders(callbackFunction);});
    };
    
    var cleanUp = function() {
        mConstColorShader.cleanUp();
        mTextureShader.cleanUp();
        mSpriteShader.cleanUp();
        
        gEngine.TextFileLoader.unloadTextFile(kSimpleVS);
        gEngine.TextFileLoader.unloadTextFile(kSimpleFS);
        gEngine.TextFileLoader.unloadTextFile(kTextureVS);
        gEngine.TextFileLoader.unloadTextFile(kTextureFS);
        
        //default font
        gEngine.Fonts.unloadFont(kDefaultFont);
    };
    
    var mPublic = {
        initialize: _initialize,
        getConstColorShader: _getConstColorShader,
        getTextureShader: getTextureShader,
        getSpriteShader: getSpriteShader,
        getDefaultFont: getDefaultFont,
        cleanUp: cleanUp
    };
    return mPublic;
}());
