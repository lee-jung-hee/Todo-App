function TodoInput({ inputValue, handleList, setInputValue }) {
  const handleInputValue = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <>
      <input type="text" value={inputValue} onChange={handleInputValue} />
      <button
        onClick={() => {
          handleList();
          setInputValue("");
        }}
        style={{ background: "gold" }}
      >
        Add List
      </button>
    </>
  );
}

export default TodoInput;
