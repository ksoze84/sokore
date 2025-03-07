import { Kore, Koreko } from "./Kore";
import { CompareFunction, SelectorFunction } from "./partial";
/**
 * 
 * Hook to manage state with a handler class. The handler class must extend `StateHandler<T>`.  
 * This hook will maintain only one instance of the class per application at a time and will be shared between all components that use the [useStateHandler Hook, Class] pair, saving its state.  
 * Do not modify the handler state directly. Use the handler setState method instead.  
 * Unmounting components will not necessarily affect the instance nor its state.
 *
 * @template T - The type of the state.
 * @template S - The type of the setState.
 * @template H - The type of the handler class, which extends `StateHandler<T>`
 * 
 * @param koreDefinition - The class of the handler to be used for managing state.
 * @param initial_value - Optional. The initial value of the state, which can be a value of type `T` or a function that returns a value of type `T`.
 * 
 * @returns A readonly tuple containing the current state and the handler instance.
 */
declare function useSoKore<T, S, H extends (Kore<T, S> | Koreko<T, S>), J extends T>(koreDefinition: new (s?: T) => H, initial_value: J | (() => J)): Readonly<[T, H]>;
/**
 * 
 * Hook to manage state with a handler class. The handler class must extend `StateHandler<T>`.  
 * This hook will maintain only one instance of the class per application at a time and will be shared between all components that use the [useStateHandler Hook, Class] pair, saving its state.  
 * Do not modify the handler state directly. Use the handler setState method instead.  
 * Unmounting components will not necessarily affect the instance nor its state.
 *
 * @template T - The type of the state.
 * @template S - The type of the setState.
 * @template H - The type of the handler class, which extends `StateHandler<T>`
 * 
 * @param koreDefinition - The class of the handler to be used for managing state.
 * @param initial_value - Optional. The initial value of the state, which can be a value of type `T` or a function that returns a value of type `T`.
 * 
 * @returns A readonly tuple containing the current state and the handler instance.
 */
declare function useSoKore<T, S, H extends (Kore<T, S> | Koreko<T, S>), J extends T>(koreDefinition: new (s?: T) => H, initial_value?: J | (() => J)): Readonly<[H extends Koreko<T, S> ? T : T | undefined, H]>;
/**
 * 
 * Hook to manage state with a handler class. The handler class must extend `StateHandler<T>`.  
 * This hook will maintain only one instance of the class per application at a time and will be shared between all components that use the [useStateHandler Hook, Class] pair, saving its state.  
 * Do not modify the handler state directly. Use the handler setState method instead.  
 * Unmounting components will not necessarily affect the instance nor its state.
 *
 * @template T - The type of the state.
 * @template S - The type of the setState.
 * @template H - The type of the handler class, which extends `StateHandler<T>`
 * 
 * @param koreDefinition - The class of the handler to be used for managing state.
 * @param initial_value - Optional. The initial value of the state, which can be a value of type `T` or a function that returns a value of type `T`.
 * 
 * @returns A readonly tuple containing the current state and the handler instance.
 */
declare function useSoKore<T, S, H extends (Kore<T, S> | Koreko<T, S>), J extends T>(koreDefinition: [new (s?: T) => H, Array<keyof T> | CompareFunction<T>], initial_value: J | (() => J)): Readonly<[T, H]>;
/**
 * 
 * Hook to manage state with a handler class. The handler class must extend `StateHandler<T>`.  
 * This hook will maintain only one instance of the class per application at a time and will be shared between all components that use the [useStateHandler Hook, Class] pair, saving its state.  
 * Do not modify the handler state directly. Use the handler setState method instead.  
 * Unmounting components will not necessarily affect the instance nor its state.
 *
 * @template T - The type of the state.
 * @template S - The type of the setState.
 * @template H - The type of the handler class, which extends `StateHandler<T>`
 * 
 * @param koreDefinition - The class of the handler to be used for managing state.
 * @param initial_value - Optional. The initial value of the state, which can be a value of type `T` or a function that returns a value of type `T`.
 * 
 * @returns A readonly tuple containing the current state and the handler instance.
 */
declare function useSoKore<T, S, H extends (Kore<T, S> | Koreko<T, S>), J extends T>(koreDefinition: [new (s?: T) => H, Array<keyof T> | CompareFunction<T>], initial_value?: J | (() => J)): Readonly<[H extends Koreko<T, S> ? T : T | undefined, H]>;
/**
 * 
 * Hook to manage state with a handler class. The handler class must extend `StateHandler<T>`.  
 * This hook will maintain only one instance of the class per application at a time and will be shared between all components that use the [useStateHandler Hook, Class] pair, saving its state.  
 * Do not modify the handler state directly. Use the handler setState method instead.  
 * Unmounting components will not necessarily affect the instance nor its state.
 *
 * @template T - The type of the state.
 * @template S - The type of the setState.
 * @template H - The type of the handler class, which extends `StateHandler<T>`
 * 
 * @param koreDefinition - The class of the handler to be used for managing state.
 * @param initial_value - Optional. The initial value of the state, which can be a value of type `T` or a function that returns a value of type `T`.
 * 
 * @returns A readonly tuple containing the current state and the handler instance.
 */
declare function useSoKore<T, S, F, H extends (Kore<T, S> | Koreko<T, S>), J extends T>(koreDefinition: [new (s?: T) => H, SelectorFunction<T, F>], initial_value: J | (() => J)): Readonly<[F, H]>;
/**
 * 
 * Hook to manage state with a handler class. The handler class must extend `StateHandler<T>`.  
 * This hook will maintain only one instance of the class per application at a time and will be shared between all components that use the [useStateHandler Hook, Class] pair, saving its state.  
 * Do not modify the handler state directly. Use the handler setState method instead.  
 * Unmounting components will not necessarily affect the instance nor its state.
 *
 * @template T - The type of the state.
 * @template S - The type of the setState.
 * @template H - The type of the handler class, which extends `StateHandler<T>`
 * 
 * @param koreDefinition - The class of the handler to be used for managing state.
 * @param initial_value - Optional. The initial value of the state, which can be a value of type `T` or a function that returns a value of type `T`.
 * 
 * @returns A readonly tuple containing the derived state and the handler instance.
 */
declare function useSoKore<T, S, F, H extends (Kore<T, S> | Koreko<T, S>), J extends T>(koreDefinition: [new (s?: T) => H, SelectorFunction<T, F>], initial_value?: J | (() => J)): Readonly<[H extends Koreko<T, S> ? F : undefined, H]>;
export { useSoKore };
