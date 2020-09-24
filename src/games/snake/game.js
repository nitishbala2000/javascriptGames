import {Snake} from "./snake.js";
import {Food} from "./food.js";



export const SCREEN_WIDTH = 500;
export const SCREEN_HEIGHT = 500;


const snakeCellInfo = {
    width: 10,
    height: 10,
    color: "green"
};

const foodCellInfo = {
    width: 10,
    height: 10,
    color: "orange"
};


export class SnakeGame {

    snake = null;
    food = null;
    running = null;
    score = null;
    interval = null;
    timeoutVar = null;


    constructor() {

        let myCanvas = document.querySelector("canvas");
        myCanvas.style.backgroundColor = "white";
        myCanvas.style.backgroundImage = "none";

        this.context = myCanvas.getContext("2d");
        this.context.font = "20px calibri";

        this.state = "notStarted";

        myCanvas.onclick = () => {
            if (this.state !== "running") {
                this.initialiseGame();
                this.state = "running";
            }
        }

        this.interval = 100;
        this.timeoutVar = setTimeout(this.timeoutLoop, this.interval);

    }

    timeoutLoop = () => {

        switch (this.state) {
            case "notStarted" : {
                this.context.save();
                this.context.clearRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
                this.context.font = "20ox calibri";
                this.context.fillText("Click to start",200,30);
                this.context.restore();
                break;
            }

            case "running" : {
                this.gameLoop();
                break;
            }

            case "lost" : {
                this.context.save();
                this.context.clearRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
                this.drawGame();
                this.context.font = "30px calibri";
                this.context.fillStyle = "red";
                this.context.fillText("Game Over, your score was " + this.score, 0, 240);
                this.context.fillStyle = "black";
                this.context.fillText("Click to start again", 0, 270);
                this.context.restore();
                break;
            }


        }

        this.timeoutVar = setTimeout(this.timeoutLoop, this.interval);


    }


    drawGame = () => {
        this.context.fillText("Score: " + this.score, 430,30);
        this.snake.draw(this.context);
        this.food.draw(this.context);
    }

    gameLoop = () => {
        this.context.clearRect(0,0,SCREEN_WIDTH,SCREEN_HEIGHT);
        this.drawGame();
    
        if (this.snake.hasEaten(this.food)) {
            this.score++;
            this.food.spawn();
            this.snake.extend();
            this.interval = Math.max(this.interval - 5, 10);
        }
    
    
        if (this.snake.hasEatenItself()) {

            //Game over
            this.state = "lost";
    
            this.interval = 100;
        } else {
            this.snake.updatePosition(SCREEN_WIDTH, SCREEN_HEIGHT);
        }
    
    }


    initialiseGame = () => {
        this.snake = new Snake([{x:220,y:200},{x:210,y:200},{x:200,y:200}], snakeCellInfo);
        this.food = new Food(foodCellInfo);
        this.food.spawn();

        this.score = 0;
        this.interval = 100;

        document.onkeydown = event => {
    
            if (event.keyCode == 37 && this.snake.direction != "right") {
                this.snake.direction = "left";
            } else if (event.keyCode == 38 && this.snake.direction != "down") {
                this.snake.direction = "up";                
            } else if (event.keyCode == 39 && this.snake.direction != "left") {
                this.snake.direction = "right";             
            } else if (event.keyCode == 40 && this.snake.direction != "up") {
                this.snake.direction = "down";
            }
        }
        
      
    }

    stop() {
     clearTimeout(this.timeoutVar);
    }
    
}
