import { useRef } from "react";


export default function useCursorPosition(){

    const myRefs = useRef({
        textFieldDOMElement: null,
        textFieldCursorStart: null,
    });


     const setCursor = () => {
        if (myRefs.current.textFieldCursorStart != null){

            const start = myRefs.current.textFieldCursorStart;
            myRefs.current.textFieldDOMElement.setSelectionRange(start, start);
            myRefs.current.textFieldCursorStart = null;
        }
    }
    
    
    const setTextWithAlt = (oldText) => {
        const start = myRefs.current.textFieldDOMElement.selectionStart;
        const end = myRefs.current.textFieldDOMElement.selectionEnd;
        myRefs.current.textFieldCursorStart = start+1;
        return oldText.substring(0, start) + '\n' + oldText.substring(end);
    }


    return [myRefs, setCursor, setTextWithAlt,];

}