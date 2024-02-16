import styled from "@emotion/styled";

export const FormContainer = styled.div`
  width: 20vw;
  min-width: 300px;
  padding: 25px;
  margin: auto;
  margin-top: 80px;
  display: grid;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Input = styled.input`
  width: 100%;
  height: 60px;
  margin-bottom: 15px;
  padding: 20px;
  font-size: 48px;
  border: 1px solid #CCCCCC;
  border-radius: 5px;
`;

export const Button = styled.button`
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

export const ErrorMessage = styled.div`
  color: red;
  font-size: 24px;
  font-family: math;
  margin-bottom: 10px;
`;