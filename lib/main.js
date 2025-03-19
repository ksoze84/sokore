'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

/*
MIT License

Copyright (c) 2021 Felipe Rodriguez Herrera

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
 */
var _a;
const _koreDispatcher = Symbol("koreDispatcher");
/**
 * Abstract class representing a "Kore" that have a state and a setState method.
 * This class should be extended to create a custom "kore" with actions.
 * The extended class must be passed to the useSoKore or useKore hook to work with React.
 * When a new instance of the class is created, the instanceCreated() method is called.
 *
 * @template T - The type of the state.
 * @template S - The type of the setState method. Defaults to SetStateType<T>.
 */
class Kore {
    /**
     * Constructs a new instance of the Kore class.
     * Prefer use the method instanceCreated() instead of the constructor.
     * Constructor code of the class and its inherited instances constructors are not part of the mounting/unmounting logic of react. Listeners may or may not be ready.
     *
     * @param state - The initial state.
     */
    constructor(state) {
        /**
         * Configuration object for the Kore.
         *
         * @property {boolean} merge - Indicates whether to merge the state.
         * @property {boolean} destroyOnUnmount - Indicates whether to destroy the state on unmount.
         * @protected
         * @readonly
         */
        this._koreConfig = {};
        /**
         * Sets the state and notifies all listeners.
         *
         * @param value - The new state or a function that returns the new state based on the previous state.
         */
        this._setState = (value) => {
            const oldState = this.state;
            const newState = value instanceof Function ? value(oldState) : value;
            this.state = (this._koreConfig.merge ? Object.assign(Object.assign({}, oldState), newState) : newState);
            this[_koreDispatcher](oldState, this.state);
        };
        this[_a] = undefined;
        /**
         * Sets the state and notifies all listeners. (wrapper for the actual _setState)
         *
         */
        this.setState = this._setState;
        /**
         * Destroys the instance if there are no active listeners.
         * Use this method to delete the instance **on the unmount callback** of the component using it.
         *
         * @param force - If true, the instance is deleted even if there are active listeners.
         */
        this.destroyInstance = undefined;
        if (state !== undefined)
            this.state = state;
    }
}
_a = _koreDispatcher;

/*
MIT License

Copyright (c) 2021 Felipe Rodriguez Herrera

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
 */
const storage = new Map();
const subscriptions = new Map();
function initKore(koreClass, initial_value) {
    var _a, _b;
    if (!storage.has(koreClass.name)) {
        const kore = new koreClass(initial_value instanceof Function ? initial_value() : initial_value);
        storage.set(koreClass.name, { kore });
        kore[_koreDispatcher] = (p, n) => {
            var _a, _b, _c;
            (_b = (_a = storage.get(koreClass.name)) === null || _a === void 0 ? void 0 : _a.listeners) === null || _b === void 0 ? void 0 : _b.forEach(l => l(p, n));
            (_c = subscriptions.get(koreClass.name)) === null || _c === void 0 ? void 0 : _c.forEach(l => l(kore));
        };
        kore.destroyInstance = (force) => destroyInstance(kore, force);
        return kore;
    }
    else {
        const kore = (_a = storage.get(koreClass.name)) === null || _a === void 0 ? void 0 : _a.kore;
        if (((_b = storage.get(koreClass.name)) === null || _b === void 0 ? void 0 : _b.listeners) === undefined && initial_value !== undefined)
            kore.state = initial_value instanceof Function ? initial_value() : initial_value;
        return kore;
    }
}
function destroyInstance(kore, force) {
    var _a, _b, _c, _d;
    if (force === true || ((_c = (_b = (_a = storage.get(kore.constructor.name)) === null || _a === void 0 ? void 0 : _a.listeners) === null || _b === void 0 ? void 0 : _b.size) !== null && _c !== void 0 ? _c : 0) === 0) {
        storage.delete(kore.constructor.name);
        (_d = kore["instanceDeleted"]) === null || _d === void 0 ? void 0 : _d.call(kore);
    }
}
function mountLogic(dispatcher, dispatcherRef, kore) {
    var _a, _b, _c;
    if (!storage.has(kore.constructor.name))
        storage.set(kore.constructor.name, { kore });
    if (!((_a = storage.get(kore.constructor.name)) === null || _a === void 0 ? void 0 : _a.listeners)) {
        storage.get(kore.constructor.name).listeners = new Map([[dispatcherRef, dispatcher]]);
        (_b = kore["instanceCreated"]) === null || _b === void 0 ? void 0 : _b.call(kore);
    }
    else
        (_c = storage.get(kore.constructor.name)) === null || _c === void 0 ? void 0 : _c.listeners.set(dispatcherRef, dispatcher);
    return () => unmountLogic(dispatcherRef, kore);
}
function unmountLogic(dispatcherRef, kore) {
    var _a, _b, _c, _d;
    if (((_c = (_b = (_a = storage.get(kore.constructor.name)) === null || _a === void 0 ? void 0 : _a.listeners) === null || _b === void 0 ? void 0 : _b.size) !== null && _c !== void 0 ? _c : 0) > 0) {
        (_d = storage.get(kore.constructor.name).listeners) === null || _d === void 0 ? void 0 : _d.delete(dispatcherRef);
        if (kore["_koreConfig"].destroyOnUnmount)
            kore.destroyInstance();
    }
}

function removeArrayObject(object, array) {
    var _a;
    let index = (_a = array === null || array === void 0 ? void 0 : array.indexOf(object)) !== null && _a !== void 0 ? _a : -1;
    if (index !== -1) {
        array.splice(index, 1);
        console.log("subs: ", array === null || array === void 0 ? void 0 : array.length);
    }
}
/**
 * Gets the instance of the Kore class.
 * This is not a hook. It will not trigger re-renders when used in components.
 *
 * @template T - The type of the state.
 * @template S - The type of the setState function.
 * @template H - The type of the Kore class.
 * @param koreClass - The constructor of the Kore class.
 * @returns The instance of the Kore class.
 */
function getSoKore(koreClass, subscribeCallback) {
    var _a, _b, _c;
    if (!subscribeCallback)
        return ((_b = (_a = storage.get(koreClass.name)) === null || _a === void 0 ? void 0 : _a.kore) !== null && _b !== void 0 ? _b : initKore(koreClass));
    else {
        subscriptions.set(koreClass.name, [...((_c = subscriptions.get(koreClass.name)) !== null && _c !== void 0 ? _c : []), subscribeCallback]);
        return () => removeArrayObject(subscribeCallback, subscriptions.get(koreClass.name));
    }
}

/*
MIT License

Copyright (c) 2021 Felipe Rodriguez Herrera

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
 */
function checkDepsSetter(dispatcher, selector, compare) {
    if (compare)
        return (oldState, newState) => compare(oldState, newState) && dispatcher(newState);
    else if (selector)
        return (oldState, newState) => {
            const oldSelector = selector(oldState);
            const newSelector = selector(newState);
            if ((newSelector === undefined) !== (oldSelector === undefined))
                dispatcher(newState);
            else if (newSelector instanceof Object)
                for (const key in newSelector) {
                    if (oldSelector[key] !== newSelector[key])
                        dispatcher(newState);
                }
            else if (newSelector !== oldSelector)
                dispatcher(newState);
        };
}

/*
MIT License

Copyright (c) 2021 Felipe Rodriguez Herrera

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
 */
function mountLogicAssign(dispatcher, kore, selector, compare) {
    if ((selector || compare) && compare !== true)
        return mountLogic(checkDepsSetter(dispatcher, selector, compare), dispatcher, kore);
    else
        return mountLogic((_f, n) => dispatcher(n), dispatcher, kore);
}
/**
 *
 * Hook to manage state with a kore class. The handler class must extend `Kore<T>`.
 * This hook will maintain only one instance of the class per application at a time and will be stored and shared.
 *
 * @template T - The type of the state.
 * @template S - The type of the setState.
 * @template H - The type of the handler class, which extends `Kore<T>`
 *
 * @param koreClass - The class of the handler to be used for managing state.
 * @param initial_value - Optional. The initial value of the state, which can be a value of type `T` or a function that returns a value of type `T`.
 *
 * @returns A readonly tuple containing the current state and the handler instance.
 */
function useSoKore(koreClass, initial_value, compare) {
    const kore = initKore(koreClass, initial_value);
    const [_state, set_state] = React__default["default"].useState(kore.state);
    React.useEffect(() => mountLogicAssign(set_state, kore, undefined, compare), [kore]);
    return [kore.state, kore];
}
/**
 *
 * `useSoKore.select` add a selector function as a second parameter to the useSokore hook.
 * A selector function takes the current state and returns something of type `F`.
 * Triggers a re-render only if the selector returns a different value than the previous one.
 *
 * @template T - The type of the state.
 * @template F - The return type of the selector.
 * @template S - The type of the setState.
 * @template H - The type of the handler class, which extends `StateHandler<T>`
 *
 * @param koreClass - The class of the handler to be used for managing state.
 * @param selector - A function that takes the current state and returns something of type `F`.
 * @param initial_value - Optional. The initial value of the state, which can be a value of type `T` or a function that returns a value of type `T`.
 *
 * @returns A readonly tuple containing the current `selector(state)` and the handler instance.
 */
function useSoKoreSelector(koreClass, selector, initial_value, compare) {
    const kore = initKore(koreClass, initial_value);
    const [_state, set_state] = React__default["default"].useState(kore.state);
    React.useEffect(() => mountLogicAssign(set_state, kore, selector, compare), [kore]);
    return [selector(kore.state), kore];
}
useSoKore.select = useSoKoreSelector;
/**
 *
 * `useSoKore.should` add a compare function as a second parameter to the useSokore hook.
 * If this compare function returns true, the state will updated in the component, triggering a re-render.
 *
 * @template T - The type of the state.
 * @template S - The type of the setState.
 * @template H - The type of the handler class, which extends `Kore<T>`
 *
 * @param koreClass - The class of the handler to be used for managing state.
 * @param compare - A function that takes the current state and the new state and returns true if the new state is different from the current state.
 * @param initial_value - Optional. The initial value of the state, which can be a value of type `T` or a function that returns a value of type `T`.
 *
 * @returns A readonly tuple containing the current state and the handler instance.
 */
function useSoKoreCompare(koreDefinition, compare, initial_value) {
    return useSoKore(koreDefinition, initial_value, compare);
}
useSoKore.should = useSoKoreCompare;
/**
 *
 * `useSokore.selectShould` add a selector function parameter and a compare function parameter to the useSokore hook.
 * A selector function takes the current state and returns something of type `F`.
 * If the compare function returns true, the state will updated in the component, triggering a re-render.
 *
 * @template T - The type of the state.
 * @template F - The return type of the selector.
 * @template S - The type of the setState.
 * @template H - The type of the handler class, which extends `StateHandler<T>`
 *
 * @param koreClass - The class of the handler to be used for managing state.
 * @param selector - A function that takes the current state and returns something of type `F`.
 * @param compare - A function that takes the current state and the new state and returns true if the new state is different from the current state.
 * @param initial_value - Optional. The initial value of the state, which can be a value of type `T` or a function that returns a value of type `T`.
 *
 * @returns A readonly tuple containing the current `selector(state)` and the handler instance.
 */
function useSokoreSelectCompare(koreDefinition, selector, compare = true, initial_value) {
    return useSoKoreSelector(koreDefinition, selector, initial_value, compare !== null && compare !== void 0 ? compare : true);
}
useSoKore.selectShould = useSokoreSelectCompare;

/*
MIT License

Copyright (c) 2021 Felipe Rodriguez Herrera

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
 */
function initSimpleKore(koreClass, initial_value, getSetState, compare) {
    const kore = new koreClass(initial_value instanceof Function ? initial_value() : initial_value);
    console.log(compare);
    kore[_koreDispatcher] = compare ? (prevState, newState) => (compare(prevState, newState) && getSetState()(newState)) : ((_, s) => getSetState()(s));
    kore.destroyInstance = () => { var _a; return (_a = kore["instanceDeleted"]) === null || _a === void 0 ? void 0 : _a.call(kore); };
    return kore;
}
/**
 *
 * Hook to manage state with a kore class. The kore class must extend `Kore<T>`.
 * Standalone hook, doesn't persist nor share state with other hooks.
 *
 * @template T - The type of the state.
 * @template S - The type of the setState.
 * @template H - The type of the kore class, which extends `Kore<T>`
 *
 * @param koreClass - The class of the kore to be used for managing state.
 * @param initial_value - Optional. The initial value of the state, which can be a value of type `T` or a function that returns a value of type `T`.
 *
 * @returns A readonly tuple containing the current state and the kore instance.
 */
function useKore(koreClass, initial_value, compare) {
    const [kore,] = React__default["default"].useState(() => initSimpleKore(koreClass, initial_value, () => set_state, compare));
    const [_state, set_state] = React__default["default"].useState(kore.state);
    React.useEffect(() => {
        var _a;
        (_a = kore["instanceCreated"]) === null || _a === void 0 ? void 0 : _a.call(kore);
        return () => kore.destroyInstance();
    }, []);
    return [kore.state, kore];
}
/**
 *
 * `useKore.should` add a compare function as second parameter to the useSokore hook.
 * If this compare function returns true, the state will updated in the component, triggering a re-render.
 *
 * @template T - The type of the state.
 * @template S - The type of the setState.
 * @template H - The type of the kore class, which extends `Kore<T>`
 *
 * @param koreClass - The class of the kore to be used for managing state.
 * @param compare - A function that takes the current state and the new state and returns true if the new state is different from the current state.
 * @param initial_value - Optional. The initial value of the state, which can be a value of type `T` or a function that returns a value of type `T`.
 *
 * @returns A readonly tuple containing the current state and the kore instance.
 */
function useKoreCompare(koreDefinition, compare, initial_value) {
    return useKore(koreDefinition, initial_value, compare);
}
useKore.should = useKoreCompare;

exports.Kore = Kore;
exports.getSoKore = getSoKore;
exports.useKore = useKore;
exports.useSoKore = useSoKore;
