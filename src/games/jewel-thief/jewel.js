export function Jewel(game_width, game_height) {

    this.x = game_width - 200;
    this.y = (game_height - 100) / 2;
    this.size = 100;

    this.draw = function(context, camera) {
        context.save();
        context.fillStyle = "#2C3E50";
        context.fillRect(this.x - camera.x, this.y - camera.y, this.size, this.size);
        context.restore();
    }
}