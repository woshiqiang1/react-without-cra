import React, { useState } from "react";
import './index.less'

const Counter = () => {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="container">{count}</div>
      <button onClick={() => {setCount(count + 1)}}>+</button>

      <button onClick={() => {setCount(count - 1)}}>-</button>
    </>
  );
};

export default Counter