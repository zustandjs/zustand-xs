# zustand-xs

[![CI](https://img.shields.io/github/actions/workflow/status/zustandjs/zustand-xs/ci.yml?branch=main)](https://github.com/zustandjs/zustand-xs/actions?query=workflow%3ACI)
[![npm](https://img.shields.io/npm/v/zustand-xs)](https://www.npmjs.com/package/zustand-xs)
[![size](https://img.shields.io/bundlephobia/minzip/zustand-xs)](https://bundlephobia.com/result?p=zustand-xs)
[![discord](https://img.shields.io/discord/627656437971288081)](https://discord.gg/MrQdmzd)

XState/store compabile middleware for Zustand

## Motivation

Just for fun.

## Install

```bash
npm install zustand zustand-xs
```

## Usage

```tsx
import { create } from 'zustand';
import { xs } from 'zustand-xs';

const useCountStore = create(
  xs(
    {
      count: 0,
      text: 'hello',
    },
    {
      inc: {
        count: (context) => context.count + 1,
      },
      updateText: (_context, event: { text: string }) => ({
        text: event.text,
      }),
      reset: { count: 0, text: 'hello' },
    },
  ),
);

const Counter = () => {
  const count = useCountStore((state) => state.count);
  const text = useCountStore((state) => state.text);
  const inc = () => useCountStore.send({ type: 'inc' });
  const updateText = (text: string) =>
    useCountStore.send({ type: 'updateText', text });
  const reset = () => useCountStore.send({ type: 'reset' });
  return (
    <>
      <p>
        Count: {count}
        <button type="button" onClick={inc}>
          +1
        </button>
      </p>
      <p>
        <input value={text} onChange={(e) => updateText(e.target.value)} />
      </p>
      <p>
        <button type="button" onClick={reset}>
          Reset
        </button>
      </p>
    </>
  );
};
```

## Examples

The [examples](examples) folder contains working examples.
You can run one of them with

```bash
PORT=8080 pnpm run examples:01_counter
```

and open <http://localhost:8080> in your web browser.

You can also try them directly:
[01](https://stackblitz.com/github/zustandjs/zustand-xs/tree/main/examples/01_counter)

## Tweets
