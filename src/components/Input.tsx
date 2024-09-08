import {forwardRef} from "react";

interface InputProps {
    labelName: string;
    inputType?: string;
    textarea?: boolean;
}

const Input = forwardRef(function Input({ labelName, inputType = "text", textarea = false}: InputProps, ref) {
    return (
        <div className="flex flex-col">
            <label className="mx-2 my-1 text-lg text-amber-800">{ labelName }</label>
            { textarea
                ? <textarea ref={ref} className="bg-amber-100 rounded-lg p-2 text-amber-700 border-amber-300"/>
                : <input ref={ref} className="bg-amber-100 rounded-lg p-2 text-amber-700 border-amber-300 " type={inputType}/>}
        </div>
    );
});

export default Input;