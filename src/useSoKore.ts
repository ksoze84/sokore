/* 
MIT License

Copyright (c) 2021 Felipe Rodriguez Herrera

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
 */


import React, { useEffect } from "react";
import { Kore, Koreko } from "./Kore";
import { initKore, mountLogic } from "./storage";
import { CompareFunction, DepsOrComp, partialMountLogic, SelectorFunction } from "./partial";


function mountLogicAssign<T, S, F, H extends (Kore<T, S>|Koreko<T, S>)>( dispatcher: React.Dispatch<React.SetStateAction<T>>, koreDefinition : (new ( s?:T ) => H) | [new ( s?:T ) => H, DepsOrComp<T, F>]  ) {
  if (koreDefinition instanceof Function)
    return mountLogic( dispatcher, koreDefinition );
  else
    return partialMountLogic( dispatcher, koreDefinition[0], koreDefinition[1] );
}

function useSoKore<T, S, H extends (Kore<T, S>|Koreko<T, S>), J extends T>( koreDefinition : new ( s?:T ) => H, initial_value : J | (() => J)) : Readonly<[T, H]>
function useSoKore<T, S, H extends (Kore<T, S>|Koreko<T, S>), J extends T>( koreDefinition : new ( s?:T ) => H, initial_value? : J | (() => J)) : Readonly<[ H extends Koreko<T, S> ? T : T | undefined, H]>

function useSoKore<T, S, H extends (Kore<T, S>|Koreko<T, S>), J extends T>( koreDefinition : [new ( s?:T ) => H, Array<keyof T> | CompareFunction<T>], initial_value : J | (() => J)) : Readonly<[T, H]>
function useSoKore<T, S, H extends (Kore<T, S>|Koreko<T, S>), J extends T>( koreDefinition : [new ( s?:T ) => H, Array<keyof T> | CompareFunction<T>], initial_value? : J | (() => J)) : Readonly<[ H extends Koreko<T, S> ? T : T | undefined, H]>

function useSoKore<T, S, F, H extends (Kore<T, S>|Koreko<T, S>), J extends T>( koreDefinition : [new ( s?:T ) => H, SelectorFunction<T, F>], initial_value : J | (() => J)) : Readonly<[F , H]>
function useSoKore<T, S, F, H extends (Kore<T, S>|Koreko<T, S>), J extends T>( koreDefinition : [new ( s?:T ) => H, SelectorFunction<T, F>], initial_value? : J | (() => J)) : Readonly<[H extends Koreko<T, S> ? F : undefined, H]>

/**
 * 
 * Hook to manage state with a handler class. The handler class must extend `StateHandler<T>`.  
 * This hook will maintain only one instance of the class per application at a time and will be shared between all components that use the [useStateHandler Hook, Class] pair, saving its state.  
 * Do not modify the handler state directly. Use the handler setState method instead.  
 * Unmounting components will not necessarily affect the instance nor its state.
 *
 * @template T - The type of the state.
 * @template S - The type of the setState.
 * @template H - The type of the handler class, which extends `StateHandler<T>`
 * 
 * @param koreDefinition - The class of the handler to be used for managing state.
 * @param initial_value - Optional. The initial value of the state, which can be a value of type `T` or a function that returns a value of type `T`.
 * 
 * @returns A readonly tuple containing the current state and the handler instance.
 */
function useSoKore<T, S, F, H extends (Kore<T, S>|Koreko<T, S>), J extends T>( koreDefinition : ( new ( s?:T ) => H ) | [new ( s?:T ) => H, DepsOrComp<T, F>], initial_value: J | (() => J)  )  : Readonly<[T | F | undefined, H]>  {
  const kore                        = initKore<T, S, H>( koreDefinition, initial_value );
  const [, setState]                = React.useState<T>( kore.state as T );    
  
  useEffect( () => mountLogicAssign( setState, koreDefinition ), [] );

  return [ (kore as any)["__korekoStateDeriver_"](), kore ];
}

export { useSoKore };