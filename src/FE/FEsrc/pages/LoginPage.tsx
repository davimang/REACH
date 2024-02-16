import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { useAuth } from '../contexts/AuthContext';
import { FormContainer, Form, Input, Button, ErrorMessage } from '../components/Form';

const LoginPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  align-items: center;
`;

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setError(null);

      await login(formData.username, formData.password);

      navigate('/');
    } catch (error) {
      console.error('Login failed:', error);
      setError('Login failed. Please check your credentials.');
    }
  };

  const navigateToRegister = () => {
    navigate('/register');
  };

  return (
    <LoginPageContainer>
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
          {error && <ErrorMessage>{error}</ErrorMessage>}
          <Button type='submit'>Login</Button>
        </Form>
      </FormContainer>
      <Button type='button' onClick={navigateToRegister}>Register</Button>
    </LoginPageContainer>
  );
};

export default LoginPage;
