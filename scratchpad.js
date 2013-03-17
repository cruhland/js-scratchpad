
var Scratchpad = (function() {

    function px(value) {
        return value + 'px';
    }

    function createDiv() {
        var div = document.createElement('div');

        function setPositioning(value) {
            div.style.position = value;
        }

        function getLeft() {
            return div.offsetLeft;
        }

        function getTop() {
            return div.offsetTop;
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

        function setText(text) {
            div.innerHTML = text;
        }

        function onClick(callback) {
            var that = this;

            function clickHandler() {
                callback(that);
            }

            div.addEventListener('click', clickHandler, false);
        }

        function onDoubleClick(callback) {
            var that = this;

            function doubleClickHandler() {
                callback(that);
            }

            div.addEventListener('dblclick', doubleClickHandler, false);
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

        function onDrag(grab, release) {
            var that = this;

            function grabHandler(grabEvent) {
                grabEvent.preventDefault();

                var leftOffset = grabEvent.clientX - that.getLeft();
                var topOffset = grabEvent.clientY - that.getTop();

                function dragHandler(dragEvent) {
                    var left = dragEvent.clientX - leftOffset;
                    var top = dragEvent.clientY - topOffset;
                    that.setPosition(left, top);
                }

                var drag = 'mousemove';
                var stop = 'mouseup';

                function releaseHandler() {
                    document.removeEventListener(drag, dragHandler, false);
                    document.removeEventListener(stop, releaseHandler, false);

                    release(that);
                }

                document.addEventListener(drag, dragHandler, false);
                document.addEventListener(stop, releaseHandler, false);

                grab(that);
            }

            div.addEventListener('mousedown', grabHandler, false);
        }

        function draw() {
            document.body.appendChild(div);
        }

        return {
            'setPositioning': setPositioning,
            'getLeft': getLeft,
            'getTop': getTop,
            'setPosition': setPosition,
            'getBackgroundColor': getBackgroundColor,
            'setBackgroundColor': setBackgroundColor,
            'setOpacity': setOpacity,
            'setWidth': setWidth,
            'setHeight': setHeight,
            'setText': setText,
            'onClick': onClick,
            'onDoubleClick': onDoubleClick,
            'onHover': onHover,
            'onGrab': onGrab,
            'onDrag': onDrag,
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

    var Mouse = (function() {

        function onUpdateX(action) {
            function actionWrapper(evt) {
                action(evt.clientX);
            }

            document.addEventListener('mousemove', actionWrapper, false);
        }

        function onUpdateY(action) {
            function actionWrapper(evt) {
                action(evt.clientY);
            }

            document.addEventListener('mousemove', actionWrapper, false);
        }

        return {
            'onUpdateX': onUpdateX,
            'onUpdateY': onUpdateY
        };
    })();

    function makeRectangle(color, width, height) {
        var div = createDiv();
        div.setPositioning(Positioning.Absolute);
        div.setBackgroundColor(color);
        div.setWidth(width);
        div.setHeight(height);
        return div;
    }

    function makeText() {
        var div = createDiv();
        div.setPositioning(Positioning.Absolute);
        return div;
    }

    return {
        'Color': Color,
        'Mouse': Mouse,
        'makeRectangle': makeRectangle,
        'makeText': makeText
    };
})();
