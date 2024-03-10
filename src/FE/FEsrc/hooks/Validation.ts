import e from 'express';
import { useState, useEffect } from 'react';

export const fieldValidation = (validationFunction, defaultValue='', validationTimout = 100) => {
    const [value, setValue] = useState(defaultValue);
    const [touched, setTouched] = useState(false);
    const [validated, setValidated] = useState(false);
    const [valid, setValid] = useState(false);
    const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

    const handleBlur = () => {
        if (!touched) {
            setTouched(true);
        }
    };

    const validate = async () => {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }

        const newTimeoutId = setTimeout(async () => {
            setValid(await validationFunction(value));
            setValidated(true);
        }, validationTimout);

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

export const checkEmpty = (value) => {
    return value.trim() !== '';
};