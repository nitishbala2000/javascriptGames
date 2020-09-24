export function Food() {
    this.width = 40;
    this.height = 40;
    this.y = 0;
    this.x = Math.random() * 450 + 10;
    this.spd = 3;

    this.respawn = function() {
        this.y = 0;
        this.x = Math.random() * 450 + 10;
    }

    this.speedUp = function() {
        
    }

    this.moveDown = function() {
        this.y += this.spd;
    }
}