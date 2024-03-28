/**
Invade Spacers
André Neder

It's like Space Invaders, but you're the bad guy (duh). The objective is to either destroy the attacker
ship by shooting at it or to arrive at the Y line to pass it. This game lets the player resist the
destruction of the armada and invade the planet. This is an attempt to give the player the experience
of playing the other side of the classic game.
Instead of destroying the enemy ship, hitting it with a bullet will only stun it.
The player can shoot with any ship and even with all at once, but there is a cooldown of three
sescods per invader to shoot.
*/

"use strict";

let loseGame = false;
let winGame = false;

let config = {
    type: Phaser.AUTO,
    width: 1200,
    height: 1000,
    physics: {
        default: `arcade`
    },
    scene: [Boot, Start, Play, End, Starfield]
};

let game = new Phaser.Game(config);