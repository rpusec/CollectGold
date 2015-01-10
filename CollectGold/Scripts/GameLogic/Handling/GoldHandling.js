$(function () {
   /**
    *   Adds gold to stage
    *   @param newGoldFromServer Adds gold
    */
    $.connection.gameHub.client.addGoldToStage = function (newGoldFromServer) {
        if (clientPlays) {
            var newGold = new Gold(newGoldFromServer.Id, newGoldFromServer.Amount, newGoldFromServer.X, newGoldFromServer.Y);
            goldList.push(newGold);
            stage.addChild(newGold.getContainer());
        }

        stage.update();
    }

    /**
     *   Removes gold from stage
     *   @param playerName      name of the player
     *   @param goldId          ID for the gold object
     */
    $.connection.gameHub.client.removeGoldFromStage = function (playerName, goldId) {
        if (clientPlays) {
            for (var i = 0; i < goldList.length; i++) {
                if (goldList[i].getId() == goldId) {

                    //if it's our player who got the gold, add the amount to the hud
                    if (playerName == name) {
                        currnetAmountOfGold.addAmount(goldList[i].getAmount());
                        pickedGold = false;
                    }
                    
                    //remove the child from stage
                    stage.removeChild(goldList[i].getContainer());
                    goldList.splice(i, 1);
                    break;
                }
            }
        }

        stage.update();
    }

    /**
     *   Adds all gold from the server to the stage
     *   @param goldListFromServer      array that holds all of the gold
     */
    $.connection.gameHub.client.addAllGold = function (goldListFromServer) {
        if (clientPlays) {
            for (var i = 0; i < goldListFromServer.length; i++){
                var newGold = new Gold(goldListFromServer[i].Id, goldListFromServer[i].Amount, goldListFromServer[i].X, goldListFromServer[i].Y);
                goldList.push(newGold);
                stage.addChild(newGold.getContainer());
            }
        }
    }
});