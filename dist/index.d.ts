declare class Store {
    subscriptions: any[];
    state: any;
    constructor(value?: null);
    set: (value: any) => void;
    update: (cb: any) => void;
    subscribe: (cb: any) => void;
    unsubscribe: (cb: any) => void;
}
export declare const createStore: (id: any, value?: null) => Store;
export declare const useStore: (id: any, initialValue: any) => any[];
export {};
