# SoKore

Simple class based hook and state manager for React.

KeyPoints: 
* Keep the React paradigm. If you are familiar with class components, you will be familiar with this as well.
* Work with "Kore" extended classes. 
  * A "kore" have a state and a setState method, write into it all state actions you need.
* You define the class, the hook manages the rest.
* Heavy functions are not instantiated in every render. Minimize overhead by avoiding useCallback, useReducer, useMemo, and dependency arrays.
* Helps to separate logic from render.
* A basic standalone hook that doesn't store nor share the instance: useKore.
* And a hook to store and share your kore instance and its state: useSoKore. 
  * The hook maintains a unique instance and its state across your application. 
  * Share the state and actions to update it between components.
  * Some options to avoid unnecessary re-renders on related components.
* Minimal and simple code. Small footprint and low impact in React's cycles. ( < 5kB minified ).

This readme [looks better in gitHub](https://github.com/ksoze84/sokore?tab=readme-ov-file#sokore)

## Example

```tsx
class CounterKore extends Kore {
  add      = () => this.setState( s => s + 1 );
  subtract = () => this.setState( s => s - 1 );
}

function Counter() {
  const [count, {add, subtract}] = useKore(CounterKore, 0);

  return (
    <div>
      <span>{count}</span>
      <button onClick={add}>+</button>
      <button onClick={subtract}>-</button>
    </div>
  );
}
```

## Table of contents


- [Example](#example)
- [Table of contents](#table-of-contents)
- [Basics](#basics)
  - [Installation](#installation)
  - [How to use](#how-to-use)
  - [Rules](#rules)
- [The no-store hook: useKore](#the-no-store-hook-usekore)
  - [Example](#example-1)
- [Storing and sharing : useSoKore and getSoKore](#storing-and-sharing--usesokore-and-getsokore)
  - [useSoKore](#usesokore)
  - [Get the instance with getSoKore](#get-the-instance-with-getsokore)
  - [useSoKore to update only when a determined subset of state properties changes](#usesokore-to-update-only-when-a-determined-subset-of-state-properties-changes)
- [The kore object](#the-kore-object)
  - [State initialization](#state-initialization)
  - [instanceCreated() function](#instancecreated-function)
  - [kore object configuration](#kore-object-configuration)
    - [Merging the state](#merging-the-state)
  - [Reutilizing classes](#reutilizing-classes)
  - [Extendibility and Inheritance](#extendibility-and-inheritance)
  - [Your own setState function](#your-own-setstate-function)
    - [Example with immer:](#example-with-immer)
    - [Or may be you just want to change the setState() accessibility modifier](#or-may-be-you-just-want-to-change-the-setstate-accessibility-modifier)
  - [Destroying the instance](#destroying-the-instance)
  - [Constructor](#constructor)


## Basics

### Installation

```
npm install sokore --save
```

### How to use

1. Create a class that extends the Kore< StateType > class. Extending this class gives a state and a setState to the child class "kore class". 
1. Add all the state update methods ( actions ) you want to this kore class.
1. Use the no-store useKore( Kore Class, initial_value ) hook or the store-based useSoKore( Kore Class, initial_value ) hook in your components. These hooks return [ state, kore ].
2. This "kore" object is the instance of the class you wrote with the actions you need to use in your component.

### Rules

* Never set the kore object state directly; is read only!
* You may save another data in the object, but beware of component state updates signaling and mounting logics if this data mutates over time.
* Do not manipulate state directly in the constructor.
* The kore class name you define is used as key for storing/sharing the kore instance. Never use the same name for different kore classes even if they are declared in different scopes.


## The no-store hook: useKore
```js
function useKore( kore_class, initialValue? )
```

This is a simple, classic-behavior custom hook that:
* Creates an instance of your kore class; this instance and its state is not stored/shared.
* **This hook does not work alongside useSoKore nor getSoKore, because these store the instance.**
* More performant than these other hooks.
* But have the same advantages:
  * Work with classes.
  * Option to merge the state instead of replace it.
  * Your own setState ( _setState() wrapper ).
  * instanceCreated and instanceDeleted optional methods (in this case are equivalent to mount/unmount the component).

### Example
```tsx
import { Kore, useKore } from "SoKore";

class CounterKore extends Kore<number> {
  state = 0;
  public add      = () => this.setState( s => s + 1 );
  public subtract = () => this.setState( s => s - 1 );
  public reset    = () => this.setState( 0 );
}

function Counter() {
  const [count, {add, subtract}] = useKore(CounterKore);

  return (
    <div>
      <span>{count}</span>
      <button onClick={add}>+</button>
      <button onClick={subtract}>-</button>
    </div>
  );
}
```

## Storing and sharing : useSoKore and getSoKore

The useSoKore hook and the getSoKore utility method, create, use, store, and share a unique instance of your kore class across the application, at global scope. 
Either can update the state between components; but getSoKore is not a hook, so never trigger a re-render in the component.

With the useSoKore hook, if you pass a partial definition of the state alongside the kore class as first argument, you may control when the component re-renders.  

To bind the components using the useSoKore hook and/or the getSoKore method toghether, just use the same kore class.


### useSoKore

```js
function useSoKore( kore_class, initialValue? )
```

This hook is equal to useKore, but store, or use an already stored, instance of your kore class and its state.

```tsx
import { Kore, useSoKore } from "SoKore";

class CounterKore extends Kore<number> {
  state = 0;
  public add      = () => this.setState( s => s + 1 );
  public subtract = () => this.setState( s => s - 1 );
  public reset    = () => this.setState( 0 );
}

function Counter() {
  const [count, {add, subtract}] = useSoKore(CounterKore);

  return (
    <div>
      <span>{count}</span>
      <button onClick={add}>+</button>
      <button onClick={subtract}>-</button>
    </div>
  );
}
```

### Get the instance with getSoKore

```js
function getSoKore( kore_class )
```

Get the instance of your kore using the getSoKore utility method. This method is not a hook, so it never triggers a new render. 

You can use this method mainly for two things:
* To use your kore object actions without triggering re-renders in "control-only" components
* To use your kore object outside react

```tsx
class CounterKore extends Kore<number> {
  state = 0;

  public add      = () => this.setState( s => s + 1 );
  public subtract = () => this.setState( s => s - 1 );
  public reset    = () => this.setState( 0 );
}

function Controls() {
  const {add, subtract} = getSoKore(CounterKore);

  return (
    <div className="buttons">
      <button onClick={add}>+</button>
      <button onClick={subtract}>-</button>
    </div>
  );
}

function Counter() {
  const [count] = useSoKore(CounterKore);

  return (
    <div>
      <span>{count}</span>
    </div>
  );
}

export function App() {
  return (
    <div>
      <Controls />
      <Counter />
    </div>
  );
}
```

### useSoKore to update only when a determined subset of state properties changes
```js
function useSoKore( [kore_class, partialDefinition], initialValue? )
```

When a non-undefined object with many properties is used as state, the useSoKore hook will trigger re-render on the component for any part of the state changed, even if the component is using only one of the properties. 

This can be optimized adding a partial definition of the state to the first argument of the useSoKore hook in an array. This will performs a shallow comparison for the subset of the state determined by the partial definition. 

This partial definition can be one of: 
* An array of strings with some of the state property names.
* A selector function that tooks a state variable and result in an array, an object or a value. The result type must remain stable, except for undefined. The hook will return the selector result as first element.
* A comparator function that tooks a prevState and a nextState variables as arguments, and must return a boolean value.

**Use only if you have performance problems; this hook avoids some unnecessary re-renders but introduces a dependency array of comparisons. Always prefer useSoKore( kore_class ) with no partial definition and the getSoKore method first.**

```tsx
class CounterKore extends Kore<{chairs:number, tables:number, rooms:number}> {
  state = {
    chairs: 0,
    tables : 0,
    rooms : 10
  }

  _koreConfig = { merge : true }

  addChairs = () => this.setState( c =>( { chairs: c.chairs + 1 }) );
  subtractChairs = () => this.setState( c => ({chairs : c.chairs - 1}) );

  addTables = () => this.setState( t => ({tables: t.tables + 1}) );
  subtractTables = () => this.setState( t => ({tables: t.tables - 1}) );

  setRooms = (n:number) => this.setState( {rooms : n} ), 
}

function Rooms() {
  // This component re-renders only if rooms property changes
  const [{rooms}, {setRooms}] = useSoKore([CounterKore, ["rooms"]]);

  return <>
    <span>Chairs: </span>
    <input type="text" value={rooms} onChange={e => setRooms(e.target.value)} />
  </> 
}

function Chairs() {
  // This component re-renders only if the compare function(prevState, nextState) returns true
  const [{chairs},{addChairs,subtractChairs}] = useSoKore( [CounterKore, (p, n) => p.chairs !== n.chairs] ); 

  return <>
    <span>Chairs: {chairs}</span>
    <button onClick={addChairs}>+</button>
    <button onClick={subtractChairs}>-</button>
  </> 
}

function Tables() {
  // This component re-renders only if tables.toString() changes
  // Here tables is a string
  const [tables, {addTables, subtractTables}] = useSoKore( [CounterKore, ( s ) => s.tables.toString()] ); 

  return <>
    <span>Tables: {tables}</span>
    <button onClick={addTables}>+</button>
    <button onClick={subtractTables}>-</button>
  </>
}
```
## The kore object

The kore object is an instance of a class you wrote with actions and that extends the abstract Kore class of this package. Extending the Kore class gives to the child a state property and a setState method, among others.

This instance is created by the hook with the kore class you wrote that is passed as argument.

### State initialization

You can set an initial state in the class definition or pass an initial value on the hook. You should not initialize the state with both methods, but if you do, the initial value on the hook has priority.

Prefer setting the state in the class definition for easier readability.

```tsx
class CounterKore extends Kore<{chairs:number, tables:number, rooms:number}> {
  state = {
    chairs: 0,
    tables : 0,
    rooms : 10
  }

  ...
}

// OR 

function Counter() {
  const [counters] = useSoKore(CounterKore, { chairs: 0, tables : 0, rooms : 10 });

 ...
}

```

**Code you wrote in instanceCreated() method will update the initial state.**


### instanceCreated() function

Optional method that is called only once when an instance is created. If exists in the instance, this method is called by the useSoKore or useKore hook the first time a component in the application using the hook is effectively mounted and when the instance is "newly created".  

This method has NOT the same behavior as mount callback of a component in React when using useSoKore. The only way this method is called again by the hook is by destroying the instance first with destroyInstance().

```tsx
class CounterKore extends Kore<{chairs:number, tables:number, rooms:number}> {
  state = {
    chairs: 0,
    tables : 0,
    rooms : 0
  }

  instanceCreated = () => {
    fetch('https://myapi.com/counters').then( r => r.json() ).then( r => this.setState(r) );
  }
}
```

### kore object configuration

You may configure your kore object by setting the optional property _koreConfig in your kore class. It has two boolean options:
* merge : The state is overwritten by default with setState. Change this to true to merge.
* destroyOnUnmount : Tries to delete the instance in each unmount of each component. Is successfully deleted if there are no active listeners (other components using it).

```tsx
//default:
 _koreConfig = { merge : false, destroyOnUnmount : false }
```

#### Merging the state

Replacing the state is the default mode for a kore object setState, but you can configure your kore setState to merge it. This can be usefull for refactor old class components.

```tsx
class CounterKore extends Kore<{chairs:number, tables:number, rooms:number}> {
  state = {
    chairs: 0,
    tables : 0,
    rooms : 10
  }

  _koreConfig = { merge : true }

  addChairs = () => this.setState( c => ( { chairs: c.chairs + 1 }) );
  subtractChairs = () => this.setState( c => ({chairs : c.chairs - 1}) );

  addTables = () => this.setState( t => ({ tables: t.tables + 1 }) );
  subtractTables = () => this.setState( t => ({tables: t.tables - 1}) );

  resetAll = () => this.setState( { chairs: 0, tables : 0 } );
}

function Chairs() {
  const [{chairs},{addChairs, subtractChairs}] = useSoKore(CounterKore);

  return <>
    <span>Chairs: {chairs}</span>
    <button onClick={addChairs}>+</button>
    <button onClick={subtractChairs}>-</button>
  </> 
}

function Tables() {
  const [{tables},{addTables, subtractTables}] = useSoKore(CounterKore);

  return <>
    <span>Tables: {tables}</span>
    <button onClick={addTables}>+</button>
    <button onClick={subtractTables}>-</button>
  </>
}
```
**Note that the useSoKore hook will trigger re-render for any part of the state changed. In the example above, Tables component will re-render if the chairs value is changed. This behavior can be optimized adding a partial definition to useSoKore first argument.**  
**Merging mode is only for objects, and there is no check of any kind for this before doing it, so its on you to guarantee an initial and always state object.**


### Reutilizing classes

Classes are made for reutilization, making new object instances from these. But in this case, the instance creation is managed by the hook, and it maintains only one instance per class name. 
One way to use your class again with this hook without duplicating code is to extend it:

```ts
class BetaCounterKore extends CounterKore {};
```

### Extendibility and Inheritance

You can write common functionality in a generic class and extend this class, adding the specifics. In this case, extending a generic class with Kore lets you encapsulate common functionality:


MyGenericApiKore.ts : A generic kore for my API
```ts
type ApiData = {
  data?: Record<string, any>[];
  isLoading: boolean;
}

export abstract class MyGenericApiKore extends Kore<ApiData>{

  state : ApiData = {
    data: undefined,
    isLoading: false
  }

  protected _koreConfig = { merge: true };

  abstract readonly loadUri : string; // making loadUri property obligatory to define in inherited class
  readonly saveUri? : string = undefined;

  public load = ( params? : string ) => {
    this.setState({isLoading: true});
    return fetch( this.loadUri + ( params ?? '' ) )
            .then( r => r.json() )
            .then( resp => this.setState({ data : resp?.data ?? [] , isLoading: false}) )
  }

  public modify = ( item : Record<string, any>, changes : Record<string, any> ) => 
    this.setState( s => ({ data : s.data?.map( i => i === item ? { ...i, ...changes } : i ) }) )

  public delete = ( item : Record<string, any> ) => 
    this.setState( s => ({ data : s.data?.filter( i => i !== item ) )} )

  public append = ( item : Record<string, any> ) =>
    this.setState( s => ({ data : s.data?.concat( item ) }) )

  public save = ( params? : Record<string, any> ) => {
    this.setState({isLoading: true});
    return fetch( this.saveUri ?? '', { method: 'POST', body : JSON.stringify(params)} )
            .then( r => r.json() )
            .then( () => this.setState({ isLoading: false }) )
  }

}
```

MyComponent.tsx

```tsx
import { MyGenericApiKore } from "./MyApiHandler";

class SpecificApiKore extends MyGenericApiKore { loadUri = 'https://myapi/specific' }

export function MyComponent() {

  const [{data, isLoading}, {load, formModify, save} ] = useSoKore( SpecificApiKore );

  useEffect( () => { load() }, [] );

  return ( ... );
}
```


### Your own setState function

setState() is just a wrapper for the actual _setState() function that comes in your kore object. In Javascript you can directly modify it; in Typescript you need to define the setState type as a second generic type of your kore class.

#### Example with immer:
```tsx
import { produce, WritableDraft } from "immer";

type CountState = {chairs:number, tables:number, rooms:number};
type MySetStateType = ( recipe : (draft: WritableDraft<CountState>) => void ) => void;

export class CounterKore extends Kore<CountState, MySetStateType> {
  state = {
    chairs: 0,
    tables : 0,
    rooms : 10
  }

  public setState : MySetStateType = ( recipe ) => this._setState( s => produce(s, recipe) )

}

function Chairs() {
  const [{chairs}, {setState}] = useSoKore(CounterKore);
  return <>
    <span>Chairs: {chairs}</span>
    <button onClick={() => setState( s => { s.chairs++ } )}>+</button>
    <button onClick={() => setState( s => { s.chairs-- } )}>-</button>
  </>
}

function Tables() {
  const [{tables}, {setState}] = useSoKore(CounterKore);
  return <>
    <span>Tables: {tables}</span>
    <button onClick={() => setState( s => { s.tables++ } )}>+</button>
    <button onClick={() => setState( s => { s.tables-- } )}>-</button>
  </>
}
```


#### Or may be you just want to change the setState() accessibility modifier
```tsx
public setState = this._setState
```

### Destroying the instance

You may destroy the instance when needed using the **destroyInstance()** method. This method must be called **on the unmount callback** of the component using it.  
This method first checks if there are active state hook listeners active. If there isn't, the instance reference is deleted, and the **instanceDeleted()** method is called if exists.

If you implement **instanceDeleted()**, remember that it is not the equivalent of an unmount component callback.

This is not neccesary if the kore option destroyOnUnmount is true, nor with the no-store useKore hook. 

```tsx
export function App() {

  const [ {data}, {load, destroyInstance} ] = useSoKore( CounterKore );

  useEffect( () => {
    load();
    return () => destroyInstance(); // instanceDeleted() would be called
  }, [] );

 ...
}
```

### Constructor

You may define a constructor in your kore class. But is not necessary

**Prefer defining an instanceCreated() method on the kore over the constructor to execute initial code.** 

```tsx
constructor( initialState? : T ) {
  super(initialState);
  //your code
}
```

Constructor code constructors are not part of the mounting/unmounting logic of React. Hook state listeners may or may not be ready when the code executes. 

It is safe to write code that does not involve changing the state directly.

