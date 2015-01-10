/**
*   Container which displays the gold amount. 
*   @param x X coordinate
*   @param y Y coordinate
*/
function AmountOfGold(x, y)
{
    this.container = new createjs.Container();
    this.container.x = x;
    this.container.y = y;
    this.currentAmount = 0;
    this.text = new createjs.Text("Current gold amount: 0", "14px Arial", "#fff");
    this.container.addChild(this.text);
}

/**
*   Returns the container. 
*/
AmountOfGold.prototype.getContainer = function () {
    return this.container;
}

/**
*   Adds the additional amount.
*   @param additionalAmount The additional amount. 
*/
AmountOfGold.prototype.addAmount = function (additionalAmount) {
    this.currentAmount += additionalAmount;
    this.text.text = "Current gold amount: " + this.currentAmount;
}

/**
*   Returns the amount. 
*/
AmountOfGold.prototype.getAmount = function () {
    return this.currentAmount;
}