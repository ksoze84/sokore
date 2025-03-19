import { Kore, Koreko } from "./Kore";
import { storage, initKore, subscriptions } from "./storage";

function removeArrayObject( object : any , array? : any[]) {
  let index = array?.indexOf( object ) ?? -1;
  if ( index !== -1 ){
    array!.splice( index, 1 );
    console.log( "subs: ", array?.length );
  }
}

function getSoKore<T, S, H extends (Kore<T, S> | Koreko<T, S>)>(koreClass: new (s?: T) => H, subscribeCallback : (updatedKore : H) => any) : () => void
function getSoKore<T, S, H extends (Kore<T, S> | Koreko<T, S>)>(koreClass: new (s?: T) => H) : H
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
function getSoKore<T, S, H extends (Kore<T, S> | Koreko<T, S>)>(koreClass: new (s?: T) => H, subscribeCallback? : (updatedKore : H) => any) {
  if ( !subscribeCallback )
    return (storage.get(koreClass.name)?.kore ?? initKore<T, S, H>(koreClass)) as H;
  else{
    subscriptions.set( koreClass.name, [...(subscriptions.get( koreClass.name ) ?? []), subscribeCallback] );
    return  () => removeArrayObject(subscribeCallback, subscriptions.get( koreClass.name ));
  } 
}

export { getSoKore };