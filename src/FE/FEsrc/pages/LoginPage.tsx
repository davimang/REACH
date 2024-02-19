import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { useAuth } from '../contexts/AuthContext';
import { FormContainer, Form, TextInput, FormButton, ButtonContainer, ErrorMessage, FormButtonDisabled } from '../components/FormStyles';

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

  const [usernameError, setUsernameError] = useState(false);
  const usernameErrorMessage = 'Username cannot be empty.';

  const [authError, setAuthError] = useState(false);
  const authErrorMessage = 'Login failed. Please check your credentials.';

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    setAuthError(false);

    if (name === 'username') {
      if (value.trim() === '') {
        setUsernameError(true);
      } else {
        setUsernameError(false);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (formData.username.trim() === '') {
        setUsernameError(true);
        return;
      }

      await login(formData.username, formData.password);

      navigate('/');
    } catch (error) {
      setAuthError(true);
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
          {usernameError && <ErrorMessage>{usernameErrorMessage}</ErrorMessage>}
          <TextInput
            type='password'
            id='password'
            name='password'
            value={formData.password}
            onChange={handleInputChange}
            placeholder='Password'
          />
          {authError && <ErrorMessage>{authErrorMessage}</ErrorMessage>}
          <ButtonContainer>
            {!usernameError ?
              <FormButton type='submit'>Login</FormButton>
              :
              <FormButtonDisabled disabled>Login</FormButtonDisabled>
            }
            <FormButton type='button' onClick={navigateToRegister}>Register</FormButton>
          </ButtonContainer>
        </Form>
      </FormContainer>
    </LoginPageContainer>
  );
};

export default LoginPage;
