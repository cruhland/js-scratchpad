
var Scratchpad = (function() {

    function px(value) {
        return value + 'px';
    }

    function createDiv() {
        var div = document.createElement('div');

        function setPosition(value) {
            div.style.position = value;
        }

        function setBackgroundColor(value) {
            div.style.backgroundColor = value;
        }

        function setWidth(pixels) {
            div.style.width = px(pixels);
        }

        function setHeight(pixels) {
            div.style.height = px(pixels);
        }

        function setLeft(pixels) {
            div.style.left = px(pixels);
        }

        function setTop(pixels) {
            div.style.top = px(pixels);
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

    var Position = {
        'Absolute': 'absolute'
    };

    var Color = {
        'Black': 'black'
    };

    function drawSquare() {
        var div = createDiv();
        div.setPosition(Position.Absolute);
        div.setBackgroundColor(Color.Black);
        div.setWidth(100);
        div.setHeight(100);
        div.setLeft(250);
        div.setTop(250);
        div.draw();
    }

    return {
        'drawSquare': drawSquare
    };
})();
