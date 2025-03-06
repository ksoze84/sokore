/// <reference types="react" />
import { Kore, Koreko } from "./Kore";
export declare const storage: Map<string, {
    kore: Kore<any, any>;
    listeners?: import("react").Dispatch<any>[] | undefined;
}>;
export declare function initKore<T, S, H extends (Kore<T, S> | Koreko<T, S>)>(koreDefinition: (new (s?: T) => H) | [new (s?: T) => H, unknown], initial_value?: T | (() => T)): H;
export declare function mountLogic<T, S, H extends (Kore<T, S> | Koreko<T, S>)>(dispatcher: React.Dispatch<React.SetStateAction<T>>, koreClass: new (s?: T) => H): () => void;
export declare function unmountLogic<T, S>(dispatcher: React.Dispatch<React.SetStateAction<T>>, kore: Kore<T, S>): void;
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
export declare function getKore<T, S, H extends (Kore<T, S> | Koreko<T, S>)>(koreClass: new (s?: T) => H): H;
