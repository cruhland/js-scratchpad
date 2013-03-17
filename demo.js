// Mouse position and rectangle positions should be displayed
var Color = Scratchpad.Color;
var red = Scratchpad.makeRectangle(Color.Red, 100, 100);
var green = Scratchpad.makeRectangle(Color.Lime, 300, 200);
var blue = Scratchpad.makeRectangle(Color.Blue, 75, 400);

var colors = [Color.Red, Color.Lime, Color.Blue];
function cycleColor(rectangle) {
    var oldColor = rectangle.getBackgroundColor();
    var colorIndex = colors.indexOf(oldColor);
    var newColor = colors[(colorIndex + 1) % colors.length];
    rectangle.setBackgroundColor(newColor);
}

red.onDoubleClick(cycleColor);
green.onDoubleClick(cycleColor);
blue.onDoubleClick(cycleColor);

var redX = Scratchpad.findById('redX');
var redY = Scratchpad.findById('redY');
var greenX = Scratchpad.findById('greenX');
var greenY = Scratchpad.findById('greenY');
var blueX = Scratchpad.findById('blueX');
var blueY = Scratchpad.findById('blueY');

function grab(rectangle) {
    rectangle.setOpacity(0.75);
}

function makeMove(displayX, displayY) {
    function move(rectangle) {
        displayX.setText(rectangle.getLeft());
        displayY.setText(rectangle.getTop());
    }

    return move;
}

function release(rectangle) {
    rectangle.setOpacity(1.0);
}

red.onDrag(grab, makeMove(redX, redY), release);
green.onDrag(grab, makeMove(greenX, greenY), release);
blue.onDrag(grab, makeMove(blueX, blueY), release);

red.setPosition(250, 250);
green.setPosition(200, 100);
blue.setPosition(450, 200);

red.draw();
green.draw();
blue.draw();

var displayMouseX = Scratchpad.findById('mouseX');
var displayMouseY = Scratchpad.findById('mouseY');

function mouseUpdateX(x) {
    displayMouseX.setText(x);
}

function mouseUpdateY(y) {
    displayMouseY.setText(y);
}

Scratchpad.Mouse.onUpdateX(mouseUpdateX);
Scratchpad.Mouse.onUpdateY(mouseUpdateY);
