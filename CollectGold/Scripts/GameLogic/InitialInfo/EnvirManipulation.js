/**
*   This function is responsible for updating our
*   environment. It calls the collision methods,
*   changes the yPos and yPos coordinates, and 
*   sends them to the server. 
*/
function updateEnvironment()
{
    //collision detections
    if (playerContainer != null) {
        grassCollision();
        wallCollision();
        goldCollision();
        playerCollision();
    }

    //player's moves
    if (moveUp && moveLeft) { yPos -= playerSpeed; xPos -= playerSpeed; }
    else if (moveUp && moveRight) { yPos -= playerSpeed; xPos += playerSpeed; }
    else if (moveDown && moveLeft) { yPos += playerSpeed; xPos -= playerSpeed; }
    else if (moveDown && moveRight) { yPos += playerSpeed; xPos += playerSpeed; }
    else if (moveUp) { yPos -= playerSpeed; }
    else if (moveDown) { yPos += playerSpeed; }
    else if (moveLeft) { xPos -= playerSpeed; }
    else if (moveRight) { xPos += playerSpeed; }

    //if one of the moves is applied, send coordinated
    if (moveUp || moveDown || moveLeft || moveRight) 
        $.connection.gameHub.server.notifyLocation(name, xPos, yPos);

    //if the player bounced, we need to resend the coordinates
    if (hasBounced) {
        $.connection.gameHub.server.notifyLocation(name, xPos, yPos);
        hasBounced = false;
    }

    //if the players collided, we need to resend the coordinates
    if (playersCollided) {
        $.connection.gameHub.server.notifyLocation(name, xPos, yPos);
        playersCollided = false;
    }

    stage.update();
}