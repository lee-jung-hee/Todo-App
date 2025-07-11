import Todo from "./Todo";

function TodoList({ todoList, setTodoList }) {
  return (
    <ul className="list-none p-0">
      {todoList.length === 0 ? (
        <span className="text-center text-gray-500">Make your list</span>
      ) : (
        todoList.map((todo) => (
          <Todo key={todo.id} todo={todo} setTodoList={setTodoList} />
        ))
      )}
    </ul>
  );
}

export default TodoList;
