/**
Invade Spacers
André Neder

It's like Space Invaders, but you're the bad guy (duh). 
*/

"use strict";

let config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: `arcade`
    },
    scene: [Boot, Play]
};

let game = new Phaser.Game(config);