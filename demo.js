
var Color = Scratchpad.Color;
var red = Scratchpad.makeRectangle(250, 250, Color.Red, 1.0, 100, 100);
var green =
    Scratchpad.makeRectangle(200, 100, Color.Lime, 0.25, 300, 200);
var blue = Scratchpad.makeRectangle(450, 200, Color.Blue, 0.75, 75, 400);

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

red.draw();
green.draw();
blue.draw();
