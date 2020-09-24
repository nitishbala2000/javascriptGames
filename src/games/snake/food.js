export function Food(foodCellInfo) {

    this.x = 0;
    this.y = 0;
    this.foodCellInfo = foodCellInfo;

    this.spawn = function() {
        //Update the position randomly and draw
        this.x = Math.random() * 485 + 5;
        this.y = Math.random() * 485 + 5;
    }

    this.draw = function(context) {
        context.save();
        context.fillStyle = this.foodCellInfo.color;
        context.fillRect(this.x,this.y,this.foodCellInfo.width,this.foodCellInfo.height);
        context.restore();
    }
}