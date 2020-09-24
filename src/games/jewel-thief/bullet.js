export function Bullet(x, y, vx, vy, colour) {
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.size = 5;
    this.colour = colour;

    this.updatePosition = function() {
        this.x += this.vx;
        this.y += this.vy;
    }

    this.draw = function(context, camera) {
        context.save();
        context.fillStyle = this.colour;
        context.fillRect(this.x - camera.x,this.y - camera.y,this.size,this.size);
        context.restore();
    }
}