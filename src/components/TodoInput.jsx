import { useRef } from "react";

function TodoInput({ handleList }) {
  const inputValueRef = useRef(null);

  const getInputValue = () => inputValueRef.current.value;

  return (
    <>
      <input ref={inputValueRef} />
      <button
        onClick={() => {
          handleList(getInputValue());
          inputValueRef.current.value = "";
        }}
        style={{ background: "gold" }}
      >
        Add List
      </button>
    </>
  );
}

export default TodoInput;
