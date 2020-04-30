import { useState, useEffect, useMemo, useRef } from "react";

let stores: Store[] = [];

class Store {
  subscriptions: any[] = [];
  state;
  constructor(value = null) {
    this.state = value;
  };

  set = value => {
    const oldState = this.state;
    this.state = value;
    this.subscriptions.forEach(cb => cb(this.state, oldState));
  };
  update = cb => {
    const newState = cb(this.state);
    this.set(newState);
  };
  subscribe = cb => {
    this.subscriptions.push(cb);
  };
  unsubscribe = cb => {
    this.subscriptions = this.subscriptions.filter(c => c !== cb);
  };
};

export const createStore = (id, value = null) => {
  stores[id] = new Store(value);
  return stores[id];
};

export const useStore = (id, initialValue) => {
  const [state, setState] = useState(initialValue);

  const store = useRef(stores[id]);

  useMemo(() => {
    if (!store.current) {
      store.current = createStore(id, initialValue);
    }
  }, [id, initialValue]);

  useEffect(() => {
    store.current.subscribe(setState);
    return () => store.current.unsubscribe(setState);
  }, [setState]);

  return [state, store.current.set];
};