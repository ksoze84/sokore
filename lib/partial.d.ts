import React from "react";
import { Kore, Koreko } from "./Kore";
export type SelectorFunction<T, F> = (s: T) => F;
export type CompareFunction<T> = (prevSTate: T, nextState: T) => boolean;
export declare function checkDepsSetter<T, F>(dispatcher: React.Dispatch<React.SetStateAction<T>>, selector?: SelectorFunction<T, F>, compare?: CompareFunction<T>): void | ((p: T, n: T) => void);
export declare function partialMountLogic<T, S, F, H extends (Kore<T, S> | Koreko<T, S>)>(dispatcher: React.Dispatch<React.SetStateAction<T>>, handlerClass: new (s?: T) => H, selector?: SelectorFunction<T, F>, compare?: CompareFunction<T>): () => void;
