import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { useAuth } from '../contexts/AuthContext';
import { FormContainer, Form, TextInput, FormButton, ButtonContainer, ErrorMessage } from '../components/FormStyles';

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
  const [usernameError, setUsernameError] = useState<string | null>(null);
  const [authError, setAuthError] = useState<string | null>(null);

  const usernameErrorMessage = 'Username cannot be empty.';
  const authErrorMessage = 'Login failed. Please check your credentials.';

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    setAuthError(null);

    if (name === 'username') {
      if (value.trim() === '') {
        setUsernameError(usernameErrorMessage);
      } else {
        setUsernameError(null);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (formData.username.trim() === '') {
        setUsernameError(usernameErrorMessage);
        return;
      }

      await login(formData.username, formData.password);

      navigate('/');
    } catch (error) {
      setAuthError(authErrorMessage);
    }
  };

  const navigateToRegister = () => {
    navigate('/register');
  };

  return (
    <LoginPageContainer>
      <FormContainer id='login-form'>
        <Form onSubmit={handleSubmit}>
          <TextInput
            type='text'
            id='username'
            name='username'
            value={formData.username}
            onChange={handleInputChange}
            placeholder='Username'
          />
          {usernameError && <ErrorMessage>{usernameError}</ErrorMessage>}
          <TextInput
            type='password'
            id='password'
            name='password'
            value={formData.password}
            onChange={handleInputChange}
            placeholder='Password'
          />
          {authError && <ErrorMessage>{authError}</ErrorMessage>}
          <ButtonContainer>
            <FormButton type='submit'>Login</FormButton>
            <FormButton type='button' onClick={navigateToRegister}>Register</FormButton>
          </ButtonContainer>
        </Form>
      </FormContainer>
    </LoginPageContainer>
  );
};

export default LoginPage;
