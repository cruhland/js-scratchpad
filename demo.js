// Set position independently of the rectangle constructor
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

red.onClick(cycleColor);
green.onClick(cycleColor);
blue.onClick(cycleColor);

function focus(rectangle) {
    rectangle.setOpacity(0.75);
}

function unfocus(rectangle) {
    rectangle.setOpacity(1.0);
}

red.onGrab(focus, unfocus);
green.onGrab(focus, unfocus);
blue.onGrab(focus, unfocus);

red.setPosition(250, 250);
green.setPosition(200, 100);
blue.setPosition(450, 200);

red.draw();
green.draw();
blue.draw();
