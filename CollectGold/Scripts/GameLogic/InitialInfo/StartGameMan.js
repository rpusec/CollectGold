var tempName = "";

$(function () {
    $.connection.hub.start().done(function () {
        $("#wsContainer").css("visibility", "visible");
        $('#usernameField').focus();
    });

    /**
    *   Returns all of th enames from the server and
    *   checks if the client's chosen name is appropriate. 
    *   @param names Names of all of the players from the server. 
    */
    $.connection.gameHub.client.getNames = function (names)
    {
        //checking if the client applied only alphabetic characters
        if (tempName == "") {
            var errorMsg = "You forgot to insert your name. ";
            $('#showLoginError').text(errorMsg);
            return;
        }

        //checking if the client applied only alphabetic characters
        if (!(/^[a-zA-Z]+$/.test(tempName))) {
            var errorMsg = "Please use only alphabetic characters. ";
            $('#showLoginError').text(errorMsg);
            return;
        }

        for (var i = 0; i < names.length; i++)
        {
            //checking if another player has the same name
            if (tempName == names[i])
            {
                var errorMsg = "Another client has the same name, please choose a different name. ";
                $('#showLoginError').text(errorMsg);
                return;
            }
        }

        //if nothing failed, then we start the game and hide the welcoming screen
        name = tempName;
        clientPlays = true;
        $("#wsContainer").css("visibility", "hidden");
        $.connection.gameHub.server.addPlayer(name, xPos, yPos);
        $.connection.gameHub.server.initializeTimer();
        $.connection.chatHub.server.addToChat(name);
        changeBorderOnElements("#3c3c3c");
    }

    /**
    *   Notifies on the players' screen that 
    *   the game started. 
    */
    $.connection.gameHub.client.notifyGameStartOnStage = function ()
    {
        //getting the location of the main stage
        var mainContainerLeft = $("#container").offset().left;
        var mainContainerTop = $("#container").offset().top;

        //preparing width/height for startGameText div
        var sgtWidth = 400;
        var sgtHeight = 200;

        //creating the GAME STARTED message
        var startGameText = $("<div style=\"" +
            "position:absolute;" +
            "width:" + sgtWidth + "px;" + 
            "height:" + sgtHeight + "px;" + 
            "left:" + (mainContainerLeft + (($("#container").width() / 2) - (sgtWidth / 2))) + "px;" + 
            "top:" + (mainContainerTop + (($("#container").height() / 2) - (sgtHeight / 2))) + "px;" + 
            "background-image:url('ClientTextures/Environemnt/game_started_msg.png'); " + 
            "\"></div>");

        //appending the element to the body of the document
        $("body").append(startGameText);
        
        //animating the element, and later deleting it
        $(startGameText).animate({ "opacity": 0 }, 10000, "linear", function () {
            $(this).remove(); //removing the element after the animation ended
        });
    }
});

/**
*   Sends a request to the server for the client's name validation. 
*/
function validateName() {
    tempName = $('#usernameField').val();
    $.connection.gameHub.server.confirmGameOver();
}

/**
*   Changes the borders of certain elements.
*   @param newColor the new border color of each div.
*/
function changeBorderOnElements(newColor)
{
    //holds the list of references to elements
    var elemsArr = new Array("#container", "#chatMessages", "#sendMsgField", "#usernameField");

    //iterating though all of the elements and changing their border color
    for (var i = 0; i < elemsArr.length; i++)
        $(elemsArr[i]).css("border", "1px solid " + newColor);
}