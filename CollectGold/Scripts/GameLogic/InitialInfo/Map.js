//wall
var WALL_LEFT = 1;
var WALL_RIGHT = 2;
var WALL_TOP = 3;
var WALL_DOWN = 4;

//grass
var GRASS = 5;

//floor
var FLOOR = 0;

/*
    This array contains the information of where each texture should be placed. 
    Each number in the array represents a specific texture on our level. 
    This array is used by the drawWorld() method in the DrawWorld.js file. 
*/
var map = new Array(
    2,4,4,4,4,4,4,4,4,4,4,1,
    2,0,0,0,0,0,0,0,0,0,0,1,
    2,0,5,5,5,0,0,5,5,5,0,1,
    2,0,5,5,5,0,0,5,5,5,0,1,
    2,0,0,0,0,0,0,0,0,0,0,1,
    2,0,0,0,0,0,0,0,0,0,0,1,
    2,0,5,5,5,0,0,5,5,5,0,1,
    2,0,5,5,5,0,0,5,5,5,0,1,
    2,0,0,0,0,0,0,0,0,0,0,1,
    2,3,3,3,3,3,3,3,3,3,3,3);