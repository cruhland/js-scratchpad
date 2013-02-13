// Put a solid black square of fixed size on the screen.

function createDiv() {
    var div = document.createElement('div');

    function setPosition(value) {
        div.style.position = value;
    }

    function setBackgroundColor(value) {
        div.style.backgroundColor = value;
    }

    function setWidth(value) {
        div.style.width = value;
    }

    function setHeight(value) {
        div.style.height = value;
    }

    function setLeft(value) {
        div.style.left = value;
    }

    function setTop(value) {
        div.style.top = value;
    }

    function draw() {
        document.body.appendChild(div);
    }

    return {
        'setPosition': setPosition,
        'setBackgroundColor': setBackgroundColor,
        'setWidth': setWidth,
        'setHeight': setHeight,
        'setLeft': setLeft,
        'setTop': setTop,
        'draw': draw
    };
}

function drawSquare() {
    var div = createDiv();
    div.setPosition('absolute');
    div.setBackgroundColor('black');
    div.setWidth('100px');
    div.setHeight('100px');
    div.setLeft('250px');
    div.setTop('250px');
    div.draw();
}

drawSquare();
