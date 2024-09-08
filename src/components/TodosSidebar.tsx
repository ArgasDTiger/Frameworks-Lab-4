import {Todo} from "../App.tsx";

interface TodosSidebarProps {
    todoList: Todo[];
    onAdd: () => void;
    onSelect: (id: number) => void;
}

export default function TodosSidebar({ todoList, onAdd, onSelect }: TodosSidebarProps) {
    return (
      <aside className="w-3/12 bg-stone-600 rounded-tr-lg flex flex-col items-center pt-3">
          <h2 className="text-amber-100 text-2xl p-5 uppercase">Todos</h2>
          <button className="cursor-pointer bg-stone-500 py-2 px-5 rounded-md text-amber-50 hover:bg-stone-400 text-md"
                  onClick={onAdd}>
              + Add Todo
          </button>
        <ul className="pt-3.5">
            {todoList.map((todo: Todo) => (
                <li
                    key={todo.id}
                    className="p-0.5 text-amber-200 hover:text-amber-50 cursor-pointer"
                    onClick={() => onSelect(todo.id)}
                >
                    {todo.title}
                </li>
            ))}
        </ul>
      </aside>
    );
}