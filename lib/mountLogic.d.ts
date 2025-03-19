import { Kore, Koreko } from "./Kore";
export declare function mountLogic<T, S, H extends (Kore<T, S> | Koreko<T, S>)>(dispatcher: (p: T, n: T) => void, dispatcherRef: Function, kore: H): () => void;
export declare function unmountLogic<T, S>(dispatcherRef: Function, kore: Kore<T, S>): void;
