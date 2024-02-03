import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { useAuth } from '../../contexts/AuthContext';

const LoginPageContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  align-items: center;
`;

const LoginFormContainer = styled.div`
  width: 20vw;
  min-width: 300px;
  padding: 25px;
  margin: auto;
  margin-top: 80px;
  display: grid;
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const LoginFormInput = styled.input`
  width: 100%;
  height: 60px;
  margin-bottom: 15px;
  padding: 20px;
  font-size: 48px;
  border: 1px solid #CCCCCC;
  border-radius: 5px;
`;

const LoginFormButton = styled.button`
  width: 50%;
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

    return (
        <LoginPageContainer>
            <LoginFormContainer>
                <LoginForm onSubmit={handleSubmit}>
                    <LoginFormInput
                        type='text'
                        id='username'
                        name='username'
                        value={formData.username}
                        onChange={handleInputChange}
                        placeholder='Username'
                    />
                    <LoginFormInput
                        type='password'
                        id='password'
                        name='password'
                        value={formData.password}
                        onChange={handleInputChange}
                        placeholder='Password'
                    />
                    {error && <ErrorMessage>{error}</ErrorMessage>}
                    <LoginFormButton type='submit'>Login</LoginFormButton>
                </LoginForm>
            </LoginFormContainer>
        </LoginPageContainer>
    );
};

export default LoginPage;
