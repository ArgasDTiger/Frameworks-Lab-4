import TodosSidebar from "./components/TodosSidebar.tsx";
import {useState} from "react";
import NewTodo from "./components/NewTodo.tsx";
import NoTodoSelected from "./components/NoTodoSelected.tsx";
import SelectedTodo from "./components/SelectedTodo.tsx";

export interface Todo {
    id: number;
    title: string;
    description: string;
    done: boolean;
    dueDate: string;
    tasks: Task[];
}

export interface Task {
    id: number;
    title: string;
    done: boolean;
}

enum EditingModes {
    None,
    Add,
    View
}

export default function App() {
    const [selectedTodoId, setSelectedTodoId] = useState<number | undefined>(undefined);
    const [selectedTodo, setSelectedTodo] = useState<Todo | undefined>();
    const [todos, setTodos] = useState<Todo[]>([]);
    const [editingMode, setEditingMode] = useState<EditingModes>(EditingModes.None);

    function onTodoAdd() {
        setSelectedTodoId(undefined);
        setEditingMode(EditingModes.Add);
    }

    function onNewTodoCancel() {
        setEditingMode(EditingModes.None);
    }

    function onNewTodoSave(todo: Todo) {
        const newTodo = {
            ...todo,
            tasks: todo.tasks || []
        };
        setTodos(prevTodos => [...prevTodos, newTodo]);
        setEditingMode(EditingModes.None);
    }


    function onSelectTodo(id: number) {
        setSelectedTodoId(id);
        setEditingMode(EditingModes.View);

        setSelectedTodo(todos.find((todo) => todo.id === id) as Todo);
    }

    function onDeleteTodo(id: number) {
        setSelectedTodoId(undefined);
        setEditingMode(EditingModes.None);

        setTodos(prevState => {
            return prevState.filter((todo) => todo.id !== id);
        })
    }

    function onAddTaskToTodo(todoId: number, task: Task) {
        setTodos((prevTodos) => {
            const updatedTodos = prevTodos.map(todo => {
                if (todo.id === todoId) {
                    return {
                        ...todo,
                        tasks: [...(todo.tasks || []), task]
                    };
                }
                return todo;
            });
            const updatedTodo = updatedTodos.find(todo => todo.id === todoId);
            setSelectedTodo(updatedTodo);
            return updatedTodos;
        });
    }

    function onToggleTaskCompletion(todoId: number, taskId: number) {
        setTodos((prevTodos) => {
            const updatedTodos = prevTodos.map(todo => {
                if (todo.id === todoId) {
                    return {
                        ...todo,
                        tasks: todo.tasks.map(task =>
                            task.id === taskId ? { ...task, done: !task.done } : task
                        )
                    };
                }
                return todo;
            });
            const updatedTodo = updatedTodos.find(todo => todo.id === todoId);
            setSelectedTodo(updatedTodo);
            return updatedTodos;
        });
    }


    let content;

    switch (editingMode) {
        case EditingModes.Add:
            content = <NewTodo onCancel={onNewTodoCancel} onAdd={onNewTodoSave} />;
            break;
        case EditingModes.View:
            content = (
                <SelectedTodo
                    todo={selectedTodo!}
                    onDeleteTodo={onDeleteTodo}
                    onAddTask={onAddTaskToTodo}
                    onToggleTaskCompletion={onToggleTaskCompletion}
                />
            );
            break;
        default:
            content = <NoTodoSelected />;
            break;
    }

    return (
        <main className="h-screen pt-5 flex">
            <TodosSidebar todoList={todos} onAdd={onTodoAdd} onSelect={onSelectTodo} />
            {content}
        </main>
    );
}
