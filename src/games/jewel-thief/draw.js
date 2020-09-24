import {SCREEN_WIDTH,SCREEN_HEIGHT,GAME_WIDTH,mouseX, mouseY} from "./game.js";


export function drawRoundedButtonWithText(context, x,y,width,height,text,buttonColour, buttonHoverColour, textColour) {

    context.save();
     //If the mouse is within the button
     if (mouseX >= x && mouseX <= x + width && mouseY >= y && mouseY <= y + height) {
        context.fillStyle = buttonHoverColour;
    } else {
        context.fillStyle = buttonColour;
    }
    context.roundRect(x,y,width,height,20).fill();

    context.fillStyle = textColour;
    context.textAlign = "center";
    context.font = "20px Arial";
    context.fillText(text, x + width / 2, y + height / 2 + 10);

    context.restore();
}

export function drawStart(context) {
    context.save();
    context.clearRect(0,0,SCREEN_WIDTH,SCREEN_HEIGHT);
    context.textAlign = "center";
    context.font = "70px Arial";
    context.fillStyle = "#A25504";
    context.fillText("Jewel Thief", SCREEN_WIDTH/2, 250);

    context.fillStyle = "#F1C40F";
    context.fillRect(0,400,SCREEN_WIDTH,100);

    drawRoundedButtonWithText(context, 400,430,200,50,"Start Game","red","grey","white");
    context.restore();
}

export function drawInstructions(context) {
    context.save();
    context.clearRect(0,0,SCREEN_WIDTH,SCREEN_HEIGHT);
    context.textAlign = "center";
    context.font = "50px Arial";
    context.fillStyle = "white";
    context.fillText("Instructions", SCREEN_WIDTH / 2, 100);


    context.fillStyle = "#2C3E50";
    context.font = "25px calibri";
    context.fillText("You must steal the jewel hidden in the castle on the far right of the screen", SCREEN_WIDTH / 2, 150);
    context.fillText("There are two types of guards along the way", SCREEN_WIDTH / 2, 190);

    context.fillText("A guard will attack you if you are a different shape from it and go close enough", SCREEN_WIDTH / 2, 280);
    context.fillText("that the guard can see you. Or if the guard sees another guard attacking you", SCREEN_WIDTH / 2, 320);

    context.fillText("Get to the end!", SCREEN_WIDTH / 2, 400);

 
    drawRoundedButtonWithText(context, 750, 500,200,50,"Next", "#27AE60", "#2ECC71","#2C3E50" );

    context.restore();
}

export function drawControls(context) {
    context.save();
    context.clearRect(0,0,SCREEN_WIDTH,SCREEN_HEIGHT);
    context.textAlign = "center";
    context.font = "50px Arial";
    context.fillStyle = "white";
    context.fillText("Controls", SCREEN_WIDTH / 2, 100);

    context.fillStyle = "#2C3E50";
    context.font = "30px Arial";
    context.fillText("Movement", 200, 150);
    drawRoundedButtonWithText(context, 180, 170, 50,50,'\u2191', "#BDC3C7","#ECF0F1", "#2C3E50" );
    drawRoundedButtonWithText(context, 180, 230,50,50,'\u2193',"#BDC3C7","#ECF0F1", "#2C3E50"  );
    drawRoundedButtonWithText(context, 120, 230,50,50,'\u2190',"#BDC3C7","#ECF0F1", "#2C3E50"  );
    drawRoundedButtonWithText(context, 240, 230,50,50,'\u2192',"#BDC3C7","#ECF0F1", "#2C3E50"  );


    context.fillText("Shoot Bullet", 700, 150);
    context.font = "25px Arial";
    context.fillText("Left", 650, 200);
    context.fillText("Right", 750, 200);
    drawRoundedButtonWithText(context, 625,220, 50,50,"O", "#BDC3C7","#ECF0F1", "#2C3E50" );
    drawRoundedButtonWithText(context, 725,220, 50,50,"P", "#BDC3C7","#ECF0F1", "#2C3E50" );

    context.font = "30px Arial";
    context.fillText("Toggle Shape", SCREEN_WIDTH / 2, 400);
    drawRoundedButtonWithText(context, 350, 420, 300,50,"Space", "#BDC3C7","#ECF0F1", "#2C3E50" );

    drawRoundedButtonWithText(context, 750, 500,200,50,"Start", "#27AE60", "#2ECC71","#2C3E50" );

    context.restore();
}

export function drawWinPage(context, camera, player, jewel, randomPixels, enemies, lives) {
    context.clearRect(0,0,SCREEN_WIDTH,SCREEN_HEIGHT);
    context.save();
    drawEverything(context, camera, player, jewel, randomPixels, enemies, lives);
    context.fillStyle = "#2C3E50";
    context.font = "50px Arial";
    context.textAlign = "center";
    context.fillText("You Won!", SCREEN_WIDTH / 2, 200);

    drawRoundedButtonWithText(context, 400,300,200,50,"Play Again","#27AE60", "#2ECC71","white");

    drawRoundedButtonWithText(context, 400,400,200,50,"Main Menu","#27AE60", "#2ECC71","white");

    context.save();
}

export function drawLossPage(context, camera, player, jewel, randomPixels, enemies, lives) {
    context.clearRect(0,0,SCREEN_WIDTH,SCREEN_HEIGHT);
    context.save();
    drawEverything(context, camera, player, jewel, randomPixels, enemies, lives);
    context.fillStyle = "#2C3E50";
    context.font = "50px Arial";
    context.textAlign = "center";
    context.fillText("Game Over!", SCREEN_WIDTH / 2, 200);

    drawRoundedButtonWithText(context, 400,300,200,50,"Play Again","#27AE60", "#2ECC71","white");

    drawRoundedButtonWithText(context, 400,400,200,50,"Main Menu","#27AE60", "#2ECC71","white");

    context.save();
}

function drawPixel(context, p, camera) {
    context.save();
    context.fillStyle = "#AE6A30";
    context.fillRect(p.x - camera.x, p.y - camera.y, 5, 5);
    context.restore();
}

function drawJewel(context, camera, jewel) {
    context.save();
    //Draw the grey pillar
    var endX = GAME_WIDTH - 100;
    context.fillStyle = "grey";
    context.fillRect(endX - camera.x, 0, 100, SCREEN_HEIGHT);

    context.fillStyle = "#2C3E50";

    jewel.draw(context, camera);

    context.restore();
}

export function drawEverything(context, camera, player, jewel, randomPixels, enemies, lives) {
    lives = Math.max(lives, 0);
    context.save();
    context.clearRect(0,0, SCREEN_WIDTH, SCREEN_HEIGHT);

    context.font = "30px Arial";
    context.fillStyle = "white";
    context.textAlign = "center";
    context.fillText("Lives: " + lives, SCREEN_WIDTH / 2, 50);

    player.draw(context, camera);

    //Draw the juel and pillar in the far right
    drawJewel(context, camera, jewel);

    for (var i = 0; i < randomPixels.length; i++) {
        drawPixel(context, randomPixels[i], camera);
    }

    for (var i = 0; i < enemies.length; i++) {
        enemies[i].draw(context, camera);
    }
    context.restore();
}