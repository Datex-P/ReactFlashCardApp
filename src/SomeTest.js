import React, { useRef, useEffect, useState } from "react";
const usePreviousValue = value => {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};


export default function SomeTest() {
  const [value, setValue] =  useState("")
  const prevValue = usePreviousValue(value)
  return (
    <div className="App container mt-5">
      <input
        className="form-control"
        placeholder="Type something here"
        value={value}
        onChange={e => setValue(e.target.value)}
      />
      <div className="text-left mt-2">
        Curr Value: {value}
      </div>
      <div className="text-left">
        Prev Value: {prevValue}
      </div>
    </div>
  );
}