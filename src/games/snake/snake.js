function overLap(range1, range2) {
    return Math.max(range1[0],range2[0]) <= Math.min(range1[1],range2[1]);
}

export function Snake(initialList, snakeCellInfo) {
    this.snakeList = initialList;
    
    this.snakeCellInfo = snakeCellInfo;

    this.direction = "none";

    this.draw = function(context) {
        context.save();
        for (var i = 0; i < this.snakeList.length; i++) {
            if (i == 0) {
                context.fillStyle = "black";
            } else {
                context.fillStyle = this.snakeCellInfo.color;
            }

            context.fillRect(this.snakeList[i].x,this.snakeList[i].y,this.snakeCellInfo.width,this.snakeCellInfo.height);
            
        }

        context.restore();
    }

    this.updatePosition = function(canvasWidth, canvasHeight) {

        if (this.direction == "none") {
            return;
        }

        var snakeList = this.snakeList;

        for (var i = snakeList.length - 1; i > 0; i--) {
            snakeList[i].x = snakeList[i-1].x;
            snakeList[i].y = snakeList[i-1].y;
        }
        
        
        //Update head position depending on "direction"
        if (this.direction == "left") {
            
            snakeList[0].x -= this.snakeCellInfo.width;
            if (snakeList[0].x < 0) {
                snakeList[0].x += canvasWidth;
            }

        } else if (this.direction == "up") {
            
            snakeList[0].y -= this.snakeCellInfo.height;
            if (snakeList[0].y < 0) {
                snakeList[0].y += canvasHeight;
            }
        } else if (this.direction == "right") {
            
            snakeList[0].x += this.snakeCellInfo.width;
            if (snakeList[0].x >= canvasWidth) {
                snakeList[0].x -= canvasWidth;
            }
        } else if (this.direction == "down") {
            
            snakeList[0].y += this.snakeCellInfo.height;
            if (snakeList[0].y >= canvasHeight) {
                snakeList[0].y -= canvasHeight;
            }
        }
    }


    this.hasEaten = function(f) {

        var snakeHead = this.snakeList[0];

        var range1 = [snakeHead.x, snakeHead.x + this.snakeCellInfo.width];
        var range2 = [f.x, f.x + f.foodCellInfo.width];
        var range3 = [snakeHead.y, snakeHead.y + snakeCellInfo.height];
        var range4 = [f.y, f.y + f.foodCellInfo.height];

        return overLap(range1,range2) && overLap(range3,range4);
    }


    this.hasEatenItself = function() {

        var head = this.snakeList[0];
        for (var i = 1; i < this.snakeList.length; i++) {
            
            if ((Math.abs(head.x - this.snakeList[i].x) < 2) && (Math.abs(head.y - this.snakeList[i].y) < 2)) {
                return true;
            }
           
        }

        return false;
    }

    this.extend = function() {
        var new_X,new_Y;
        var snakeList = this.snakeList;
        if (this.direction == "left") {
            new_X = snakeList[0].x - 10;
            new_Y = snakeList[0].y;
        } else if (this.direction == "up") {
            new_X = snakeList[0].x;
            new_Y = snakeList[0].y - 10;
        } else if (this.direction == "right") {
            new_X = snakeList[0].x + 10;
            new_Y = snakeList[0].y;
        } else if (this.direction == "down") {
            new_X = snakeList[0].x;
            new_Y = snakeList[0].y + 10;
        }


        this.snakeList.unshift({x:new_X, y:new_Y});
    }

}