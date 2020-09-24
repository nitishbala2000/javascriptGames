import {Food} from "./food.js"
import {Catcher} from "./catcher.js"
import {Tile} from "./tile.js"
import {getImage, drawObject, collided} from "./utils.js";

var myCanvas = document.getElementById("cupcakeCatcherCanvas");
var context = myCanvas.getContext("2d");
context.font = "15px Arial";
context.fillStyle = "white";



var catcherOneImg = getImage("images/catcher1.png");
var catcherTwoImg = getImage("images/catcher2.png");
var tileImg = getImage("images/tile.png");
var foodImg = getImage("images/food.png");

var score,level,animation,foodTimer,gameover,foodItem,tileList,catcher,intervalVar;

document.onkeydown = function(event) {
    if (event.keyCode == 37) {
        catcher.startMovingLeft();

    } else if (event.keyCode == 39) {
        catcher.startMovingRight();
    } else if (event.keyCode == 38) {
        catcher.startJumping();
    }
}

document.onkeyup = function(event) {
    if (event.keyCode == 37 || event.keyCode == 39) {
        catcher.stopMovingX();

    }
}



function startGame() {
    score = 0;
    level = 1;
    catcher = new Catcher();
    foodTimer = 0;
    gameover = false;
    animation = 0;
    foodItem = new Food();
    tileList = [];

    for (var i = 0; i < 10; i++) {
        let t = new Tile(i * 50, 400);
        tileList.push(t);
    }

    intervalVar = setInterval(gameLoop, 10);
}


function gameLoop() {
    context.clearRect(0,0,500,500);
   

    context.fillText("Level " + level, 10,30);
    context.drawImage(foodImg, 410, 10, 30,30);
    context.fillText(score, 450, 30)

    if (animation == 0) {
        drawObject(context, catcherTwoImg, catcher);
        animation = 1;
    } else {
        drawObject(context, catcherOneImg, catcher);
        animation = 0;
    }
    
    drawObject(context, foodImg, foodItem);

    for (var i = 0; i < tileList.length; i++) {
         drawObject(context, tileImg, tileList[i]);
    }


    if (collided(catcher, foodItem)) {
        foodItem = new Food();
        score++;
        if (score % 5 == 0) {
            level++;
            foodItem.speedUp();
        }
    } else {
        let tileToRemove = -1;
        for (var i = 0; i < tileList.length; i++) {
            if (collided(foodItem, tileList[i])) {
                tileToRemove = i;
                break;
            }
        }

        if (tileToRemove != -1) {
            tileList.splice(tileToRemove, 1);
            foodItem.respawn();
        }
    }


    if (catcher.y >= 500 || foodItem.y >= 500) {
        context.save();
        context.font = "30px Aerial";
        context.fillText("Game over! Click to start again", 100, 250);
        clearInterval(intervalVar);
        context.restore();
    }


    catcher.updatePosition(tileList);
    foodItem.moveDown();
}


window.onload = function () {
    context.clearRect(0,0,500,500);
    context.save();
    context.font = "30px Aerial";
    context.fillText("Click here to start game", 110,250);
    context.restore();
}

myCanvas.onclick = startGame;


