/* eslint @typescript-eslint/no-explicit-any: off */

import type { StateCreator, StoreMutatorIdentifier } from 'zustand/vanilla';

type Write<T, U> = Omit<T, keyof U> & U;

type Transition<State, Evt> =
  | {
      [Key in keyof State]?:
        | State[Key]
        | ((state: State, event: Evt) => State[Key]);
    }
  | ((state: State, event: Evt) => Partial<State>);

type ExtractEvent<Transition> = Transition extends (
  ...args: infer Args
) => unknown
  ? Args[1]
  : Transition extends Record<string, (...args: infer Args) => unknown>
    ? Args[1]
    : unknown;

type ObjectOrUnknown<T> = T extends object ? T : unknown;

type StoreXS<Transitions> = {
  send: <Type extends keyof Transitions>(
    event: { type: Type } & ObjectOrUnknown<ExtractEvent<Transitions[Type]>>,
  ) => void;
};

type WithXS<S, A> = Write<S, StoreXS<A>>;

type XS = <
  State,
  Transitions extends Record<string, Transition<State, never>>,
  Mps extends [StoreMutatorIdentifier, unknown][] = [],
>(
  initialState: State,
  transitions: Transitions,
) => StateCreator<State, Mps, [['zustand-xs', Transitions]]>;

declare module 'zustand/vanilla' {
  interface StoreMutators<S, A> {
    'zustand-xs': WithXS<S, A>;
  }
}

type XSImpl = <
  State,
  Transitions extends Record<string, Transition<State, never>>,
>(
  initialState: State,
  transitions: Transitions,
) => StateCreator<State, [], []>;

const xsImpl: XSImpl = (initialState, transitions) => (set, get, api) => {
  (api as any).send = (event: { type: string }) => {
    let nextState = (transitions as any)[event.type];
    if (typeof nextState === 'function') {
      nextState = nextState(get(), event);
    }
    nextState = { ...nextState };
    for (const key of Object.keys(nextState)) {
      if (typeof nextState[key] === 'function') {
        nextState[key] = nextState[key](get(), event);
      }
    }
    set(nextState);
  };
  return initialState;
};

export const xs = xsImpl as unknown as XS;
