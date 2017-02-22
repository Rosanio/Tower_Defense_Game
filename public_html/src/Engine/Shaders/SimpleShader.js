/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function SimpleShader(vertexShaderPath, fragmentShaderPath) {
    //instance variables
    this.mCompiledShader = null;
        //reference to the compiled shader in webgl context
    this.mShaderVertexPositionAttribute = null;
        //reference to SquareVertexPosition in shader
    this.mPixelColor = null;
    //reference to the pixelColor uniform in the fragment shader
    this.mModelTransform = null;
    this.mViewProjTransform = null;
    
    this.mGlobalAmbientColor = null;
    this.mGlobalAmbientIntensity = null;
        
    var gl = gEngine.Core.getGL();
    
    //start of constructor code
    
    //Load and compile vertex and fragment shaders
    this.mVertexShader = this._compileShader(vertexShaderPath, gl.VERTEX_SHADER);
    this.mFragmentShader = this._compileShader(fragmentShaderPath, gl.FRAGMENT_SHADER);
    
    //Create and link the shaders into a program
    this.mCompiledShader = gl.createProgram();
    gl.attachShader(this.mCompiledShader, this.mVertexShader);
    gl.attachShader(this.mCompiledShader, this.mFragmentShader);
    gl.linkProgram(this.mCompiledShader);
    
    //check for error
    if(!gl.getProgramParameter(this.mCompiledShader, gl.LINK_STATUS)) {
        alert("Error linking shader");
        return null;
    }
    
    //Gets a reference to the aSquareVertexPosition attribute
    this.mShaderVertexPositionAttribute = gl.getAttribLocation(this.mCompiledShader, "aSquareVertexPosition");
    
    //Activates the vertex buffer loaded in Engine.Core_VertexBuffer
    gl.bindBuffer(gl.ARRAY_BUFFER, gEngine.VertexBuffer.getGLVertexRef());
    
    //Describe the characteristic of the vertex position attribute
    gl.vertexAttribPointer(this.mShaderVertexPositionAttribute,
        3,            //each element is a 3-float (x,y,z)
        gl.FLOAT,     //data type is FLOAT
        false,        //if the content is normalized vectors
        0,            //number of bytes to skip in between elements
        0);           //offsets to the first element
        
    //references: uniforms: uModelTransform, uPixelColor, and uViewProjTransform
    this.mPixelColor = gl.getUniformLocation(this.mCompiledShader, "uPixelColor");
    this.mModelTransform = gl.getUniformLocation(this.mCompiledShader, "uModelTransform");
    this.mViewProjTransform = gl.getUniformLocation(this.mCompiledShader, "uViewProjTransform");
    this.mGlobalAmbientColor = gl.getUniformLocation(this.mCompiledShader, "uGlobalAmbientColor");
    this.mGlobalAmbientIntensity = gl.getUniformLocation(this.mCompiledShader, "uGlobalAmbientIntensity");
        
}
    //Returns a compiled shader form the shader in the dom
    //This id is the id of the script in the html tag
SimpleShader.prototype._compileShader = function(filePath, shaderType) {
    var shaderSource = null, compiledShader = null;
    var gl = gEngine.Core.getGL();

    //Access the shader textfile
    shaderSource = gEngine.ResourceMap.retrieveAsset(filePath);
    if(shaderSource === null) {
        alert('Warning: loading of: ' + filePath + ' failed!');
        return null;
    }

    //Create the shader based on the shader type: vertex or fragment
    compiledShader = gl.createShader(shaderType);

    //Compile the created shader
    gl.shaderSource(compiledShader, shaderSource);
    gl.compileShader(compiledShader);

    //Check for errors and return results (null if error) 
    //The log info is how shader conpilation errors are typically displayed
    //This is useful for debugging shaders
    if(!gl.getShaderParameter(compiledShader, gl.COMPILE_STATUS)) {
        alert("A shader compiling error occurred: " + gl.getShaderInfoLog(compiledShader));
    }
    return compiledShader;
};

SimpleShader.prototype.activateShader = function(pixelColor, aCamera) {
    var gl = gEngine.Core.getGL();
    gl.useProgram(this.mCompiledShader);
    gl.uniformMatrix4fv(this.mViewProjTransform, false, aCamera.getVPMatrix());
    gl.bindBuffer(gl.ARRAY_BUFFER, gEngine.VertexBuffer.getGLVertexRef());
    gl.vertexAttribPointer(this.mShaderVertexPositionAttribute, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(this.mShaderVertexPositionAttribute);
    gl.uniform4fv(this.mPixelColor, pixelColor);
    gl.uniform4fv(this.mGlobalAmbientColor, gEngine.DefaultResources.getGlobalAmbientColor());
    gl.uniform1f(this.mGlobalAmbientIntensity, gEngine.DefaultResources.getGlobalAmbientIntensity());
};

SimpleShader.prototype.getShader = function() {
    return this.mCompiledShader;
};

//Loads per-object model transform to the vertex shader
SimpleShader.prototype.loadObjectTransform = function(modelTransform) {
    var gl = gEngine.Core.getGL();
    gl.uniformMatrix4fv(this.mModelTransform, false, modelTransform);
};

SimpleShader.prototype.cleanUp = function() {
    var gl = gEngine.Core.getGL();
    gl.detachShader(this.mCompiledShader, this.mVertexShader);
    gl.detachShader(this.mCompiledShader, this.mFragmentShader);
    gl.deleteShader(this.mVertexShader);
    gl.deleteShader(this.mFragmentShader);
};