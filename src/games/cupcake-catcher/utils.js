export function getImage(src) {
    var img = new Image();
    img.src = src;
    return img;
}

export function drawObject(context, img, obj) {
    context.save();
    context.drawImage(img, obj.x, obj.y, obj.width, obj.height);
    context.restore();
}

function overLap(range1, range2) {
    return Math.max(range1[0],range2[0]) <= Math.min(range1[1],range2[1]);
}


export function collided(obj1, obj2) {
    var range1 = [obj1.x, obj1.x + obj1.width];
    var range2 = [obj2.x, obj2.x + obj2.width];
    var range3 = [obj1.y, obj1.y + obj1.height];
    var range4 = [obj2.y, obj2.y + obj2.height];

    return overLap(range1,range2) && overLap(range3,range4);
}