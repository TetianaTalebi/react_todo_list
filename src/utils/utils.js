
export const isTodoValidUtils = (text) => text.trim().length >= 3;

export const isNewListNameValidUtils = (text) => {
    let validatedText = text.trim().length;
    return (validatedText>=3)&&(validatedText<30);
}