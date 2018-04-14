distanceBetween = (object1, object2) => {
    if (Array.isArray(object1)) {
        object1 = {x:object1[0], y:object1[1]}
    }
    return Math.sqrt(Math.pow(object1.x -object2.x,2)+Math.pow(object1.y -object2.y,2));
}

setIsVisible = (element) => {
    if (element.x>0&&element.x<GAME_WIDTH&&element.y>-200&&element.y<GAME_HEIGHT) element.visible = true;
    else element.visible = false;
}

isVisible = (element) => element.visible;


complement = (pred) => (...args) => !pred(...args)

let = notVisible = complement(isVisible);
