/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function ShadowReceiver(theReceiverObject) {
    this.kShadowStencilBit = 0x01;
    this.kShadowStencilMask = 0xFF;
    this.mReceiverShader = gEngine.DefaultResources.getShadowReceiverShader();
    
    this.mReceiver = theReceiverObject;
    
    this.mShadowCaster = [];
}

ShadowReceiver.prototype.addShadowCaster = function(lgtRenderable) {
    var c = new ShadowCaster(lgtRenderable, this.mReceiver);
    this.mShadowCaster.push(c);
};

ShadowReceiver.prototype.draw = function(aCamera) {
    var c;
    
    //A: Draw receiver as a regular renderable
    this.mReceiver.draw(aCamera);
    
    this._shadowRecieverStencilOn();
    var s = this.mReceiver.getRenderable().swapShader(this.mReceiverShader);
    this.mReceiver.draw(aCamera);
    this.mReceiver.getRenderable().swapShader(s);
    this._shadowRecieverStencilOff();
    
    //now draw shadow color to the pixels in the stencil that is switched on
    for(c = 0; c < this.mShadowCaster.length; c++) {
        this.mShadowCaster[c].draw(aCamera);
    }
    //switch off stencil checking
    this._shadowRecieverStencilDisable();
};
