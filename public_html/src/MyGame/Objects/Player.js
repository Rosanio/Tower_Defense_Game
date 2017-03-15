/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function Player() {
    this.health = 100;
    this.meat = 10;
}

Player.prototype.getHealth = function() {
    return this.health;
};
Player.prototype.setHealth = function(h) {
    this.health = h;
};
Player.prototype.incHealthBy = function(delta) {
    this.health += delta;
};
Player.prototype.getMeat = function() {
    return this.meat;
};
Player.prototype.incMeatBy = function(delta) {
    this.meat += delta;
};
