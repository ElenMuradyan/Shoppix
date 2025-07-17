export const handleChange = (text: string, setStock: (val: string) => void, setErrorMessage: (val: string) => void, max: number) => {
    if (/^\d*$/.test(text)) {
        const num = Number(text);

        if (text === "") {
            setStock('');
            setErrorMessage("");
        } else if (num > 0 && num <= max) {
            setStock(text);
            setErrorMessage("");
        } else {
            setErrorMessage(`Please enter a number between 1 and ${max}`);
        }
    }
};