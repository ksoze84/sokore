import { Kore, Koreko } from "./Kore";
import { storage, initKore, subscriptions, _properInitdKoreko } from "./storage";

function removeArrayObject( object : any , array? : any[]) {
  let index = array?.indexOf( object ) ?? -1;
  if ( index !== -1 )
    array!.splice( index, 1 );
}

function getSoKore<T, S, H extends (Kore<T, S> | Koreko<T, S>)>(koreClass: new (s?: T) => H, subscribeCallback : (updatedKore : H) => any) : () => void
function getSoKore<T, S, H extends (Kore<T, S> | Koreko<T, S>)>(koreClass: new (s?: T) => H) : H
/**
 * Gets the instance of the Kore class
 * or subscribe a function to state changes.
 *
 * @template T - The type of the state.
 * @template S - The type of the setState function.
 * @template H - The type of the Kore class.
 * @param koreClass - The constructor of the Kore class.
 * @returns The instance of the Kore class.
 */
function getSoKore<T, S, H extends (Kore<T, S> | Koreko<T, S>)>(koreClass: new (s?: T) => H, subscribeCallback? : (updatedKore : H) => any) {
  if ( !subscribeCallback )
    if ( storage.has( koreClass.name ) )
      return storage.get( koreClass.name )!.kore as H;
    else{
      const kore = initKore<T, S, H>( koreClass );
      (kore as any)[_properInitdKoreko] = false;
      return kore;
    }
  else{
    subscriptions.set( koreClass.name, [...(subscriptions.get( koreClass.name ) ?? []), subscribeCallback] );
    return  () => removeArrayObject(subscribeCallback, subscriptions.get( koreClass.name ));
  } 
}

export { getSoKore };