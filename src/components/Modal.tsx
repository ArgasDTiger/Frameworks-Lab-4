import {forwardRef, useImperativeHandle, useRef} from "react";

const Modal = forwardRef(function Modal({ children, header }, ref) {
    const dialog = useRef();

    useImperativeHandle(ref, () => {
        return {
            open() {
                dialog.current!.showModal();
            }
        }
    });

    return (
        <dialog ref={dialog} className="backdrop:bg-stone-800/90 rounded-md p-4 text-lg bg-stone-100">
            <h2 className="text-center m-2">{ header }</h2>
            <hr/>
            <p className="m-2">{ children }</p>
            <form method="dialog" className="text-right pt-2">
                <button className="rounded-md bg-stone-300 py-0.5 px-2.5 hover:bg-stone-200">Close</button>
            </form>
        </dialog>
    );
});

export default Modal;