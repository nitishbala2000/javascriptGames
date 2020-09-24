import {Snake} from "./snake.js";
import {Food} from "./food.js";

var canvas = document.getElementById("snakeCanvas");
var context = canvas.getContext("2d");
context.font = "20ox calibri";
context.fillText("Click to start",200,30);

var WIDTH = canvas.width;
var HEIGHT = canvas.height;

var snake,food,running,score,interval;

var snakeCellInfo = {
    width: 10,
    height: 10,
    color: "green"
};

var foodCellInfo = {
    width: 10,
    height: 10,
    color: "orange"
};

document.onkeydown = function(event) {
    
    if (event.keyCode == 37 && snake.direction != "right") {
        snake.direction = "left";
    } else if (event.keyCode == 38 && snake.direction != "down") {
        snake.direction = "up";                
    } else if (event.keyCode == 39 && snake.direction != "left") {
        snake.direction = "right";             
    } else if (event.keyCode == 40 && snake.direction != "up") {
        snake.direction = "down";
    }
}

function gameLoop() {
    context.clearRect(0,0,WIDTH,HEIGHT);
    context.fillText("Score: " + score, 430,30);
    context.fillText("Frames per second: " + (1000/interval), 380, 40)
    snake.draw(context);
    food.draw(context);

    if (snake.hasEaten(food)) {
        score++;
        food.spawn();
        snake.extend();
        interval = Math.max(interval - 5, 10);
    }


    if (snake.hasEatenItself()) {
        running = false;

        //Game over message
        context.save();
        context.font = "30px calibri";
        context.fillStyle = "red";
        context.fillText("Game Over, your score was " + score, 0, 240);
        context.fillStyle = "black";
        context.fillText("Click to start again", 0, 270);
        context.restore();
    }

    snake.updatePosition(WIDTH,HEIGHT);
    if (running) {
        setTimeout(gameLoop, interval);
    }
}


canvas.onclick = function() {
    if (!running) {
        //Initialise game
        running = true;
        snake = new Snake([{x:220,y:200},{x:210,y:200},{x:200,y:200}], snakeCellInfo);
        food = new Food(foodCellInfo);
        food.spawn();

        score = 0;
        interval = 100;

        gameLoop();
       
    }

        // var intervalVar = setInterval(function() {
        //     context.clearRect(0,0,WIDTH,HEIGHT);
        //     context.fillText("Score: " + score, 430,30);
        //     snake.draw(context);
        //     food.draw(context);

        //     if (snake.hasEaten(food)) {
        //         score++;
        //         food.spawn();
        //         snake.extend();

        //     }


        //     if (snake.hasEatenItself()) {
        //         running = false;
        //         context.fillText("Game Over, your score was " + score + ", click to continue", 200, 30);
        //         clearInterval(intervalVar);
        //     }

        //     snake.updatePosition(WIDTH,HEIGHT);


        // }, 80);
}
