"use client";
import { FormEvent, useState } from "react";
import { useTodos } from "../store/todos";

export function AddTodo() {
  const [todo, setTodo] = useState("");
  const { handleAddTodo } = useTodos();

  function handleFormSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    handleAddTodo(todo);
    setTodo("");
  }

  return (
    <form onSubmit={handleFormSubmit} className="flex justify-center items-center">
      <input
        type="text"
        placeholder="Write your todo"
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
        className="border border-gray-300 rounded-l px-4 py-2 focus:outline-none focus:ring focus:border-orange-300"
      />
      <button
        type="submit"
        className="bg-violet-800 hover:bg-violet-600 text-white font-semibold px-4 py-2 rounded-r"
      >
        ADD
      </button>
    </form>
  );
}

export default AddTodo;
