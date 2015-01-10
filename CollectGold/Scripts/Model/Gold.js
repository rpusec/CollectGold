/**
*   This function represents a single Gold item. 
*   @param id       Gold ID
*   @param amount   Amount of gold
*   @param x        X coordinate
*   @param y        Y coordinate
*/
function Gold(id, amount, x, y)
{
    this.id = id;
    this.amount = amount;
    this.ss = new createjs.SpriteSheet(
	{
	    "animations" :
        {
            "idle" : [0]
        },
	    "images": ["ClientTextures/Gold/goldGraphics.png"],
	    "frames":
		{
		    "regX": 0,
		    "regY": 0,
		    "height": 49,
		    "width": 50,
		    "count": 1
		}
	});

    this.sprite = new createjs.Sprite(this.ss);

    this.text = new createjs.Text("" + amount, "10px Arial", "#000");
    this.text.x = 15;

    this.container = new createjs.Container();
    this.container.addChild(this.sprite, this.text);
    this.container.x = x;
    this.container.y = y;
}

/**
*   Returns the ID.
*/
Gold.prototype.getId = function () { return this.id; }

/**
*   Returns the container.
*/
Gold.prototype.getContainer = function () { return this.container; }

/**
*   Returns the amount.
*/
Gold.prototype.getAmount = function () { return this.amount; }