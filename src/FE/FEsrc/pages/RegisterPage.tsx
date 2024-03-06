import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { API_URL } from '..';
import { useAuth } from '../contexts/AuthContext';
import { checkEmpty, fieldValidation } from '../hooks/Validation';
import { FormContainer, Form, TextInput, FormButton, CheckboxInput, ErrorMessage, ButtonContainer, CheckboxContainer, CheckboxLabel, FormButtonDisabled } from '../components/FormStyles';

const RegisterPageContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  align-items: center;
`;

const RegisterPage: React.FC = () => {
    const navigate = useNavigate();
    const { register } = useAuth();
    const [formData, setFormData] = useState({
        is_clinician: false,
    });

    const [error, setError] = useState(false);

    const errorMessage = 'Registration failed. Please try again.';

    const emailErrorMessage = 'Invalid email';
    const usernameErrorMessage = 'Username is not available';
    const passwordErrorMessage = 'Password must be at least 8 characters';
    const genericErrorMessage = 'This field cannot be empty';

    const validateEmail = (email) => {
        const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

        return emailRegex.test(email);
    };

    const validateUsername = async (username) => {
        const response = await fetch(`${API_URL}/check_username/?username=${username}`);
        const data = await response.json();

        return data.available;
    };

    const validatePassword = (password) => {
        return password.length >= 8;
    }

    const emailField = fieldValidation(validateEmail);
    const usernameField = fieldValidation(validateUsername, 500);
    const passwordField = fieldValidation(validatePassword);
    const firstNameField = fieldValidation(checkEmpty);
    const lastNameField = fieldValidation(checkEmpty);

    const enableSubmit = emailField.valid && usernameField.valid && passwordField.valid && firstNameField.valid && lastNameField.valid;

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
            await register(
                usernameField.value,
                passwordField.value,
                emailField.value,
                firstNameField.value,
                lastNameField.value,
                formData.is_clinician
            );

            navigate('/createProfile');
        } catch (error) {
            setError(true);
        }
    };

    useEffect(() => {
        if (error) {
            setError(false);
        }
    }, [usernameField.value, passwordField.value, emailField.value, firstNameField.value, lastNameField.value]);

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
                        value={passwordField.value}
                        onChange={passwordField.handleChange}
                        onBlur={passwordField.handleBlur}
                        placeholder='Password'
                        autoComplete='new-password'
                    />
                    {passwordField.showErrorMessage && <ErrorMessage>{passwordErrorMessage}</ErrorMessage>}
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
                        value={firstNameField.value}
                        onChange={firstNameField.handleChange}
                        onBlur={firstNameField.handleBlur}
                        placeholder='First Name'
                    />
                    {firstNameField.showErrorMessage && <ErrorMessage>{genericErrorMessage}</ErrorMessage>}
                    <TextInput
                        type='text'
                        id='last_name'
                        name='last_name'
                        value={lastNameField.value}
                        onChange={lastNameField.handleChange}
                        onBlur={lastNameField.handleBlur}
                        placeholder='Last Name'
                    />
                    {lastNameField.showErrorMessage && <ErrorMessage>{genericErrorMessage}</ErrorMessage>}
                    <CheckboxContainer>
                        <CheckboxInput
                            type='checkbox'
                            name='is_clinician'
                            checked={formData.is_clinician}
                            onChange={handleInputChange}
                        />
                        <CheckboxLabel>Clinician</CheckboxLabel>
                    </CheckboxContainer>
                    {error && <ErrorMessage>{errorMessage}</ErrorMessage>}
                    <ButtonContainer>
                        {enableSubmit ?
                            <FormButton type='submit'>Register</FormButton>
                            :
                            <FormButtonDisabled disabled>Register</FormButtonDisabled>
                        }
                    </ButtonContainer>
                </Form>
            </FormContainer>
        </RegisterPageContainer>
    );
};

export default RegisterPage;