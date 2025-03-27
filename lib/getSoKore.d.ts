import { Kore, Koreko } from "./Kore";
declare function getSoKore<T, S, H extends (Kore<T, S> | Koreko<T, S>)>(koreClass: new (s?: T) => H, subscribeCallback: (updatedKore: H) => any): () => void;
declare function getSoKore<T, S, H extends (Kore<T, S> | Koreko<T, S>)>(koreClass: new (s?: T) => H): H;
export { getSoKore };
