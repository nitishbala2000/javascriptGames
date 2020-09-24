import {Player} from "./player.js";
import { Camera } from "./camera.js";
import { Jewel } from "./jewel.js";
import * as Draw from "./draw.js";
import { Enemy } from "./enemy.js";

export var myCanvas = document.getElementById("jewelThiefCanvas");
export var context = myCanvas.getContext("2d");

export var SCREEN_WIDTH = myCanvas.width;
export var SCREEN_HEIGHT = myCanvas.height;
export var GAME_WIDTH = 5000;
export var GAME_HEIGHT = SCREEN_HEIGHT;
export var mouseX = 0, mouseY = 0;

var state = "Start";
var player, camera, randomPixels, jewel, enemies, num_intervals_seen, lives;

CanvasRenderingContext2D.prototype.roundRect = function (x, y, w, h, r) {
    if (w < 2 * r) r = w / 2;
    if (h < 2 * r) r = h / 2;
    this.beginPath();
    this.moveTo(x+r, y);
    this.arcTo(x+w, y,   x+w, y+h, r);
    this.arcTo(x+w, y+h, x,   y+h, r);
    this.arcTo(x,   y+h, x,   y,   r);
    this.arcTo(x,   y,   x+w, y,   r);
    this.closePath();
    return this;
}



function startGame() {
    num_intervals_seen = 0;
    player = new Player();
    camera = new Camera(player);
    camera.updatePosition();

    randomPixels = [];
    for (var i = 0; i < 50; i++) {
        randomPixels.push({x : Math.random() * GAME_WIDTH, y : Math.random() * GAME_HEIGHT});
    }

    jewel = new Jewel(GAME_WIDTH,GAME_HEIGHT);


    enemies = [];
    for (var i = 0; i < 25; i++) {
        enemies.push(new Enemy());
    }

    lives = 5;
}


function gameLoop() {
    
    Draw.drawEverything(camera, player, jewel, randomPixels, enemies, lives);

    if (player.caughtJewel(jewel)) {
        state = "Won";
    }
    
    //The enemies to kill off
    let indicesToRemove = [];

    for (var i = 0; i < enemies.length; i++) {
        let e = enemies[i];
        if (player.hasShot(e)) {
            indicesToRemove.push(i);
            console.log("Shot!")
            continue;
        }

        e.updateState(player, enemies);


        if (e.state == "attacking") {
            e.shoot(player);
            e.updatePosition(player);
        }

        if (e.hasShot(player)) {
            lives--;
            if (lives == 0) {
                state = "Lost";
            }
        }        

    }

    for (var i = 0; i < indicesToRemove.length; i++) {
        enemies.splice(indicesToRemove[i], 1);
    }


        
    
    player.updatePosition(GAME_WIDTH,GAME_HEIGHT);
    camera.updatePosition(SCREEN_WIDTH, GAME_WIDTH);
}


canvas.onmousemove = function(e) {
    mouseX = e.clientX - myCanvas.getBoundingClientRect().left;
    mouseY =  e.clientY - myCanvas.getBoundingClientRect().top;
}

document.onkeydown = function(e) {

    switch(e.keyCode) {
        case 37:
            //left
            player.vx = -5;
            break;
        case 38:
            //up
            player.vy = 5;
            break;
        case 39:
            //right
            player.vx = 5;
            break;
        case 40:
            //down
            player.vy = -5;
            break;
        case 32:
            //space
            player.toggleShape();
            break;
        case 79:
            //o
            player.shootLeft();
            break;
        case 80:
            //p
            player.shootRight();
            break;
    }
   
}

document.onkeyup = function(e) {
    if (e.keyCode == 37 || e.keyCode == 39) {
        player.vx = 0;
    } else if (e.keyCode == 38 || e.keyCode == 40) {
        player.vy = 0;
    }
}



canvas.onclick = function(e) {
    var x = e.clientX - myCanvas.getBoundingClientRect().left;
    var y = e.clientY - myCanvas.getBoundingClientRect().top;
    if (state == "Start") {
        if (x >= 400 && x <= 600 && y >= 430 && y <= 480) {
            state = "Instructions";
        }
    } else if (state == "Instructions") {
        if (x >= 750 && x <= 950 && y >= 500 && y <= 550 ) {
            state = "Controls";
        }
    } else if (state == "Controls") {
        if (x >= 750 && x <= 950 && y >= 500 && y <= 550 ) {
            state = "Game";
            startGame();
        }
    } else if (state == "Won" || state == "Lost") {
        if (x >= 400 && x <= 600 && y >= 300 && y <= 350) {
            //Play again button clicked
            state = "Game";
            startGame();
        } else if (x >= 400 && x <= 600 && y >= 400 && y <= 450) {
            state = "Start";
        }
    }
}

window.onload = function() {
    
    setInterval(function() {
        if(state == "Start") {
            Draw.drawStart();
        } else if (state == "Instructions") {
            Draw.drawInstructions();
        } else if (state == "Controls") {
            Draw.drawControls();
        } else if (state == "Game") {
            gameLoop();
        } else if (state == "Won") {
            Draw.drawWinPage(camera, player, jewel, randomPixels, enemies, lives);
        } else if (state == "Lost") {
            Draw.drawLossPage(camera, player, jewel, randomPixels, enemies, lives);
        }

    }, 20);
}
    