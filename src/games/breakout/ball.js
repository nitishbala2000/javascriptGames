function overLap(range1, range2) {
    return Math.max(range1[0],range2[0]) <= Math.min(range1[1],range2[1]);
}

export function Ball(radius,speed) {
    this.x = 250;
    this.y = 250;

    this.radius = radius;

    var bearing = Math.random() * Math.PI * 2;
    
    this.vX = speed * Math.cos(bearing);
    this.vY = speed * Math.sin(bearing);


    this.draw = function(context) {
        context.save();
        context.beginPath();
        context.fillStyle = "blue";
        context.arc(this.x,this.y,this.radius,0,2*Math.PI);
        context.fill();
        context.restore();
    }

    this.updatePositionAndDirection = function(width,height) {
        this.x += this.vX;
        if (this.x > width || this.x < 0) {
            this.changeXDirection();
        }


        this.y += this.vY;
        if (this.y > height || this.y < 0) {
            this.changeYDirection();
        }
    }

    this.isTouching = function(rect) {
        return this.x >= rect.x && this.x <= rect.x + rect.width && 
            this.y >= rect.y &&  this.y <= rect.y + rect.height;

    }

    this.changeXDirection = function() {
        this.vX *= -1;
    }

    this.changeYDirection = function() {
        this.vY *= -1;
    }

}