export function Camera(player) {

    this.x = 0;
    this.y = 0;
    this.player = player;
    
    this.updatePosition = function(screen_width, game_width) {

        if (game_width - this.player.x < screen_width / 2) {
            this.x = this.player.x - (screen_width - (game_width - this.player.x));
            return;
        }
        
        if (this.player.x >= screen_width / 2) {
            this.x = this.player.x - screen_width / 2;
        } 
    }

}