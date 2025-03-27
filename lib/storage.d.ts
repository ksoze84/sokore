import { Kore, KoreClass, Koreko } from "./Kore";
export declare const storage: Map<string, {
    kore: Kore<any, any>;
    listeners?: Map<Function, (p: any, n: any) => void>;
}>;
export declare const _properInitdKoreko: unique symbol;
export declare function initKore<T, S, H extends (Kore<T, S> | Koreko<T, S>)>(koreClass: KoreClass<T, S, H>, initial_value?: T | (() => T)): H;
