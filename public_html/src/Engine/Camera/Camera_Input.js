/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Camera.prototype._mouseDCX = function() {
    return gEngine.Input.getMousePosX() - this.mViewport[Camera.eViewport.eOrgX];
};
Camera.prototype._mouseDCY = function() {
    return gEngine.Input.getMousePosY() - this.mViewport[Camera.eViewport.eOrgY];
};

Camera.prototype.isMouseInViewport = function() {
    var dcX = this._mouseDCX();
    var dcY = this._mouseDCY();
    return ((dcX >= 0) && (dcX < this.mViewport[Camera.eViewport.eOrgWidth]) && 
            (dcY >= 0) && (dcY < this.mViewport[Camera.eViewport.eOrgHeight]));
};

Camera.prototype.mouseWCX = function() {
    var minWCX = this.getWCCenter()[0] - this.getWCWidth() / 2;
    return minWCX + (this._mouseDCX() * (this.getWCWidth() / this.mViewport[Camera.eViewport.eOrgWidth]))
}

Camera.prototype.mouseWCY = function() {
    var minWCY = this.getWCCenter()[1] - this.getWCHeight() / 2;
    return minWCY + (this._mouseDCY() * (this.getWCHeight() / this.mViewport[Camera.eViewport.eOrgHeight]));
};