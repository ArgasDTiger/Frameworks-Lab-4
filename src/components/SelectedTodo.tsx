import { Task, Todo } from "../App.tsx";
import { useRef, useState } from "react";

interface SelectedTodoProps {
    todo: Todo;
    onDeleteTodo: (id: number) => void;
    onAddTask: (todoId: number, task: Task) => void;
    onToggleTaskCompletion: (todoId: number, taskId: number) => void;
}

export default function SelectedTodo({ todo, onDeleteTodo, onAddTask, onToggleTaskCompletion }: SelectedTodoProps) {
    const taskInput = useRef<HTMLInputElement>(null);
    const [addingTaskMode, setAddingTaskMode] = useState<boolean>(false);

    function generateId() {
        return Math.floor(Math.random() * 1000);
    }

    function handleAddTask() {
        if (taskInput.current && taskInput.current.value) {
            const task: Task = {
                id: generateId(),
                title: taskInput.current.value,
                done: false,
            };

            onAddTask(todo.id, task);
            taskInput.current.value = "";
        }

        setAddingTaskMode(false);
    }


    return (
        <div className="w-8/12 flex items-center flex-col p-8">
            <h1 className="text-amber-800 text-2xl uppercase text-center">{todo.title}</h1>
            <h2 className="text-stone-600 text-md">Should be completed by {todo.dueDate}</h2>
            <h2 className="text-stone-600 text-md">{todo.description}</h2>

            <button
                className="mt-8 bg-amber-500 text-amber-100 rounded-md py-1 px-10 hover:bg-amber-400 hover:text-amber-700"
                onClick={() => setAddingTaskMode(true)}
            >
                + Add New Task
            </button>

            {addingTaskMode && (
                <div className="inline-flex flex-row mt-5">
                    <input
                        ref={taskInput}
                        type="text"
                        className="bg-amber-200 px-2 py-1 text-amber-600 hover:bg-amber-100 hover:text-amber-500 rounded-md"
                    />
                    <button
                        type="button"
                        className="bg-amber-500 text-amber-100 rounded-md px-2 hover:bg-amber-400 hover:text-amber-700 ml-0.5"
                        onClick={handleAddTask}
                    >
                        Save
                    </button>
                </div>
            )}

            <ul>
                {todo.tasks?.map((task: Task) => (
                    <li key={task.id} className="text-amber-600">
                        <input
                            type="checkbox"
                            checked={task.done}
                            onChange={() => onToggleTaskCompletion(todo.id, task.id)}
                        />
                        <span className={`ml-2 ${task.done ? "line-through text-stone-500" : ""}`}>{task.title}</span>
                    </li>
                )) || []}
            </ul>

            <button
                className="absolute bottom-10 bg-amber-950 text-amber-600 py-1 px-10 rounded-md hover:bg-amber-900 hover:text-amber-500 transition"
                onClick={() => onDeleteTodo(todo.id)}
            >
                Delete Todo
            </button>
        </div>
    );
}
