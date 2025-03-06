import { Kore, Koreko } from "./Kore";
import { CompareFunction, SelectorFunction } from "./partial";
declare function useVolKore<T, S, H extends (Kore<T, S> | Koreko<T, S>), J extends T>(koreDefinition: new (s?: T) => H, initial_value: J | (() => J)): Readonly<[T, H]>;
declare function useVolKore<T, S, H extends (Kore<T, S> | Koreko<T, S>), J extends T>(koreDefinition: new (s?: T) => H, initial_value?: J | (() => J)): Readonly<[H extends Koreko<T, S> ? T : T | undefined, H]>;
declare function useVolKore<T, S, H extends (Kore<T, S> | Koreko<T, S>), J extends T>(koreDefinition: [new (s?: T) => H, Array<keyof T> | CompareFunction<T>], initial_value: J | (() => J)): Readonly<[T, H]>;
declare function useVolKore<T, S, H extends (Kore<T, S> | Koreko<T, S>), J extends T>(koreDefinition: [new (s?: T) => H, Array<keyof T> | CompareFunction<T>], initial_value?: J | (() => J)): Readonly<[H extends Koreko<T, S> ? T : T | undefined, H]>;
declare function useVolKore<T, S, F, H extends (Kore<T, S> | Koreko<T, S>), J extends T>(koreDefinition: [new (s?: T) => H, SelectorFunction<T, F>], initial_value: J | (() => J)): Readonly<[F, H]>;
declare function useVolKore<T, S, F, H extends (Kore<T, S> | Koreko<T, S>), J extends T>(koreDefinition: [new (s?: T) => H, SelectorFunction<T, F>], initial_value?: J | (() => J)): Readonly<[H extends Koreko<T, S> ? F : undefined, H]>;
export { useVolKore };
