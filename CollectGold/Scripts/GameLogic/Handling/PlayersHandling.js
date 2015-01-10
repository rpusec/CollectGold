$(function () {
    /**
    *    Sends the other players on the stage (including our client's player). 
    *    @param otherPlayers The players from the server. 
    */
    $.connection.gameHub.client.sendOtherPlayers = function (otherPlayers) {
        if(clientPlays){
            for (var i = 0; i < otherPlayers.length; i++) {
                var newPlayer;

                //if it is our player, we need to specify that it shouldn't be an NPC
                if (otherPlayers[i].Name == name)
                    newPlayer = new Player(otherPlayers[i].Name, otherPlayers[i].X, otherPlayers[i].Y, false);
                else
                    newPlayer = new Player(otherPlayers[i].Name, otherPlayers[i].X, otherPlayers[i].Y, true);

                players.push(newPlayer);
                stage.addChild(newPlayer.getContainer());

                //if this is the client's player, set the playerContainer
                if (newPlayer.getName() == name)
                    playerContainer = newPlayer.getContainer();
            }

            stage.update();
        }
    }

    /**
    *    Sends the new player to the stage. 
    *    @param newPlayerFromServer The new Player. 
    */
    $.connection.gameHub.client.sendNewPlayer = function (newPlayerFromServer) {
        if (clientPlays) {
            //creates the new player object and adds it to the stage
            var newPlayer = new Player(newPlayerFromServer.Name, newPlayerFromServer.X, newPlayerFromServer.Y, true);
            players.push(newPlayer);
            stage.addChild(newPlayer.getContainer());
            stage.update();
        }
    }

    /**
    *    Notifies the new location of a 
    *    certain player. 
    *    @param targetPlayer The player who's location was changed. 
    */
    $.connection.gameHub.client.notifyLocation = function (targetPlayer) {
        if (clientPlays) {
            for (var p = 0; p < players.length; p++) {
                //if the names match, remove the target player
                if (players[p].getName() == targetPlayer.Name) {
                    players[p].setX(targetPlayer.X);
                    players[p].setY(targetPlayer.Y);
                    break;
                }
            }
        }
    }

    /**
    *    This method will update the movement 
    *    animation of a certain player.  
    *    @param playerName      The name of the player. 
    *    @param newAnim         The new animation for the particular player. 
    */
    $.connection.gameHub.client.notifyAnimationDirection = function (playerName, newAnim) {
        if (clientPlays) {
            for (var p = 0; p < players.length; p++) {
                if (players[p].getName() == playerName) {
                    //tests if the player already has this animation
                    if (players[p].getCurrAnimation() != newAnim) {
                        players[p].setMovementAnimation(newAnim);
                        break;
                    }
                }
            }
        }
    }

    /**
    *    Removes the disconnected player from the
    *    client's side of view.
    *    @param disconnectedPlayerName The player that disconnected. 
    */
    $.connection.gameHub.client.notifyDisconnection = function (disconnectedPlayerName) {
        if (clientPlays) {
            if (disconnectedPlayerName != "") {
                //iterating though the players list to remove the specified player
                for (var i = 0; i < players.length; i++) {
                    //if the names match
                    if (players[i].getName() == disconnectedPlayerName) {
                        stage.removeChild(players[i].getContainer());
                        players.splice(i, 1);
                        break;
                    }
                }

                stage.update();
            }
        }
    }
});