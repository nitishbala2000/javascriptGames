function overLap(range1, range2) {
    return Math.max(range1[0],range2[0]) <= Math.min(range1[1],range2[1]);
}

export function collided(item1, item2) {
    var range1 = [item1.x, item1.x + item1.size];
    var range2 = [item2.x, item2.x + item2.size];
    
    var range3 = [item1.y, item1.y + item1.size];
    var range4 = [item2.y, item2.y + item2.size];

    return overLap(range1,range2) && overLap(range3,range4);
}