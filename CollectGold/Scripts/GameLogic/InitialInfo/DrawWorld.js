$(function () {

   /**
    *    This is the method that dynamically draws our level.
    *    It uses the "map" array in the Map.js file, which contains 
    *    the locations of all of the textures. 
    */
    $.connection.gameHub.client.drawWorld = function () {
        //maximum values
        var maxColumns = 12;

        //current values
        var currentColumns = 0;
        var currentRows = 0;

        //value for which rows/columns will be increased
        var increase = 50;

        //creating the textures and adding them to their appropriate arrays
        for (var i = 0; i < map.length; i++) {
            if (currentColumns != maxColumns) {
                switch (map[i]) {
                    case WALL_LEFT:
                        var newWall = new BounceTexture(BounceTexture.prototype.LEFT_DIR, wallPath);
                        newWall.setX(currentColumns * increase);
                        newWall.setY(currentRows * increase);
                        wallsArr.push(newWall);
                        break;
                    case WALL_RIGHT:
                        var newWall = new BounceTexture(BounceTexture.prototype.RIGHT_DIR, wallPath);
                        newWall.setX(currentColumns * increase);
                        newWall.setY(currentRows * increase);
                        wallsArr.push(newWall);
                        break;
                    case WALL_TOP:
                        var newWall = new BounceTexture(BounceTexture.prototype.UP_DIR, wallPath);
                        newWall.setX(currentColumns * increase);
                        newWall.setY(currentRows * increase);
                        wallsArr.push(newWall);
                        break;
                    case WALL_DOWN:
                        var newWall = new BounceTexture(BounceTexture.prototype.DOWN_DIR, wallPath);
                        newWall.setX(currentColumns * increase);
                        newWall.setY(currentRows * increase);
                        wallsArr.push(newWall);
                        break;
                    case GRASS:
                        var newGrass = new Texture(grassPath);
                        newGrass.setX(currentColumns * increase);
                        newGrass.setY(currentRows * increase);
                        grassArr.push(newGrass);
                        break;
                    case FLOOR:
                        var newFloor = new Texture(groundPath);
                        newFloor.setX(currentColumns * increase);
                        newFloor.setY(currentRows * increase);
                        groundArr.push(newFloor);
                        break;
                }

                currentColumns++; //getting to the next column
            }
            else {
                currentRows++; //getting to the next row
                currentColumns = 0; //reloading the current column (because we need to start from the first column)
                i--; //undoing the "i" increment (so that it won't skip some textures in the map array due to THIS "else" block)
            }
        }

        //adding walls to the canvas
        for (var i = 0; i < wallsArr.length; i++)
            stage.addChild(wallsArr[i].getImage());

        //adding grass to the canvas
        for (var i = 0; i < grassArr.length; i++)
            stage.addChild(grassArr[i].getImage());

        //adding ground to the canvas
        for (var i = 0; i < groundArr.length; i++)
            stage.addChild(groundArr[i].getImage());

        //adds text which indicates the amount of gold
        currnetAmountOfGold = new AmountOfGold(5, 480);
        stage.addChild(currnetAmountOfGold.getContainer());

        //start the main ticker
        createjs.Ticker.on("tick", updateEnvironment);
        createjs.Ticker.setFPS(30);

        stage.update();
    }
});