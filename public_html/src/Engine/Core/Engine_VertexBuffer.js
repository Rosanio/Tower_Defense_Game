/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

"use strict";

var gEngine = gEngine || { };

//The VertexBuffer object
gEngine.VertexBuffer = (function() {
    //First: define the verticies for a square
    var verticiesOfSquare = [
        0.5, 0.5, 0.0,
        -0.5, 0.5, 0.0,
        0.5, -0.5, 0.0,
        -0.5, -0.5, 0.0
    ];
    //Second: define the corresponding texture coordinates
    var textureCoordinates = [
        1.0, 1.0,
        0.0, 1.0,
        1.0, 0.0,
        0.0, 0.0
    ];
    
    //reference to the vertex positions for the square in the gl context
    var mSquareVertexBuffer = null;
    //reference to the texture positions for the square vertices in the gl context
    var mTextureCoordBuffer = null;
    
    var initialize = function() {
        var gl = gEngine.Core.getGL();
        
        //Allocate and store verteex positions into the webGL context
        //Create a Buffer on the gGL context for our vertex positions
        mSquareVertexBuffer = gl.createBuffer();
        
        //Activate vertexBuffer
        gl.bindBuffer(gl.ARRAY_BUFFER, mSquareVertexBuffer);
        
        //Loads verticiesOfSquare into the veretxBuffer
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(verticiesOfSquare), gl.STATIC_DRAW);
        
        //Allocate and store texture coordinates
        //Create a buffer on the gGL context for our vertex positions
        mTextureCoordBuffer = gl.createBuffer();
        
        //Activate vertexBuffer
        gl.bindBuffer(gl.ARRAY_BUFFER, mTextureCoordBuffer);
        
        //Loads verticesOfSquare into the vertexBuffer
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(textureCoordinates), gl.STATIC_DRAW);
    };
    
    var getGLVertexRef = function() { return mSquareVertexBuffer; };
    var getGLTexCoordRef = function() {
        return mTextureCoordBuffer;
    };
    
    var cleanUp = function() {
        var gl = gEngine.Core.getGL();
        gl.deleteBuffer(mSquareVertexBuffer);
        gl.deleteBuffer(mTextureCoordBuffer);
    };
    
    var mPublic = {
        initialize: initialize,
        getGLVertexRef: getGLVertexRef,
        getGLTexCoordRef: getGLTexCoordRef,
        cleanUp: cleanUp
    };
    return mPublic;
}());
