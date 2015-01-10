/**
*    Collision which happenes whenever our
*    player collides with grass. 
*/
function grassCollision() {

    var collisionDetected = false; //boolean which determines whether collision happened

    for (var i = 0; i < grassArr.length; i++) {
        //tests for collision
        if (collision(playerContainer, 15, 50, -20, -65, grassArr[i].getImage(), 0, 0, 0, 0)) {
            //if the collision happened, we'll set the slow speed
            playerSpeed = PLAYER_SLOW_SPEED;
            collisionDetected = true;
            break;
        }
    }

    //if the collision never happened, we'll set the normal speed
    if (!collisionDetected)
        playerSpeed = PLAYER_NORMAL_SPEED;
}

/**
*     Collision which happenes whenever our
*     player collides with a wall. 
*/
function wallCollision() {

    var bounceAmount = 50; //amount which the player will be bounced once collided with a wall

    for (var i = 0; i < wallsArr.length; i++) {

        //tests for collision
        if (collision(playerContainer, 5, 10, -5, -15, wallsArr[i].getImage(), 0, 0, 0, 0)) {

            //tests in which direction is the wall facing
            //(if it's facing the right direction, player should bounce to the left side, etc.)
            if (wallsArr[i].getFacingDir() == BounceTexture.prototype.LEFT_DIR) { xPos -= bounceAmount; }
            else if (wallsArr[i].getFacingDir() == BounceTexture.prototype.RIGHT_DIR) { xPos += bounceAmount; }
            else if (wallsArr[i].getFacingDir() == BounceTexture.prototype.UP_DIR) { yPos -= bounceAmount; }
            else if (wallsArr[i].getFacingDir() == BounceTexture.prototype.DOWN_DIR) { yPos += bounceAmount; }
            hasBounced = true;
            break;
        }
    }
}

/**
*     Collision which happenes whenever our
*     player collides with gold. 
*/
function goldCollision()
{
    for (var i = 0; i < goldList.length; i++) {
        //tests for collision
        if (collision(playerContainer, 5, 10, -10, -15, goldList[i].getContainer(), 0, 0, 0, 0))
        {
            //to ensure that the request won't be sent twice
            if (!pickedGold) {
                pickedGold = true;
                $.connection.gameHub.server.notifyGoldAddition(name, goldList[i].getId());
                $.connection.chatHub.server.notifyGoldAddition(name, goldList[i].getAmount());
                break;
            }
        }
    }
}

/**
*     Collision which happenes whenever our
*     player collides with another player. 
*/
function playerCollision()
{
    for (var i = 0; i < players.length; i++) {
        //tests if it's not our player
        if (name != players[i].getName()) {
            //tests for collision
            if (collision(playerContainer, 5, 10, -10, -15, players[i].getContainer(), 5, 10, -10, -15)) {
                if (!playersCollided) {
                    var bounceAmount = 30;

                    if (playerContainer.y < players[i].getContainer().y)
                        yPos -= bounceAmount;
                    else
                        yPos += bounceAmount;

                    if (playerContainer.x < players[i].getX())
                        xPos -= bounceAmount;
                    else
                        xPos += bounceAmount;

                    //stops the player so that the collision wouldn't happen twice
                    moveUp = false;
                    moveDown = false;
                    moveLeft = false;
                    moveRight = false;

                    $.connection.chatHub.server.notifyPlayerCollision(name, players[i].getName());

                    playersCollided = true;
                    return;
                }
            }
        }
    }
}