$(function () {
    /**
    *   Notifies our client whether the game was over.
    */
    $.connection.gameHub.client.notifyGameOver = function () {
        $("#showLoginError").text("The game was already finished. ");
    }

    /**
    *   Openes a window (div) which shows the winner and other players
    *   @param listOfWinners List of players who participated in the game
    */
    $.connection.gameHub.client.onGameOver = function (listOfWinners) {
        $("#gosContainer").css("visibility", "visible");

        //list will be contained in the string format
        var listOfWinnersStr = "";

        //adds each player information to listOfWinnersStr string
        for (var i = 0; i < listOfWinners.length; i++) 
            listOfWinnersStr += "<b>#" + parseInt(i+1) + "</b> Name: <b>" + listOfWinners[i].Name + "</b>, Gold amount: <b>" + listOfWinners[i].AmountOfGold + "</b><br />";

        $("#listOfPlayersGO").html(listOfWinnersStr); 
        $("#chatMessages").append("<font color=\"#00ffc6\">The Game is Over! Congratulations to " + listOfWinners[0].Name + " for winning first place! </font><br />");
    }
});