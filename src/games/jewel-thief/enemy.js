import {Bullet} from "./bullet.js";
import {SCREEN_WIDTH,SCREEN_HEIGHT,GAME_WIDTH, GAME_HEIGHT} from "./game.js";
import { collided } from "./functions.js";

function overLap(range1, range2) {
    return Math.max(range1[0],range2[0]) <= Math.min(range1[1],range2[1]);
}

export function Enemy() {

    this.x = Math.random() * (GAME_WIDTH - 400);
    this.y = Math.random() * GAME_HEIGHT;
    this.shape = Math.random() < 0.5 ? "circle" : "square";
    this.state = "idle";
    this.periodsSurprised = 0;
    
    this.size = 50;
    this.vx = 0;
    this.vy = 0;
    this.bulletList = [];
    this.num_intervals_seen_player = 0;

    this.updatePosition = function(player) {

        if (this.distanceFrom(player) > 100) {
             //move towards player
            let delY = player.y - this.y;
            let delX = player.x - this.x;
            let dx = delX > 0 ? 1 : -1;
            let dy = (delY / delX) * dx;

            let speed = Math.sqrt(dx * dx + dy * dy);
            //Scale so the speed is 20
            let sf = 2 / speed;

            dx *= sf;
            dy *= sf;

            

            this.x += dx;
            this.y += dy;

        }

        //Update bullet positions too
        for (var i = 0; i < this.bulletList.length; i++) {
            this.bulletList[i].updatePosition();
        }
       
    }

    this.draw = function(context, camera) {
        context.save();
        context.fillStyle = "#16A085";
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

        if (this.state == "surprised") {
            context.fillStyle = "red";
            context.font = "50px Arial";
            context.fillText("!", x + this.size / 2 - 5, y - 5);
        }

        //Draw all of the bullets too
        for (var i = 0; i < this.bulletList.length; i++) {
            this.bulletList[i].draw(context, camera);
        }

        context.restore();
    }

    this.canSee = function(other) {
        //Retuns true if both this and other are visible on the screen
        return this.distanceFrom(other) < (SCREEN_WIDTH / 2);
    }

    this.shoot = function(player) {

        this.num_intervals_seen_player++;
        if (this.num_intervals_seen_player == 50) {
            let delY = player.y - this.y;
            let delX = player.x - this.x;
    
            let vx = delX > 0 ? 1 : -1;
            let vy = (delY / delX) * vx;
            let speed = Math.sqrt(vx * vx + vy * vy);
            //Scale so the speed is 20
            let sf = 10 / speed;
    
            vx *= sf;
            vy *= sf;
    
            this.bulletList.push(new Bullet(this.x + this.size/2, this.y + this.size/2,vx,vy, "green"));
            this.num_intervals_seen_player = 0;
        }
      

    }

    this.distanceFrom = function(player) {
        let delY = player.y - this.y;
        let delX = player.x - this.x;
        return Math.sqrt(delX * delX + delY * delY);
    }

    this.updateState = function(player, enemies) {
        if (this.state == "attacking") {
            return;
        }

        if (this.state == "surprised") {
            this.periodsSurprised++;
            if (this.periodsSurprised == 100) {
                this.state = "attacking";
                return;
            }
        }

        //Idol state, check to see if we should transition to surprised
        if (this.canSee(player) && this.shape != player.shape) {
            this.state = "surprised";
            return;
        }

        for (var i = 0; i < enemies.length; i++) {
            let e = enemies[i];
            if (!Object.is(this,e) && this.canSee(e) && e.state == "attacking") {
                this.state = "surprised";
                return;
            }
        }

    }

    this.hasShot = function(player) {

        var indicesToRemove = [];
        var output = false;
        for (var i = 0; i < this.bulletList.length; i++) {
            let bullet = this.bulletList[i];
            if (collided(bullet, player)) {
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