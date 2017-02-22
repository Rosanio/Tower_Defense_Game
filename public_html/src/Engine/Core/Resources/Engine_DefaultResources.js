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
    //Line Shader
    var kLineFS = "src/GLSLShaders/LineFS.glsl";
    //Light Shader
    var kLightFS = "src/GLSLShaders/LightFS.glsl";
    //Illum Shader
    var kIllumFS = "src/GLSLShaders/IllumFS.glsl";
    //Shadow Shaders
    var kShadowReceiverFS = "src/GLSLShaders/ShadowReceiverFS.glsl";
    var kShadowCasterFS = "src/GLSLShaders/ShadowCasterFS.glsl";
    
    var mLightShader = null;
    var mIllumShader = null;
    var mLineShader = null;
    var mConstColorShader = null;
    var mTextureShader = null;
    var mSpriteShader = null;
    var mShadowReceiverShader = null;
    var mShadowCasterShader = null;
    
    //Default font
    var kDefaultFont = "assets/fonts/system-default-font";
    
    //Global ambient color
    var mGlobalAmbientColor = [0.3, 0.3, 0.3, 1];
    var mGlobalAmbientIntensity = 1;
    
    var _getConstColorShader = function() {
        return mConstColorShader;
    };
    var getTextureShader = function() {
        return mTextureShader;
    };
    var getSpriteShader = function() {
        return mSpriteShader;
    };
    var getLineShader = function() {
        return mLineShader;
    };
    var getLightShader = function() {
        return mLightShader;
    };
    var getIllumShader = function() {
        return mIllumShader;
    };
    var getShadowReceiverShader = function() {
        return mShadowReceiverShader;
    };
    var getShadowCasterShader = function() {
        return mShadowCasterShader;
    };
    var getDefaultFont = function() {
        return kDefaultFont;
    };
    var getGlobalAmbientIntensity = function() {
        return mGlobalAmbientIntensity;
    };
    var setGlobalAmbientIntensity = function(v) {
        mGlobalAmbientIntensity = v;
    };
    var getGlobalAmbientColor = function() {
        return mGlobalAmbientColor;
    };
    var setGlobalAmbientColor = function(v) {
        mGlobalAmbientColor = vec4.fromValues(v[0], v[1], v[2], v[3]);
    };
    
    //callback function after loadings are done
    var _createShaders = function(callbackFunction) {
        gEngine.ResourceMap.setLoadCompleteCallback(null);
        mConstColorShader = new SimpleShader(kSimpleVS, kSimpleFS);
        mTextureShader = new TextureShader(kTextureVS, kTextureFS);
        mSpriteShader = new SpriteShader(kTextureVS, kTextureFS);
        mLineShader = new LineShader(kSimpleVS, kLineFS);
        mLightShader = new LightShader(kTextureVS, kLightFS);
        mIllumShader = new IllumShader(kTextureVS, kIllumFS);
        mShadowReceiverShader = new SpriteShader(kTextureVS, kShadowReceiverFS);
        mShadowCasterShader = new ShadowCasterShader(kTextureVS, kShadowCasterFS);
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
        
        //line shader:
        gEngine.TextFileLoader.loadTextFile(kLineFS, gEngine.TextFileLoader.eTextFileType.eTextFile);
        
        //light shader:
        gEngine.TextFileLoader.loadTextFile(kLightFS, gEngine.TextFileLoader.eTextFileType.eTextFile);
        
        //illum shader:
        gEngine.TextFileLoader.loadTextFile(kIllumFS, gEngine.TextFileLoader.eTextFileType.eTextFile);
        
        //shadow shaders
        gEngine.TextFileLoader.loadTextFile(kShadowReceiverFS, gEngine.TextFileLoader.eTextFileType.eTextFile);
        gEngine.TextFileLoader.loadTextFile(kShadowCasterFS, gEngine.TextFileLoader.eTextFileType.eTextFile);
        //load default font
        gEngine.Fonts.loadFont(kDefaultFont);
        
        gEngine.ResourceMap.setLoadCompleteCallback(function() {_createShaders(callbackFunction);});
    };
    
    var cleanUp = function() {
        mConstColorShader.cleanUp();
        mTextureShader.cleanUp();
        mSpriteShader.cleanUp();
        mLineShader.cleanUp();
        mLightShader.cleanUp();
        mIllumShader.cleanUp();
        mShadowCasterShader.cleanUp();
        mShadowReceiverShader.cleanUp();
        
        gEngine.TextFileLoader.unloadTextFile(kSimpleVS);
        gEngine.TextFileLoader.unloadTextFile(kSimpleFS);
        gEngine.TextFileLoader.unloadTextFile(kTextureVS);
        gEngine.TextFileLoader.unloadTextFile(kTextureFS);
        gEngine.TextFileLoader.unloadTextFile(kLineFS);
        gEngine.TextFileLoader.unloadTextFile(kLightFS);
        gEngine.TextFileLoader.unloadTextFile(kIllumFS);
        gEngine.TextFileLoader.unloadTextFile(kShadowReceiverFS, gEngine.TextFileLoader.eTextFileType.eTextFile);
        gEngine.TextFileLoader.unloadTextFile(kShadowCasterFS, gEngine.TextFileLoader.eTextFileType.eTextFile);
        
        //default font
        gEngine.Fonts.unloadFont(kDefaultFont);
    };
    
    var mPublic = {
        initialize: _initialize,
        getConstColorShader: _getConstColorShader,
        getTextureShader: getTextureShader,
        getSpriteShader: getSpriteShader,
        getLineShader: getLineShader,
        getLightShader: getLightShader,
        getIllumShader: getIllumShader,
        getShadowReceiverShader: getShadowReceiverShader,
        getShadowCasterShader: getShadowCasterShader,
        getDefaultFont: getDefaultFont,
        getGlobalAmbientColor: getGlobalAmbientColor,
        setGlobalAmbientColor: setGlobalAmbientColor,
        getGlobalAmbientIntensity: getGlobalAmbientIntensity,
        setGlobalAmbientIntensity: setGlobalAmbientIntensity,
        cleanUp: cleanUp
    };
    return mPublic;
}());
