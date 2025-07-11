import { useEffect, useState } from "react";
import "./App.css";
import TodoList from "./components/TodoList";
import TodoInput from "./components/TodoInput";
import { supabase } from "./createClient";

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

  const [todoList, setTodoList] = useState([]);

  useEffect(() => {
    async function fetchTodos() {
      const { data, error } = await supabase
        .from("lists")
        .select("*")
        .order("created_at", { ascending: false }); // 최신순으로 정렬

      if (error) {
        console.error("Error fetching todos:", error);
      } else {
        // Supabase에서 받은 데이터를 앱의 상태 형식에 맞게 변환
        const formattedData = data.map((list) => ({
          id: list.id,
          content: list.content,
          time: formatDate(list.created_at),
          checked: list.is_completed,
        }));
        setTodoList(formattedData);
        console.log(formattedData);
      }
    }

    fetchTodos();
  }, []); // 빈 배열을 전달하여 컴포넌트가 처음 마운트될 때 한 번만 실행

  const handleList = async (content) => {
    const { data, error } = await supabase
      .from("todos")
      .insert([{ content: content, is_completed: false }])
      .select();

    if (error) {
      console.error("Error adding todo:", error);
    } else if (data) {
      // UI에 즉시 반영하기 위해 새로 추가된 할 일을 상태에 추가
      const newTodo = {
        id: data[0].id,
        content: data[0].content,
        time: formatDate(data[0].created_at),
        checked: data[0].is_completed,
      };
      setTodoList([newTodo, ...todoList]); // 새 항목을 맨 위에 추가
    }
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
        <TodoInput handleList={handleList} />
      </div>
    </>
  );
}

export default App;
