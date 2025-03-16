import { Kore, Koreko } from "./Kore";
import { CompareFunction } from "./partial";
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
declare function useKore<T, S, H extends (Kore<T, S> | Koreko<T, S>), J extends T>(koreClass: new (s?: T) => H, initial_value: J | (() => J)): Readonly<[T, H]>;
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
declare function useKore<T, S, H extends (Kore<T, S> | Koreko<T, S>), J extends T>(koreClass: new (s?: T) => H, initial_value?: J | (() => J)): Readonly<[H extends Koreko<T, S> ? T : T | undefined, H]>;
declare namespace useKore {
    var should: typeof useKoreCompare;
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
declare function useKoreCompare<T, S, H extends (Kore<T, S> | Koreko<T, S>), J extends T>(koreDefinition: new (s?: T) => H, compare: CompareFunction<T>, initial_value: J | (() => J)): Readonly<[T, H]>;
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
declare function useKoreCompare<T, S, H extends (Kore<T, S> | Koreko<T, S>), J extends T>(koreDefinition: new (s?: T) => H, compare: CompareFunction<T>, initial_value?: J | (() => J)): Readonly<[H extends Koreko<T, S> ? T : T | undefined, H]>;
export { useKore };
