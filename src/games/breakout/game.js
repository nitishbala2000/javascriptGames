import { Tile } from "./tile.js";
import { Bat } from "./bat.js"
import { Ball } from "./ball.js";




var WIDTH = 500;
var HEIGHT = 500;
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
    canvas = null;

    constructor() {

        let myCanvas = document.getElementById("breakoutCanvas");
        
        this.context = this.canvas.getContext("2d");
        this.context.font = "20px calibri";

        this.state = "notStarted";

        myCanvas.onclick = function () {
            if (this.state !== "notStarted") {
                this.initialiseGame();
                this.state = "running";
            }
        }



        this.intervalVar = setInterval(() => {

            let context = this.context;

            switch (this.state) {
                case "notStarted": {
                    context.clearRect(0, 0, WIDTH, HEIGHT);
                    context.font = "20px calibri";
                    context.fillText("Click here to start the game", 230, 250);
                    break;
                }

                case "running": {
                    this.gameLoop();
                    break;
                }

                case "won": {
                    context.clearRect(0, 0, WIDTH, HEIGHT);
                    context.fillText("Well done, you won!", 160, 250);
                } 

                default: {
                    //lost
                    context.clearRect(0, 0, WIDTH, HEIGHT);
                    context.fillText("Well done, you won!", 160, 250);
                    context.fillText("Game Over, your score was " + this.score, 160, 250);
                }
            }
          
        }, 100);
    }

    gameLoop() {

        let context = this.context;

        context.clearRect(0, 0, WIDTH, HEIGHT);

        context.fillText("Score: " + this.score, 5, 480);
        context.fillText("Lives: " + this.lives, 430, 480);

        for (var i = 0; i < this.tiles.length; i++) {
            this.tiles[i].draw(context);
        }

        this.bat.draw(context);
        this.ball.draw(context);

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

        this.ball = new Ball(ballRadius, ballSpeed);

        this.score = 0;
        this.lives = 3;
    }

    stopGame() {
        if (this.intervalVar) {
            clearInterval(this.intervalVar);
        }
    }
    
}

