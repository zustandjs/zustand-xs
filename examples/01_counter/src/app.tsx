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

const App = () => (
  <div>
    <Counter />
  </div>
);

export default App;
