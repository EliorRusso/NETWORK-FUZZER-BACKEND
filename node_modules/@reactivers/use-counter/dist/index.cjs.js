'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var react = require('react');

var useCounter = function (params) {
    if (params === void 0) { params = { initial: 0 }; }
    var _a = react.useState(params.initial), counter = _a[0], setCounter = _a[1];
    var increase = react.useCallback(function (by) {
        if (by === void 0) { by = 1; }
        setCounter(function (old) { return old + by; });
    }, []);
    var decrease = react.useCallback(function (by) {
        if (by === void 0) { by = 1; }
        setCounter(function (old) { return old - by; });
    }, []);
    var reset = react.useCallback(function () {
        setCounter(params.initial);
    }, [params.initial]);
    return { counter: counter, setCounter: setCounter, reset: reset, increase: increase, decrease: decrease };
};

exports.useCounter = useCounter;
