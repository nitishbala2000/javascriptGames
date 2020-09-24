import {Player} from "./player.js";
import { Camera } from "./camera.js";
import { Jewel } from "./jewel.js";
import * as Draw from "./draw.js";
import { Enemy } from "./enemy.js";


export var SCREEN_WIDTH = 1000;
export var SCREEN_HEIGHT = 600;

export var GAME_WIDTH = 5000;
export var GAME_HEIGHT = SCREEN_HEIGHT;
export var mouseX = 0, mouseY = 0;

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

export class JewelThiefGame {

    player = null;
    camera = null;
    randomPixels = null;
    jewel = null;
    enemies = null;
    lives = null;
    state = null;
    intervalVar = null;
    context = null;
    num_intervals_seen = null;


    constructor() {

        let myCanvas = document.querySelector("canvas");
        myCanvas.style.backgroundColor = "#E67E22"
        this.context = myCanvas.getContext("2d");
        this.state = "Start";

        myCanvas.onclick = e => {
            var x = e.clientX - myCanvas.getBoundingClientRect().left;
            var y = e.clientY - myCanvas.getBoundingClientRect().top;
            if (this.state == "Start") {
                if (x >= 400 && x <= 600 && y >= 430 && y <= 480) {
                    this.state = "Instructions";
                }
            } else if (this.state == "Instructions") {
                if (x >= 750 && x <= 950 && y >= 500 && y <= 550 ) {
                    this.state = "Controls";
                }
            } else if (this.state == "Controls") {
                if (x >= 750 && x <= 950 && y >= 500 && y <= 550 ) {
                    this.state = "Game";
                    this.initialiseGame();
                }
            } else if (this.state == "Won" || this.state == "Lost") {
                if (x >= 400 && x <= 600 && y >= 300 && y <= 350) {
                    //Play again button clicked
                    this.state = "Game";
                    this.initialiseGame();
                } else if (x >= 400 && x <= 600 && y >= 400 && y <= 450) {
                    this.state = "Start";
                }
            }
        }

        myCanvas.onmousemove = e => {
            mouseX = e.clientX - myCanvas.getBoundingClientRect().left;
            mouseY =  e.clientY - myCanvas.getBoundingClientRect().top;
        }
        
      
        this.intervalVar = setInterval(() => {

            switch (this.state) {
                case "Start" : {
                    Draw.drawStart(this.context);
                    break;
                } case "Instructions" : {
                    Draw.drawInstructions(this.context);
                    break;
                } case "Controls" : {
                    Draw.drawControls(this.context);
                    break;
                } case "Game" : {
                    this.gameLoop();
                    break;
                } case "Won": {
                    Draw.drawWinPage(this.context, this.camera, this.player, this.jewel, this.randomPixels, this.enemies, this.lives);
                    break;
                } case "Lost": {
                    Draw.drawLossPage(this.context, this.camera, this.player, this.jewel, this.randomPixels, this.enemies, this.lives);
                    break;
                }
            }

        }, 20);
    }

    initialiseGame() {
        
        this.num_intervals_seen = 0;

        this.player = new Player();

        this.camera = new Camera(this.player);
        this.camera.updatePosition();
    
        this.randomPixels = [];
        for (var i = 0; i < 50; i++) {
            this.randomPixels.push({x : Math.random() * GAME_WIDTH, y : Math.random() * GAME_HEIGHT});
        }
    
        this.jewel = new Jewel(GAME_WIDTH,GAME_HEIGHT);
    
    
        this.enemies = [];
        for (var i = 0; i < 25; i++) {
            this.enemies.push(new Enemy());
        }
    
        this.lives = 5;

        document.onkeydown = e => {
        
            switch(e.keyCode) {
                case 37:
                    //left
                    this.player.vx = -5;
                    break;
                case 38:
                    //up
                    this.player.vy = 5;
                    break;
                case 39:
                    //right
                    this.player.vx = 5;
                    break;
                case 40:
                    //down
                    this.player.vy = -5;
                    break;
                case 32:
                    //space
                    this.player.toggleShape();
                    break;
                case 79:
                    //o
                    this.player.shootLeft();
                    break;
                case 80:
                    //p
                    this.player.shootRight();
                    break;
            }
           
        }
        
        document.onkeyup = e => {
            if (e.keyCode == 37 || e.keyCode == 39) {
                this.player.vx = 0;
            } else if (e.keyCode == 38 || e.keyCode == 40) {
                this.player.vy = 0;
            }
        }
    }

    gameLoop() {
        Draw.drawEverything(this.context, this.camera, this.player, this.jewel, this.randomPixels, this.enemies, this.lives);

        if (this.player.caughtJewel(this.jewel)) {
            this.state = "Won";
        }
        
        //The enemies to kill off
        let indicesToRemove = [];
    
        for (var i = 0; i < this.enemies.length; i++) {
            let e = this.enemies[i];
            if (this.player.hasShot(e)) {
                indicesToRemove.push(i);
                continue;
            }
    
            e.updateState(this.player, this.enemies);
    
    
            if (e.state == "attacking") {
                e.shoot(this.player);
                e.updatePosition(this.player);
            }
    
            if (e.hasShot(this.player)) {
                this.lives--;
                if (this.lives == 0) {
                    this.state = "Lost";
                }
            }        
    
        }
    
        for (var i = 0; i < indicesToRemove.length; i++) {
            this.enemies.splice(indicesToRemove[i], 1);
        }
    
        this.player.updatePosition(GAME_WIDTH,GAME_HEIGHT);
        this.camera.updatePosition(SCREEN_WIDTH, GAME_WIDTH);
    }

    stop() {
        if (this.intervalVar) {
            clearInterval(this.intervalVar);
        }
    }
    
}



