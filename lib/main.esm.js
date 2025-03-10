import React, { useEffect } from 'react';

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
        this._koreConfig = { merge: false, destroyOnUnmount: false };
        /**
         * Sets the state and notifies all listeners.
         *
         * @param value - The new state or a function that returns the new state based on the previous state.
         */
        this._setState = (value) => {
            const newState = value instanceof Function ? value(this.state) : value;
            this.state = (this._koreConfig.merge ? Object.assign(Object.assign({}, this.state), newState) : newState);
            this.__korekoDispatcher_(this.state);
        };
        this.__korekoDispatcher_ = () => { };
        /**
         * Sets the state and notifies all listeners. (wrapper for the actual _setState)
         *
         */
        this.setState = this._setState;
        /**
         * Destroys the instance if there are no active listeners.
         * Use this method to delete the instance **on the unmount callback** of the component using it.
         * Logs a warn if there are active listeners and the instance is not deleted.
         */
        this.destroyInstance = () => { };
        if (state !== undefined)
            this.state = state;
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
const storage = new Map();
function initKore(koreDefinition, initial_value) {
    var _a;
    const koreClass = koreDefinition instanceof Function ? koreDefinition : koreDefinition[0];
    if (!storage.has(koreClass.name)) {
        const kore = new koreClass(initial_value instanceof Function ? initial_value() : initial_value);
        storage.set(koreClass.name, { kore });
        kore.__korekoDispatcher_ = (s) => { var _a, _b; return (_b = (_a = storage.get(koreClass.name)) === null || _a === void 0 ? void 0 : _a.listeners) === null || _b === void 0 ? void 0 : _b.forEach(l => l(s)); };
        kore.destroyInstance = () => destroyInstance(kore);
        return kore;
    }
    else {
        const kore = (_a = storage.get(koreClass.name)) === null || _a === void 0 ? void 0 : _a.kore;
        if (kore.__properInitdKoreko_ === false && initial_value !== undefined) {
            kore.state = initial_value instanceof Function ? initial_value() : initial_value;
            kore.__properInitdKoreko_ = true;
        }
        return kore;
    }
}
function destroyInstance(kore) {
    setTimeout(() => {
        var _a, _b, _c, _d;
        if (((_c = (_b = (_a = storage.get(kore.constructor.name)) === null || _a === void 0 ? void 0 : _a.listeners) === null || _b === void 0 ? void 0 : _b.length) !== null && _c !== void 0 ? _c : 0) === 0) {
            storage.delete(kore.constructor.name);
            (_d = kore["instanceDeleted"]) === null || _d === void 0 ? void 0 : _d.call(kore);
            console.log("Destroying instance");
        }
    }, 5);
}
function mountLogic(dispatcher, koreClass) {
    var _a, _b, _c;
    const kore = initKore(koreClass);
    if (!((_a = storage.get(kore.constructor.name)) === null || _a === void 0 ? void 0 : _a.listeners)) {
        storage.get(kore.constructor.name).listeners = [dispatcher];
        (_b = kore["instanceCreated"]) === null || _b === void 0 ? void 0 : _b.call(kore);
    }
    else
        (_c = storage.get(kore.constructor.name)) === null || _c === void 0 ? void 0 : _c.listeners.push(dispatcher);
    return () => unmountLogic(dispatcher, kore);
}
function unmountLogic(dispatcher, kore) {
    var _a, _b, _c, _d, _e, _f;
    if (((_c = (_b = (_a = storage.get(kore.constructor.name)) === null || _a === void 0 ? void 0 : _a.listeners) === null || _b === void 0 ? void 0 : _b.length) !== null && _c !== void 0 ? _c : 0) > 0) {
        storage.get(kore.constructor.name).listeners = (_f = (_e = (_d = storage.get(kore.constructor.name)) === null || _d === void 0 ? void 0 : _d.listeners) === null || _e === void 0 ? void 0 : _e.filter(l => l !== dispatcher)) !== null && _f !== void 0 ? _f : [];
        if (kore["_koreConfig"].destroyOnUnmount)
            kore.destroyInstance();
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
function getSoKore(koreClass) {
    if (storage.has(koreClass.name))
        return storage.get(koreClass.name).kore;
    else {
        const kore = initKore(koreClass);
        kore.__properInitdKoreko_ = false;
        return kore;
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
function checkDepsSetter(dispatcher, deps) {
    return (newState) => {
        if (deps.length === 1) {
            return dispatcher(s => {
                const oldSelector = deps(s);
                const newSelector = deps(newState);
                if ((newSelector === undefined) !== (oldSelector === undefined))
                    return newState;
                else if (newSelector instanceof Object)
                    for (const key in newSelector) {
                        if (oldSelector[key] !== newSelector[key])
                            return newState;
                    }
                else if (newSelector !== oldSelector)
                    return newState;
                return s;
            });
        }
        else {
            return dispatcher(s => {
                if (deps(s, newState))
                    return newState;
                return s;
            });
        }
    };
}
function partialMountLogic(dispatcher, handlerClass, deps) {
    return mountLogic(checkDepsSetter(dispatcher, deps), handlerClass);
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
function mountLogicAssign(dispatcher, koreDefinition) {
    if (koreDefinition instanceof Function)
        return mountLogic(dispatcher, koreDefinition);
    else
        return partialMountLogic(dispatcher, koreDefinition[0], koreDefinition[1]);
}
/**
 *
 * Hook to manage state with a handler class. The handler class must extend `StateHandler<T>`.
 * This hook will maintain only one instance of the class per application at a time and will be shared between all components that use the [useStateHandler Hook, Class] pair, saving its state.
 * Do not modify the handler state directly. Use the handler setState method instead.
 * Unmounting components will not necessarily affect the instance nor its state.
 *
 * @template T - The type of the state.
 * @template F - The return type of the selector.
 * @template S - The type of the setState.
 * @template H - The type of the handler class, which extends `StateHandler<T>`
 *
 * @param koreDefinition - The class of the handler to be used for managing state.
 * @param initial_value - Optional. The initial value of the state, which can be a value of type `T` or a function that returns a value of type `T`.
 *
 * @returns A readonly tuple containing the current state and the handler instance.
 */
function useSoKore(koreDefinition, initial_value) {
    var _a;
    const kore = initKore(koreDefinition, initial_value);
    const [, setState] = React.useState(kore.state);
    useEffect(() => mountLogicAssign(setState, koreDefinition), []);
    return [((_a = koreDefinition[1]) === null || _a === void 0 ? void 0 : _a.length) === 1 ? koreDefinition[1](kore.state) : kore.state, kore];
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
function initSimpleKore(koreClass, initial_value, getSetState) {
    const kore = new koreClass(initial_value instanceof Function ? initial_value() : initial_value);
    kore.__korekoDispatcher_ = (s) => getSetState()(s);
    kore.destroyInstance = () => { var _a; return (_a = kore["instanceDeleted"]) === null || _a === void 0 ? void 0 : _a.call(kore); };
    return kore;
}
/**
 *
 * Hook to manage state with a handler class. The handler class must extend `StateHandler<T>`.
 * Standalone hook, doesn't persist nor share state with other hooks.
 * Do not modify the handler state directly. Use the handler setState method instead.
 *
 * @template T - The type of the state.
 * @template S - The type of the setState.
 * @template H - The type of the handler class, which extends `StateHandler<T>`
 *
 * @param koreClass - The class of the handler to be used for managing state.
 * @param initial_value - Optional. The initial value of the state, which can be a value of type `T` or a function that returns a value of type `T`.
 *
 * @returns A readonly tuple containing the current state and the handler instance.
 */
function useKore(koreClass, initial_value) {
    const [kore,] = React.useState(() => initSimpleKore(koreClass, initial_value, () => setState));
    const [, setState] = React.useState(kore.state);
    useEffect(() => {
        var _a;
        (_a = kore["instanceCreated"]) === null || _a === void 0 ? void 0 : _a.call(kore);
        return () => kore.destroyInstance();
    }, []);
    return [kore.state, kore];
}

export { Kore, getSoKore, useKore, useSoKore };
