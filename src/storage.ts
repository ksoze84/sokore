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

import { _koreDispatcher, Kore, Koreko } from "./Kore";

export const storage = new Map<string, {kore : Kore<any, any>, listeners? : Map<Function, ( p : any, n : any )=>void>}>();

export function initKore<T, S, H extends (Kore<T, S>|Koreko<T, S>)>( koreClass : new ( s?:T ) => H , initial_value? : T | (() => T) ) : H {
  if ( !storage.has( koreClass.name ) ) {
    const kore = new koreClass( initial_value instanceof Function ? initial_value() : initial_value );
    
    storage.set( koreClass.name, {kore} );

    (kore as any)[_koreDispatcher] = (p: T, n : T) => storage.get( koreClass.name )?.listeners?.forEach( l => l( p, n ) );
    (kore as any).destroyInstance = (force? : boolean) => destroyInstance( kore, force );
    
    return kore;
  }
  else{
    const kore = storage.get( koreClass.name )?.kore as H;
    if( storage.get( koreClass.name )?.listeners === undefined && initial_value !== undefined)
      kore.state = initial_value instanceof Function ? initial_value() : initial_value;
    return kore
  }
}

function destroyInstance<T, S>( kore : Kore<T, S>|Koreko<T, S>, force? : boolean ) {
  if (force === true || ( storage.get(kore.constructor.name)?.listeners?.size ?? 0) === 0) {
    storage.delete(kore.constructor.name);
    kore["instanceDeleted"]?.();
  }
}


export function mountLogic<T, S, H extends (Kore<T, S>|Koreko<T, S>)>( dispatcher: (p : T, n: T ) => void, dispatcherRef : Function, kore :  H ) {
  if ( !storage.has( kore.constructor.name ) ) 
    storage.set( kore.constructor.name, {kore} );

  if( !storage.get( kore.constructor.name )?.listeners ){
    storage.get( kore.constructor.name )!.listeners = new Map<Function, ( p : any, n : any )=>void>([[dispatcherRef, dispatcher]]);
    kore["instanceCreated"]?.();
  }
  else
    storage.get( kore.constructor.name )?.listeners!.set( dispatcherRef, dispatcher );

  return () => unmountLogic( dispatcherRef, kore );
}

export function unmountLogic<T, S>( dispatcherRef : Function, kore: Kore<T, S>) {
  if ( ( storage.get( kore.constructor.name )?.listeners?.size ?? 0 ) > 0 ) {
    storage.get( kore.constructor.name )!.listeners?.delete( dispatcherRef );
      if( kore["_koreConfig"].destroyOnUnmount )
        kore.destroyInstance();
  }
}


/**
 * Gets the instance of the Kore class.  
 * This is not a hook. It will not trigger re-renders when used in components.
 * 
 * @template T - The type of the state.
 * @template S - The type of the setState function.
 * @template H - The type of the Kore class.
 * @param koreClass - The constructor of the Kore class.
 * @returns The instance of the Kore class.
 */
export function getSoKore<T, S, H extends (Kore<T, S>|Koreko<T, S>)>( koreClass : new ( s?:T ) => H ) : H {
    return (storage.get( koreClass.name )?.kore ?? initKore<T, S, H>( koreClass )) as H;
}
