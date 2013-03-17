
var Scratchpad = (function() {

    function px(value) {
        return value + 'px';
    }

    function createDiv() {
        return wrapElement(document.createElement('div'));
    }

    function wrapElement(element) {

        function setPositioning(value) {
            element.style.position = value;
        }

        function getLeft() {
            return element.offsetLeft;
        }

        function getTop() {
            return element.offsetTop;
        }

        function setPosition(leftPixels, topPixels) {
            element.style.left = px(leftPixels);
            element.style.top = px(topPixels);
        }

        function getBackgroundColor() {
            return element.style.backgroundColor;
        }

        function setBackgroundColor(value) {
            element.style.backgroundColor = value;
        }

        function setOpacity(value) {
            element.style.opacity = value;
        }

        function setWidth(pixels) {
            element.style.width = px(pixels);
        }

        function setHeight(pixels) {
            element.style.height = px(pixels);
        }

        function setText(text) {
            element.innerHTML = text;
        }

        function onClick(callback) {
            var that = this;

            function clickHandler() {
                callback(that);
            }

            element.addEventListener('click', clickHandler, false);
        }

        function onDoubleClick(callback) {
            var that = this;

            function doubleClickHandler() {
                callback(that);
            }

            element.addEventListener('dblclick', doubleClickHandler, false);
        }

        function onHover(start, stop) {
            var that = this;

            function enterHandler() {
                start(that);
            }

            function exitHandler() {
                stop(that);
            }

            element.addEventListener('mouseover', enterHandler, false);
            element.addEventListener('mouseout', exitHandler, false);
        }

        function onGrab(grab, release) {
            var that = this;

            function grabHandler() {
                grab(that);
            }

            function releaseHandler() {
                release(that);
            }

            element.addEventListener('mousedown', grabHandler, false);
            element.addEventListener('mouseup', releaseHandler, false);
        }

        function onDrag(grab, move, release) {
            var that = this;

            function grabHandler(grabEvent) {
                grabEvent.preventDefault();

                var leftOffset = grabEvent.clientX - that.getLeft();
                var topOffset = grabEvent.clientY - that.getTop();

                function dragHandler(dragEvent) {
                    var left = dragEvent.clientX - leftOffset;
                    var top = dragEvent.clientY - topOffset;
                    that.setPosition(left, top);

                    move(that);
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

            element.addEventListener('mousedown', grabHandler, false);
        }

        function draw() {
            document.body.appendChild(element);
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

    function findById(id) {
        var element = document.getElementById(id);
        return element === null ? element : wrapElement(element);
    }

    return {
        'Color': Color,
        'Mouse': Mouse,
        'makeRectangle': makeRectangle,
        'makeText': makeText,
        'findById': findById
    };
})();
