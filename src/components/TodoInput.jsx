import { useRef } from "react";

function TodoInput({ handleList }) {
  const inputValueRef = useRef(null);

  const getInputValue = () => inputValueRef.current.value;

  return (
    <>
      <input
        ref={inputValueRef}
        className="p-2 rounded-md border border-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 flex-grow"
      />
      <button
        onClick={() => {
          handleList(getInputValue());
          inputValueRef.current.value = "";
        }}
        className="rounded-lg border-none px-4 py-2 text-base font-medium text-center bg-yellow-500 text-white cursor-pointer ml-2 transition duration-300 ease-in-out hover:opacity-80"
      >
        Add List
      </button>
    </>
  );
}

export default TodoInput;
