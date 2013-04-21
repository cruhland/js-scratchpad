// Allow new rectangles to be created by clicking and dragging
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

var table = Scratchpad.makeTable('Entity', 'X', 'Y');
var mouseRow = table.makeRow();
mouseRow.setColumn('Entity', 'Mouse');

function mouseUpdateX(x) {
    mouseRow.setColumn('X', x);
}

function mouseUpdateY(y) {
    mouseRow.setColumn('Y', y);
}

Scratchpad.Mouse.onUpdateX(mouseUpdateX);
Scratchpad.Mouse.onUpdateY(mouseUpdateY);

var redRow = table.makeRow();
var greenRow = table.makeRow();
var blueRow = table.makeRow();
redRow.setColumn('Entity', 'Red');
greenRow.setColumn('Entity', 'Green');
blueRow.setColumn('Entity', 'Blue');

function setupDragging(rectangle, tableRow) {

    var leftOffset = null;
    var topOffset = null;

    function grab(x, y) {
        rectangle.setOpacity(0.75);
        leftOffset = x - rectangle.getLeft();
        topOffset = y - rectangle.getTop();
    }

    function move(x, y) {
        rectangle.setPosition(x - leftOffset, y - topOffset);
        tableRow.setColumn('X', rectangle.getLeft());
        tableRow.setColumn('Y', rectangle.getTop());
    }

    function release(x, y) {
        rectangle.setPosition(x - leftOffset, y - topOffset);
        rectangle.setOpacity(1.0);
    }

    rectangle.onDrag(grab, move, release);
}

setupDragging(red, redRow);
setupDragging(green, greenRow);
setupDragging(blue, blueRow);

var displayFocus = Scratchpad.makeText('(none)');

function makeFocus(name) {
    function focus(rectangle) {
        rectangle.setBorder('1px dotted black');
        displayFocus.setText(name);
    }

    return focus;
}

function unfocus(rectangle) {
    rectangle.setBorder('1px solid transparent');
    displayFocus.setText('(none)');
}

red.onFocus(makeFocus('red'));
green.onFocus(makeFocus('green'));
blue.onFocus(makeFocus('blue'));

red.onUnfocus(unfocus);
green.onUnfocus(unfocus);
blue.onUnfocus(unfocus);

red.setPosition(250, 250);
green.setPosition(200, 100);
blue.setPosition(450, 200);

red.draw();
green.draw();
blue.draw();

var info = Scratchpad.makeContainer();
info.setPosition(5, 5);
info.addChild(table);
info.addChild(Scratchpad.makeText('Focused:\u00a0'));
info.addChild(displayFocus);

info.draw();

var newRectangleX = null;
var newRectangleY = null;
var newRectangle = null;

function dragStart(x, y) {
    newRectangleX = x;
    newRectangleY = y;
}

function dragMove(x, y) {
    if (newRectangle === null) {
        newRectangle = Scratchpad.makeRectangle(Color.Black, 0, 0);
        newRectangle.setPosition(newRectangleX, newRectangleY);
        newRectangle.draw();
    }
    newRectangle.setWidth(x - newRectangleX);
    newRectangle.setHeight(y - newRectangleY);
}

function dragStop(x, y) {
    if (newRectangle !== null) {
        newRectangle.setWidth(x - newRectangleX);
        newRectangle.setHeight(y - newRectangleY);
        newRectangle = null;
    }
}

Scratchpad.Document.onDrag(dragStart, dragMove, dragStop);
