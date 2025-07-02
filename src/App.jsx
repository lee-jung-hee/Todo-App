import { useState } from "react";
import "./App.css";

function App() {
  function formatDate(dateStr) {
    const date = new Date(dateStr);
    return new Intl.DateTimeFormat("ko-KR", {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour12: false,
    }).format(date);
  }

  const [todoList, setTodoList] = useState([
    {
      id: 0,
      content: "Have meal",
      time: formatDate("2025-06-03T08:20:00"),
      checked: false,
    },
    {
      id: 1,
      content: "Drink coffee",
      time: formatDate("2025-06-16T15:37:00"),
      checked: false,
    },
  ]);
  const [inputValue, setInputValue] = useState("");

  const handleList = () => {
    setTodoList([
      ...todoList,
      {
        id:
          todoList.length > 0
            ? Math.max(...todoList.map((todo) => todo.id)) + 1
            : 0,
        content: inputValue,
        time: formatDate(new Date()),
        checked: false,
      },
    ]);
  };

  return (
    <>
      <main>
        <h1>✅ My Secret Note 🗒️</h1>
        <TodoList todoList={todoList} setTodoList={setTodoList} />
        <hr />
        <TodoInput
          inputValue={inputValue}
          handleList={handleList}
          setInputValue={setInputValue}
        />
      </main>
    </>
  );
}

function TodoList({ todoList, setTodoList }) {
  return (
    <ul>
      {todoList.length === 0 ? (
        <span>Make your list</span>
      ) : (
        todoList.map((todo) => (
          <Todo key={todo.id} todo={todo} setTodoList={setTodoList} />
        ))
      )}
    </ul>
  );
}

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
      >
        Add List
      </button>
    </>
  );
}

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
  console.log(todo.content);

  return (
    <>
      <li style={liStyle}>
        <span>
          <input
            type="checkbox"
            checked={todo.checked || false}
            onChange={handleCheck}
          />
          To do :
          <input
            onChange={handleModify}
            style={modifyStyle}
            value={inputValue}
          />
          <span style={spanStyle}>{todo.content} </span>
        </span>
        Time : {todo.time}
        <span>
          <button onClick={handleChangeBtn}>Modify</button>
          <button onClick={handleDelete}>❌</button>
        </span>
      </li>
    </>
  );
}

export default App;
