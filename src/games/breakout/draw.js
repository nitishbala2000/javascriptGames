import {WIDTH, HEIGHT} from "./game.js";

export function drawStartScreen(context) {
    context.save();
    context.clearRect(0, 0, WIDTH, HEIGHT);
    context.font = "20px calibri";
    context.fillText("Click here to start the game", 230, 250);
    context.restore();
}

export function drawGame (context, score, lives, tiles, bat, ball) {
    
    context.save();
    context.clearRect(0, 0, WIDTH, HEIGHT);

    context.fillText("Score: " + score, 5, 480);
    context.fillText("Lives: " + lives, 430, 480);

    for (var i = 0; i < tiles.length; i++) {
        tiles[i].draw(context);
    }

    bat.draw(context);
    ball.draw(context);
    context.restore();
}

export function drawWinScreen(context, score, lives, tiles, bat, ball) {
    drawGame(score, lives, tiles, bat, ball);
    context.fillText("Well done, you won!", 160, 250);
}

export function drawLossScreen(context, score, lives, tiles, bat, ball) {
    drawGame(score, lives, tiles, bat, ball);
    context.fillText("Game Over, your score was " + this.score, 160, 250);
}