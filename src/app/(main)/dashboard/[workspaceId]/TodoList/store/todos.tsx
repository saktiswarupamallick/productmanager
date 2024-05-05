'use client';
import { createContext, ReactNode, useContext, useState } from "react";

export type Todo = {
    id: string;
    task: string;
    completed: boolean;
    createdAt: string; // Store createdAt as string in localStorage
};

export type TodosContext = {
    todos: Todo[];
    handleAddTodo: (task: string) => void;
    toggleTodoAsCompleted: (id: string) => void;
    handleDeleteTodo: (id: string) => void;
};

export const todosContext = createContext<TodosContext | null>(null);

export function TodosProvider({ children }: { children: ReactNode }) {
    const [todos, setTodos] = useState<Todo[]>(() => {
        try {
            const storedTodos = localStorage.getItem('todos');
            return storedTodos ? JSON.parse(storedTodos) : [];
        } catch (error) {
            console.error('Error loading todos from localStorage:', error);
            return [];
        }
    });

    function handleAddTodo(task: string) {
        const newTodo: Todo = {
            id: Math.random().toString(),
            task,
            completed: false,
            createdAt: new Date().toISOString(), // Serialize createdAt as ISO string
        };

        setTodos((prevTodos) => {
            const updatedTodos = [newTodo, ...prevTodos];
            localStorage.setItem('todos', JSON.stringify(updatedTodos));
            return updatedTodos;
        });
    }

    const toggleTodoAsCompleted = (id: string) => {
        setTodos((prevTodos) => {
            const updatedTodos = prevTodos.map((todo) =>
                todo.id === id ? { ...todo, completed: !todo.completed } : todo
            );
            localStorage.setItem('todos', JSON.stringify(updatedTodos));
            return updatedTodos;
        });
    };

    function handleDeleteTodo(id: string) {
        setTodos((prevTodos) => {
            const updatedTodos = prevTodos.filter((todo) => todo.id !== id);
            localStorage.setItem('todos', JSON.stringify(updatedTodos));
            return updatedTodos;
        });
    }

    return (
        <todosContext.Provider value={{ todos, handleAddTodo, toggleTodoAsCompleted, handleDeleteTodo }}>
            {children}
        </todosContext.Provider>
    );
}

export function useTodos() {
    const todosContextValue = useContext(todosContext);
    if (!todosContextValue) {
        throw new Error("useTodos used outside of Provider");
    }
    return todosContextValue;
}
