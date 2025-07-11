import { useState } from "react";
import { twMerge } from "tailwind-merge";

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

  return (
    <>
      <li className={twMerge(
        "border border-yellow-500 bg-white rounded-lg mb-3 p-4 flex items-center justify-between gap-3 text-base shadow-sm",
        todo.checked && "line-through text-gray-400"
      )}>
        <input
          type="checkbox"
          checked={todo.checked || false}
          onChange={handleCheck}
          id="check"
          className="w-5 h-5"
        />
        <input onChange={handleModify} className={twMerge("flex-grow p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500", modify ? "inline" : "hidden")} value={inputValue} />
        <span className={twMerge("flex-grow mx-2", modify ? "hidden" : "inline")}>{todo.content} </span>
        <span className="text-sm text-gray-500">Time : {todo.time}</span>
        <span className="flex-shrink-0 flex">
          <button onClick={handleChangeBtn} className="rounded-lg border-none px-3 py-1 text-sm font-medium text-center bg-orange-500 text-white cursor-pointer ml-2 transition duration-300 ease-in-out hover:opacity-80">
            Edit
          </button>
          <button onClick={handleDelete} className="rounded-lg border-none px-3 py-1 text-sm font-medium text-center bg-red-500 text-white cursor-pointer ml-2 transition duration-300 ease-in-out hover:opacity-80">
            Delete
          </button>
        </span>
      </li>
    </>
  );
}

export default Todo;
