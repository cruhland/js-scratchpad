
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

        function setOpacity(value) {
            div.style.opacity = value;
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
            'setOpacity': setOpacity,
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
        'Black': 'black',
        'Blue': 'blue',
        'Green': 'green',
        'Lime': 'lime',
        'Red': 'red'
    };

    function makeRectangle(left, top, color, opacity, width, height) {
        var div = createDiv();
        div.setPosition(Position.Absolute);
        div.setBackgroundColor(color);
        div.setOpacity(opacity);
        div.setWidth(width);
        div.setHeight(height);
        div.setLeft(left);
        div.setTop(top);
        return div;
    }

    return {
        'Color': Color,
        'makeRectangle': makeRectangle
    };
})();
