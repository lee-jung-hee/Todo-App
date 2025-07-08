import { useState } from "react";

function Todo({ todo, setTodoList }) {
  const [inputValue, setInputValue] = useState(todo.content);
  const [modify, setModify] = useState(false);

  const handleDelete = () => {
    setTodoList((prev) => prev.filter((list) => list.id !== todo.id));
  };

  const handleCheck = () => {
    setTodoList((prev) =>
      prev.map((item) =>
        item.id === todo.id ? { ...item, checked: !item.checked } : item
      )
    );
  };

  const handleModify = (e) => {
    setInputValue(e.target.value);
  };

  const handleChangeBtn = () => {
    setModify((prev) => !prev);

    setTodoList((prev) =>
      prev.map((item) =>
        item.id === todo.id ? { ...item, content: inputValue } : item
      )
    );
  };

  const liStyle = {
    textDecoration: todo.checked ? "line-through" : "none",
    color: todo.checked ? "gray" : "black",
  };

  const spanStyle = {
    display: modify ? "none" : "inline",
    margin: 10,
  };

  const modifyStyle = {
    display: modify ? "inline" : "none",
    marginLeft: 10,
    marginRight: 10,
  };

  return (
    <>
      <li style={liStyle}>
        <input
          type="checkbox"
          checked={todo.checked || false}
          onChange={handleCheck}
          id="check"
        />
        <input onChange={handleModify} style={modifyStyle} value={inputValue} />
        <span style={spanStyle}>{todo.content} </span>
        Time : {todo.time}
        <span>
          <button onClick={handleChangeBtn} style={{ color: "orange" }}>
            Edit
          </button>
          <button onClick={handleDelete} style={{ color: "red" }}>
            Delete
          </button>
        </span>
      </li>
    </>
  );
}

export default Todo;
