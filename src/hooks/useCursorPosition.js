import { useRef } from "react";

export default function useCursorPosition(){

    const myRefs = useRef({
        textFieldDOMElement: null,
        textFieldCursorStart: null
    });

    const setCursor = () => {
        if (myRefs.current.textFieldCursorStart){
        const start = myRefs.current.textFieldCursorStart;
        myRefs.current.textFieldCursorStart = null;
        myRefs.current.textFieldDOMElement.setSelectionRange(start+1, start+1);
        }
    }

    const setTextWithAlt = (oldText) => {
        const start = myRefs.current.textFieldDOMElement.selectionStart;
        const end = myRefs.current.textFieldDOMElement.selectionEnd;
        myRefs.current.textFieldCursorStart = start;
        return oldText.substring(0, start) + '\n' + oldText.substring(end);
    }

    return [myRefs, setCursor, setTextWithAlt];

}