var wallPath = "ClientTextures/Environemnt/wall.png";
var grassPath = "ClientTextures/Environemnt/grass.png";
var groundPath = "ClientTextures/Environemnt/ground.png";

/**
*   This is the Texture that additionally has the "facingDirection" attribute
*   (to know on which direction this texture is facing)
*   @param facingDirection      The direction this texture is facing toward.
*   @param imagePath            Path of the image. 
*/
function BounceTexture(facingDirection, imagePath) {
    this.facingDirection = facingDirection;
    this.image = new createjs.Bitmap(imagePath);
}

/**
*   Normal texture. 
*   @param imagePath Path of the image. 
*/
function Texture(imagePath) {
    this.image = new createjs.Bitmap(imagePath);
}

/**
*   Sets the new X.
*   @param x X coordinate
*/
BounceTexture.prototype.setX = function (x) { this.image.x = x; }

/**
*   Sets the new Y.
*   @param y Y coordinate
*/
BounceTexture.prototype.setY = function (y) { this.image.y = y; }

/**
*   Sets the new X.
*   @param x X coordinate
*/
Texture.prototype.setX = function (x) { this.image.x = x; }

/**
*   Sets the new Y.
*   @param y Y coordinate
*/
Texture.prototype.setY = function (y) { this.image.y = y; }

/**
*   Returns the image.
*/
Texture.prototype.getImage = function () { return this.image; }

/**
*   Returns the image.
*/
BounceTexture.prototype.getImage = function () { return this.image; }

/**
*   Returns the facing direction.
*/
BounceTexture.prototype.getFacingDir = function () { return this.facingDirection; }

//setting the constants for Wall
BounceTexture.prototype.LEFT_DIR = 0;
BounceTexture.prototype.RIGHT_DIR = 1;
BounceTexture.prototype.UP_DIR = 2;
BounceTexture.prototype.DOWN_DIR = 3;