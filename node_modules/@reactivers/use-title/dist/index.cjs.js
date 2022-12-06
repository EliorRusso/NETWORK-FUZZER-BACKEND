'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var react = require('react');

var useTitle = function (props) {
    if (props === void 0) { props = { title: undefined, setOldTitleOnUnmount: false }; }
    var title = props.title, setOldTitleOnUnmount = props.setOldTitleOnUnmount;
    var initialTitle = react.useRef();
    var setTitle = react.useCallback(function (title) {
        document.title = title;
    }, []);
    react.useEffect(function () {
        initialTitle.current = document.title;
    }, []);
    react.useEffect(function () {
        if (title)
            setTitle(title);
        return function () {
            if (setOldTitleOnUnmount)
                setTitle(initialTitle.current);
        };
    }, [setTitle, title, initialTitle.current, setOldTitleOnUnmount]);
    return {
        title: title,
        setTitle: setTitle
    };
};

exports.useTitle = useTitle;
