"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var stores = [];
var Store = /** @class */ (function () {
    function Store(value) {
        var _this = this;
        if (value === void 0) { value = null; }
        this.subscriptions = [];
        this.set = function (value) {
            var oldState = _this.state;
            _this.state = value;
            _this.subscriptions.forEach(function (cb) { return cb(_this.state, oldState); });
        };
        this.update = function (cb) {
            var newState = cb(_this.state);
            _this.set(newState);
        };
        this.subscribe = function (cb) {
            _this.subscriptions.push(cb);
        };
        this.unsubscribe = function (cb) {
            _this.subscriptions = _this.subscriptions.filter(function (c) { return c !== cb; });
        };
        this.state = value;
    }
    ;
    return Store;
}());
;
exports.createStore = function (id, value) {
    if (value === void 0) { value = null; }
    stores[id] = new Store(value);
    return stores[id];
};
exports.useStore = function (id, initialValue) {
    var _a = react_1.useState(initialValue), state = _a[0], setState = _a[1];
    var store = react_1.useRef(stores[id]);
    react_1.useMemo(function () {
        if (!store.current) {
            store.current = exports.createStore(id, initialValue);
        }
    }, [id, initialValue]);
    react_1.useEffect(function () {
        store.current.subscribe(setState);
        return function () { return store.current.unsubscribe(setState); };
    }, [setState]);
    return [state, store.current.set];
};
