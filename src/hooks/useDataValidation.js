import { useState } from "react";

export default function useDataValidation(initialText=""){

    const [text, setText] = useState(initialText);

    const [isValid, setIsValid] = useState(true);

    const handleOnChange = (e, validationLogic) => {
        setText(e.target.value);
        if(!validationLogic(e.target.value)){
            setIsValid(false);
        } else {
            setIsValid(true);
        }
    }

    const resetInitialText = () => setText(initialText);

    return {text, isValid, handleOnChange, resetInitialText};

}
