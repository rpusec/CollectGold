/**
*   This function represents a player. It can be either 
*   an NPC (other players) or the client's player. 
*   @param name     Player name
*   @param x        X coordinate
*   @param y        Y coordinate
*   @param isNPC    is the player supposed to be a playable character
*/
function Player(name, x, y, isNPC)
{
    this.name = name;
    this.currentMovement = Player.prototype.IDLE_DOWN;
    this.playerImage = "";

    //if it's not an npc, we should label this player as our own
    if (!isNPC)
        this.playerImage = "playerGraphics.png";
    else
        this.playerImage = "npcGraphics.png";

	this.ss = new createjs.SpriteSheet(
	{ 
		"animations":
		{
			"walkLeft":[0, 3],
			"walkRight":[4, 7],
			"walkUp":[8, 11],
			"walkDown":[12, 15],
			"idleLeft":[16, 19],
			"idleRight":[20, 23],
			"idleUp":[24, 27],
			"idleDown":[28, 31]
		},
		"images": ["ClientTextures/Player/" + this.playerImage],
        "frames":
		{
            "regX":0,
            "regY":0,
            "height":60,
            "width":50,
            "count":32
        }
    });

	this.ss.getAnimation("idleLeft").speed = Player.prototype.IDLE_SPEED;
	this.ss.getAnimation("idleRight").speed = Player.prototype.IDLE_SPEED;
	this.ss.getAnimation("idleUp").speed = Player.prototype.IDLE_SPEED;
	this.ss.getAnimation("idleDown").speed = Player.prototype.IDLE_SPEED;

	this.ss.getAnimation("walkLeft").speed = Player.prototype.MOVE_SPEED;
	this.ss.getAnimation("walkRight").speed = Player.prototype.MOVE_SPEED;
	this.ss.getAnimation("walkUp").speed = Player.prototype.MOVE_SPEED;
	this.ss.getAnimation("walkDown").speed = Player.prototype.MOVE_SPEED;

    this.sprite = new createjs.Sprite(this.ss);
    this.sprite.gotoAndPlay("idleDown");

    this.text = new createjs.Text(this.name, "12px Arial", "#000");
    this.text.x = 0;
    this.text.y = -15;

    this.container = new createjs.Container();
    this.container.addChild(this.sprite, this.text);

    this.container.x = x;
    this.container.y = y;
}

//speed
Player.prototype.IDLE_SPEED = 0.050;
Player.prototype.MOVE_SPEED = 1;

//animation idle constants
Player.prototype.IDLE_LEFT = "idleLeft";
Player.prototype.IDLE_RIGHT = "idleRight";
Player.prototype.IDLE_UP = "idleUp";
Player.prototype.IDLE_DOWN = "idleDown";

//animation walking constants
Player.prototype.WALK_LEFT = "walkLeft";
Player.prototype.WALK_RIGHT = "walkRight";
Player.prototype.WALK_UP = "walkUp";
Player.prototype.WALK_DOWN = "walkDown";

/**
*   Returns the player's container. 
*/
Player.prototype.getContainer = function() {
	return this.container;
}

/**
*   Returns name.
*/
Player.prototype.getName = function () {
    return this.name;
}

/**
*   Returns current movement animation. 
*/
Player.prototype.getCurrAnimation = function () {
    return this.currentMovement;
}

/**
*   Sets X
*   @param x X coordinate
*/
Player.prototype.setX = function (x) {
    this.container.x = x;
}

/**
*   Sets Y
*   @param y Y coordinate
*/
Player.prototype.setY = function (y) {
    this.container.y = y;
}

/**
*   Returns X
*/
Player.prototype.getX = function () {
    return this.container.x;
}

/**
*   Returns Y
*/
Player.prototype.getY = function () {
    return this.container.y;
}

/**
*   Sets the movement animation for the player. 
*   @param animation the animation
*/
Player.prototype.setMovementAnimation = function (animation) {
    switch (animation)
    {
        case Player.prototype.IDLE_LEFT:
            this.sprite.gotoAndPlay("idleLeft");
            this.currentMovement = animation;
            break;
        case Player.prototype.IDLE_RIGHT:
            this.sprite.gotoAndPlay("idleRight");
            this.currentMovement = animation;
            break;
        case Player.prototype.IDLE_UP:
            this.sprite.gotoAndPlay("idleUp");
            this.currentMovement = animation;
            break;
        case Player.prototype.IDLE_DOWN:
            this.sprite.gotoAndPlay("idleDown");
            this.currentMovement = animation;
            break;
        case Player.prototype.WALK_LEFT:
            this.sprite.gotoAndPlay("walkLeft");
            this.currentMovement = animation;
            break;
        case Player.prototype.WALK_RIGHT:
            this.sprite.gotoAndPlay("walkRight");
            this.currentMovement = animation;
            break;
        case Player.prototype.WALK_UP:
            this.sprite.gotoAndPlay("walkUp");
            this.currentMovement = animation;
            break;
        case Player.prototype.WALK_DOWN:
            this.sprite.gotoAndPlay("walkDown");
            this.currentMovement = animation;
            break;
    }
}