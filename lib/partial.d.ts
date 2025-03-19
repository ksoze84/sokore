import React from "react";
export type SelectorFunction<T, F> = (s: T) => F;
export type CompareFunction<T> = (prevSTate: T, nextState: T) => boolean;
export declare function checkDepsSetter<T, F>(dispatcher: React.Dispatch<React.SetStateAction<T>>, selector?: SelectorFunction<T, F>, compare?: CompareFunction<T>): void | ((p: T, n: T) => void);
