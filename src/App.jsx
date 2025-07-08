import { useState } from "react";
import "./App.css";
import TodoList from "./components/TodoList";
import TodoInput from "./components/TodoInput";

function App() {
  function formatDate(dateStr) {
    const date = new Date(dateStr);
    return new Intl.DateTimeFormat("ko-KR", {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
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
      <h1>👑 Digital Nomad List</h1>
      <div className="container">
        <div className="sort-container">
          <span>Check</span>
          <span id="todo-list">Todo List</span>
          <span id="time">Time</span>
          <span>Modify</span>
        </div>
        <div className="todo-container">
          <TodoList todoList={todoList} setTodoList={setTodoList} />
        </div>
        <TodoInput
          inputValue={inputValue}
          handleList={handleList}
          setInputValue={setInputValue}
        />
      </div>
    </>
  );
}

export default App;
