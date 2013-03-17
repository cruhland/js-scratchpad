// Mouse position should be displayed with labels
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

function grab(rectangle) {
    rectangle.setOpacity(0.75);
}

function release(rectangle) {
    rectangle.setOpacity(1.0);
}

red.onDrag(grab, release);
green.onDrag(grab, release);
blue.onDrag(grab, release);

red.setPosition(250, 250);
green.setPosition(200, 100);
blue.setPosition(450, 200);

red.draw();
green.draw();
blue.draw();

var displayMouseX = Scratchpad.findById('cursorX');
var displayMouseY = Scratchpad.findById('cursorY');

function mouseUpdateX(x) {
    displayMouseX.setText(x);
}

function mouseUpdateY(y) {
    displayMouseY.setText(y);
}

Scratchpad.Mouse.onUpdateX(mouseUpdateX);
Scratchpad.Mouse.onUpdateY(mouseUpdateY);
