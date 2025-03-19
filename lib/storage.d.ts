import { Kore, Koreko } from "./Kore";
export declare const storage: Map<string, {
    kore: Kore<any, any>;
    listeners?: Map<Function, (p: any, n: any) => void>;
}>;
export declare const subscriptions: Map<string, ((updatedKore: any) => any)[]>;
export declare function initKore<T, S, H extends (Kore<T, S> | Koreko<T, S>)>(koreClass: new (s?: T) => H, initial_value?: T | (() => T)): H;
export declare function mountLogic<T, S, H extends (Kore<T, S> | Koreko<T, S>)>(dispatcher: (p: T, n: T) => void, dispatcherRef: Function, kore: H): () => void;
export declare function unmountLogic<T, S>(dispatcherRef: Function, kore: Kore<T, S>): void;
