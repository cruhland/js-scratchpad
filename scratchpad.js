
var Scratchpad = (function() {
    var focused = null;

    function px(value) {
        return value + 'px';
    }

    function createDiv() {
        return wrapElement(document.createElement('div'));
    }

    function makeChangeFocus(element) {
        function changeFocus(evt) {
            evt.stopPropagation();
            if (focused !== null) {
                focused.unfocus();
            }
            focused = element;
            if (focused) {
                focused.focus();
            }
        }

        return changeFocus;
    }

    function wrapElement(element) {
        var focusAction = null;
        var unfocusAction = null;

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

        function setBorder(border) {
            element.style.border = border;
        }

        function setBackgroundClip(backgroundClip) {
            element.style.backgroundClip = backgroundClip;
        }

        function setPadding(pixels) {
            element.style.padding = px(pixels);
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

        function focus() {
            if (focusAction !== null) focusAction(this);
        }

        function unfocus() {
            if (unfocusAction !== null) unfocusAction(this);
        }

        function onFocus(action) {
            focusAction = action;
        }

        function onUnfocus(action) {
            unfocusAction = action;
        }

        function draw() {
            document.body.appendChild(element);
        }

        var wrapper = {
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
            'setBorder': setBorder,
            'setBackgroundClip': setBackgroundClip,
            'setPadding': setPadding,
            'onClick': onClick,
            'onDoubleClick': onDoubleClick,
            'onHover': onHover,
            'onGrab': onGrab,
            'onDrag': onDrag,
            'onFocus': onFocus,
            'onUnfocus': onUnfocus,
            'draw': draw,
            'focus': focus,
            'unfocus': unfocus
        };

        element.addEventListener('mousedown', makeChangeFocus(wrapper), false);

        return wrapper;
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
        div.setBackgroundClip('content-box');
        div.setPadding(1);
        div.setBorder('1px solid transparent');
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

    document.addEventListener('mousedown', makeChangeFocus(null), false);

    return {
        'Color': Color,
        'Mouse': Mouse,
        'makeRectangle': makeRectangle,
        'makeText': makeText,
        'findById': findById
    };
})();
