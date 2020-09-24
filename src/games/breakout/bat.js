export function Bat(batDimensions, y) {

    this.x = 250;
    this.y = y;
    this.vx = 0;
    this.width = batDimensions.width;
    this.height = batDimensions.height;

    this.draw = function (context) {
        context.save();
        context.fillStyle = "red";
        context.fillRect(this.x,this.y,this.width,this.height);
        context.restore();

    }

    this.move = function(width) {
        this.x += this.vx;
        if (this.x < 0) {
            this.x = 0;
        } else if (this.x + this.width > width) {
            this.x = width - this.width;
        }
    }

}