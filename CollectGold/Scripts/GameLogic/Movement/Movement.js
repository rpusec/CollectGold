$(function () {
    $(document).on("ready", function () {
        $(document).on("keydown", function (e) {

            if (e.which == 37) //left
            {
                moveLeft = true;

                if (!confirmAnimation) {
                    $.connection.gameHub.server.notifyAnimationChange(name, Player.prototype.WALK_LEFT);
                    confirmAnimation = true;
                }
            }

            if (e.which == 39) //right
            {
                moveRight = true;

                if (!confirmAnimation) {
                    $.connection.gameHub.server.notifyAnimationChange(name, Player.prototype.WALK_RIGHT);
                    confirmAnimation = true;
                }
            }

            if (e.which == 40) //down
            {
                moveDown = true;

                if (!confirmAnimation) {
                    $.connection.gameHub.server.notifyAnimationChange(name, Player.prototype.WALK_DOWN);
                    confirmAnimation = true;
                }
            }

            if (e.which == 38) //up
            {
                moveUp = true;

                if (!confirmAnimation) {
                    $.connection.gameHub.server.notifyAnimationChange(name, Player.prototype.WALK_UP);
                    confirmAnimation = true;
                }
            }
        });

        $(document).on("keyup", function (e) {

            if (e.which == 37) //left
            {
                moveLeft = false;

                if (confirmAnimation) {
                    $.connection.gameHub.server.notifyAnimationChange(name, Player.prototype.IDLE_LEFT);
                    confirmAnimation = false;
                }
            }

            if (e.which == 39) //right
            {
                moveRight = false;

                if (confirmAnimation) {
                    $.connection.gameHub.server.notifyAnimationChange(name, Player.prototype.IDLE_RIGHT);
                    confirmAnimation = false;
                }
            }

            if (e.which == 40) //down
            {
                moveDown = false;

                if (confirmAnimation) {
                    $.connection.gameHub.server.notifyAnimationChange(name, Player.prototype.IDLE_DOWN);
                    confirmAnimation = false;
                }
            }

            if (e.which == 38) //up
            {
                moveUp = false;

                if (confirmAnimation) {
                    $.connection.gameHub.server.notifyAnimationChange(name, Player.prototype.IDLE_UP);
                    confirmAnimation = false;
                }
            }
        });
    });
});