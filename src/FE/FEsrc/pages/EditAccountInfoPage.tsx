import React, { useEffect, useState } from 'react';
import { SuccessMessage } from '../components/FormStyles';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router';
import styled from '@emotion/styled';
import { API_URL } from '..';
import { FormContainer, Form, FormLabel, TextInput, ButtonContainer, FormButton, FormButtonDisabled, ErrorMessage, FormTitle } from '../components/FormStyles';
import { checkEmpty, fieldValidation } from '../hooks/Validation';
import useDidMountEffect from '../components/useDidMountEffect';
import CustomizedSnackbars from '../components/SnackBar';


const ProfileCreationContainer = styled.div`
    min-width: fit-content;
    padding: 15px;
`;

const EditAccountInfoPage = (props) => {
    const navigate = useNavigate();

    const userId = localStorage.getItem('userId');
    const [authToken, setAuthToken] = useState(localStorage.getItem('accessToken'));
    const [initialLoad, setInitialLoad] = useState(true);
    const [isAccountInfoSnackBarOpen, setIsAccountInfoSnackBarOpen] = useState(false);

    const defaultFirstName = localStorage.getItem("firstName");
    const defaultLastName = localStorage.getItem("lastName");
    const defaultIsClinician = localStorage.getItem("isClinician");

    const firstNameField = fieldValidation(checkEmpty, defaultFirstName ? defaultFirstName: "");
    const lastNameField = fieldValidation(checkEmpty, defaultLastName ? defaultLastName: "");
    const [isClinician, setIsClinician] = useState(defaultIsClinician == "true");

    const [error, setError] = useState(false);

    const errorMessage = 'Failed to update account information. Please try again.';

    const genericErrorMessage = 'This field cannot be empty';

    const enableSubmit = firstNameField.valid && lastNameField.valid;

    const createRequestOptions = () => {

        return {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${authToken}` },
            body: JSON.stringify({
                first_name: firstNameField.value,
                last_name: lastNameField.value,
                is_clinician: isClinician
            })
        };
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const requestOptions = createRequestOptions();
        const endpoint = `${API_URL}/userdata/${userId}/`
        try {
            const response = await fetch(endpoint, requestOptions);
            const data = await response.json();

            if (response.ok) {              
                localStorage.setItem('isClinician', isClinician ? "true": "false");
                localStorage.setItem('firstName', firstNameField.value);
                localStorage.setItem('lastName', lastNameField.value);
                setIsAccountInfoSnackBarOpen(true);
            }
            else {
                setError(true);
            }
        } catch (error) {
            setError(true);
        }
    };

    useEffect(() => {
        setAuthToken(localStorage.getItem('accessToken'));
    }, [localStorage.getItem('accessToken')]);

    useDidMountEffect(() => {
        setInitialLoad(false);
        if (error) {
            setError(false);
        }
    }, [firstNameField.value, lastNameField.value]);

    return (
        <>
            <ProfileCreationContainer>
            <CustomizedSnackbars
                isOpen={isAccountInfoSnackBarOpen}
                setIsOpen={setIsAccountInfoSnackBarOpen}
                snackText={"Account Information Saved!"}
            />
                <FormContainer>
                    <FormTitle>Account Information</FormTitle>
                    <Form onSubmit={handleSubmit}>
                        <FormLabel>First Name</FormLabel>
                        <TextInput
                            type='text'
                            id='first name'
                            value={firstNameField.value}
                            onChange={firstNameField.handleChange}
                            onBlur={firstNameField.handleBlur}
                        />
                        {firstNameField.showErrorMessage && <ErrorMessage>{genericErrorMessage}</ErrorMessage>}

                        <FormLabel>Last Name</FormLabel>
                        <TextInput
                            type='text'
                            id='last name'
                            value={lastNameField.value}
                            onChange={lastNameField.handleChange}
                            onBlur={lastNameField.handleBlur}
                        />

                        {lastNameField.showErrorMessage && <ErrorMessage>{genericErrorMessage}</ErrorMessage>}

                        <FormLabel>Is Clinician</FormLabel>
                        <TextInput
                            type='checkbox'
                            checked={isClinician}
                            style={{ width: 30, height: 30 }}
                            onChange={(e) => {
                                setIsClinician(e.target.checked);
                            }
                            }
                        />

                        {error && <ErrorMessage>{errorMessage}</ErrorMessage>}

                        <ButtonContainer>
                            {enableSubmit || initialLoad ?
                                <FormButton type='submit'>Save</FormButton>
                                :
                                <FormButtonDisabled disabled>Save</FormButtonDisabled>
                            }
                        </ButtonContainer>
                    </Form>
                </FormContainer>
            </ProfileCreationContainer>
        </>
    );
}

export default EditAccountInfoPage;
