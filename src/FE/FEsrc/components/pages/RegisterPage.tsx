import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { useAuth } from '../../contexts/AuthContext';

const RegisterPageContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  align-items: center;
`;

const RegisterFormContainer = styled.div`
  width: 20vw;
  min-width: 300px;
  padding: 25px;
  margin: auto;
  margin-top: 80px;
  display: grid;
`;

const RegisterForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const RegisterFormInput = styled.input`
  width: 100%;
  height: 60px;
  margin-bottom: 15px;
  padding: 20px;
  font-size: 48px;
  border: 1px solid #CCCCCC;
  border-radius: 5px;
`;

const RegisterFormButton = styled.button`
  width: 70%;
  height: 80px;
  padding: 10px;
  background-color: #039D5F;
  border-radius: 10px;
  border: none;
  cursor: pointer;
  color: #FFFFFF;
  font-size: 48px;
  font-family: math;
`;

const ErrorMessage = styled.div`
  color: red;
  font-size: 24px;
  font-family: math;
  margin-bottom: 10px;
`;

const RegisterPage: React.FC = () => {
    const navigate = useNavigate();
    const { register } = useAuth();
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        email: '',
        first_name: '',
        last_name: '',
        is_clinician: false, // Set default value
    });
    const [error, setError] = useState<string | null>(null);

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
                formData.username,
                formData.password,
                formData.email,
                formData.first_name,
                formData.last_name,
                formData.is_clinician
            );

            navigate('/');
        } catch (error) {
            console.error('Registration failed:', error);
            setError('Registration  failed. Please try again.');
        }
    };

    return (
        <RegisterPageContainer>
            <RegisterFormContainer>
                <RegisterForm onSubmit={handleSubmit}>
                    <RegisterFormInput
                        type='text'
                        id='username'
                        name='username'
                        value={formData.username}
                        onChange={handleInputChange}
                        placeholder='Username'
                    />
                    <RegisterFormInput
                        type='password'
                        id='password'
                        name='password'
                        value={formData.password}
                        onChange={handleInputChange}
                        placeholder='Password'
                    />
                    <RegisterFormInput
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder='Email'
                    />
                    <RegisterFormInput
                        type="text"
                        id="first_name"
                        name="first_name"
                        value={formData.first_name}
                        onChange={handleInputChange}
                        placeholder='First Name'
                    />
                    <RegisterFormInput
                        type="text"
                        id="last_name"
                        name="last_name"
                        value={formData.last_name}
                        onChange={handleInputChange}
                        placeholder='Last Name'
                    />
                    {error && <ErrorMessage>{error}</ErrorMessage>}
                    <RegisterFormButton type='submit'>Register</RegisterFormButton>
                </RegisterForm>
            </RegisterFormContainer>
        </RegisterPageContainer>
    );
};

export default RegisterPage;