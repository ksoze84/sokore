import React from "react";
import { Kore, Koreko } from "./Kore";
export type SelectorFunction<T, F> = (s: T) => F;
export type CompareFunction<T> = (prevSTate: T, nextState: T) => boolean;
export type DepsOrComp<T, F> = SelectorFunction<T, F> | CompareFunction<T>;
export declare function checkDepsSetter<T, F>(dispatcher: React.Dispatch<React.SetStateAction<T>>, deps: DepsOrComp<T, F>): (newState: T) => void;
export declare function partialMountLogic<T, S, F, H extends (Kore<T, S> | Koreko<T, S>)>(dispatcher: React.Dispatch<React.SetStateAction<T>>, handlerClass: new (s?: T) => H, deps: DepsOrComp<T, F>): () => void;
