"use client"
import { useTodos } from "../store/todos";
import { useSearchParams } from "next/navigation";

// Existing import statements...

export const Todos = () => {
    const { todos, toggleTodoAsCompleted, handleDeleteTodo } = useTodos();

    const searchParams = useSearchParams();
    const todosFilter = searchParams ? searchParams.get('todos') : null;

    let filteredTodos = todos;

    if (todosFilter === "active") {
        filteredTodos = todos.filter((todo) => !todo.completed);
    } else if (todosFilter === "completed") {
        filteredTodos = todos.filter((todo) => todo.completed);
    }

    return (
        <ul className="main-task flex items-center flex-col space-y-4">
            {filteredTodos.map((todo) => (
                <li key={todo.id} className="flex items-center justify-between  px-4 rounded-lg bg-violet-200 dark:bg-violet-200 shadow-md w-full">
                    <div className="flex items-center w-full">
                        <input
                            type="checkbox"
                            id={`todo-${todo.id}`}
                            checked={todo.completed}
                            onChange={() => toggleTodoAsCompleted(todo.id)}
                            className="mr-2"
                        />
                        <label htmlFor={`todo-${todo.id}`} className="dark:text-violet-800">
                            {todo.task}
                        </label>
                    </div>
                    {/* Display creation time */}
                    <div className="text-gray-500 text-sm">{formatCreationTime(todo.createdAt)}</div>
                    {todo.completed && (
                        <button
                            type="button"
                            onClick={() => handleDeleteTodo(todo.id)}
                            className="bg-violet-800 hover:bg-violet-600 rounded-lg"
                        >
                            Delete
                        </button>
                    )}
                </li>
            ))}
        </ul>
    );
};

// Helper function to format creation time
function formatCreationTime(createdAt: any): string {
    // Check if createdAt is a valid Date object
    if (!(createdAt instanceof Date)) {
        return ''; // Return empty string or handle the error gracefully
    }

    const options: Intl.DateTimeFormatOptions = {
        hour: 'numeric',
        minute: '2-digit'
    };

    try {
        const formattedTime = new Intl.DateTimeFormat('en-US', options).format(createdAt);
        return formattedTime;
    } catch (error) {
        console.error('Error formatting creation time:', error);
        return ''; // Return empty string or handle the error gracefully
    }
}
