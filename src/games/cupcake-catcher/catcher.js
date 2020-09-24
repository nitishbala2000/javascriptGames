import {collided} from "./utils.js";

function overLap(range1, range2) {
    return Math.max(range1[0],range2[0]) <= Math.min(range1[1],range2[1]);
}


export function Catcher() {
    this.x = 100;
    this.y = 350;
    this.width = 20;
    this.height = 50;
    
    this.jumping = false;
    this.timeJumped = 0;

    this.falling = false;
    this.timeFalling = 0;

    this.falling = false;
    this.timeFalling = 0;

    this.vx = 0;
    this.vy = 4;


    this.startJumping = function() {
        if (!this.jumping) {
            this.jumping = true;
        }
        
    }

    this.stopJumping = function() {
        this.jumping = false;
        this.timeJumped = 0;
    }

    this.startFalling = function() {
        this.falling = true;
    }

    this.collideWithATile = function(tileList) {
        for (var i = 0; i < tileList.length; i++) {
            if (collided(this, tileList[i])) {
                return true;
            }
        }

        return false;
    }

    this.startMovingLeft = function() {
        this.vx = -5;
    }

    this.startMovingRight = function() {
        this.vx = 5;
    }

    this.stopMovingX = function() {
        this.vx = 0;
    }
   
  
    this.updatePosition = function(tileList) {
        this.x += this.vx;
       
        if (this.x < 0) {
            this.x = 0;
        } else if (this.x > 500 - this.width) {
            this.x = 500 - this.width;
        }

        var onATile = this.collideWithATile(tileList);

        
        if (!this.jumping && !onATile) {
            this.startFalling();
        }
        

        if (this.jumping) {
            this.timeJumped += 0.01;
            this.y -= this.vy - 9.8 * this.timeJumped;
            if (this.collideWithATile(tileList)) {
                this.stopJumping();
            }
        } else if (this.falling) {
            this.timeFalling += 0.01;
            this.y += 9.8 * this.timeFalling;
        }
    }


}