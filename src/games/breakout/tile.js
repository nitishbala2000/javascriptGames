export function Tile(x,y, tileDimensions) {
    this.x = x;
    this.y = y;
    this.width = tileDimensions.width;
    this.height = tileDimensions.height;

    this.draw = function(context) {
        context.save();
        context.fillStyle = "orange";
        context.fillRect(this.x,this.y,this.width, this.height);
        context.restore();
    }

}