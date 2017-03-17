/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function Dog(renderable, name) {
    this.mDog = renderable;
    this.mName = name;
    GameObject.call(this, renderable);
}
gEngine.Core.inheritPrototype(Dog, GameObject);

Dog.prototype.getName = function() {
    return this.mName;
};
Dog.prototype.setName = function(n) {
    this.mName = n;
};
