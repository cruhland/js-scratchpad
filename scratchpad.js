// Put a solid black square of fixed size on the screen.

function drawSquare() {
    var div = document.createElement('div');
    div.style.position = 'absolute';
    div.style.backgroundColor = 'black';
    div.style.width = '100px';
    div.style.height = '100px';
    div.style.left = '250px';
    div.style.top = '250px';
    document.body.appendChild(div);
}

drawSquare();
