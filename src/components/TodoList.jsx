import Todo from "./Todo";

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

export default TodoList;
