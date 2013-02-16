
var Scratchpad = (function() {

    function px(value) {
        return value + 'px';
    }

    function createDiv() {
        var div = document.createElement('div');

        function setPositioning(value) {
            div.style.position = value;
        }

        function setPosition(leftPixels, topPixels) {
            div.style.left = px(leftPixels);
            div.style.top = px(topPixels);
        }

        function getBackgroundColor() {
            return div.style.backgroundColor;
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

        function onClick(callback) {
            var that = this;

            function clickHandler() {
                callback(that);
            }

            div.addEventListener('click', clickHandler, false);
        }

        function onHover(start, stop) {
            var that = this;

            function enterHandler() {
                start(that);
            }

            function exitHandler() {
                stop(that);
            }

            div.addEventListener('mouseover', enterHandler, false);
            div.addEventListener('mouseout', exitHandler, false);
        }

        function onGrab(grab, release) {
            var that = this;

            function grabHandler() {
                grab(that);
            }

            function releaseHandler() {
                release(that);
            }

            div.addEventListener('mousedown', grabHandler, false);
            div.addEventListener('mouseup', releaseHandler, false);
        }

        function draw() {
            document.body.appendChild(div);
        }

        return {
            'setPositioning': setPositioning,
            'setPosition': setPosition,
            'getBackgroundColor': getBackgroundColor,
            'setBackgroundColor': setBackgroundColor,
            'setOpacity': setOpacity,
            'setWidth': setWidth,
            'setHeight': setHeight,
            'onClick': onClick,
            'onHover': onHover,
            'onGrab': onGrab,
            'draw': draw
        };
    }

    var Positioning = {
        'Absolute': 'absolute'
    };

    var Color = {
        'Black': 'black',
        'Blue': 'blue',
        'Green': 'green',
        'Lime': 'lime',
        'Red': 'red'
    };

    function makeRectangle(color, width, height) {
        var div = createDiv();
        div.setPositioning(Positioning.Absolute);
        div.setBackgroundColor(color);
        div.setWidth(width);
        div.setHeight(height);
        return div;
    }

    return {
        'Color': Color,
        'makeRectangle': makeRectangle
    };
})();
