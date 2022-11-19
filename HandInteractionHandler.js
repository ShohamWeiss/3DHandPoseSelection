// enum of all action types
var ACTION_TYPES = {
    SELECT: 1
};
// function to convert hand position and action to UI interactions
function Interact(position, action)
{
    console.log("Interacted at", position, action);
    // if the action is select
    if (action == ACTION_TYPES.SELECT)
    {
        // select the button
        SelectButton(position);
    }
}

// function for selecting button
function SelectButton(position)
{
    console.log("Selecting button at", position);
    // for all the buttons, check the distance from the button
    // if the distance is less than the radius, click the button
    // get all the buttons
    var buttons = document.getElementsByTagName("button");
    // for all the buttons
    for (var i = 0; i < buttons.length; i++)
    {
        // get the button
        var button = buttons[i];
        // get the button position
        var buttonPosition = button.getBoundingClientRect();
        console.log("checking:",buttonPosition);
        // get the button center
        var buttonCenter = {
            x: buttonPosition.left + buttonPosition.width/2,
            y: buttonPosition.top + buttonPosition.height/2
        };
        // get the distance from the button center to the hand position
        var distance = Math.sqrt(Math.pow(buttonCenter.x - position.x, 2) + Math.pow(buttonCenter.y - position.y, 2));
        // if the distance is less than the radius
        if (distance < 100)
        {
            // click the button
            button.click();
        }
    }
}