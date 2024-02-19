import { useState, useEffect } from 'react';

export const fieldValidation = (validationFunction) => {
    const [value, setValue] = useState('');
    const [validated, setValidated] = useState(false);
    const [valid, setValid] = useState(false);
    const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

    const handleBlur = () => {
        if (value != '') {
            setValidated(true);
        }
        else {
            setValidated(false);
        }
    };

    const validate = async () => {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }

        const newTimeoutId = setTimeout(async () => {
            if (value != '') {
                setValid(await validationFunction(value));
                setValidated(true);
            }
        }, 500);

        setTimeoutId(newTimeoutId);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValidated(false);
        setValue(e.target.value);
    };

    useEffect(() => {
        validate();
    }, [value]);

    return {
        value,
        valid,
        touched: validated,
        handleBlur,
        handleChange,
        showErrorMessage: validated && !valid,
    };
};