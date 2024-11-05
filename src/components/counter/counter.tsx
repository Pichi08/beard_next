// src/components/Counter.tsx
"use client"; // Hacemos que este componente sea de cliente

import { useState } from "react";

const Counter = () => {
  const [count, setCount] = useState(0);

  const handleIncrement = () => setCount(count + 1);
  const handleDecrement = () => setCount(count - 1);

  return (
    <div>
      <h2>Contador</h2>
      <button onClick={handleDecrement}>-</button>
      <span style={{ margin: "0 10px" }}>{count}</span>
      <button onClick={handleIncrement}>+</button>
    </div>
  );
};

export default Counter;
