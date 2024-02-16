import styled from "@emotion/styled";
import { Autocomplete, TextField } from "@mui/material";
import { StyledButton } from "./Button";

export const FormContainer = styled.div`
  width: 20vw;
  min-width: 300px;
  padding: 25px;
  margin: auto;
  margin-top: 80px;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: left;
`;

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;


export const FormLabel = styled.label`
  color: #EDF2F7;
  font-weight: bold;
`;

const inputSize = `
  width: 100%;
  height: 60px;
  box-sizing: border-box;
  margin: 10px 0;
`;

const inputBorder = `
  border: 1px solid #CCCCCC;
  border-radius: 5px;
`;

const font = `
  font-family: math;
  font-size: 30px;
`;

export const TextInput = styled.input`
  ${inputSize}
  padding: 0 5px;
  ${font}
  ${inputBorder}
`;

export const DropDownInput = styled.select`
  ${inputSize}
  padding: 0 5px;
  ${font}
  ${inputBorder}
`;

export const AutocompleteInput = styled(Autocomplete)`
  ${inputSize}
`;

export const AutocompleteTextField = styled(TextField)`
  ${font}
  ${inputBorder}
  background-color: #FFFFFF;
`;

export const FormButton = styled(StyledButton)`
  ${inputSize}
  width: 50%;
  ${font}
`;

export const ErrorMessage = styled.div`
  color: red;
  ${font}
  margin-bottom: 10px;
`;