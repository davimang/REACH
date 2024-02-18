import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { API_URL } from '..';
import { useAuth } from '../contexts/AuthContext';
import { FormContainer, Form, TextInput, FormButton, ErrorMessage, ButtonContainer } from '../components/FormStyles';

const RegisterPageContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  align-items: center;
`;

const fieldValidation = (validationFunction) => {
    const [value, setValue] = useState('');
    const [touched, setTouched] = useState(false);
    const [valid, setValid] = useState(false);

    const handleBlur = () => {
        validate();

        if (value != '') {
            setTouched(true);
        }
    };

    const validate = async () => {
        //set valid to true whille waiting for validation to avoid showing error message on first render
        setValid(true);
        setValid(await validationFunction(value));
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
        setTouched(false);
    };

    return {
        value,
        valid,
        touched,
        handleBlur,
        handleChange,
        showErrorMessage: touched && !valid,
    };
};

const RegisterPage: React.FC = () => {
    const navigate = useNavigate();
    const { register } = useAuth();
    const [formData, setFormData] = useState({
        password: '',
        first_name: '',
        last_name: '',
        is_clinician: false,
    });

    const [error, setError] = useState<string | null>(null);

    const emailErrorMessage = 'Invalid email';
    const usernameErrorMessage = 'Username is not available';

    const validateEmail = (email) => {
        const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

        return emailRegex.test(email);
    };

    const validateUsername = async (username) => {
        const response = await fetch(`${API_URL}/check_username/?username=${username}`);
        const data = await response.json();

        return data.available;
    };

    const emailField = fieldValidation(validateEmail);
    const usernameField = fieldValidation(validateUsername);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            setError(null);

            await register(
                usernameField.value,
                formData.password,
                emailField.value,
                formData.first_name,
                formData.last_name,
                formData.is_clinician
            );

            navigate('/createProfile');
        } catch (error) {
            console.error('Registration failed:', error);
            setError('Registration  failed. Please try again.');
        }
    };

    return (
        <RegisterPageContainer>
            <FormContainer>
                <Form onSubmit={handleSubmit} id='reg-form'>
                    <TextInput
                        type='email'
                        id='email'
                        name='email'
                        value={emailField.value}
                        onChange={emailField.handleChange}
                        onBlur={emailField.handleBlur}
                        placeholder='Email'
                    />
                    {emailField.showErrorMessage && <ErrorMessage>{emailErrorMessage}</ErrorMessage>}
                    <TextInput
                        type='password'
                        id='password'
                        name='password'
                        value={formData.password}
                        onChange={handleInputChange}
                        placeholder='Password'
                        autoComplete='new-password'
                    />
                    <TextInput
                        type='text'
                        id='username'
                        name='username'
                        value={usernameField.value}
                        onChange={usernameField.handleChange}
                        onBlur={usernameField.handleBlur}
                        placeholder='Username'
                    />
                    {usernameField.showErrorMessage && <ErrorMessage>{usernameErrorMessage}</ErrorMessage>}
                    <TextInput
                        type='text'
                        id='first_name'
                        name='first_name'
                        value={formData.first_name}
                        onChange={handleInputChange}
                        placeholder='First Name'
                    />
                    <TextInput
                        type='text'
                        id='last_name'
                        name='last_name'
                        value={formData.last_name}
                        onChange={handleInputChange}
                        placeholder='Last Name'
                    />
                    {error && <ErrorMessage>{error}</ErrorMessage>}
                    <ButtonContainer>
                        <FormButton type='submit'>Register</FormButton>
                    </ButtonContainer>
                </Form>
            </FormContainer>
        </RegisterPageContainer>
    );
};

export default RegisterPage;