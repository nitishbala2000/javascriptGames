import { Food } from "./food.js"
import { Catcher } from "./catcher.js"
import { Tile } from "./tile.js"
import { getImage, drawObject, collided } from "./utils.js";
import background from "./images/background.jpg";
import catcher1 from "./images/catcher1.png";
import catcher2 from "./images/catcher2.png";
import tile from "./images/tile.png";
import food from "./images/food.png";

export const SCREEN_WIDTH = 500;
export const SCREEN_HEIGHT = 500;


const catcherOneImg = getImage(catcher1);
const catcherTwoImg = getImage(catcher2);
const tileImg = getImage(tile);
const foodImg = getImage(food);



export class CupcakeCatcherGame {

    score = null;
    level = null;
    animation = null;
    foodItem = null;
    tileList = null;
    catcher = null;
    intervalVar = null;
    state = null;


    constructor() {

        let myCanvas = document.querySelector("canvas");
        myCanvas.style.backgroundImage = "url(\'" + background + "\')";

        this.context = myCanvas.getContext("2d");
        this.context.font = "15px Arial";
        this.context.fillStyle = "white";


        this.state = "notStarted";

        myCanvas.onclick = () => {
            if (this.state !== "running") {
                this.initialiseGame();
                this.state = "running";
            }
        }



        this.intervalVar = setInterval(() => {


            switch (this.state) {
                case "notStarted": {
                    this.context.clearRect(0, 0, 500, 500);
                    this.context.save();
                    this.context.font = "30px Aerial";
                    this.context.fillText("Click here to start game", 110, 250);
                    this.context.restore();
                    break;
                } case "running": {
                    this.gameLoop();
                    break;
                } case "lost": {
                    this.context.save();
                    this.context.clearRect(0, 0, 500, 500);
                    this.context.font = "30px Aerial";
                    this.context.fillText("Game over! Click to start again", 100, 250);
                    this.context.restore();
                    break;
                }

            }

        }, 10);
    }

    gameLoop() {
        this.context.clearRect(0, 0, 500, 500);


        this.context.fillText("Level " + this.level, 10, 30);
        this.context.drawImage(foodImg, 410, 10, 30, 30);
        this.context.fillText(this.score, 450, 30)

        if (this.animation == 0) {
            drawObject(this.context, catcherTwoImg, this.catcher);
            this.animation = 1;
        } else {
            drawObject(this.context, catcherOneImg, this.catcher);
            this.animation = 0;
        }

        drawObject(this.context, foodImg, this.foodItem);

        for (var i = 0; i < this.tileList.length; i++) {
            drawObject(this.context, tileImg, this.tileList[i]);
        }


        if (collided(this.catcher, this.foodItem)) {
            this.foodItem = new Food();
            this.score++;
            if (this.score % 5 == 0) {
                this.level++;
                this.foodItem.speedUp();
            }
        } else {
            let tileToRemove = -1;
            for (var i = 0; i < this.tileList.length; i++) {
                if (collided(this.foodItem, this.tileList[i])) {
                    tileToRemove = i;
                    break;
                }
            }

            if (tileToRemove != -1) {
                this.tileList.splice(tileToRemove, 1);
                this.foodItem.respawn();
            }
        }


        if (this.catcher.y >= 500 || this.foodItem.y >= 500) {
            this.state = "lost";
        }


        this.catcher.updatePosition(this.tileList);
        this.foodItem.moveDown();
    }


    initialiseGame() {
        this.score = 0;
        this.level = 1;
        this.catcher = new Catcher();


        this.animation = 0;
        this.foodItem = new Food();
        this.tileList = [];

        for (var i = 0; i < 10; i++) {
            let t = new Tile(i * 50, 400);
            this.tileList.push(t);
        }

        document.onkeydown = event => {
            if (event.keyCode == 37) {
                this.catcher.startMovingLeft();

            } else if (event.keyCode == 39) {
                this.catcher.startMovingRight();
            } else if (event.keyCode == 38) {
                this.catcher.startJumping();
            }
        }

        document.onkeyup = event => {
            if (event.keyCode == 37 || event.keyCode == 39) {
                this.catcher.stopMovingX();
            }
        }

    }

    stop() {
        if (this.intervalVar) {
            clearInterval(this.intervalVar);
        }
    }

}

