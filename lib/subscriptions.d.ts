export declare const pushSubscription: (koreName: string, subscription: (updatedKore: any) => any) => Map<string, ((updatedKore: any) => any)[]>;
export declare const unsubscribe: (object: any, koreName: string) => void;
export declare const callSubscriptors: (kore: any) => void | undefined;
