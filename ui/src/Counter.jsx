import React, { useState } from 'react'
import { add } from '@vite-sandbox/lib/calc';

function Counter() {
  const [count, setCount] = useState(0)
  return (
    <button onClick={() => setCount((count) => add(count, 1))}>
      count is: {count}
    </button>
  );
}

export default Counter;