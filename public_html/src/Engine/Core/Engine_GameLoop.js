/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var gEngine = gEngine || {};

gEngine.GameLoop = (function() {
    var kFPS = 60;         //Frames per second
    var kMPF = 1000/kFPS;  //Milleseconds per frame
    
    //Variables for timing gameloop
    var mPreviousTime;
    var mLagTime;
    var mCurrentTime;
    var mElapsedTime;
    //The current loop state (running of should stop)
    var mIsLoopRunning = false;
    //Reference to game logic
    var mMyGame = null;
    
    //This function assumes it is sub-classed from MyGame
    var _runLoop = function() {
        if(mIsLoopRunning) {
            //Set up for next call to _runLoop and update input
            requestAnimationFrame(function() {_runLoop.call(mMyGame); });
            //Compute elapsed time since last RunLoop was executed
            mCurrentTime = Date.now();
            mElapsedTime = mCurrentTime - mPreviousTime;
            mPreviousTime = mCurrentTime;
            mLagTime += mElapsedTime;
            //Update the game the appropriate number of times
                //Update only every Milliseconds per frame
                //If lag larger then update frames, update until caught up
            while((mLagTime >= kMPF) && mIsLoopRunning) {
                gEngine.Input.update();
                this.update();
                mLagTime -= kMPF;
            }
            //Now let's draw!
            this.draw();  //Call MyGame.draw()
        } else {
            //the game loop has stopped, unload current scene
            mMyGame.unloadScene();
        }
    };
    
    var _startLoop = function() {
        //Reset frame time
        mPreviousTime = Date.now();
        mLagTime = 0.0;
        //Remember that loop is now running
        mIsLoopRunning = true;
        //Request _runLoop to start when loading is done
        requestAnimationFrame(function() {_runLoop.call(mMyGame);});
    }
    
    var start = function(myGame) {
        mMyGame = myGame;
        gEngine.ResourceMap.setLoadCompleteCallback(
                function() {
                    mMyGame.initialize();
                    _startLoop();
                });
    };
    var stop = function() {
        mIsLoopRunning = false;
    };
    
    var mPublic = {
        start: start,
        stop: stop
    };
    return mPublic;
} ());
