'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var react = require('react');

var usePrevious = function (current) {
    var previous = react.useRef(current);
    react.useEffect(function () {
        previous.current = current;
    }, [current]);
    return previous.current;
};

exports.usePrevious = usePrevious;
