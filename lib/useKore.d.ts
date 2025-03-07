import { Kore, Koreko } from "./Kore";
declare function useKore<T, S, H extends (Kore<T, S> | Koreko<T, S>), J extends T>(koreClass: new (s?: T) => H, initial_value: J | (() => J)): Readonly<[T, H]>;
declare function useKore<T, S, H extends (Kore<T, S> | Koreko<T, S>), J extends T>(koreClass: new (s?: T) => H, initial_value?: J | (() => J)): Readonly<[H extends Koreko<T, S> ? T : T | undefined, H]>;
export { useKore };
