import React from "react";
import { Kore, Koreko } from "./Kore";
import { CompareFunction, SelectorFunction } from "./partial";
export declare function mountLogicAssign<T, S, F, H extends (Kore<T, S> | Koreko<T, S>)>(dispatcher: React.Dispatch<React.SetStateAction<T>>, kore: H, selector?: SelectorFunction<T, F>, compare?: CompareFunction<T>): () => void;
declare function useSoKore<T, S, H extends (Kore<T, S> | Koreko<T, S>), J extends T>(koreClass: new (s?: T) => H, initial_value: J | (() => J)): Readonly<[T, H]>;
declare function useSoKore<T, S, H extends (Kore<T, S> | Koreko<T, S>), J extends T>(koreClass: new (s?: T) => H, initial_value?: J | (() => J)): Readonly<[H extends Koreko<T, S> ? T : T | undefined, H]>;
declare namespace useSoKore {
    var select: typeof useSoKoreSelector;
    var should: typeof useSoKoreCompare;
    var selectShould: typeof useSokoreSelectCompare;
}
declare function useSoKoreSelector<T, S, F, H extends (Kore<T, S> | Koreko<T, S>), J extends T>(koreClass: new (s?: T) => H, selector: SelectorFunction<T, F>, initial_value: J | (() => J)): Readonly<[F, H]>;
declare function useSoKoreSelector<T, S, F, H extends (Kore<T, S> | Koreko<T, S>), J extends T>(koreClass: new (s?: T) => H, selector: SelectorFunction<T, F>, initial_value?: J | (() => J)): H extends Koreko<T, S> ? Readonly<[F, H]> : Readonly<[(F | undefined), H]>;
declare function useSoKoreCompare<T, S, H extends (Kore<T, S> | Koreko<T, S>), J extends T>(koreDefinition: new (s?: T) => H, compare: CompareFunction<T>, initial_value: J | (() => J)): Readonly<[T, H]>;
declare function useSoKoreCompare<T, S, H extends (Kore<T, S> | Koreko<T, S>), J extends T>(koreDefinition: new (s?: T) => H, compare: CompareFunction<T>, initial_value?: J | (() => J)): Readonly<[H extends Koreko<T, S> ? T : T | undefined, H]>;
declare function useSokoreSelectCompare<T, S, F, H extends (Kore<T, S> | Koreko<T, S>), J extends T>(koreDefinition: new (s?: T) => H, selector: SelectorFunction<T, F>, compare: CompareFunction<T>, initial_value: J | (() => J)): Readonly<[F, H]>;
declare function useSokoreSelectCompare<T, S, F, H extends (Kore<T, S> | Koreko<T, S>), J extends T>(koreDefinition: new (s?: T) => H, selector: SelectorFunction<T, F>, compare: CompareFunction<T>, initial_value?: J | (() => J)): Readonly<[H extends Koreko<T, S> ? F : F | undefined, H]>;
export { useSoKore };
