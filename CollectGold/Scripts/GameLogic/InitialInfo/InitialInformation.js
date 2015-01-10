//reference to the canvas
var stage;

//client's player information
var name = "";
var xPos = randomInt(80, 440);
var yPos = randomInt(80, 440);
var PLAYER_NORMAL_SPEED = 8;
var PLAYER_SLOW_SPEED = 3;
var playerSpeed = PLAYER_NORMAL_SPEED;
var playerContainer;
var clientPlays = false;
var pickedGold = false;
var playersCollided = false;
var currnetAmountOfGold;

//arrays
var players = new Array();
var wallsArr = new Array();
var grassArr = new Array();
var groundArr = new Array();
var goldList = new Array();

//movement
var moveUp = false;
var moveDown = false;
var moveLeft = false;
var moveRight = false;
var confirmAnimation = false; //used so that we can send the player's animation change only once
var hasBounced = false; //determines if the player has bounced

function init() {
    //defining the stage
    stage = new createjs.Stage("canvasScreen");
}

$(function () {

    /**
    *   Sends the current countdown from the server to the client
    */
    $.connection.gameHub.client.countDownNotification = function (str, textColor) {
        if (clientPlays)
            $("#countDownManager").html("<font color=\"" + textColor + "\">" + str + "</font>");
    }
});