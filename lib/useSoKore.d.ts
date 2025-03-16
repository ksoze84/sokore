import React from "react";
import { Kore, Koreko } from "./Kore";
import { CompareFunction, SelectorFunction } from "./partial";
export declare function mountLogicAssign<T, S, F, H extends (Kore<T, S> | Koreko<T, S>)>(dispatcher: React.Dispatch<React.SetStateAction<T>>, koreClass: new (s?: T) => H, selector?: SelectorFunction<T, F>, compare?: CompareFunction<T>): () => void;
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
declare function useSoKore<T, S, H extends (Kore<T, S> | Koreko<T, S>), J extends T>(koreClass: new (s?: T) => H, initial_value: J | (() => J)): Readonly<[T, H]>;
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
declare function useSoKore<T, S, H extends (Kore<T, S> | Koreko<T, S>), J extends T>(koreClass: new (s?: T) => H, initial_value?: J | (() => J)): Readonly<[H extends Koreko<T, S> ? T : T | undefined, H]>;
declare namespace useSoKore {
    var select: typeof useSoKoreSelector;
    var should: typeof useSoKoreCompare;
    var selectShould: typeof useSokoreSelectCompare;
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
declare function useSoKoreSelector<T, S, F, H extends (Kore<T, S> | Koreko<T, S>), J extends T>(koreClass: new (s?: T) => H, selector: SelectorFunction<T, F>, initial_value: J | (() => J)): Readonly<[F, H]>;
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
declare function useSoKoreSelector<T, S, F, H extends (Kore<T, S> | Koreko<T, S>), J extends T>(koreClass: new (s?: T) => H, selector: SelectorFunction<T, F>, initial_value?: J | (() => J)): H extends Koreko<T, S> ? Readonly<[F, H]> : Readonly<[(F | undefined), H]>;
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
declare function useSoKoreCompare<T, S, H extends (Kore<T, S> | Koreko<T, S>), J extends T>(koreDefinition: new (s?: T) => H, compare: CompareFunction<T>, initial_value: J | (() => J)): Readonly<[T, H]>;
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
declare function useSoKoreCompare<T, S, H extends (Kore<T, S> | Koreko<T, S>), J extends T>(koreDefinition: new (s?: T) => H, compare: CompareFunction<T>, initial_value?: J | (() => J)): Readonly<[H extends Koreko<T, S> ? T : T | undefined, H]>;
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
declare function useSokoreSelectCompare<T, S, F, H extends (Kore<T, S> | Koreko<T, S>), J extends T>(koreDefinition: new (s?: T) => H, selector: SelectorFunction<T, F>, compare: CompareFunction<T>, initial_value: J | (() => J)): Readonly<[F, H]>;
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
declare function useSokoreSelectCompare<T, S, F, H extends (Kore<T, S> | Koreko<T, S>), J extends T>(koreDefinition: new (s?: T) => H, selector: SelectorFunction<T, F>, compare: CompareFunction<T>, initial_value?: J | (() => J)): Readonly<[H extends Koreko<T, S> ? F : F | undefined, H]>;
export { useSoKore };
