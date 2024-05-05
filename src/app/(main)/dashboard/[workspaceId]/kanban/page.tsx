'use client';
import React, { useState, useEffect } from 'react';

interface Task {
  id: number;
  title: string;
  description: string;
  category: string;
  createdAt: Date;
  backgroundColor: string;
}

const KanbanBoard: React.FC = () => {
  const predefinedColors = ['#a78bfa', '#c084fc', '#e879f9'];

  const getRandomBackgroundColor = () => { 
    const randomIndex = Math.floor(Math.random() * predefinedColors.length);
    return predefinedColors[randomIndex];
  };

  const [tasks, setTasks] = useState<Task[]>(() => {
    try {
      const savedTasks = localStorage.getItem('kanbanTasks');
      if (savedTasks) {
        return JSON.parse(savedTasks).map((task: Task) => ({
          ...task,
          createdAt: new Date(task.createdAt),
        }));
      }
    } catch (error) {
      console.error("Error parsing tasks from localStorage:", error);
    }
    return [
      { id: 1, title: 'Task 1', description: '', category: 'todo', createdAt: new Date(), backgroundColor: getRandomBackgroundColor() },
      { id: 2, title: 'Task 2', description: '', category: 'in-progress', createdAt: new Date(), backgroundColor: getRandomBackgroundColor() },
      { id: 3, title: 'Task 3', description: '', category: 'done', createdAt: new Date(), backgroundColor: getRandomBackgroundColor() },
      { id: 4, title: 'Task 4', description: '', category: 'overdue', createdAt: new Date(), backgroundColor: getRandomBackgroundColor() },
    ];
  });

  useEffect(() => {
    localStorage.setItem('kanbanTasks', JSON.stringify(tasks));
  }, [tasks]);

  const [newTask, setNewTask] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [hoveredTaskId, setHoveredTaskId] = useState<number | null>(null);

  const handleDragStart = (event: React.DragEvent, taskId: number) => {
    event.dataTransfer.setData('taskId', taskId.toString());
  };

  const handleDrop = (event: React.DragEvent, category: string) => {
    const taskId = parseInt(event.dataTransfer.getData('taskId'), 10);
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, category } : task
    );
    setTasks(updatedTasks);
  };

  const handleAddTask = () => {
    if (newTask.trim() !== '') {
      const newBackgroundColor = getRandomBackgroundColor();
      const newTaskObj: Task = {
        id: Date.now(),
        title: newTask,
        description: newDescription,
        category: 'todo',
        createdAt: new Date(),
        backgroundColor: newBackgroundColor,
      };
      setTasks([...tasks, newTaskObj]);
      setNewTask('');
      setNewDescription('');
    }
  };

  const handleDelete = (taskId: number) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
    setHoveredTaskId(null);
  };

  const handleEdit = (taskId: number, newTitle: string, newDescription: string) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, title: newTitle, description: newDescription } : task
    );
    setTasks(updatedTasks);
    setHoveredTaskId(null);
  };

  const getCountForCategory = (category: string) => {
    return tasks.filter((task) => task.category === category).length;
  };

  return (
    <div className="m-10">
      <div className="flex justify-between w-full items-center">
        <div>
          <input
            className="border p-2 rounded"
            type="text"
            value={newTask}
            onChange={(event) => setNewTask(event.target.value)}
            placeholder="Enter task title"
          />
          <input
            className="border p-2 w-full rounded mt-2"
            type="text"
            value={newDescription}
            onChange={(event) => setNewDescription(event.target.value)}
            placeholder="Enter task description"
          />
          <button
            className="bg-blue-500 text-white px-4 py-2 ml-2 rounded"
            onClick={handleAddTask}
          >
            Add Task
          </button>
        </div>
      </div>

      <div className="flex space-x-4 mt-4">
        {['todo', 'in-progress', 'done', 'overdue'].map((status) => (
          <div
            key={status}
            className="flex-1 p-4 rounded-md border"
            onDragOver={(event) => event.preventDefault()}
            onDrop={(event) => handleDrop(event, status)}
          >
            <div className="flex items-center mb-2">
              <h2 className="text-lg font-bold">{status}</h2>
              <div className="circle ml-2 bg-purple-500 text-white flex justify-center items-center w-6 h-6 rounded-full">
                {getCountForCategory(status)}
              </div>
            </div>
            {tasks
              .filter((task) => task.category === status)
              .map((task) => (
                <div
                  key={task.id}
                  className={`bg-white p-8 mb-4 rounded-md shadow-sm ${hoveredTaskId === task.id ? 'hovered' : ''}`}
                  style={{
                    backgroundColor: task.backgroundColor,
                    height: '210px',
                    display: 'flex',
                    flexDirection: 'column',
                    position: 'relative',
                  }}
                  draggable
                  onDragStart={(event) => handleDragStart(event, task.id)}
                  onMouseEnter={() => setHoveredTaskId(task.id)}
                  onMouseLeave={() => setHoveredTaskId(null)}
                >
                  <p className="text-sm font-light mb-1">
                    Created: {new Date(task.createdAt).toLocaleDateString()}{' '}
                    {new Date(task.createdAt).toLocaleTimeString()}
                  </p>
                  <p className="text-2xl font-semibold mb-2">{task.title}</p>
                  <p className="text-sm font-light mb-2">{task.description}</p>
                  {hoveredTaskId === task.id && (
                    <div className="absolute top-2 right-2 flex">
                      <button
                        className="bg-black text-white px-2 py-1 rounded-full shadow-md mr-2 hover:bg-gray-800 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        onClick={() => handleDelete(task.id)}
                      >
                        Delete
                      </button>
                      <button
                        className="bg-black text-white px-2 py-1 rounded-full shadow-md hover:bg-teal-700 focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
                        onClick={() => {
                          const newTitle = prompt('Enter new title') || '';
                          const newDescription = prompt('Enter new description') || '';
                          handleEdit(task.id, newTitle, newDescription);
                        }}
                      >
                        Edit
                      </button>
                    </div>
                  )}
                </div>
              ))}
            {tasks.filter((task) => task.category === status).length === 0 && (
              <p className="text-gray-500">No tasks</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default KanbanBoard;
