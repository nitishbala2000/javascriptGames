import {Bullet} from "./bullet.js";
import {collided} from "./functions.js";

export function Player() {

    this.x = 300;
    this.y = 300;
    this.shape = "circle";
    this.size = 50;
    this.vx = 0;
    this.vy = 0;
    this.bulletList = [];

    this.updatePosition = function(game_width, game_height) {

        this.x = Math.max(0, Math.min(this.x + this.vx, game_width - this.size));
        this.y = Math.max(0, Math.min(this.y - this.vy, game_height - this.size));

        //Update position of all of bullets
         //Draw all of the bullets too
         for (var i = 0; i < this.bulletList.length; i++) {
            this.bulletList[i].updatePosition();
        }
    }

    this.draw = function(context, camera) {
        context.save();
        context.fillStyle = "red";
        let x = this.x - camera.x;
        let y = this.y - camera.y;

        if (this.shape == "circle") {
            context.beginPath();
            let radius = this.size / 2;
            context.arc(x + radius, y + radius, radius, 0, 2 * Math.PI);
            context.fill();
        } else {
            context.fillRect(x, y, this.size, this.size );
        }

        //Draw all of the bullets too
        for (var i = 0; i < this.bulletList.length; i++) {
            this.bulletList[i].draw(context, camera);
        }

        context.restore();
    }

    this.toggleShape = function() {
        if (this.shape == "circle") {
            this.shape = "square";
        } else {
            this.shape = "circle";
        }
    }

    this.caughtJewel = function(jewel) {
        return collided(this, jewel);
    }

    this.shootRight = function() {
        this.bulletList.push(new Bullet(this.x + this.size/2, this.y + this.size/2, 20, 0, "blue"));
    }

    this.shootLeft = function() {
        this.bulletList.push(new Bullet(this.x + this.size/2, this.y + this.size/2, -20, 0, "blue"));
    }

    this.hasShot = function(enemy) {
        var indicesToRemove = [];
        var output = false;
        for (var i = 0; i < this.bulletList.length; i++) {
            let bullet = this.bulletList[i];
            if (collided(bullet, enemy)) {
                output = true;
                indicesToRemove.push(i);
            }
        }

        for (var i = 0; i < indicesToRemove.length; i++) {
            this.bulletList.splice(indicesToRemove[i], 1);
        }

        return output;

    }


}