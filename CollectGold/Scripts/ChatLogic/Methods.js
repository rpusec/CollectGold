$(function () {
    /**
    *   Notifies that a new login occured
    *   @param name The new player. 
    */
    $.connection.chatHub.client.notifyNewLogin = function (name) {
        $("#chatMessages").append("<font color=\"#FFFFFF\">User " + name + " has connected. </font><br />");
        autoScroll("#chatMessages");
    }
    
    /**
    *   Broadcasts a message to all clients. 
    *   @param message  The message to broadcast. 
    *   @param name     Name of the sender. 
    */
    $.connection.chatHub.client.broadcastMessage = function (message, name) {
        $("#chatMessages").append("<font color=\"#00FFFF\">" + name + " says: </font>" + message + "<br />");
        autoScroll("#chatMessages");
    }

    /**
    *   Notifies that a player disconnected.
    *   @param name Target player's name. 
    */
    $.connection.chatHub.client.notifyDisconnect = function (name) {
        $("#chatMessages").append("<font color=\"#FFFF00\">User " + name + " has disconnected. </font><br />");
        autoScroll("#chatMessages");
    }

    /**
    *   Notifies collision between tow players.
    *   @param n1 Player one. 
    *   @param n2 Player two. 
    */
    $.connection.chatHub.client.notifyPalyerCollision = function (n1, n2) {
        $("#chatMessages").append("<font color=\"#e9c6ff\">User " + n1 + " collided with " + n2 + ". </font><br />");
        autoScroll("#chatMessages");
    }

    /**
    *   Notifies gold addition.
    *   @param name The player's name. 
    *   @param name The goldAmount. 
    */
    $.connection.chatHub.client.notifyGoldAddition = function (name, goldAmount) {
        $("#chatMessages").append("<font color=\"#ffc000\">User " + name + " collected " + goldAmount + " gold. </font><br />");
        autoScroll("#chatMessages");
    }

    /**
    *   Notifies an error message.
    *   @param errorMessage The error message. 
    */
    $.connection.chatHub.client.notifyError = function (errorMessage) {
        $("#chatMessages").append("<font color=\"#FF0000\">" + errorMessage + "</font><br />");
        autoScroll("#chatMessages");
    }

    $(document).on("ready", function () {
        $(document).on("keyup", function (e) {
            //if the textfield isn't empty
            if ($("#sendMsgField").val() != "") {
                if (e.which == 13) { //ENTER key
                    $.connection.chatHub.server.sendMessage($("#sendMsgField").val(), name);
                    $("#sendMsgField").val(""); //resetting the textfield
                }
            }
        });
    });

    /**
    *   Automatically scrolls to the bottom. 
    *   @param targetElement The scrollable element. 
    */
    function autoScroll(targetElement)
    {
        $(targetElement).animate({ "scrollTop": $(targetElement)[0].scrollHeight }, "fast");
    }
});