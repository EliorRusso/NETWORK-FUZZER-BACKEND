'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var react = require('react');
var jsxRuntime = require('react/jsx-runtime');

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

var guid = function () {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
};

var EventListenerContext = react.createContext({});
var EventListenerProvider = function (_a) {
    var children = _a.children;
    var events = react.useRef({}).current;
    var removeEvent = react.useCallback(function (component, name, id) {
        if (!!events)
            if (!!events[component])
                if (!!events[component][name])
                    delete events[component][name][id];
    }, [events]);
    var registerEvent = react.useCallback(function (component, name, event) {
        var newEventId = guid();
        if (!events[component])
            events[component] = {};
        if (!events[component][name])
            events[component][name] = {};
        events[component][name][newEventId] = event;
        return (function () { return removeEvent(component, name, newEventId); });
    }, [events, removeEvent]);
    var registerEventById = react.useCallback(function (component, name, newEventId, event) {
        if (!events[component])
            events[component] = {};
        if (!events[component][name])
            events[component][name] = {};
        events[component][name][newEventId] = event;
        return (function () {
            removeEvent(component, name, newEventId);
        });
    }, [events, removeEvent]);
    var callEvent = react.useCallback(function (component, name, id, parameters) {
        var _events = events[component] || {};
        var registeredEvents = _events[name] || {};
        var registeredEvent = registeredEvents[id];
        if (registeredEvent)
            return registeredEvent(parameters);
    }, [events]);
    var callAllEvents = react.useCallback(function (component, name, parameters, callback) {
        var _events = events[component] || {};
        var registeredEvents = _events[name] || {};
        Object.keys(registeredEvents).forEach(function (key) {
            var result = callEvent(component, name, key, parameters);
            if (callback) {
                callback(result);
            }
        });
    }, [events]);
    return (jsxRuntime.jsx(EventListenerContext.Provider, __assign({ value: {
            removeEvent: removeEvent,
            registerEvent: registerEvent,
            registerEventById: registerEventById,
            callEvent: callEvent,
            callAllEvents: callAllEvents,
        } }, { children: children }), void 0));
};
var useEventListenerContext = function () {
    var context = react.useContext(EventListenerContext);
    if (context === undefined) {
        throw new Error('useEventListenerContext must be used within an EventListenerContext');
    }
    return context;
};

var useEventListener = function (component) {
    var _a = useEventListenerContext(), _registerEvent = _a.registerEvent, _registerEventById = _a.registerEventById, _removeEvent = _a.removeEvent, _callAllEvents = _a.callAllEvents, _callEvent = _a.callEvent;
    var registerEvent = react.useCallback(function (name, event) {
        if (_registerEvent)
            return _registerEvent(component, name, event);
    }, [_registerEvent, component]);
    var registerEventById = react.useCallback(function (name, id, event) {
        if (_registerEventById)
            return _registerEventById(component, name, id, event);
    }, [_registerEventById, component]);
    var removeEvent = react.useCallback(function (name, id) { return _removeEvent && _removeEvent(component, name, id); }, [_removeEvent, component]);
    var callAllEvents = react.useCallback(function (name, parameters, callback) {
        return _callAllEvents && _callAllEvents(component, name, parameters, callback);
    }, [_callAllEvents, component]);
    var callEvent = react.useCallback(function (name, id, parameters) {
        return _callEvent && _callEvent(component, name, id, parameters);
    }, [_callEvent, component]);
    return { registerEvent: registerEvent, registerEventById: registerEventById, removeEvent: removeEvent, callAllEvents: callAllEvents, callEvent: callEvent };
};

exports.EventListenerProvider = EventListenerProvider;
exports.useEventListener = useEventListener;
