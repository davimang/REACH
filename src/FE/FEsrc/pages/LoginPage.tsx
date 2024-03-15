import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { useAuth } from '../contexts/AuthContext';
import { FormContainer, Form, TextInput, FormButton, ButtonContainer, ErrorMessage,SuccessMessage, FormButtonDisabled } from '../components/FormStyles';
import { checkEmpty, fieldValidation } from '../hooks/Validation';

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

  const usernameField = fieldValidation(checkEmpty);
  const passwordField = fieldValidation(checkEmpty);

  const enableSubmit = usernameField.valid && passwordField.valid;

  const usernameErrorMessage = 'Username cannot be empty.';
  const passwordErrorMessage = 'Password cannot be empty.';

  const [authError, setAuthError] = useState(false);
  // track login status
  const [loginSuccess, setLoginSuccess] = useState(false);
  const authErrorMessage = 'Login failed. Please check your credentials.';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await login(usernameField.value, passwordField.value);
      setLoginSuccess(true);
      setTimeout(() => { 
        navigate('/');
      }, 1000)
    } catch (error) {
      setAuthError(true);
    }
  };

  useEffect(() => {
    if (authError) {
      setAuthError(false);
    }
  }, [usernameField.value, passwordField.value]);

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
            value={usernameField.value}
            onChange={usernameField.handleChange}
            onBlur={usernameField.handleBlur}
            placeholder='Username'
          />
          {usernameField.showErrorMessage && <ErrorMessage>{usernameErrorMessage}</ErrorMessage>}
          <TextInput
            type='password'
            id='password'
            name='password'
            value={passwordField.value}
            onChange={passwordField.handleChange}
            onBlur={passwordField.handleBlur}
            placeholder='Password'
          />
          {passwordField.showErrorMessage && <ErrorMessage>{passwordErrorMessage}</ErrorMessage>}
          {loginSuccess && <SuccessMessage>Login successful!</SuccessMessage>}
          {authError && <ErrorMessage>{authErrorMessage}</ErrorMessage>}
          <ButtonContainer>
            {enableSubmit ?
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
