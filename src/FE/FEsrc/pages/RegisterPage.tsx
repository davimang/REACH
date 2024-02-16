import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { useAuth } from '../contexts/AuthContext';
import { FormContainer, Form, Input, Button, ErrorMessage } from '../components/Form';

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
        username: '',
        password: '',
        email: '',
        first_name: '',
        last_name: '',
        is_clinician: false,
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

            navigate('/createProfile');
        } catch (error) {
            console.error('Registration failed:', error);
            setError('Registration  failed. Please try again.');
        }
    };

    return (
        <RegisterPageContainer>
            <FormContainer>
                <Form onSubmit={handleSubmit}>
                    <Input
                        type='text'
                        id='username'
                        name='username'
                        value={formData.username}
                        onChange={handleInputChange}
                        placeholder='Username'
                    />
                    <Input
                        type='password'
                        id='password'
                        name='password'
                        value={formData.password}
                        onChange={handleInputChange}
                        placeholder='Password'
                    />
                    <Input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder='Email'
                    />
                    <Input
                        type="text"
                        id="first_name"
                        name="first_name"
                        value={formData.first_name}
                        onChange={handleInputChange}
                        placeholder='First Name'
                    />
                    <Input
                        type="text"
                        id="last_name"
                        name="last_name"
                        value={formData.last_name}
                        onChange={handleInputChange}
                        placeholder='Last Name'
                    />
                    {error && <ErrorMessage>{error}</ErrorMessage>}
                    <Button type='submit'>Register</Button>
                </Form>
            </FormContainer>
        </RegisterPageContainer>
    );
};

export default RegisterPage;