import { Kore, Koreko } from "./Kore";
/**
 * Gets the instance of the Kore class  
 * or subscribe a function to state changes.
 *
 * @template T - The type of the state.
 * @template S - The type of the setState function.
 * @template H - The type of the Kore class.
 * @param koreClass - The constructor of the Kore class.
 * @returns The instance of the Kore class.
 */
declare function getSoKore<T, S, H extends (Kore<T, S> | Koreko<T, S>)>(koreClass: new (s?: T) => H, subscribeCallback: (updatedKore: H) => any): () => void;
/**
 * Gets the instance of the Kore class  
 * or subscribe a function to state changes.
 *
 * @template T - The type of the state.
 * @template S - The type of the setState function.
 * @template H - The type of the Kore class.
 * @param koreClass - The constructor of the Kore class.
 * @returns The instance of the Kore class.
 */
declare function getSoKore<T, S, H extends (Kore<T, S> | Koreko<T, S>)>(koreClass: new (s?: T) => H): H;
export { getSoKore };
