/**
*    Returns a random integer
*    @param minNum Minimum number
*    @param maxNum Maximum number
*/
function randomInt(minNum, maxNum) {
    return Math.floor(Math.random() * (maxNum - minNum + 1) + minNum);
}

/**
*   Tests the collision between two objects
*   @param obj1                 Reference to the first object
*   @param changeObj1X          Modifies first object's X
*   @param changeObj1Y          Modifies first object's Y
*   @param changeObj1Width      Modifies first object's Width
*   @param changeObj1Height     Modifies first object's Height
*   @param obj2                 Reference to the second object
*   @param changeObj2X          Modifies second object's X
*   @param changeObj2Y          Modifies second object's Y
*   @param changeObj2Width      Modifies second object's Width
*   @param changeObj2Height     Modifies second object's Height
*/
function collision(
    obj1, changeObj1X, changeObj1Y, changeObj1Width, changeObj1Height,
    obj2, changeObj2X, changeObj2Y, changeObj2Width, changeObj2Height) {
    if ((obj1.x + changeObj1X) < (obj2.x + changeObj2X) + (obj2.getBounds().width + changeObj2Width) &&
        (obj1.x + changeObj1X) + (obj1.getBounds().width + changeObj1Width) > (obj2.x + changeObj2X) &&
        (obj1.y + changeObj1Y) < (obj2.y + changeObj2Y) + (obj2.getBounds().height + changeObj2Height) &&
        (obj1.y + changeObj1Y) + (obj1.getBounds().height + changeObj1Height) > (obj2.y + changeObj2Y))
        return true;
    else
        return false;
}

/**
*   Returns degrees from two objects' x and y coordinates
*   @param o1x First object's X
*   @param o1y First object's Y
*   @param o2x Second object's X
*   @param o2y Second object's Y
*/
function getDegrees(o1x, o1y, o2x, o2y)
{
    return Math.atan2(o2y - o1y, o2x - o1x) * 180 / Math.PI + 180;
}