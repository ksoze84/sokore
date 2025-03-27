export type SetStateType<T> = (value: T | Partial<T> | ((prevState: T) => T | Partial<T>)) => void;
export declare function setInitialValue<T, S>(kore: Kore<T, S>, initial_value?: T | (() => T)): void;
export declare const _koreDispatcher: unique symbol;
export declare const _koreControl: unique symbol;
export interface KoreClass<T, S, H extends Kore<T, S> | Koreko<T, S>> {
    new (s?: T): H;
    [_koreControl]?: KoreControl<T, S>;
}
export declare class KoreControl<T, S> {
    koreInstance?: Kore<T, S>;
    listeners?: Set<(p: T, n: T) => void>;
    subscriptions?: Set<(k: Kore<T, S>) => any>;
    dispatch: (prev: T, next: T) => void;
    destroyInstance: (force?: boolean) => void;
}
/**
 * Abstract class representing a "Kore" that have a state and a setState method.
 * This class should be extended to create a custom "kore" with actions.
 * The extended class must be passed to the useSoKore or useKore hook to work with React.
 * When a new instance of the class is created, the instanceCreated() method is called.
 *
 * @template T - The type of the state.
 * @template S - The type of the setState method. Defaults to SetStateType<T>.
 */
export declare abstract class Kore<T, S = SetStateType<T>> {
    /**
     * Configuration object for the Kore.
     *
     * @property {boolean} merge - Indicates whether to merge the state.
     * @property {boolean} destroyOnUnmount - Indicates whether to destroy the state on unmount.
     * @protected
     * @readonly
     */
    protected readonly _koreConfig: {
        merge?: boolean;
        destroyOnUnmount?: boolean;
    };
    /**
     * The current state. Do not set this property directly. Use the setState method instead.
     */
    state?: T;
    /**
     * Optional callback function that is called only once when an instance is created.
     * This Method is called by the useSoKore or useKore hook the first time a component in the application using the hook is effectively mounted and when the instance is "newly created".
     * Prefer this mehtod over the constructor to execute initial code.
     * This method has NOT the same behavior as mount callback a component in React.
     * The only way this method is called again by the hook is destroying the instance first with destroyInstance().
     */
    protected instanceCreated?: () => void;
    /**
     * Optional callback function that is invoked when an instance is deleted with destroyInstance().
     * This method has NOT the same behavior as unmount callback a component in React.
     */
    protected instanceDeleted?: () => void;
    /**
     * Sets the state and notifies all listeners.
     *
     * @param value - The new state or a function that returns the new state based on the previous state.
     */
    protected readonly _setState: SetStateType<T>;
    private readonly [_koreDispatcher];
    /**
     * Sets the state and notifies all listeners. (wrapper for the actual _setState)
     *
     */
    protected setState: S;
    /**
     * Destroys the instance if there are no active listeners.
     * Use this method to delete the instance **on the unmount callback** of the component using it.
     *
     * @param force - If true, the instance is deleted even if there are active listeners.
     */
    destroyInstance: (_force?: boolean) => void;
    /**
     * Constructs a new instance of the Kore class.
     * Prefer use the method instanceCreated() instead of the constructor.
     * Constructor code of the class and its inherited instances constructors are not part of the mounting/unmounting logic of react. Listeners may or may not be ready.
     *
     * @param state - The initial state.
     */
    constructor(state?: T);
}
export declare abstract class Koreko<T, S = SetStateType<T>> extends Kore<T, S> {
    abstract state: T;
}
