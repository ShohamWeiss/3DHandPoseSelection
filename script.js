// load options navigator
optionsNavigator = new OptionsNavigator(options, addToSentence)
// create buttons
CreateButtons(optionsNavigator);

// get mouse position
document.addEventListener("mousemove", function(event){
    mousePosition = {x:event.clientX, y:event.clientY};
    Interact(mousePosition, ACTION_TYPES.SELECT);
});