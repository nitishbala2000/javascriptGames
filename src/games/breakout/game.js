import { Tile } from "./tile.js";
import { Bat } from "./bat.js"
import { Ball } from "./ball.js";
import * as draw from "./draw.js";



export var WIDTH = 500;
export var HEIGHT = 500;

var margin_x = 5;
var margin_y = 5;
var batY = 400;

var tileDimensions = {
    width: 44.5,
    height: 20
}

var batDimensions = {
    width: 50,
    height: 20
}

var ballRadius = 5;
var ballSpeed = 5;

export class BreakoutGame {

    bat = null;
    ball = null;
    tiles = null;
    running = null;
    score = null;
    lives = null;
    state = null;
    intervalVar = null;
    context = null;


    constructor() {

        let myCanvas = document.getElementById("breakoutCanvas");

        this.context = myCanvas.getContext("2d");
        this.context.font = "20px calibri";

        this.state = "notStarted";

        myCanvas.onclick = () => {
            if (this.state !== "running") {
                this.initialiseGame();
                this.state = "running";
            }
        }



        this.intervalVar = setInterval(() => {

            let context = this.context;

            switch (this.state) {
                case "notStarted": {
                    draw.drawStartScreen(this.context);
                    break;
                }

                case "running": {
                    this.gameLoop();
                    break;
                }

                case "won": {
                    draw.drawWinScreen(context, this.score, this.lives, this.tiles, this.bat, this.ball);
                    break;
                } 

                default: {
                    //lost
                    draw.drawLossScreen(context, this.score, this.lives, this.tiles, this.bat, this.ball);
                }
            }
          
        }, 20);
    }

    gameLoop() {

        let context = this.context;

        draw.drawGame(context, this.score, this.lives, this.tiles, this.bat, this.ball);

        this.bat.move(WIDTH);
        this.ball.updatePositionAndDirection(WIDTH, HEIGHT);

        var tileIndicesToRemove = [];
        for (var i = 0; i < this.tiles.length; i++) {
            var t = this.tiles[i];
            if (this.ball.isTouching(t)) {
                this.score++;
                this.ball.changeYDirection();
                tileIndicesToRemove.push(i);
            }
        }

        for (var i = 0; i < tileIndicesToRemove.length; i++) {
            this.tiles.splice(tileIndicesToRemove[i], 1);
        }

        if (this.tiles.length == 0) {
            //End game
            this.state = "won";
        }


        if (this.ball.isTouching(this.bat)) {
            this.ball.changeYDirection();
        }

        if (this.ball.y > HEIGHT) {
            this.lives--;
            if (this.lives == 0) {
                //End game
                this.state = "lost";
            }
        }
    }


    initialiseGame() {
        //Create tiles
        this.tiles = [];

        var x = margin_x;
        var y = margin_y;
        for (var i = 0; i < 5; i++) {
            for (var j = 0; j < 10; j++) {

                this.tiles.push(new Tile(x, y, tileDimensions));
                x += tileDimensions.width + margin_x;
            }

            x = margin_x;
            y += tileDimensions.height + margin_y;
        }

        //Create bat
        this.bat = new Bat(batDimensions, batY);

        document.onkeydown = (event) => {
            if (event.keyCode == 37) {
                this.bat.vx = -5;
            } else if (event.keyCode == 39) {
                this.bat.vx = 5;
            }
        }
        
        document.onkeyup = (event) => {
            if (event.keyCode == 37 || event.keyCode == 39) {
                this.bat.vx = 0;
            }
        }
        

        this.ball = new Ball(ballRadius, ballSpeed);

        this.score = 0;
        this.lives = 3;
    }

    stop() {
        if (this.intervalVar) {
            clearInterval(this.intervalVar);
        }
    }
    
}

