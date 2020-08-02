import React, { useState } from "react";
import { Button } from 'antd';
import './index.less'

const Counter = () => {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="container">{count}</div>
      <Button type='primary' onClick={() => {setCount(count + 1)}}>+</Button>
      <Button onClick={() => {setCount(count - 1)}}>-</Button>
    </>
  );
};

export default Counter