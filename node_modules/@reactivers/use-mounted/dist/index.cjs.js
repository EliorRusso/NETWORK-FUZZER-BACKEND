'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var react = require('react');

var useMounted = function () {
    var _a = react.useState(false), mounted = _a[0], setMounted = _a[1];
    react.useEffect(function () {
        setMounted(true);
        return function () {
            setMounted(false);
        };
    }, []);
    return mounted;
};

exports.useMounted = useMounted;
