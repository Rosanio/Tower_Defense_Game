/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function Player() {
    this.health = 100;
    this.gold = 0;
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
Player.prototype.getGold = function() {
    return this.gold;
};
Player.prototype.incGoldBy = function(delta) {
    this.gold += delta;
};
