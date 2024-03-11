import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { API_URL } from '..';
import { useAuth } from '../contexts/AuthContext';
import { checkEmpty, fieldValidation } from '../hooks/Validation';
import { FormContainer, Form, TextInput, FormButton, ErrorMessage, ButtonContainer, CheckboxContainer, CheckboxInput, CheckboxLabel, FormButtonDisabled } from '../components/FormStyles';

const Header = styled.h1`
  color: white; 
  font-size: 40px; 
`;

const AccountProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const RegisterPageContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  align-items: center;
`;

const AccountProfile: React.FC = () => {
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

    const [error, setError] = useState(false);

    const errorMessage = 'Registration failed. Please try again.';

    const emailErrorMessage = 'Invalid email';
    const usernameErrorMessage = 'Username is not available';
    const genericErrorMessage = 'This field cannot be empty';

    const emailField = fieldValidation(formData.email);
    const usernameField = fieldValidation(formData.username, 500);
    const passwordField = fieldValidation(checkEmpty);
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
                formData.username,
                formData.password,
                formData.email,
                formData.first_name,
                formData.last_name,
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
    }, [formData.username, formData.password, formData.email, formData.first_name, formData.last_name]);

    useEffect(() => {
        // Fetch user data from the account profile
        const userId = localStorage.getItem('userId') || '1';
        fetch(`${API_URL}/userdata/${userId}/`)
            .then(response => response.json())
            .then(response => {
                setFormData({
                    ...formData,
                    email: response.email,
                    first_name: response.first_name,
                    last_name: response.last_name,
                    is_clinician: response.is_clinician,
                });
            })
            .catch(error => console.error('Error fetching account info:', error.message));
    }, []);

    return (
        
        <RegisterPageContainer>
            <Header>Account Profile</Header>
            <FormContainer>
                <Form onSubmit={handleSubmit} id='reg-form'>
                    <TextInput
                        type='email'
                        id='email'
                        name='email'
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder='Email'
                    />
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
                        placeholder='Username'
                    />
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
                            <FormButton type='submit'>Save</FormButton>
                            :
                            <FormButtonDisabled disabled>Save</FormButtonDisabled>
                        }
                    </ButtonContainer>
                </Form>
            </FormContainer>
        </RegisterPageContainer>
    );
};

export default AccountProfile;
