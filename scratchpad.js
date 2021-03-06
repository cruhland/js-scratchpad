
var Scratchpad = (function() {
    var focused = null;

    function px(value) {
        return value + 'px';
    }

    function createDiv() {
        return wrapElement(document.createElement('div'));
    }

    function createTable() {
        var table = document.createElement('table');
        var thead = document.createElement('thead');
        var tbody = document.createElement('tbody');
        table.appendChild(thead);
        table.appendChild(tbody);

        var headRow = document.createElement('tr');
        thead.appendChild(headRow);

        var columnNames = [];

        function addColumn(name) {
            var td = document.createElement('td');
            td.textContent = name;
            headRow.appendChild(td);
            columnNames.push(name);
        }

        function makeRow() {
            var bodyRow = document.createElement('tr');
            var row = {};
            for (var i = 0; i < columnNames.length; i++) {
                var cell = document.createElement('td');
                bodyRow.appendChild(cell);
                row[columnNames[i]] = cell;
            }
            tbody.appendChild(bodyRow);

            function setColumn(columnName, value) {
                row[columnName].textContent = value;
            }

            return {
                'setColumn': setColumn
            };
        }

        return {
            'addColumn': addColumn,
            'element': table,
            'makeRow': makeRow
        };
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

    function makeOnDrag(element) {

        function onDrag(start, move, stop) {

            function grabHandler(evt) {
                evt.preventDefault();

                function dragHandler(evt) {
                    move(evt.clientX, evt.clientY);
                }

                var drag = 'mousemove';
                var done = 'mouseup';

                function releaseHandler(evt) {
                    document.removeEventListener(drag, dragHandler, false);
                    document.removeEventListener(done, releaseHandler, false);

                    stop(evt.clientX, evt.clientY);
                }

                document.addEventListener(drag, dragHandler, false);
                document.addEventListener(done, releaseHandler, false);

                start(evt.clientX, evt.clientY);
            }

            element.addEventListener('mousedown', grabHandler, false);
        }

        return onDrag;
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

        function addChild(child) {
            element.appendChild(child.element);
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
            'onDrag': makeOnDrag(element),
            'onFocus': onFocus,
            'onUnfocus': onUnfocus,
            'draw': draw,
            'focus': focus,
            'unfocus': unfocus,
            'addChild': addChild,
            'element': element
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

    function makeContainer() {
        var div = createDiv();
        div.setPositioning(Positioning.Absolute);
        return div;
    }

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

    function makeTable() {
        var table = createTable();
        for (var i = 0; i < arguments.length; i++) {
            table.addColumn(arguments[i]);
        }
        return table;
    }

    function makeText(initialText) {
        var element = document.createTextNode(initialText);

        function setText(text) {
            element.textContent = text;
        }

        return {
            'setText': setText,
            'element': element
        };
    }

    function findById(id) {
        var element = document.getElementById(id);
        return element === null ? element : wrapElement(element);
    }

    document.addEventListener('mousedown', makeChangeFocus(null), false);

    var Document = {
        'onDrag': makeOnDrag(document)
    };

    return {
        'Color': Color,
        'Document': Document,
        'Mouse': Mouse,
        'makeContainer': makeContainer,
        'makeRectangle': makeRectangle,
        'makeTable': makeTable,
        'makeText': makeText,
        'findById': findById
    };
})();
