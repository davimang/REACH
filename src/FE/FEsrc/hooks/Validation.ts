import e from 'express';
import { useState, useEffect } from 'react';

export const fieldValidation = (validationFunction) => {
    const [value, setValue] = useState('');
    const [touched, setTouched] = useState(false);
    const [validated, setValidated] = useState(false);
    const [valid, setValid] = useState(false);
    const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

    const handleBlur = () => {
        if (!touched) {
            setTouched(true);
            validate();
        }
    };

    const validate = async () => {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }

        const newTimeoutId = setTimeout(async () => {
            setValid(await validationFunction(value));
            setValidated(true);
        }, 500);

        setTimeoutId(newTimeoutId);
    };

    const handleChange = (e) => {
        setValidated(false);
        setValue(e.target.value);
    };

    useEffect(() => {
        validate();
    }, [value]);

    return {
        value,
        valid,
        handleBlur,
        handleChange,
        showErrorMessage: validated && !valid && touched,
    };
};