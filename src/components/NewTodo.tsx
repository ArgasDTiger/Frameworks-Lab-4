import Input from "./Input";
import {Todo} from "../App.tsx";
import {useRef} from "react";
import Modal from "./Modal.tsx";

interface NewTodoProps {
    onAdd: (todo: Todo) => void;
    onCancel: () => void;
}

export default function NewTodo({ onAdd, onCancel }: NewTodoProps) {
    const modal = useRef();

    const title = useRef();
    const description = useRef();
    const dueDate = useRef();

    function generateId() {
        return Math.floor(Math.random() * 1000);
    }

    function onSave() {
        const enteredTitle = title.current.value.trim();
        const enteredDescription = description.current.value.trim();
        const enteredDueDate = dueDate.current.value.trim();

        if (enteredTitle === "" || enteredDescription === "" || enteredDueDate === "") {
            modal.current.open();
            return;
        }

        const newTodo: Todo = {
            id: generateId(),
            title: enteredTitle,
            description: enteredDescription,
            dueDate: enteredDueDate,
            done: false
        }
        onAdd(newTodo);
    }

    return (
        <>
        <Modal ref={modal} header="Error saving changes!">
            Please, don't leave fields empty.
        </Modal>
        <div className="w-8/12 flex items-center-center flex-col p-8">
            <h1 className="text-amber-800 text-2xl uppercase text-center">New Todo</h1>
            <Input ref={title} labelName={"Title"}/>
            <Input ref={description} labelName={"Description"} textarea/>
            <Input ref={dueDate} labelName={"Due Date"} inputType={"date"}/>

            <div className="flex justify-between my-4 text-md">
                <button
                    className="bg-amber-500 text-amber-50 py-1.5 px-5 rounded-lg hover:bg-amber-400"
                    onClick={onSave}
                >
                    Save
                </button>
                <button
                    className="bg-amber-200 text-amber-700 py-1.5 px-5 rounded-lg hover:bg-amber-300"
                    onClick={onCancel}
                >
                    Cancel
                </button>
            </div>
        </div>
        </>
    );
}