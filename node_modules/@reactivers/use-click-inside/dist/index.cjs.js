'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var react = require('react');

var useClickInside = function (_a) {
    var ref = _a.ref, callback = _a.callback, _b = _a.withState, withState = _b === void 0 ? false : _b, _c = _a.passive, passive = _c === void 0 ? true : _c;
    var _d = react.useState(false), clickedState = _d[0], setClickedState = _d[1];
    var clickedRef = react.useRef(false);
    var updateSwitch = react.useCallback(function (newValue) {
        if (withState) {
            setClickedState(newValue);
        }
        else {
            clickedRef.current = newValue;
        }
    }, [withState]);
    var onClick = react.useCallback(function (event) {
        if (ref.current) {
            if (ref.current.contains(event.target)) {
                updateSwitch(true);
                callback(event);
            }
            else {
                updateSwitch(false);
            }
        }
    }, [ref.current, callback, updateSwitch]);
    react.useEffect(function () {
        document.addEventListener("click", onClick, { passive: passive });
        return function () {
            document.removeEventListener("click", onClick);
        };
    }, [onClick, passive]);
    return withState ? clickedState : clickedRef.current;
};

exports.useClickInside = useClickInside;
