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

const RegisterPage: React.FC = () => {
    const navigate = useNavigate();
    const { register } = useAuth();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        username: '',
        first_name: '',
        last_name: '',
        is_clinician: false,
    });

    const [error, setError] = useState<string | null>(null);

    const [emailValid, setEmailValid] = useState(false);
    const [emailTouched, setEmailTouched] = useState(false);
    const showEmailError = emailTouched && !emailValid;
    const emailErrorMessage = 'Invalid email';

    const [usernameValid, setUsernameValid] = useState(true);
    const [usernameTouched, setUsernameTouched] = useState(false);
    const showUsernameError = usernameTouched && !usernameValid;
    const usernameErrorMessage = 'Username is not available';

    const validateEmail = () => {
        const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

        setEmailValid(emailRegex.test(formData.email));
    };

    const handleEmailBlur = () => {
        if (formData.email != '') {
            setEmailTouched(true);
        }

        validateEmail();
    };

    const validateUsername = async () => {
        const response = await fetch(`${API_URL}/check_username/?username=${formData.username}`);
        const data = await response.json();

        setUsernameValid(data.available);
    };

    const handleUsernameBlur = () => {
        if (formData.username != '') {
            setUsernameTouched(true);
        }

        validateUsername();
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));

        if (name === 'email') {
            setEmailTouched(false);
        }
        else if (name === 'username') {
            setUsernameTouched(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            setError(null);

            await register(
                formData.username,
                formData.password,
                formData.email,
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
                        value={formData.email}
                        onChange={handleInputChange}
                        onBlur={handleEmailBlur}
                        placeholder='Email'
                    />
                    {showEmailError && <ErrorMessage>{emailErrorMessage}</ErrorMessage>}
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
                        value={formData.username}
                        onChange={handleInputChange}
                        onBlur={handleUsernameBlur}
                        placeholder='Username'
                    />
                    {showUsernameError && <ErrorMessage>{usernameErrorMessage}</ErrorMessage>}
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