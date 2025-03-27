import { Kore, Koreko } from "./Kore";
import { CompareFunction } from "./partial";
declare function useKore<T, S, H extends (Kore<T, S> | Koreko<T, S>), J extends T>(koreClass: new (s?: T) => H, initial_value: J | (() => J)): Readonly<[T, H]>;
declare function useKore<T, S, H extends (Kore<T, S> | Koreko<T, S>), J extends T>(koreClass: new (s?: T) => H, initial_value?: J | (() => J)): Readonly<[H extends Koreko<T, S> ? T : T | undefined, H]>;
declare namespace useKore {
    var should: typeof useKoreCompare;
}
declare function useKoreCompare<T, S, H extends (Kore<T, S> | Koreko<T, S>), J extends T>(koreDefinition: new (s?: T) => H, compare: CompareFunction<T>, initial_value: J | (() => J)): Readonly<[T, H]>;
declare function useKoreCompare<T, S, H extends (Kore<T, S> | Koreko<T, S>), J extends T>(koreDefinition: new (s?: T) => H, compare: CompareFunction<T>, initial_value?: J | (() => J)): Readonly<[H extends Koreko<T, S> ? T : T | undefined, H]>;
export { useKore };
