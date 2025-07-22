export const handleChange = (text: string, setStock: (val: string) => void, setErrorMessage: (val: string) => void) => {
    setErrorMessage('');
    if (/^\d*$/.test(text)) {
        const num = Number(text);

        if (text === "") {
            setStock('');
            setErrorMessage("Գրեք քանակը");
        } else if (num > 0) {
            setStock(text);
            setErrorMessage("");
        } 
    }
};