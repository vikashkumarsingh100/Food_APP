import { useState } from "react";

const User = ({ name }) => {
  const [count, setCount] = useState(0);

  return (
    <div className="usercard">
      <h2>Name: Vikash </h2>
      {/* <div>Count ={count}</div>
      <button
        onClick={() => {
          setCount(count + 1);
        }}
      >
        +
      </button>
      &nbsp; &nbsp;
      <button
        onClick={() => {
          setCount(count - 1);
        }}
      >
        -
      </button> */}
    </div>
  );
};

export default User;
